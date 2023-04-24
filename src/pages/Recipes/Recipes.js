import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
// import { recipes } from '../../lib/mock'
import { LoadingSpinnerWrapper, RecipesWrapper } from './RecipesStyle'
import { getAllRecipesData } from '../../api/recipes'
import { AuthContext } from '../../context/AuthContext'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'

const Recipes = () => {
    const [recipes, setRecipes] = useState(null)
    const { setToastType } = useContext(AuthContext)


    // moze se odvojit u hook
    const fetchRecipes = async () => {
        try {
            const recipesData = await getAllRecipesData()
            setRecipes(recipesData)

        } catch (error) {
            setToastType({
                open: true,
                message: error.message,
                type: 'error',
            });
        }
    }

    useEffect(() => {
        fetchRecipes()
    }, [])


    return (
        <Layout
            title="Recipes"
        >
            {recipes != null ?
                <RecipesWrapper>
                    {
                        recipes.map(recipe => {
                            return <RecipeCard key={recipe.id} recipe={recipe} />
                        })
                    }
                </RecipesWrapper>

                :
                <LoadingSpinnerWrapper>
                    <LoadingSpinner size="120px" />
                </LoadingSpinnerWrapper>

            }
        </Layout>
    )
}

export default Recipes