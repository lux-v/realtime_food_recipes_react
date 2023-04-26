import React, { useContext, useEffect, useState } from 'react'
import { getRecipeData } from '../api/recipes'
import { AuthContext } from '../context/AuthContext'

const useFetchRecipe = (recipeId) => {
    const [recipe, setRecipe] = useState(null)
    const { setToastType } = useContext(AuthContext)

    const fetchRecipe = async (recipeId) => {
        try {
            const recipesData = await getRecipeData(recipeId)
            setRecipe(recipesData)

        } catch (error) {
            setToastType({
                open: true,
                message: error.message,
                type: 'error',
            });
        }
    }

    useEffect(() => {
        recipeId &&
            fetchRecipe(recipeId)
    }, [recipeId])

    return recipe;
}

export default useFetchRecipe


