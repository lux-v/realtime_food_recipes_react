
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


    const signup = async (email, password, userParams) => {
        return app.auth().createUserWithEmailAndPassword(email, password).then(credential => {
            handleUser(credential.user, userParams)
        })
    }

    const handleUser = (rawUser, userParams) => {
        console.log("rawUser: ", rawUser)
        if (rawUser) {
            const user = formatUser(rawUser, userParams)

            console.log("user:", user)

            createUser(user.uid, user)

            return user
        } else {

            return false
        }
    }

    const formatUser = (user, userParams) => {
        return {
            uid: user.uid,
            email: user.email,
            ...userParams,
        }
    }


    const createUser = async (uid, userParams) => {
        return app.firestore().collection("users").doc(uid).set({
            ...userParams
        })
    }


    const login = (email, password) => {
        return app.auth().signInWithEmailAndPassword(email, password)
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
                resetPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthProvider, AuthConsumer };
