import React, { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
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
  LikesNumber,
  RecipeNameWrapper,
  RecipeName,
  RecipeSpan,
  RecipeDetailsWrapper,
  RecipeDetailItem,
  RecipeDescriptionWrapper,
  RecipeImgWrapper,
  LikeCommentButtonWrapper,
  SummaryAndImageWrapper,
  ButtonsAndDescriptionWrapper,
  IngredientsAndStepsWrapper,
} from "./RecipeNewStyle";
import {
  AddFavorite,
  FavoriteIconWrapper,
  ServingsIcon,
} from "../../components/RecipeCard/RecipeCardStyle";

import Layout from "../../components/Layout/Layout";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Button/Button";
import Chip from "../../components/Chip/Chip";
import CommentSection from "../../components/CommentSection/CommentSection";

import RecipeImagePlaceholder from "../../assets/img/recipe-image-placeholder.png";
import useFetchRecipe from "../../hooks/useFetchRecipe";

import { useReactToPrint } from "react-to-print";
import { ProfileImg } from "../../components/Layout/Header/HeaderStyle";
import profileImg from "../../assets/img/profile.svg";
import { CookTime } from "../../components/RecipeCard/RecipeCardStyle";

const RecipeNew = () => {
  const recipeId = useParams().id;
  const { userData } = useContext(AuthContext);
  const fetchedRecipe = useFetchRecipe(recipeId);
  const [recipe, setRecipe] = React.useState(fetchedRecipe);

  const recipeOwnerDetails = useFetchUser(recipe);
  const componentRef = React.useRef();

  const { isLikedByUser, recipeLikes, handleLikeRecipe } = useRecipeLike(
    recipe,
    userData
  );
  const imageSrc = useCheckImage(recipe?.imgUrl || "", RecipeImagePlaceholder);
  const isRecipeOwner = useMemo(() => {
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

  useEffect(() => {
    setRecipe(fetchedRecipe);
  }, [fetchedRecipe]);

  const commentSectionRef = React.useRef(null);

  const scrollToRef = (ref) => {
    console.log("ref: ", ref);
    if (isMobileDevice) {
      window.scrollTo(0, ref.current.offsetTop);
    } else {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout title="Recipe">
      {recipe === null ? (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      ) : (
        <>
          <TopSideWrapper>
            <SummaryAndImageWrapper>
              <LeftSideWrapper>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    paddingBottom: "20px",
                    alignItems: "center",
                  }}
                >
                  <ProfileImg
                    src={profileImgSrc}
                    alt="profileImg"
                    style={{ width: "50px", height: "50px" }}
                  />
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
                <RecipeNameWrapper>
                  <RecipeName>
                    {/* <RecipeSpan> */}
                    {recipe.name.split(" ").map((word, index) => {
                      return <RecipeSpan key={index}>{word}</RecipeSpan>;
                    })}
                    {/* </RecipeSpan> */}
                  </RecipeName>
                </RecipeNameWrapper>

                <RecipeDetailsWrapper>
                  {recipe?.servings && (
                    <RecipeDetailItem>
                      <ServingsIcon />
                      <p>
                        {recipe.servings}{" "}
                        {recipe.servings >= "1" ? "persons" : "person"}
                      </p>
                    </RecipeDetailItem>
                  )}
                  <RecipeDetailItem
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <CookTime />
                    <p>{recipe.cookTimeMin} minutes</p>
                  </RecipeDetailItem>
                  <RecipeDetailItem
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <LikesNumber>{recipeLikes}</LikesNumber>
                    <FavoriteIconWrapper>
                      <AddFavorite
                        onClick={handleLikeRecipe}
                        isfavorite={isLikedByUser}
                      />
                    </FavoriteIconWrapper>
                  </RecipeDetailItem>
                </RecipeDetailsWrapper>

                <RecipeDetailsWrapper>
                  {recipe?.category && (
                    <RecipeDetailItem>
                      <Chip size="medium" name={recipe.category} />
                    </RecipeDetailItem>
                  )}
                  {recipe?.cuisine && (
                    <RecipeDetailItem>
                      <Chip size="medium" name={recipe.cuisine} />
                    </RecipeDetailItem>
                  )}
                </RecipeDetailsWrapper>
              </LeftSideWrapper>

              <RightSideWrapper>
                <RecipeImgWrapper>
                  <RecipeImg src={imageSrc} />
                </RecipeImgWrapper>
              </RightSideWrapper>
            </SummaryAndImageWrapper>

            <ButtonsAndDescriptionWrapper>
              <LeftSideWrapper style={{ background: "white" }}>
                <LikeCommentButtonWrapper>
                  <Button
                    isSecondary={!isLikedByUser}
                    callback={handleLikeRecipe}
                    style={{ marginBottom: "20px" }}
                  >
                    {isLikedByUser ? "Unsave" : "Save"}
                  </Button>
                  <Button
                    callback={() => scrollToRef(commentSectionRef)}
                    style={{ marginBottom: "20px" }}
                  >
                    Comment
                  </Button>
                </LikeCommentButtonWrapper>
              </LeftSideWrapper>

              <RightSideWrapper style={{ color: "white" }}>
                <RecipeDescriptionWrapper>
                  <p>{recipe.description}</p>
                </RecipeDescriptionWrapper>
              </RightSideWrapper>
            </ButtonsAndDescriptionWrapper>
          </TopSideWrapper>

          <BottomSideWrapper style={{ background: "unset" }}>
            <IngredientsAndStepsWrapper>
              <LeftSideWrapper style={{ padding: "0" }}>
                <SectionWrapper>
                  <SectionHeadline>Ingredients</SectionHeadline>
                  <IngredientsWrapper>
                    {recipe?.ingredients &&
                      recipe?.ingredients.map((ingredient, index) => (
                        <Chip
                          size="medium"
                          key={index}
                          name={ingredient}
                          style={{ padding: "4px", height: "unset" }}
                        />
                      ))}
                  </IngredientsWrapper>
                </SectionWrapper>
              </LeftSideWrapper>

              <RightSideWrapper style={{ color: "white" }}>
                {recipe?.steps?.length > 0 && (
                  <>
                    <SectionHeadline>Preperation</SectionHeadline>
                    {recipe?.steps?.map((step, index) => {
                      return (
                        <SectionWrapper key={index}>
                          <SectionHeadline>Step {index + 1}</SectionHeadline>
                          <TextContent>{step}</TextContent>
                        </SectionWrapper>
                      );
                    })}
                  </>
                )}
              </RightSideWrapper>
            </IngredientsAndStepsWrapper>

            <div
              style={{
                background: "#fffff",
                borderRadius: "8px",
                width: "100%",
              }}
            >
              <CommentSection
                ref={commentSectionRef}
                recipe={recipe}
                recipeOwner={recipeOwnerDetails}
                setRecipe={setRecipe}
              />
            </div>
          </BottomSideWrapper>
        </>
      )}
    </Layout>
  );
};

export default RecipeNew;
