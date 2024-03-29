import React, { useContext, useEffect, useMemo } from "react";
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
} from "./RecipeDetailStyle";
import {
  AddFavorite,
  CommentIcon,
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

import { ReactComponent as PrinterIcon } from "../../assets/icons/printer.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/facebook.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/twitter.svg";
import { FacebookShareButton, TwitterShareButton } from "react-share";

const RecipeDetail = () => {
  const navigate = useNavigate();
  const recipeId = useParams().id;
  const { userData } = useContext(AuthContext);
  const fetchedRecipe = useFetchRecipe(recipeId);
  const [recipe, setRecipe] = React.useState(fetchedRecipe);

  const recipeOwnerDetails = useFetchUser(recipe);
  const componentRef = React.useRef();
  const commentSectionRef = React.useRef(null);

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

  const scrollToRef = (ref) => {
    if (isMobileDevice) {
      window.scrollTo(0, ref.current.offsetTop);
    } else {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setRecipe(fetchedRecipe);
  }, [fetchedRecipe]);


  return (
    <Layout title="Recipe Detail">
      {recipe === null ? (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      ) : (
        <div ref={componentRef}>
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
                  <div>
                    <ProfileImg
                      src={profileImgSrc}
                      alt="profileImg"
                      style={{ width: "50px", height: "50px" }}
                    />

                    <TextContent>
                      By{" "}
                      <span style={{ fontWeight: "600" }}>
                        {recipeOwnerDetails?.user?.displayName || "-"}
                      </span>
                    </TextContent>
                    <p style={{ fontSize: "0.9rem" }}>
                      {recipe?.updatedAt
                        ? `Last updated at: `
                        : `Created at: `}
                      {recipeDate}
                    </p>
                  </div>

                  <div style={{ marginLeft: "auto" }}>
                    {isRecipeOwner && (
                      <Button
                        callback={() => navigate(`update`)}
                        height={"30px"}
                        isSecondary
                      >
                        Edit this recipe
                      </Button>
                    )}
                  </div>
                </div>
                <RecipeNameWrapper>
                  <RecipeName>
                    {/* primjer da se može JS koristit unutar HTMLa */}
                    {recipe.name.split(" ").map((word, index) => {
                      return <RecipeSpan key={index}>{word}</RecipeSpan>;
                    })}
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
                <RecipeImgWrapper>
                  <RecipeImg src={imageSrc} />
                </RecipeImgWrapper>
              </RightSideWrapper>
            </SummaryAndImageWrapper>

            <ButtonsAndDescriptionWrapper>
              <LeftSideWrapper style={{ background: "white" }}>
                <LikeCommentButtonWrapper>
                  <Button
                    callback={handleLikeRecipe}
                    style={{ marginBottom: "20px" }}
                  >
                    <AddFavorite isfavorite={isLikedByUser} />
                    {isLikedByUser ? "Unsave" : "Save"}
                  </Button>
                  <Button
                    isTertiary
                    callback={() => scrollToRef(commentSectionRef)}
                    style={{ marginBottom: "20px" }}
                  >
                    <CommentIcon />
                    Comment this recipe
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
        </div>
      )}
    </Layout>
  );
};

export default RecipeDetail;
