import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FieldArray, Formik } from 'formik'
import { AddNewRecipeSchema } from '../../utils/validationSchema'
import { AuthContext } from '../../context/AuthContext'
import useCheckImage from '../../hooks/useCheckImage'

import { deleteRecipe, postRecipeData, putRecipeData } from '../../api/recipes'

import {
    Form,
    Field,
    SmallField,
    ErrorMesagge,
    RequiredSpan,
    TextArea,
    TwoInRow,
    InputField,
    ErrorMessageCustom,
    SmallSelect,
    Option
} from '../../lib/style/generalStyles'
import {
    BottomSideWrapper,
    LeftSideWrapper,
    RecipeImg,
    RecipeWrapper,
    RightSideWrapper,
    SectionHeadline,
    SectionWrapper,
    TopSideWrapper
} from '../Recipe/RecipeStyle'
import {
    RecipeIngredientsWrapper, RecipeStepsWrapper
} from './RecipesAddNewStyles'

import Layout from '../../components/Layout/Layout'
import Button from '../../components/Button/Button'
import Chip from '../../components/Chip/Chip'
import Card from '../../components/Card/Card'
import { ReactComponent as CloseIcon } from '../../assets/img/x-icon.svg';
import RecipeImagePlaceholder from '../../assets/img/recipe-image-placeholder.png';
import useFetchRecipe from '../../hooks/useFetchRecipe'
import Modal from '../../components/Modal/Modal'
import { categoryOptions, cookingMethodOptions, cuisineOptions, dieateryRestrictionsOptions } from '../../lib/constants'


const RecipesAddNew = ({ isEditRecipe }) => {
    const { setToastType, userData } = useContext(AuthContext)
    const navigate = useNavigate()
    const formikRef = useRef(null)
    const recipeId = useParams().id;
    const recipe = useFetchRecipe(recipeId);

    const [imageUrl, setImageUrl] = useState("")
    const imageSrc = useCheckImage(imageUrl, RecipeImagePlaceholder);


    const [newIngredient, setNewIngredient] = useState("")
    const [newIngredientError, setNewIngredientError] = useState(false)



    const ingredientErrorLengthMessage = "New ingredient name must be less than 100 characters";
    const ingredientErrorRequiredMessage = "Ingredient cannot be empty";
    const ingredientUniqueErrorMessage = "This ingredient is already added";


    const handleKeyDown = (e, callback) => {
        formikRef.current.handleBlur("ingredients")

        if (newIngredient !== "")
            if (newIngredient.length <= 100)
                if (!formikRef.current.values.ingredients.includes(newIngredient)) {
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

    const handleNewIngredientChange = (e) => {
        formikRef.current.handleBlur("ingredients")
        const newValue = e.target.value;

        newValue === "" ?
            setNewIngredientError(ingredientErrorRequiredMessage)
            : newValue.length > 100 ?
                setNewIngredientError(ingredientErrorLengthMessage) :
                formikRef.current.values.ingredients.includes(newValue) ?
                    setNewIngredientError(ingredientUniqueErrorMessage)
                    : setNewIngredientError("")

        setNewIngredient(newValue)
    }

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isCreateUpdateModalOpen, setIsCreateUpdateModalOpen] = useState(false)
    const [removeCookingStepModal, setRemoveCookingStepModal] = useState({ isOpen: false, params: null })


    const handleDeleteRecipe = () => {
        deleteRecipe(recipeId).then(res => {
            navigate("/recipes")
            setToastType({
                open: true,
                message: "Recipe deleted successfuly!",
                type: 'success',
            });
            setIsDeleteModalOpen(false)
        }).catch(err => {
            setToastType({
                open: true,
                message: err.message,
                type: 'error',
            });
        })
    }

    const handleDeleteModal = () => {
        setIsDeleteModalOpen(true)


    }

    const handleCreateUpdateModal = () => {
        setIsCreateUpdateModalOpen(true)
    }


    const removeCookingStep = (stepNumber, callback) => {
        setRemoveCookingStepModal({
            isOpen: true,
            params: {
                stepNumber,
                callback
            }
        })

    }

    useEffect(() => {
        setImageUrl(recipe?.imgUrl || "")
    }, [recipe])



    return (
        <>
            <Layout
                title={isEditRecipe ? "Update recipe" : "Add new recipe"}>
                <Card
                    title={isEditRecipe ? "Edit this recipe" : "Create your own recipe"}
                    headingElements={[
                        isEditRecipe && <Button isSecondary isError callback={handleDeleteModal}>Delete</Button>,
                        <Button isTertiary callback={() => navigate(-1)}>Exit edit mode</Button>
                    ]}
                    elements={
                        [
                            <Button callback={handleCreateUpdateModal}
                            >
                                {isEditRecipe ? "Update recipe" : "Create recipe +"}
                            </Button>,
                        ]
                    }
                >
                    <Formik
                        innerRef={formikRef}
                        enableReinitialize={isEditRecipe}
                        initialValues={{
                            name: recipe?.name || "",
                            description: recipe?.description || "",
                            cookTimeMin: recipe?.cookTimeMin || "",
                            servings: recipe?.servings || "",
                            category: recipe?.category || "",
                            dietaryRestrictions: recipe?.dietaryRestrictions || "",
                            cuisine: recipe?.cuisine || "",
                            cookingMethod: recipe?.cookingMethod || "",
                            imgUrl: recipe?.imgUrl || "",
                            ingredients: recipe?.ingredients || [],
                            steps: recipe?.steps || [],
                            newIngredient: "",

                        }}
                        validationSchema={AddNewRecipeSchema}
                        onSubmit={async (values, actions) => {
                            try {

                                const submitValues = {
                                    ...values
                                }
                                delete submitValues.newIngredient

                                const formattedValues = isEditRecipe ?
                                    {
                                        ...submitValues,
                                        likedBy: recipe.likedBy || [],
                                        updatedAt: new Date()
                                    } :
                                    {
                                        ...submitValues,
                                        likedBy: [],
                                        createdBy: userData.uid || "",
                                        createdAt: new Date()
                                    }

                                const afterSubmit = (recipeId) => {
                                    actions.setSubmitting(false);
                                    setToastType({
                                        open: true,
                                        message: <p><span style={{ fontWeight: "600" }}>{values.name}</span> is successfully {isEditRecipe ? "updated!" : "added!"}</p>,
                                        type: 'success',
                                    });
                                    navigate(`/recipes/${recipeId}`)
                                }

                                const isNotModified = JSON.stringify(formikRef.current.initialValues) === JSON.stringify(formikRef.current.values)

                                isEditRecipe ?
                                    isNotModified ?
                                        setToastType({
                                            open: true,
                                            message: "Nothing to update!",
                                            type: 'info',
                                        })
                                        :
                                        await putRecipeData(formattedValues, recipeId).then(() => {
                                            afterSubmit(recipeId)
                                        })
                                    :
                                    await postRecipeData(formattedValues).then(recipeId => {
                                        afterSubmit(recipeId)
                                    })


                                setIsCreateUpdateModalOpen(false)
                            }
                            catch (err) {
                                actions.setSubmitting(false);
                                setToastType({
                                    open: true,
                                    message: err.message,
                                    type: 'error',
                                });
                            }

                        }}
                    >
                        {(formik) => (
                            <Form>
                                <RecipeWrapper>
                                    <TopSideWrapper>
                                        <LeftSideWrapper>
                                            <SectionWrapper>
                                                <SectionHeadline>
                                                    Name <RequiredSpan>*</RequiredSpan>
                                                </SectionHeadline>
                                                <Field
                                                    id="name"
                                                    name="name"
                                                    type='name'
                                                    error={formik.touched.name && formik.errors.name}
                                                    placeholder="Recipe name"
                                                    disabled={formik.isSubmitting}
                                                    isSecondary
                                                    width="100%"

                                                />
                                                <ErrorMesagge component={'div'} name="name" />
                                            </SectionWrapper>
                                            <SectionWrapper>
                                                <SectionHeadline>
                                                    Description <RequiredSpan>*</RequiredSpan>
                                                </SectionHeadline>
                                                <TextArea
                                                    id="description"
                                                    name="description"
                                                    type='description'
                                                    error={formik.touched.description && formik.errors.description}
                                                    placeholder="Recipe description"
                                                    disabled={formik.isSubmitting}
                                                    isSecondary
                                                    width="100%"

                                                />
                                                <ErrorMesagge component={'div'} name="description" />
                                            </SectionWrapper>
                                            <SectionWrapper>
                                                <SectionHeadline>
                                                    Image URL
                                                </SectionHeadline>
                                                <SmallField
                                                    id="imgUrl"
                                                    name="imgUrl"
                                                    type='imgUrl'
                                                    error={formik.touched.imgUrl && formik.errors.imgUrl}
                                                    placeholder="Image URL"
                                                    disabled={formik.isSubmitting}
                                                    isSecondary

                                                    width="100%"

                                                    onChange={(e) => { formik.setFieldValue("imgUrl", e.target.value); setImageUrl(e.target.value) }}
                                                />
                                                <ErrorMesagge component={'div'} name="imgUrl" />
                                            </SectionWrapper>
                                            <TwoInRow width="100%">
                                                <SectionWrapper>
                                                    <SectionHeadline>
                                                        Cook time (minutes) <RequiredSpan>*</RequiredSpan>
                                                    </SectionHeadline>
                                                    <SmallField
                                                        id="cookTimeMin"
                                                        type="number"
                                                        name="cookTimeMin"
                                                        error={formik.touched.cookTimeMin && formik.errors.cookTimeMin}
                                                        placeholder="Cook time(min)"
                                                        disabled={formik.isSubmitting}
                                                        isSecondary

                                                        width="100%"
                                                    />
                                                    <ErrorMesagge component={'div'} name="cookTimeMin" />
                                                </SectionWrapper>
                                                <SectionWrapper>
                                                    <SectionHeadline>
                                                        Servings <RequiredSpan>*</RequiredSpan>
                                                    </SectionHeadline>
                                                    <SmallField
                                                        id="servings"
                                                        name="servings"
                                                        type='number'
                                                        error={formik.touched.servings && formik.errors.servings}
                                                        placeholder="Servings"
                                                        disabled={formik.isSubmitting}
                                                        isSecondary
                                                        width="100%"
                                                    />
                                                    <ErrorMesagge component={'div'} name="servings" />
                                                </SectionWrapper>


                                            </TwoInRow>
                                            <TwoInRow width="100%">
                                                <SectionWrapper>
                                                    <SectionHeadline>
                                                        Category
                                                    </SectionHeadline>
                                                    <SmallSelect
                                                        id="category"
                                                        name="category"
                                                        error={formik.touched.category && formik.errors.category}
                                                        disabled={formik.isSubmitting}
                                                        isSecondary
                                                        width="100%"
                                                        onChange={(e) => { formik.setFieldValue("category", e.target.value) }}
                                                        value={formik.values.category}

                                                    >
                                                        <Option key={-1} value="Not defined">Not defined</Option>
                                                        {categoryOptions.map((category, index) => (
                                                            <Option key={index} value={category}>{category}</Option>
                                                        ))
                                                        }
                                                    </SmallSelect>
                                                    <ErrorMesagge component={'div'} name="category" />
                                                </SectionWrapper>
                                                <SectionWrapper>
                                                    <SectionHeadline>
                                                        Dietary Restrictions
                                                    </SectionHeadline>
                                                    <SmallSelect
                                                        id="dietaryRestrictions"
                                                        name="dietaryRestrictions"
                                                        error={formik.touched.dietaryRestrictions && formik.errors.dietaryRestrictions}
                                                        disabled={formik.isSubmitting}
                                                        isSecondary
                                                        width="100%"
                                                        onChange={(e) => { formik.setFieldValue("dietaryRestrictions", e.target.value) }}
                                                        value={formik.values.dietaryRestrictions}
                                                    // multiple
                                                    >
                                                        <Option key={-1} value="Not defined">Not defined</Option>
                                                        {dieateryRestrictionsOptions.map((dietaryRestriction, index) => (
                                                            <Option key={index} value={dietaryRestriction}>{dietaryRestriction}</Option>
                                                        ))
                                                        }
                                                    </SmallSelect>
                                                    <ErrorMesagge component={'div'} name="dietaryRestrictions" />
                                                </SectionWrapper>
                                            </TwoInRow>
                                            <TwoInRow width="100%">
                                                <SectionWrapper>
                                                    <SectionHeadline>
                                                        Cooking method
                                                    </SectionHeadline>
                                                    <SmallSelect
                                                        id="cookingMethod"
                                                        name="cookingMethod"
                                                        error={formik.touched.cookingMethod && formik.errors.cookingMethod}
                                                        disabled={formik.isSubmitting}
                                                        isSecondary
                                                        width="100%"
                                                        onChange={(e) => { formik.setFieldValue("cookingMethod", e.target.value) }}
                                                        value={formik.values.cookingMethod}

                                                    >
                                                        <Option key={-1} value="Not defined">Not defined</Option>
                                                        {cookingMethodOptions.map((cookingMethod, index) => (
                                                            <Option key={index} value={cookingMethod}>{cookingMethod}</Option>
                                                        ))
                                                        }
                                                    </SmallSelect>
                                                    <ErrorMesagge component={'div'} name="cookingMethod" />
                                                </SectionWrapper>
                                                <SectionWrapper>
                                                    <SectionHeadline>
                                                        Cuisine
                                                    </SectionHeadline>
                                                    <SmallSelect
                                                        id="cuisine"
                                                        name="cuisine"
                                                        error={formik.touched.cuisine && formik.errors.cuisine}
                                                        disabled={formik.isSubmitting}
                                                        isSecondary
                                                        width="100%"
                                                        onChange={(e) => { formik.setFieldValue("cuisine", e.target.value) }}
                                                        value={formik.values.cuisine}
                                                    >
                                                        <Option key={-1} value="Not defined">Not defined</Option>
                                                        {cuisineOptions.map((cuisine, index) => (
                                                            <Option key={index} value={cuisine}>{cuisine}</Option>
                                                        ))
                                                        }
                                                    </SmallSelect>
                                                    <ErrorMesagge component={'div'} name="cuisine" />
                                                </SectionWrapper>

                                            </TwoInRow>
                                            <FieldArray
                                                name="ingredients"
                                                render={arrayHelpers => (
                                                    <>
                                                        <SectionWrapper>
                                                            <SectionHeadline>
                                                                Ingredients: <RequiredSpan>*</RequiredSpan>
                                                            </SectionHeadline>

                                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                                <InputField
                                                                    id="newIngredient"
                                                                    name="newIngredient"
                                                                    type='newIngredient'
                                                                    error={newIngredientError ? true : false}
                                                                    placeholder="Add ingredient"
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
                                                                        })
                                                                    }

                                                                    onChange={(e) => handleNewIngredientChange(e)}
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    callback={(e) =>
                                                                        handleKeyDown(e, (newValue) => {
                                                                            arrayHelpers.insert(
                                                                                formik.values.ingredients.length - 1,
                                                                                newValue
                                                                            );
                                                                        })
                                                                    }
                                                                    height="100%"
                                                                >
                                                                    +
                                                                </Button>
                                                            </div>
                                                            <ErrorMessageCustom isError={newIngredientError}>{newIngredientError}</ErrorMessageCustom>
                                                            <ErrorMesagge component={'div'} name="ingredients" />

                                                        </SectionWrapper>
                                                        <RecipeIngredientsWrapper>
                                                            {formik.values.ingredients.map((ingredient, index) => (
                                                                <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                                                    <Chip size="medium" name={ingredient} icon={CloseIcon} iconCallback={() => arrayHelpers.remove(index)} />
                                                                </div>
                                                            ))}
                                                        </RecipeIngredientsWrapper>
                                                    </>
                                                )}
                                            />
                                        </LeftSideWrapper>
                                        <RightSideWrapper>
                                            <RecipeImg src={imageSrc} />
                                        </RightSideWrapper>
                                    </TopSideWrapper>
                                    <BottomSideWrapper>
                                        <FieldArray
                                            name="steps"
                                            render={arrayHelpers => (
                                                <>
                                                    <SectionWrapper>
                                                        <TwoInRow width="100%">
                                                            <SectionHeadline fontSize="24px">
                                                                Cooking steps:
                                                            </SectionHeadline>
                                                        </TwoInRow>
                                                    </SectionWrapper>
                                                    <RecipeStepsWrapper>
                                                        {formik.values.steps.map((step, index) => (
                                                            <SectionWrapper key={index}>
                                                                <TwoInRow width="100%" flex>
                                                                    <SectionHeadline secondary margin="0" >
                                                                        Step {index + 1}
                                                                    </SectionHeadline>
                                                                    <Button isSecondary isError type="button" callback={() => removeCookingStep(index, (stepNumber) => arrayHelpers.remove(stepNumber))}>Remove step {index + 1}</Button>
                                                                </TwoInRow>
                                                                <TextArea
                                                                    name={`steps.${index}`}
                                                                    placeholder="Step description"
                                                                    disabled={formik.isSubmitting}
                                                                    error={formik.touched.steps?.[index] && formik.errors.steps?.[index] ? true : false}
                                                                    isSecondary
                                                                    width="100%"
                                                                />
                                                                <ErrorMesagge component={'div'} name={`steps.${index}`} />
                                                            </SectionWrapper>
                                                        ))}
                                                        <Button
                                                            type="button"
                                                            callback={() => arrayHelpers.push("")}
                                                            height="100%"
                                                            isTertiary
                                                        >
                                                            Add cooking step +
                                                        </Button>
                                                    </RecipeStepsWrapper>
                                                </>
                                            )}
                                        />
                                    </BottomSideWrapper>
                                </RecipeWrapper>
                            </Form>
                        )
                        }
                    </Formik >
                </Card>
            </Layout >

            {/* Modals */}

            <Modal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                title="Delete"
                actionCallback={handleDeleteRecipe}
                isAlert
            >
                This action cannot be undone. Are you sure you want to delete this recipe?
            </Modal>
            <Modal
                isOpen={removeCookingStepModal.isOpen}
                closeModal={() => setRemoveCookingStepModal({ isOpen: false, params: null })}
                title="Remove"
                actionCallback={() => removeCookingStepModal.params?.callback(removeCookingStepModal.params?.stepNumber)}
                isAlert
            >
                <p>Are you sure you want to remove <span style={{ fontWeight: "600" }}>Step {removeCookingStepModal.params?.stepNumber + 1} </span>?</p>
            </Modal>
            <Modal
                isOpen={isCreateUpdateModalOpen}
                closeModal={() => setIsCreateUpdateModalOpen(false)}
                title={isEditRecipe ? "Update" : "Create"}
                actionCallback={() => formikRef.current.handleSubmit()}
            >
                <p>Are you sure you want to {isEditRecipe ? "update this" : "create a new"} recipe?</p>
            </Modal>
        </>
    )
}

export default RecipesAddNew