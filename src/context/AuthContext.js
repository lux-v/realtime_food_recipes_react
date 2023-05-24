import { createContext, useEffect, useState } from 'react';
import firebase from "../api/firebase"

import { postUserData, putUserData } from '../api/users';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(!!JSON.parse(localStorage.getItem('accessToken')));

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const [userData, setUserData] = useState(null);

    const [presetColor, setPresetColor] = useState(localStorage.getItem('presetColor') || 'theme1');
    const [toastType, setToastType] = useState({
        open: false,
    });

    const signup = async (email, password, displayName) => {
        try {
            const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
            const user = res.user;

            user.updateProfile({
                displayName: displayName
            })

            try {
                //create DB entry for the user
                postUserData(user, displayName)
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
            const res = await firebase.auth().signInWithEmailAndPassword(email, password)
            const user = res.user;

            setToastType({
                open: true,
                message: <p>Welcome back, <span style={{ fontWeight: "600" }}>{user.displayName}</span>.</p>,
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
        await firebase.auth().signOut();

    }

    const updateUserProfile = async (newUserData) => {
        const currentUser = firebase.auth().currentUser;
        const userUid = currentUser.uid

        //only display name and the imageURL - defined by Firebase
        await currentUser.updateProfile(newUserData)
            .then(res => {
                putUserData({ ...newUserData, uid: userUid })
            })
            .catch(err => { throw err })
    }


    // const googleSignin = async () => {
    //     let provider = new firebase.auth.GoogleAuthProvider()
    //     return firebase.auth().signInWithPopup(provider)
    // }

    const resetPassword = (email) => {
        return firebase.auth().sendPasswordResetEmail(email)
    }

    useEffect(() => {
        localStorage.setItem('presetColor', presetColor)

    }, [presetColor])

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
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


                presetColor,
                setPresetColor,

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthProvider, AuthConsumer };
