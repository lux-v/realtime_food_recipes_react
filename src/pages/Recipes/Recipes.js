import React from 'react'
import Layout from '../../components/Layout/Layout'
import RecipieCard from '../../components/RecipeCard/RecipeCard'
import { recipes } from '../../lib/mock'
import { RecipesWrapper } from './RecipesStyle'

const Recipes = () => {
    return (
        <Layout
            title="Recipes"
        >
            <RecipesWrapper>
                {
                    recipes.map(recipie => {
                        return <RecipieCard key={recipie.id} recipe={recipie} />
                    })
                }
            </RecipesWrapper>
        </Layout>
    )
}

export default Recipes