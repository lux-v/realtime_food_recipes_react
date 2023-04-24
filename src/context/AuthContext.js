import { createContext, useEffect, useState } from 'react';
import app from "../api/firebase"
import { getUserData, postUserData } from '../api/users';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userData, setUserData] = useState(null);
    const [toastType, setToastType] = useState({
        open: false,
    });


    const signup = async (email, password, displayName) => {
        try {
            const res = await app.auth().createUserWithEmailAndPassword(email, password)

            const user = res.user;

            user.updateProfile({
                displayName: displayName
            })

            const formattedUser = {
                ...user,
                displayName: displayName
            }
            try {
                postUserData(formattedUser)
            } catch (err) {
                console.log("error posting user data: ", err)
            }

            setToastType({
                open: true,
                message: `Welcome, ${displayName}.`,
                type: 'success',
            });
        } catch (err) {
            setToastType({
                open: true,
                message: err.message,
                type: 'error',
            });
        }
    }


    const login = async (email, password) => {
        try {
            const res = await app.auth().signInWithEmailAndPassword(email, password)
            const user = res.user;

            setToastType({
                open: true,
                message: `Welcome back, ${user.displayName}.`,
                type: 'success',
            });
        }
        catch (err) {
            setToastType({
                open: true,
                message: err.message,
                type: 'error',
            });
            await logout()
        }
    }


    const logout = async () => {
        await app.auth().signOut();
    }

    // const googleSignin = async () => {
    //     let provider = new firebase.auth.GoogleAuthProvider()
    //     return app.auth().signInWithPopup(provider)
    // }

    const resetPassword = (email) => {
        return app.auth().sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = app.auth().onAuthStateChanged(async user => {
            if (user) {
                //for now I am saving every data about the user...
                setIsLoggedIn(true)
                localStorage.setItem("accessToken", JSON.stringify(user))

                //get the userData
                try {
                    const userData = await getUserData(user.uid)
                    setUserData(userData)
                } catch (error) {
                    alert("error getting user data :", error)
                }


            } else {
                setUserData(null)
                setIsLoggedIn(false)
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
                login,
                logout,
                resetPassword,

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthProvider, AuthConsumer };
