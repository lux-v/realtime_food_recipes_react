import React, { useContext, useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import useCheckImage from '../../hooks/useCheckImage'
import { useRecipeLike } from '../../hooks/useRecipeLike'

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
    RecipeNameWrapper
} from './RecipeStyle'
import {
    AddFavorite,
    FavoriteIconWrapper
} from '../../components/RecipeCard/RecipeCardStyle'

import Layout from '../../components/Layout/Layout'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Button from '../../components/Button/Button';
import Chip from '../../components/Chip/Chip'

import RecipeImagePlaceholder from '../../assets/img/recipe-image-placeholder.png';
import useFetchRecipe from '../../hooks/useFetchRecipe'
import Card from '../../components/Card/Card'

import { ReactComponent as PrinterIcon } from '../../assets/icons/printer.svg'
import { ReactComponent as FacebookIcon } from '../../assets/icons/facebook.svg'
import { FacebookShareButton } from 'react-share'

const Recipe = () => {
    const navigate = useNavigate()
    const recipeId = useParams().id;
    const { userData } = useContext(AuthContext)
    const recipe = useFetchRecipe(recipeId)

    const { isLikedByUser, recipeLikes, handleLikeRecipe } = useRecipeLike(recipe, userData)
    const imageSrc = useCheckImage(recipe?.imgUrl || "", RecipeImagePlaceholder);
    const isOwner = useMemo(() => { return userData?.uid === recipe?.createdBy || userData?.isAdmin }, [recipe, userData])


    console.log("window.location.href", window.location.href)
    return (
        <Layout
            title="Recipe details"
        >
            {recipe ?
                <Card
                    headingElements={[
                        <Button callback={() => navigate(`update`)} isHidden={!isOwner}>Edit </Button>,
                        // <Button isTertiary callback={() => navigate(-1)}>Back</Button>

                    ]}
                >
                    <RecipeWrapper>
                        <TopSideWrapper >
                            <LeftSideWrapper>
                                <RecipeNameWrapper>
                                    <TextContent fontSize="42px">
                                        {recipe.name}
                                    </TextContent>
                                    <RecipeLikesWrapper>
                                        <LikesNumber>
                                            {recipeLikes}
                                        </LikesNumber>
                                        <FavoriteIconWrapper>
                                            <AddFavorite onClick={(e) => handleLikeRecipe(e)} isfavorite={isLikedByUser} />
                                        </FavoriteIconWrapper>
                                    </RecipeLikesWrapper>
                                </RecipeNameWrapper>
                                <SectionWrapper>
                                    <SectionHeadline>
                                        Description
                                    </SectionHeadline>
                                    <TextContent>
                                        {recipe.description}
                                    </TextContent>
                                </SectionWrapper>
                                <SectionWrapper>
                                    <SectionHeadline>
                                        Cook time
                                    </SectionHeadline>
                                    <TextContent>
                                        {recipe.cookTimeMin} min
                                    </TextContent>
                                </SectionWrapper>
                                <SectionWrapper>
                                    <SectionHeadline>
                                        Ingredients
                                    </SectionHeadline>
                                    <IngredientsWrapper>
                                        {recipe && recipe?.ingredients && recipe?.ingredients.map((ingredient, index) =>
                                            <Chip size="medium" key={index} name={ingredient} />
                                        )}
                                    </IngredientsWrapper>
                                </SectionWrapper>
                                <SectionWrapper>
                                    <SectionHeadline>
                                        Share recipe
                                    </SectionHeadline>
                                    <PrinterIcon style={{ cursor: "pointer" }} onClick={() => alert("Print")} />
                                 <FacebookShareButton    
                                        url={window.location.href}
                                        quote={recipe.name}
                                        hashtag="#recipes"
                                    >
                                        <FacebookIcon style={{ cursor: "pointer", stroke: "#2374E1" }} />
                                    </FacebookShareButton>
                                </SectionWrapper>
                            </LeftSideWrapper>
                            <RightSideWrapper>
                                <RecipeImg src={imageSrc} />
                            </RightSideWrapper>
                        </TopSideWrapper >

                        {recipe && recipe?.steps ?
                            <BottomSideWrapper>
                                {recipe?.steps.map((step, index) =>
                                    <SectionWrapper key={index}>
                                        <SectionHeadline secondary>
                                            Step {index + 1}
                                        </SectionHeadline>
                                        <TextContent secondary>
                                            {step}
                                        </TextContent>
                                    </SectionWrapper>
                                )}
                            </BottomSideWrapper>
                            : null}
                    </RecipeWrapper>
                </Card>
                :
                <LoadingSpinnerWrapper>
                    <LoadingSpinner size="120px" />
                </LoadingSpinnerWrapper>
            }
        </Layout >
    )
}

export default Recipe