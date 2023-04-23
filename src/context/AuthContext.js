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
        try {
            const res = await app.auth().createUserWithEmailAndPassword(email, password)

            const user = res.user;
            const updatedUser = await user.updateProfile({
                displayName: displayName
            })

            createUser(updatedUser)

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


    const createUser = async (formattedUser) => {
        return app.firestore().collection("users").doc(formattedUser.uid).set({
            email: formattedUser.email,
            displayName: formattedUser.displayName,

        })
    }


    const resetPassword = (email) => {
        return app.auth().sendPasswordResetEmail(email)
    }


    const getUserData = async (uid) => {
        const user = await app.firestore().collection("users").doc(uid).get()

        if (user.exists)
            return user.data()

        return null
    }


    const getAllUserData = async () => {
        const users = await app.firestore().collection("users").get()

        if (users.size > 0) {
            const usersList = [];
            users.docs.forEach(user => {
                usersList.push(user.data())

            });
            return usersList
        }

        return null
    }


    useEffect(() => {
        const unsubscribe = app.auth().onAuthStateChanged(async user => {
            if (user) {

                //for now I am saving every data about the user...
                setIsLoggedIn(true)
                localStorage.setItem("accessToken", JSON.stringify(user))

                //get the userData
                const userData = await getUserData(user.uid)
                setUserData(userData)


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
