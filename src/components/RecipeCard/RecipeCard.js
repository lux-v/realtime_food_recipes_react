import React, { useContext } from "react";

import useCheckImage from "../../hooks/useCheckImage";
import { AuthContext } from "../../context/AuthContext";
import { useRecipeLike } from "../../hooks/useRecipeLike";

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
  AddFavorite,
  BottomTextWrapper,
  RecipeCategory,
} from "./RecipeCardStyle";

import Chip from "../Chip/Chip";
import RecipeImagePlaceholder from "../../assets/img/recipe-image-placeholder.png";

const RecipeCard = ({ onClick, recipe }) => {
  const { userData } = useContext(AuthContext);
  const imageSrc = useCheckImage(recipe.imgUrl, RecipeImagePlaceholder);
  const { isLikedByUser, handleLikeRecipe } = useRecipeLike(recipe, userData);

  console.log("recipe: ", recipe);

  return (
    <RecipieCardWrapper onClick={onClick}>
      <ImageWrapper>
        <RecipeImage src={imageSrc} />
      </ImageWrapper>
      <TextWrapper>
        <NameFavoritesWrapper>
          <RecipeName className="RecipeName">{recipe.name}</RecipeName>
          <FavoriteIconWrapper>
            <AddFavorite
              onClick={(e) => handleLikeRecipe(e)}
              isfavorite={isLikedByUser}
            />
          </FavoriteIconWrapper>
        </NameFavoritesWrapper>
        <RecipeDescription>{recipe.description}</RecipeDescription>

        <RecipeIngredientsWrapper>
          {recipe &&
            recipe.ingredients.map((ingredient, index) => {
              return <Chip key={index} name={ingredient} />;
            })}
        </RecipeIngredientsWrapper>
        {recipe?.cookTimeMin && (
          <BottomTextWrapper>
            <RecipeCategory>{recipe.category}</RecipeCategory>
            <CookTimeWrapper>
              <CookTime />
              <CookTimeLabel>
                {recipe.cookTimeMin}
                <span style={{ fontSize: "10px" }}>(min)</span>
              </CookTimeLabel>
            </CookTimeWrapper>
          </BottomTextWrapper>
        )}
      </TextWrapper>
    </RecipieCardWrapper>
  );
};

export default RecipeCard;
