import React from 'react'
import useCheckImage from '../../hooks/useCheckImage';


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

import Chip from '../Chip/Chip';
import RecipeImagePlaceholder from '../../assets/img/recipe-image-placeholder.png';


const RecipeCard = ({ onClick, recipe }) => {
    const imageSrc = useCheckImage(recipe.imgUrl, RecipeImagePlaceholder);

    return (
        <RecipieCardWrapper onClick={onClick}>
            <ImageWrapper>
                <RecipeImage src={imageSrc} />
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
                    {recipe && recipe.ingredients.map((ingredient, index) => {
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