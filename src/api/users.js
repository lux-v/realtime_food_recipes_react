import app from "./firebase"

export const postUserData = async (uid) => {
    return app.firestore().collection("users").doc(uid).set({

    }).catch(error => {
        console.log("Error posting user data: ", error);
        throw error;
    });
}
export const putUserData = async (user) => {
    return app.firestore().collection("users").doc(user.uid).set({


    }).catch(error => {
        console.log("Error updating user data: ", error);
        throw error;
    });
}

export const getUserData = async (uid) => {
    return app.firestore().collection("users").doc(uid).get().then(res => {
        if (res.exists)
            return res.data()

        return []
    }).catch(error => {
        console.log("Error getting user data: ", error)
        throw error;
    })
}


export const getAllUsersData = async () => {
    await app.firestore().collection("users").get().then(res => {
        const usersList = [];

        if (res.size > 0) {
            res.docs.forEach(user => {
                usersList.push(user.data())
            });
        }

        return usersList
    }).catch(error => {
        console.log("Error getting all users data: ", error)
        throw error;
    })
}