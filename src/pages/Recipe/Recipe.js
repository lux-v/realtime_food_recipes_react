import React, { useContext, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
    LikesNumber
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

const Recipe = () => {
    const navigate = useNavigate()
    const recipeId = useParams().id;
    const { userData } = useContext(AuthContext)
    const recipe = useFetchRecipe(recipeId)

    const { isLikedByUser, recipeLikes, handleLikeRecipe } = useRecipeLike(recipe, userData)
    const imageSrc = useCheckImage(recipe?.imgUrl || "", RecipeImagePlaceholder);
    const isOwner = useMemo(() => { return userData?.uid === recipe?.createdBy || userData?.isAdmin }, [recipe, userData])


    return (
        <Layout
            title={"Recipe details"}
            elements={
                <>
                    <Button callback={() => navigate(`update`)} isHidden={!isOwner}>Edit </Button>
                    <Button isTertiary callback={() => navigate(-1)}>Back</Button>
                </>
            }
        >
            {
                recipe ?
                    <RecipeWrapper>
                        <TopSideWrapper >
                            <LeftSideWrapper>
                                <RecipeLikesWrapper>
                                    <LikesNumber>
                                        {recipeLikes}
                                    </LikesNumber>
                                    <FavoriteIconWrapper>
                                        <AddFavorite onClick={(e) => handleLikeRecipe(e)} isfavorite={isLikedByUser} />
                                    </FavoriteIconWrapper>
                                </RecipeLikesWrapper>
                                <SectionWrapper>
                                    <SectionHeadline>
                                        Name:
                                    </SectionHeadline>
                                    <TextContent>
                                        {recipe.name}
                                    </TextContent>
                                </SectionWrapper>
                                <SectionWrapper>
                                    <SectionHeadline>
                                        Description:
                                    </SectionHeadline>
                                    <TextContent>
                                        {recipe.description}
                                    </TextContent>
                                </SectionWrapper>
                                <SectionWrapper>
                                    <SectionHeadline>
                                        Ingredients:
                                    </SectionHeadline>
                                    <IngredientsWrapper>
                                        {recipe && recipe?.ingredients && recipe?.ingredients.map((ingredient, index) =>
                                            <Chip size="medium" key={index} name={ingredient} type="error" />
                                        )}
                                    </IngredientsWrapper>
                                </SectionWrapper>
                            </LeftSideWrapper>
                            <RightSideWrapper>
                                <RecipeImg src={imageSrc} />
                            </RightSideWrapper>
                        </TopSideWrapper >
                        {recipe && recipe?.steps ?
                        <BottomSideWrapper>
                           { recipe?.steps.map((step, index) =>
                                <SectionWrapper key={index}>
                                    <SectionHeadline>
                                        Step {index + 1}
                                    </SectionHeadline>
                                    <TextContent>
                                        {step}
                                    </TextContent>
                                </SectionWrapper>
                            )}
                        </BottomSideWrapper>
                        : null}
                    </RecipeWrapper >
                    :
                    <LoadingSpinnerWrapper>
                        <LoadingSpinner size="120px" />
                    </LoadingSpinnerWrapper>
            }
        </Layout >
    )
}

export default Recipe