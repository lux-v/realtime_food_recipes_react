import React, { useState, useMemo, useContext } from 'react'

import useCheckImage from '../../hooks/useCheckImage';
import { AuthContext } from '../../context/AuthContext';
import { addRemoveLikedBy } from '../../api/recipes';

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
    const { userData } = useContext(AuthContext)
    const imageSrc = useCheckImage(recipe.imgUrl, RecipeImagePlaceholder);

    const [isLikedByUser, setIsLikedByUser] = useState(false)
    useMemo(() => { setIsLikedByUser(recipe?.likedBy?.includes(userData.uid) || false) }, [userData, recipe])


    const handleLikeRecipe = async (e) => {
        e.stopPropagation();

        try {
            await addRemoveLikedBy(userData.uid, recipe.id, isLikedByUser).then(async res => {
                setIsLikedByUser(!isLikedByUser)
            })
        } catch (error) {
            console.log("error:", error)
        }
    }

    return (
        <RecipieCardWrapper onClick={onClick}>
            <ImageWrapper>
                <RecipeImage src={imageSrc} />
            </ImageWrapper>
            <TextWrapper>
                <NameFavoritesWrapper>
                    <RecipeName className='RecipeName'>{recipe.name}</RecipeName>
                    <FavoriteIconWrapper>
                        <AddFavorite onClick={(e) => handleLikeRecipe(e)} isfavorite={isLikedByUser} />
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