import React from 'react'

import Chip from '../Chip/Chip';
import {
    RecipeDescription,
    RecipeName,
    RecipeIngredientsWrapper,
    RecipieCardWrapper,
    ImageWrapper,
    RecipeImage,
    TextWrapper,
    NameFavoritesWrapper,
    FavoriteIconWrapper,
    CookTimeWrapper,
    CookTimeIcon,
    CookTimeLabel,
    AddFavorite
} from './RecipeCardStyle';


import RecipeImagePlaceholder from '../../assets/img/recipe-image-placeholder.png';
import ClockIcon from '../../assets/img/clock-icon.png';



const RecipeCard = ({ recipe }) => {
    const recipeImage = recipe.imgUrl != "" ? recipe.imgUrl : RecipeImagePlaceholder

    return (
        <RecipieCardWrapper>
            <ImageWrapper>
                <RecipeImage src={recipeImage} />
            </ImageWrapper>
            <TextWrapper>
                <NameFavoritesWrapper>
                    <RecipeName className='RecipeName' >{recipe.name}</RecipeName>
                    <FavoriteIconWrapper>
                        <AddFavorite />
                    </FavoriteIconWrapper>

                </NameFavoritesWrapper>
                <RecipeDescription>{recipe.description}</RecipeDescription>

                <RecipeIngredientsWrapper>
                    {recipe.ingredients.slice(0, 10).map((ingredient, index) => {
                        return <Chip key={index} name={ingredient} type="error" />
                    })}
                </RecipeIngredientsWrapper>
                <CookTimeWrapper>
                    <CookTimeIcon src={ClockIcon} />
                    <CookTimeLabel>{recipe.cookTimeMin}</CookTimeLabel>
                </CookTimeWrapper>
            </TextWrapper>

        </RecipieCardWrapper>
    )
}

export default RecipeCard