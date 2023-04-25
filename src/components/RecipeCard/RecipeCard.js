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
    CookTime,
    CookTimeLabel,
    AddFavorite
} from './RecipeCardStyle';


import RecipeImagePlaceholder from '../../assets/img/recipe-image-placeholder.png';


const RecipeCard = ({ onClick, recipe }) => {
    const recipeImage = recipe.imgUrl ? recipe.imgUrl : RecipeImagePlaceholder

    return (
        <RecipieCardWrapper onClick={onClick}>
            <ImageWrapper>
                <RecipeImage src={recipeImage} />
            </ImageWrapper>
            <TextWrapper>
                <NameFavoritesWrapper>
                    <RecipeName className='RecipeName' >{recipe.name}</RecipeName>
                    <FavoriteIconWrapper>
                        <AddFavorite isfavorite={true} />
                    </FavoriteIconWrapper>

                </NameFavoritesWrapper>
                <RecipeDescription>{recipe.description}</RecipeDescription>

                <RecipeIngredientsWrapper>
                    {recipe.ingredients.slice(0, 10).map((ingredient, index) => {
                        return <Chip key={index} name={ingredient} type="error" />
                    })}
                </RecipeIngredientsWrapper>
                <CookTimeWrapper>
                    <CookTime />
                    <CookTimeLabel>{recipe.cookTimeMin}<span style={{ fontSize: "10px" }}>(min)</span></CookTimeLabel>
                </CookTimeWrapper>
            </TextWrapper>
        </RecipieCardWrapper>
    )
}

export default RecipeCard