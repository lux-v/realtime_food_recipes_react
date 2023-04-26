import app from "./firebase";

export const getAllRecipesData = async () => {
    return app.firestore().collection("recipes").get().then(res => {
        let recipesList = [];
        if (res.size > 0) {
            res.docs.forEach(recipe => {
                recipesList.push({ id: recipe.id, ...recipe.data() })
            });
        }

        return recipesList
    }).catch(error => {
        console.log("Error getting recipes data: ", error);
        throw error;
    })
}

export const getRecipeData = async (uid) => {
    return app.firestore().collection("recipes").doc(uid).get().then(res => {

        if (res.exists)
            return res.data()

        return []
    }).catch(error => {
        console.log("Error getting recipe data: ", error);
        throw error;
    })
}


export const postRecipeData = async (recipe) => {
    const recipeRef = app.firestore().collection("recipes").doc()
    return recipeRef.set({
        ...recipe
    }).then(() => { return recipeRef.id }).catch(error => {
        console.log("Error posting recipe data: ", error);
        throw error;
    });
}

export const putRecipeData = async (recipe, recipeId) => {
    return app.firestore().collection("recipes").doc(recipeId).update({
        ...recipe
    }).catch(error => {
        console.log("Error posting recipe data: ", error);
        throw error;
    });
}



export const deleteRecipe = async (recipeId) => {
    return app.firestore().collection("recipes").doc(recipeId).delete().catch(error => {
        console.log("Error deleting recipe: ", error);
        throw error;
    });
}

