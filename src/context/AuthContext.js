
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

    const signup = (email, password) => {
        return app.auth().createUserWithEmailAndPassword(email, password)

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
