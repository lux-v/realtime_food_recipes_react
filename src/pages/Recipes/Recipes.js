import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
// import { recipes } from '../../lib/mock'
import { LoadingSpinnerWrapper, RecipesWrapper } from './RecipesStyle'
import { getAllRecipesData } from '../../api/recipes'
import { AuthContext } from '../../context/AuthContext'

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Button from '../../components/Button/Button';


const Recipes = () => {
    const navigate = useNavigate()

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
            elements={
                <>
                    <Button callback={() => navigate("/recipes/add-new")}>Add new +</Button>
                </>
            }
        >
            {recipes != null ?
                <RecipesWrapper>
                    {
                        recipes.map(recipe => {
                            return <RecipeCard onClick={() => navigate(`/recipes/${recipe.id}`)} key={recipe.id} recipe={recipe} />
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