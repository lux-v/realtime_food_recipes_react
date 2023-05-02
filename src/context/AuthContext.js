import { createContext, useEffect, useState } from 'react';
import app from "../api/firebase"

import { postUserData } from '../api/users';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const [userData, setUserData] = useState(null);
    const [toastType, setToastType] = useState({
        open: false,
    });

    const [modalType, setModalType] = useState({
        openModal: false,
    });


    const signup = async (email, password, displayName) => {
        try {
            const res = await app.auth().createUserWithEmailAndPassword(email, password)
            const user = res.user;

            user.updateProfile({
                displayName: displayName
            })

            try {
                //create DB entry for the user
                postUserData(user.uid)
            } catch (err) {
                console.log("Error posting user data: ", err)
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

    const updateUserProfile = async (newUserData) => {
        const currentUser = app.auth().currentUser;

        //only display name and the imageURL - defined by Firebase
        await currentUser.updateProfile(newUserData)
            .then(async res => {

            })
            .catch(err => { throw err })
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
                setUserData(user)
                setIsLoggedIn(true)
                localStorage.setItem("accessToken", JSON.stringify(user))
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
                toastType,
                setToastType,
                signup,
                login,
                logout,
                resetPassword,
                updateUserProfile,

                isSidebarOpen,
                setIsSidebarOpen,

                modalType,
                setModalType

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthProvider, AuthConsumer };
