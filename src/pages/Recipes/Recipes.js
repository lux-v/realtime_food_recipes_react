import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { getAllRecipesData } from '../../api/recipes'


import Layout from '../../components/Layout/Layout'
import { LoadingSpinnerWrapper, RecipesWrapper, Filter as FilterIcon, FilterWrapper } from './RecipesStyle'


import RecipeCard from '../../components/RecipeCard/RecipeCard'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card'
import { FieldArray, Formik } from 'formik'
import { Field, Form, InputField, SmallField, SearchBar, ErrorMesagge, ErrorMessageCustom } from "../../lib/style/generalStyles"
import { RecipeIngredientsWrapper } from '../RecipesAddNew/RecipesAddNewStyles'
import Chip from '../../components/Chip/Chip'
import { ReactComponent as CloseIcon } from '../../assets/img/x-icon.svg';



const FilterContent = ({ formikRef }) => {
    // I want to have an ability to filter by:
    // number of likes
    // specific ingredients
    // time to cook
    // difficulty
    // category
    // name

    // likes should be a range option
    // ingredients should be a list of ingredients
    // time should be a range option
    // difficulty should be from 1 to 5
    // category should be a list of categories
    // name should be a string

    const [newIngredient, setNewIngredient] = useState("")
    const [newIngredientError, setNewIngredientError] = useState(false)

    const filterValues = JSON.parse(localStorage.getItem("filter"))


    const ingredientErrorLengthMessage = "New ingredient name must be less than 50 characters";
    const ingredientErrorRequiredMessage = "Ingredient cannot be empty";
    const ingredientUniqueErrorMessage = "This ingredient is already added";

    const handleKeyDown = (e, callback, formik) => {
        formik.handleBlur("ingredients")

        if (newIngredient !== "")
            if (newIngredient.length <= 50)
                if (!formik.values.ingredients.includes(newIngredient)) {
                    if (e.key === "Enter" || e.keyCode === 13 || e.type === "click") {
                        callback(newIngredient)
                        setNewIngredient("")
                        setNewIngredientError("")
                    }
                }
                else {
                    setNewIngredientError(ingredientUniqueErrorMessage)
                }
            else {
                setNewIngredientError(ingredientErrorLengthMessage)
            }
        else {
            setNewIngredientError(ingredientErrorRequiredMessage)
        }
    }

    const handleNewIngredientChange = (e, formik) => {
        formik.handleBlur("ingredients")
        const newValue = e.target.value;

        newValue === "" ?
            setNewIngredientError(ingredientErrorRequiredMessage)
            : newValue.length > 50 ?
                setNewIngredientError(ingredientErrorLengthMessage) :
                formik.values.ingredients.includes(newValue) ?
                    setNewIngredientError(ingredientUniqueErrorMessage)
                    : setNewIngredientError("")

        setNewIngredient(newValue)
    }

    return (
        <Formik
            innerRef={formikRef}
            initialValues={{
                likes: filterValues?.likes || {
                    min: 0,
                    max: 10000
                },
                ingredients: filterValues?.ingredients || [],
                time: filterValues?.time || {
                    min: 0,
                    max: 1440
                },
                difficulty: filterValues?.difficulty || {
                    min: 0,
                    max: 5
                },
                category: filterValues?.category || [],
                name: ""
            }}
            onSubmit={(values, { setSubmitting }) => {

                localStorage.setItem("filter", JSON.stringify(values))

                setSubmitting(false);
            }}
        >
            {(formik) => (
                <Form>
                    <FieldArray
                        name="ingredients"
                        render={arrayHelpers => (
                            <>
                                <div style={{ marginBottom: "10px" }}>
                                    <a>
                                        Filter by ingredient:
                                    </a>

                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <SmallField
                                            id="newIngredient"
                                            name="newIngredient"
                                            type='newIngredient'
                                            placeholder="Add ingredient"
                                            error={newIngredientError ? true : false}
                                            disabled={formik.isSubmitting}
                                            isSecondary
                                            width="100%"
                                            value={newIngredient}
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, (newValue) => {
                                                    arrayHelpers.insert(
                                                        formik.values.ingredients.length - 1,
                                                        newValue
                                                    );
                                                }, formik)
                                            }
                                            onChange={(e) => handleNewIngredientChange(e, formik)}
                                        />
                                        <Button
                                            type="button"
                                            callback={(e) =>
                                                handleKeyDown(e, (newValue) => {
                                                    arrayHelpers.insert(
                                                        formik.values.ingredients.length - 1,
                                                        newValue
                                                    );
                                                }, formik)
                                            }
                                            height="100%"
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <ErrorMessageCustom isError={newIngredientError}>{newIngredientError}</ErrorMessageCustom>
                                    <ErrorMesagge component={'div'} name="ingredients" />

                                </div>
                                <RecipeIngredientsWrapper>
                                    {formik.values.ingredients.map((ingredient, index) => (
                                        <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                            <Chip size="small" name={ingredient} type="error" icon={CloseIcon} iconCallback={() => arrayHelpers.remove(index)} />
                                        </div>
                                    ))}
                                </RecipeIngredientsWrapper>
                            </>
                        )}
                    />
                </Form>
            )}
        </Formik>
    );
};


const Recipes = () => {
    const navigate = useNavigate()

    const [recipes, setRecipes] = useState(null)
    const [filteredRecipes, setFilteredRecipes] = useState(null)
    const [searchRecipe, setSearchRecipe] = useState("")
    const { setToastType, setModalType } = useContext(AuthContext)

    const formikRef = useRef()


    // moze se odvojit u hook
    const fetchRecipes = async () => {
        try {
            const recipesData = await getAllRecipesData()
            setRecipes(recipesData)
            setFilteredRecipes(recipesData)
            setSearchRecipe(recipesData)

        } catch (error) {
            setToastType({
                open: true,
                message: error.message,
                type: 'error',
            });
        }
    }

    const handleSearchInput = (e) => {
        const searchValue = e.target.value.toLowerCase()
        if (searchValue === '') {
            setSearchRecipe(filteredRecipes)
        }
        setSearchRecipe(
            filteredRecipes.filter(
                (recipes) =>
                    recipes.name.toLowerCase().includes(searchValue) ||
                    recipes.description.toLowerCase().includes(searchValue)


            ),
        );
    };

    const handleFilterModal = () => {
        setModalType({
            openModal: true,
            title: "Filter recipes",
            content: <FilterContent formikRef={formikRef} />,
            actionCallback: handleSubmitFilter,
            actionText: "Filter",
        })
    }

    const handleSubmitFilter = () => {
        formikRef.current.submitForm().then(() => {
            handleFilterRecipes()
        })
    }


    const handleFilterRecipes = () => {
        const filterValues = JSON.parse(localStorage.getItem("filter"))

        if (filterValues) {
            const filtered = recipes.filter(recipe => {
                return (
                    recipe.likedBy?.length >= filterValues.likes.min &&
                    recipe.likedBy?.length <= filterValues.likes.max &&
                    recipe.cookTimeMin >= filterValues.time.min &&
                    recipe.cookTimeMin <= filterValues.time.max &&
                    // recipe.difficulty >= filterValues.difficulty.min &&
                    // recipe.difficulty <= filterValues.difficulty.max &&
                    (filterValues.ingredients.length === 0 || filterValues.ingredients.every(ingredient => recipe.ingredients.includes(ingredient)))

                    // &&
                    // (filterValues.category.length === 0 || filterValues.category.every(category => recipe.category.includes(category)))
                )
            })
            setFilteredRecipes(filtered)
            setSearchRecipe(filtered)
        }
        else {
            setFilteredRecipes(recipes)
            setSearchRecipe(recipes)
        }
    }


    useEffect(() => {
        fetchRecipes()
    }, [])


    useEffect(() => {
        recipes &&
            handleFilterRecipes()

    }, [recipes])



    return (
        <Layout
            title="Recipes"
        >
            {searchRecipe ?
                <Card title={<FilterWrapper onClick={handleFilterModal}> <FilterIcon /> Filter</FilterWrapper>}
                    headingElements={[
                        <SearchBar
                            placeholder="Search name or description"
                            onChange={handleSearchInput}
                        />
                    ]}
                >
                    <div style={{ marginBottom: "25px" }}>
                        <Button callback={() => navigate("/recipes/add-new")}>Add recipe +</Button>
                    </div>
                    <RecipesWrapper>
                        {searchRecipe.map(recipe => {
                            return <RecipeCard onClick={() => navigate(`/recipes/${recipe.id}`)} key={recipe.id} recipe={recipe} />
                        })}
                    </RecipesWrapper>
                </Card>
                :
                <LoadingSpinnerWrapper>
                    <LoadingSpinner size="120px" />
                </LoadingSpinnerWrapper>
            }
        </Layout>
    )
}

export default Recipes