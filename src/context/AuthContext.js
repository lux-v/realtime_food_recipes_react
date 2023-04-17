import { createContext, useEffect, useState } from 'react';
import app from "../firebase"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userData, setUserData] = useState(null);
    const [toastType, setToastType] = useState({
        open: false,
    });

    const signup = async (email, password, displayName) => {
        const res = await app.auth().createUserWithEmailAndPassword(email, password)

        const user = res.user;
        // .then(credential => {
        //     const formattedUser = { ...credential.user, displayName: displayName }
        //     handleUser(formattedUser)
        // })

        localStorage.setItem("accessToken", JSON.stringify(user))
        setIsLoggedIn(true)
        setToastType({
            open: true,
            message: `Welcome, ${displayName}.`,
            type: 'success',
        });

    }


    const login = async (email, password) => {
        try {
            const res = await app.auth().signInWithEmailAndPassword(email, password)
            const user = res.user;

            localStorage.setItem("accessToken", JSON.stringify(user))
            setIsLoggedIn(true)
            setToastType({
                open: true,
                message: `Welcome back, ${user.email}.`,
                type: 'success',
            });
        }
        catch {
            await logout()
        }
    }


    const logout = async () => {
        setIsLoggedIn(false)
        setUserData(null)
        localStorage.clear('accessToken');
        await app.auth().signOut();
    }

    // const handleUser = (formattedUser) => {
    //     if (formattedUser) {
    //         createUser(formattedUser)
    //     } else {
    //         return false
    //     }
    // }

    // const createUser = async (formattedUser) => {
    //     return app.firestore().collection("users").doc(formattedUser.uid).set({
    //         email: formattedUser.email,
    //         displayName: formattedUser.displayName,

    //     })
    // }



    // const googleSignin = async () => {
    //     let provider = new firebase.auth.GoogleAuthProvider()
    //     return app.auth().signInWithPopup(provider)
    // }


    const resetPassword = (email) => {
        return app.auth().sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = app.auth().onAuthStateChanged(user => {
            if (user) {
                setUserData(user)
                setIsLoggedIn(true)
                localStorage.setItem("accessToken", JSON.stringify(user))
            } else {
                setUserData(null)
                localStorage.clear("accessToken")
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
                // createUser,
                login,
                logout,
                resetPassword,
                // googleSignin,
                // handleUser

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthProvider, AuthConsumer };
