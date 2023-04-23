import React from 'react'
import Layout from '../../components/Layout/Layout'
import RecipieCard from '../../components/RecipeCard/RecipeCard'
import { recipes } from '../../lib/mock'
import { RecipiesWrapper } from './RecipiesStyle'

const Recipies = () => {
    return (
        <Layout
            title="Recipies"
        >
            <RecipiesWrapper>
                {
                    recipes.map(recipie => {
                        return <RecipieCard key={recipie.id} recipe={recipie} />
                    })
                }
            </RecipiesWrapper>
        </Layout>
    )
}

export default Recipies