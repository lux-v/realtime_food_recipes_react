import React, { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useCheckImage from "../../hooks/useCheckImage";
import { useRecipeLike } from "../../hooks/useRecipeLike";
import useFetchUser from "../../hooks/useFetchUser";

import {
  LeftSideWrapper,
  LoadingSpinnerWrapper,
  RecipeImg,
  SectionWrapper,
  TopSideWrapper,
  RightSideWrapper,
  SectionHeadline,
  TextContent,
  IngredientsWrapper,
  BottomSideWrapper,
  RecipeWrapper,
  RecipeLikesWrapper,
  LikesNumber,
  RecipeNameWrapper,
} from "./RecipeStyle";
import {
  AddFavorite,
  FavoriteIconWrapper,
} from "../../components/RecipeCard/RecipeCardStyle";

import Layout from "../../components/Layout/Layout";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Button/Button";
import Chip from "../../components/Chip/Chip";

import RecipeImagePlaceholder from "../../assets/img/recipe-image-placeholder.png";
import useFetchRecipe from "../../hooks/useFetchRecipe";
import Card from "../../components/Card/Card";

import { ReactComponent as PrinterIcon } from "../../assets/icons/printer.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/facebook.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/twitter.svg";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { useReactToPrint } from "react-to-print";
import { ProfileImg } from "../../components/Layout/Header/HeaderStyle";

import profileImg from "../../assets/img/profile.svg";
import { TwoInRow } from "../../lib/style/generalStyles";

const Recipe = () => {
  const navigate = useNavigate();
  const recipeId = useParams().id;
  const { userData } = useContext(AuthContext);
  const recipe = useFetchRecipe(recipeId);
  const recipeOwnerDetails = useFetchUser(recipe);
  const componentRef = React.useRef();

  const { isLikedByUser, recipeLikes, handleLikeRecipe } = useRecipeLike(
    recipe,
    userData
  );
  const imageSrc = useCheckImage(recipe?.imgUrl || "", RecipeImagePlaceholder);
  const isOwner = useMemo(() => {
    return userData?.uid === recipe?.createdBy || userData?.isAdmin;
  }, [recipe, userData]);
  const isMobileDevice = localStorage.getItem("isMobileDevice") === "true";

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const profileImgSrc = useCheckImage(
    recipeOwnerDetails?.user?.photoURL,
    profileImg
  );

  const recipeDate = useMemo(() => {
    if (recipe?.createdAt === undefined && recipe?.updatedAt === undefined)
      return null;
    const timestamp = recipe?.updatedAt ? recipe.updatedAt : recipe?.createdAt;
    const date = new Date(timestamp.seconds * 1000);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const recipeDateFormatted = `${day} ${month} ${year}`;
    return recipeDateFormatted;
  }, [recipe?.createdAt, recipe?.updatedAt]);

  return (
    <Layout title="Recipe details">
      {recipe && recipeOwnerDetails?.user ? (
        <Card
          ref={componentRef}
          headingElements={[
            <Button callback={() => navigate(`update`)} isHidden={!isOwner}>
              Edit{" "}
            </Button>,
          ]}
        >
          <RecipeWrapper>
            <TopSideWrapper>
              <LeftSideWrapper>
                <RecipeNameWrapper>
                  <TextContent fontSize="42px">{recipe.name}</TextContent>
                  <RecipeLikesWrapper>
                    <LikesNumber>{recipeLikes}</LikesNumber>
                    <FavoriteIconWrapper>
                      <AddFavorite
                        onClick={(e) => handleLikeRecipe(e)}
                        isfavorite={isLikedByUser}
                      />
                    </FavoriteIconWrapper>
                  </RecipeLikesWrapper>
                </RecipeNameWrapper>
                <SectionWrapper>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <ProfileImg src={profileImgSrc} alt="profileImg" />
                    <div>
                      <TextContent>
                        By{" "}
                        <span style={{ fontWeight: "600" }}>
                          {recipeOwnerDetails?.user?.displayName || "-"}
                        </span>
                      </TextContent>
                      <p style={{ fontSize: "0.9rem" }}>
                        {recipe?.updatedAt
                          ? `Last updated at: ${recipeDate}`
                          : `Created at: ${recipeDate}`}
                      </p>
                    </div>
                  </div>
                </SectionWrapper>
                <SectionWrapper>
                  <SectionHeadline>Description</SectionHeadline>
                  <TextContent>{recipe.description}</TextContent>
                </SectionWrapper>
                <TwoInRow width="100%">
                  {recipe.cookTimeMin && (
                    <SectionWrapper>
                      <SectionHeadline>Cook time</SectionHeadline>
                      <TextContent>
                        {recipe.cookTimeMin > 1
                          ? `${recipe.cookTimeMin} minutes`
                          : `${recipe.cookTimeMin} minute`}
                      </TextContent>
                    </SectionWrapper>
                  )}
                  {recipe.servings && (
                    <SectionWrapper>
                      <SectionHeadline>Servings</SectionHeadline>
                      <TextContent>
                        {recipe.servings > 1
                          ? `${recipe.servings} servings`
                          : `${recipe.servings} serving`}
                      </TextContent>
                    </SectionWrapper>
                  )}
                </TwoInRow>
                <TwoInRow width="100%">
                  {recipe.category && recipe.category !== "Not defined" && (
                    <SectionWrapper>
                      <SectionHeadline>Category</SectionHeadline>
                      <TextContent>{recipe.category}</TextContent>
                    </SectionWrapper>
                  )}
                  {recipe.dietaryRestrictions &&
                    recipe.dietaryRestrictions !== "Not defined" && (
                      <SectionWrapper>
                        <SectionHeadline>Dietary restrictions</SectionHeadline>
                        <TextContent>{recipe.dietaryRestrictions}</TextContent>
                      </SectionWrapper>
                    )}
                </TwoInRow>
                <TwoInRow width="100%">
                  {recipe.cookingMethod &&
                    recipe.cookingMethod !== "Not defined" && (
                      <SectionWrapper>
                        <SectionHeadline>Cooking method</SectionHeadline>
                        <TextContent>{recipe.cookingMethod}</TextContent>
                      </SectionWrapper>
                    )}
                  {recipe.cuisine && recipe.cuisine !== "Not defined" && (
                    <SectionWrapper>
                      <SectionHeadline>Cuisine</SectionHeadline>
                      <TextContent>{recipe.cuisine}</TextContent>
                    </SectionWrapper>
                  )}
                </TwoInRow>
                <SectionWrapper>
                  <SectionHeadline>Ingredients</SectionHeadline>
                  <IngredientsWrapper>
                    {recipe &&
                      recipe?.ingredients &&
                      recipe?.ingredients.map((ingredient, index) => (
                        <Chip size="medium" key={index} name={ingredient} />
                      ))}
                  </IngredientsWrapper>
                </SectionWrapper>
                <SectionWrapper>
                  <SectionHeadline>Share recipe</SectionHeadline>
                  {!isMobileDevice && (
                    <PrinterIcon
                      style={{ cursor: "pointer" }}
                      onClick={handlePrint}
                    />
                  )}
                  <FacebookShareButton
                    url={window.location.href}
                    quote={recipe.name}
                    hashtag="#recipes"
                  >
                    <FacebookIcon
                      style={{ cursor: "pointer", stroke: "#2374E1" }}
                    />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    title={recipe.name}
                    hashtags={["recipes"]}
                  >
                    <TwitterIcon
                      style={{
                        cursor: "pointer",
                        stroke: "#179CF0",
                        color: "#179CF0",
                      }}
                    />
                  </TwitterShareButton>
                </SectionWrapper>
              </LeftSideWrapper>
              <RightSideWrapper>
                <RecipeImg src={imageSrc} />
              </RightSideWrapper>
            </TopSideWrapper>

            {recipe && recipe?.steps
              ? recipe.steps.length > 0 && (
                  <BottomSideWrapper>
                    {recipe?.steps.map((step, index) => (
                      <SectionWrapper key={index}>
                        <SectionHeadline secondary>
                          Step {index + 1}
                        </SectionHeadline>
                        <TextContent secondary>{step}</TextContent>
                      </SectionWrapper>
                    ))}
                  </BottomSideWrapper>
                )
              : null}
          </RecipeWrapper>
        </Card>
      ) : (
        <LoadingSpinnerWrapper>
          <LoadingSpinner size="120px" />
        </LoadingSpinnerWrapper>
      )}
    </Layout>
  );
};

export default Recipe;
