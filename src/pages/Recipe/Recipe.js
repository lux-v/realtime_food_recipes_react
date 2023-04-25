import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllRecipesData, getRecipeData } from '../../api/recipes'
import { AuthContext } from '../../context/AuthContext'

import { LeftSideWrapper, LoadingSpinnerWrapper, RecipeImg, RecipeName, SectionWrapper, TopSideWrapper, RightSideWrapper, SectionHeadline, TextContent, IngredientsWrapper, BottomSideWrapper, RecipeWrapper } from './RecipeStyle'

import Layout from '../../components/Layout/Layout'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Button from '../../components/Button/Button';
import Backdrop from '../../components/Backdrop/Backdrop';
import Chip from '../../components/Chip/Chip'


const Recipe = () => {
    const navigate = useNavigate()
    const uid = useParams().id;

    const { setToastType } = useContext(AuthContext)

    const [recipe, setRecipe] = useState(null)


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

    console.log("recipe: ", recipe)

    useEffect(() => {
        fetchRecipe(uid)
    }, [uid])


    return (
        <Layout
            title={recipe ? recipe.name : "Recipe"}
            elements={
                <>
                    <Button callback={() => navigate(-1)}>Back</Button>
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
                                    {recipe.ingredients.map(ingredient =>
                                        <Chip name={ingredient} type="error" />
                                    )}
                                </IngredientsWrapper>
                            </SectionWrapper>


                        </LeftSideWrapper>
                        <RightSideWrapper>
                            <RecipeImg src={recipe.imgUrl} />
                        </RightSideWrapper>


                    </TopSideWrapper>
                    <BottomSideWrapper>
                        {recipe.ingredients.map((ingredient, index) =>
                            <SectionWrapper>
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