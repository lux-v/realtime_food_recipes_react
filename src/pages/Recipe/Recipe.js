import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRecipeData } from '../../api/recipes'
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
    RecipeWrapper
} from './RecipeStyle'

import Layout from '../../components/Layout/Layout'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Button from '../../components/Button/Button';
import Chip from '../../components/Chip/Chip'

import RecipeImagePlaceholder from '../../assets/img/recipe-image-placeholder.png';


const Recipe = () => {
    const navigate = useNavigate()
    const uid = useParams().id;
    const { setToastType } = useContext(AuthContext)

    const [recipe, setRecipe] = useState(null)

    const imageSrc = useCheckImage(recipe?.imgUrl || "", RecipeImagePlaceholder);

    // moze se odvojit u hook
    const fetchRecipe = async (uid) => {
        try {
            const recipesData = await getRecipeData(uid)
            setRecipe(recipesData)

        } catch (error) {
            setToastType({
                open: true,
                message: error.message,
                type: 'error',
            });
        }
    }


    useEffect(() => {
        fetchRecipe(uid)
    }, [uid])


    return (
        <Layout
            title={recipe ? recipe.name : "Recipe"}
            elements={
                <>
                    <Button callback={() => navigate(-1)}>Back</Button>

                    <Button isTertiary callback={() => navigate(-1)}>Update</Button>
                </>}
        >
            {recipe ?
                <RecipeWrapper>
                    <TopSideWrapper>
                        <LeftSideWrapper>
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
                                        <Chip key={index} name={ingredient} type="error" />
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