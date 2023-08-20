import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RecipeName } from '../../pages/Recipe/RecipeStyle'
import { MostPopularRecipeName, RecipeNameWrapper } from './MostPopularRecipeStyle'

const MostPopularRecipe = ({
    mostPopularRecipe,
}) => {
    const navigate = useNavigate()

    return (
        <div
            style={{ width: "100%", height: "auto", cursor: "pointer" }}
            onClick={() => navigate(`/recipes/${mostPopularRecipe.id}`)}
        >
            <div style={{ position: "relative" }}>
                <img src={mostPopularRecipe.imgUrl} alt={mostPopularRecipe.name} style={{ width: "100%", height: "100%", maxHeight: "500px", aspectRatio: "1/1", objectFit: "cover" }} />
            </div>
            <RecipeNameWrapper>
                <MostPopularRecipeName>
                    {mostPopularRecipe.name}
                </MostPopularRecipeName>

            </RecipeNameWrapper>
        </div>)
}

export default MostPopularRecipe