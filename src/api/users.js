import { firestore, arrayUnion, arrayRemove } from "./firebase"

export const postUserData = async (uid) => {
    return firestore().collection("users").doc(uid).set({
        likedRecipes: [],
        myRecipes: [],


    }).catch(error => {
        console.log("Error posting user data: ", error);
        throw error;
    });
}
export const putUserData = async (user) => {
    return firestore().collection("users").doc(user.uid).update({


    }).catch(error => {
        console.log("Error updating user data: ", error);
        throw error;
    });
}



// export const addRemoveLikedRecipe = async (userId, recipeId, isAdd) => {
//     const action = isAdd ?
//         firestore().collection("users").doc(userId).update({ likedRecipes: arrayUnion(recipeId) })
//         :
//         firestore().collection("users").doc(userId).update({ likedRecipes: arrayRemove(recipeId) })

//     action.catch(error => {
//         console.log("Error updating user data: ", error);
//         throw error;
//     });
// }


export const getUserData = async (uid) => {
    return await firestore().collection("users").doc(uid).get().then(res => {
        return res.exists ? res.data() : {}

    }).catch(error => {
        console.log("Error getting user data: ", error)
        throw error;
    })
}


export const getAllUsersData = async () => {
    await firestore().collection("users").get().then(res => {

        // --------- DON'T DELETE THIS, it is NOT tested with using reducer---------
        // const usersList = [];
        if (res.size > 0) {
            return res.docs.reduce((acc, currentUser) => {
                return acc.push(currentUser.data())
            }, [])
            // res.docs.forEach(user => {
            //     usersList.push(user.data())
            // });
        }
        // return usersList
        // ------------------------------------------------------------------------
    }).catch(error => {
        console.log("Error getting all users data: ", error)
        throw error;
    })
}