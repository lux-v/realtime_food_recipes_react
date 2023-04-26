import React, { useContext, useMemo, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteRecipe } from '../../api/recipes'
import { AuthContext } from '../../context/AuthContext'
import useCheckImage from '../../hooks/useCheckImage'

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
    RecipeName
} from './RecipeStyle'

import Layout from '../../components/Layout/Layout'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Button from '../../components/Button/Button';
import Chip from '../../components/Chip/Chip'

import RecipeImagePlaceholder from '../../assets/img/recipe-image-placeholder.png';
import useFetchRecipe from '../../hooks/useFetchRecipe'
import { RedTextStyle } from '../Landing/LandingStyle'


const Recipe = () => {
    const navigate = useNavigate()
    const recipeId = useParams().id;
    const { setToastType, userData } = useContext(AuthContext)
    const recipe = useFetchRecipe(recipeId)

    const imageSrc = useCheckImage(recipe?.imgUrl || "", RecipeImagePlaceholder);
    const isOwner = useMemo(() => { return userData && recipe && userData.uid === recipe.createdBy || userData.isAdmin }, [recipe, userData])


    const handleDeleteRecipe = () => {
        deleteRecipe(recipeId).then(res => {

            navigate("/")
            setToastType({
                open: true,
                message: "Recipe deleted successfuly!",
                type: 'success',
            });
        }).catch(err => {
            setToastType({
                open: true,
                message: err.message,
                type: 'error',
            });
        })
    }

    return (
        <Layout
            title={recipe && <RecipeName>{recipe.name || "Recipe"}</RecipeName>}
            elements={
                <>
                    <Button isTertiary callback={() => navigate(-1)}>Back</Button>
                    <Button callback={() => navigate(`/recipes/update/${recipeId}`)} isHidden={!isOwner}>Edit </Button>
                    <Button isSecondary callback={() => handleDeleteRecipe()} isHidden={!isOwner}>Delete</Button>
                </>
            }
        >
            {recipe ?
                <RecipeWrapper>
                    <TopSideWrapper>
                        <LeftSideWrapper>
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
                                    {recipe.ingredients.map((ingredient, index) =>
                                        <Chip size="medium" key={index} name={ingredient} type="error" />
                                    )}
                                </IngredientsWrapper>
                            </SectionWrapper>
                        </LeftSideWrapper>
                        <RightSideWrapper>
                            <RecipeImg src={imageSrc} />
                        </RightSideWrapper>
                    </TopSideWrapper>
                    <BottomSideWrapper>
                        {recipe.ingredients.map((ingredient, index) =>
                            <SectionWrapper key={index}>
                                <SectionHeadline>
                                    Step {index + 1}
                                </SectionHeadline>
                                <TextContent>
                                    {ingredient}
                                </TextContent>
                            </SectionWrapper>
                        )}
                    </BottomSideWrapper>
                </RecipeWrapper>
                :
                <LoadingSpinnerWrapper>
                    <LoadingSpinner size="120px" />
                </LoadingSpinnerWrapper>
            }
        </Layout>
    )
}

export default Recipe