import React from 'react'
import { colors } from '../../lib/style/theme'

import RecipeImagePlaceholder from '../../assets/img/logo.png';
import { RecipeDescription, RecipeName, RecipeIngredientsWrapper, RecipieCardWrapper, ImageWrapper, RecipeImage, TextWrapper } from './RecipeCardStyle';
import Chip from '../Chip/Chip';




const RecipeCard = ({ recipe }) => {
    console.log("recipe: ", recipe)

    const recipeImage = recipe.pictureUrl != "" ? recipe.pictureUrl : RecipeImagePlaceholder

    return (
        <RecipieCardWrapper>
            <ImageWrapper>
                <RecipeImage src={recipeImage} />
            </ImageWrapper>
            <TextWrapper>
                <RecipeName className='RecipeName' >{recipe.name}</RecipeName>
                <RecipeDescription>{recipe.description}</RecipeDescription>

                <RecipeIngredientsWrapper>
                    {recipe.ingredients.map(ingredient => {
                        return <Chip key={ingredient} name={ingredient} type="error" />
                    })}
                </RecipeIngredientsWrapper>
            </TextWrapper>

        </RecipieCardWrapper>
    )
}

export default RecipeCard