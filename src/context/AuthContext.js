
import firebase from 'firebase';
import { createContext, useEffect, useState } from 'react';
import app from "../firebase"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userData, setUserData] = useState(null);
    const [toastType, setToastType] = useState({
        open: false,
    });



    console.log("app: ", app)


    const signup = async (email, password, displayName) => {
        return app.auth().createUserWithEmailAndPassword(email, password).then(credential => {
            const formattedUser = { ...credential.user, displayName: displayName }
            handleUser(formattedUser)
        })
    }




    const handleUser = (formattedUser) => {
        console.log("formattedUser: ", formattedUser)
        if (formattedUser) {
            createUser(formattedUser.uid, formattedUser)

        } else {
            return false
        }
    }


    const createUser = async (uid, formattedUser) => {
        return app.firestore().collection("users").doc(uid).set({
            email: formattedUser.email,
            displayName: formattedUser.displayName,

        })
    }


    const login = (email, password) => {
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    const googleSignin = async () => {
        let provider = new firebase.auth.GoogleAuthProvider()

        return app.auth().signInWithPopup(provider).catch(err => {
            alert(err)


        })
    }

    const logout = () => {
        return app.auth().signOut();
    }

    const resetPassword = (email) => {
        return app.auth().sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = app.auth().onAuthStateChanged(user => {
            if (user) {
                setUserData(user)
                localStorage.setItem("accessToken", JSON.stringify(user))
            } else {
                setUserData(null)
                localStorage.setItem("accessToken", null)
            }
        })

        return unsubscribe;
    }, [])


    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                userData,
                setUserData,
                toastType,
                setToastType,
                signup,
                createUser,
                login,
                logout,
                resetPassword,
                googleSignin,
                handleUser

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthProvider, AuthConsumer };
