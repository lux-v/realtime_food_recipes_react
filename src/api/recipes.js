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