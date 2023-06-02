import {
  firestore,
  arrayRemove,
  arrayUnion,
  query,
  startAt,
  endAt,
} from "./firebase";

export const getAllRecipesData = async (pagination) => {
  return firestore()
    .collection("recipes")
    .get()
    .then((res) => {
      let recipesList = [];
      if (res.size > 0) {
        res.docs.forEach((recipe) => {
          recipesList.push({ id: recipe.id, ...recipe.data() });
        });
      }

      return recipesList;
    })
    .catch((error) => {
      console.log("Error getting recipes data: ", error);
      throw error;
    });
};

export const getRecipeData = async (recipeId) => {
  return firestore()
    .collection("recipes")
    .doc(recipeId)
    .get()
    .then((recipeData) => {
      const formattedRecipe = { ...recipeData.data(), id: recipeId };
      return recipeData.exists ? formattedRecipe : {};
    })
    .catch((error) => {
      console.log("Error getting recipe data: ", error);
      throw error;
    });
};

export const postRecipeData = async (recipe) => {
  const recipeRef = firestore().collection("recipes").doc();
  return recipeRef
    .set({
      ...recipe,
    })
    .then(() => {
      return recipeRef.id;
    })
    .catch((error) => {
      console.log("Error posting recipe data: ", error);
      throw error;
    });
};

export const putRecipeData = async (recipe, recipeId) => {
  return firestore()
    .collection("recipes")
    .doc(recipeId)
    .update(recipe)
    .catch((error) => {
      console.log("Error posting recipe data: ", error);
      throw error;
    });
};

export const deleteRecipe = async (recipeId) => {
  return firestore()
    .collection("recipes")
    .doc(recipeId)
    .delete()
    .catch((error) => {
      console.log("Error deleting recipe: ", error);
      throw error;
    });
};

export const addRemoveLikedBy = async (userId, recipeId, isLikedByUser) => {
  const action = isLikedByUser
    ? firestore()
        .collection("recipes")
        .doc(recipeId)
        .update({ likedBy: arrayRemove(userId) })
    : firestore()
        .collection("recipes")
        .doc(recipeId)
        .update({ likedBy: arrayUnion(userId) });

  action.catch((error) => {
    console.log("Error updating recipe likedBy: ", error);
    throw error;
  });
};
