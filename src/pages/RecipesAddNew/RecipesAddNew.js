import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FieldArray, Formik } from 'formik'
import * as Yup from "yup"
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
    ErrorMessageCustom
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


const RecipesAddNew = ({ isEditRecipe }) => {
    const { setToastType, userData, setModalType } = useContext(AuthContext)
    const navigate = useNavigate()
    const formRef = useRef(null)
    const recipeId = useParams().id;
    const recipe = useFetchRecipe(recipeId);
    const isOwner = useMemo(() => { return userData?.uid === recipe?.createdBy || userData?.isAdmin }, [recipe, userData])

    const [imageUrl, setImageUrl] = useState("")
    const imageSrc = useCheckImage(imageUrl, RecipeImagePlaceholder);


    const [newIngredient, setNewIngredient] = useState("")
    const [newIngredientError, setNewIngredientError] = useState(false)


    const ingredientErrorLengthMessage = "New ingredient name must be less than 50 characters";
    const ingredientErrorRequiredMessage = "Ingredient cannot be empty";
    const ingredientUniqueErrorMessage = "This ingredient is already added";


    const handleKeyDown = (e, callback) => {
        formRef.current.handleBlur("ingredients")

        if (newIngredient !== "")
            if (newIngredient.length <= 50)
                if (!formRef.current.values.ingredients.includes(newIngredient)) {
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
        formRef.current.handleBlur("ingredients")
        const newValue = e.target.value;

        newValue === "" ?
            setNewIngredientError(ingredientErrorRequiredMessage)
            : newValue.length > 50 ?
                setNewIngredientError(ingredientErrorLengthMessage) :
                formRef.current.values.ingredients.includes(newValue) ?
                    setNewIngredientError(ingredientUniqueErrorMessage)
                    : setNewIngredientError("")

        setNewIngredient(newValue)
    }

    const handleDeleteRecipe = () => {
        deleteRecipe(recipeId).then(res => {
            navigate("/recipes")
            setToastType({
                open: true,
                message: "Recipe deleted successfuly!",
                type: 'success',
            });
            setModalType({
                openModal: false
            })
        }).catch(err => {
            setToastType({
                open: true,
                message: err.message,
                type: 'error',
            });
        })
    }

    const handleDeleteModal = () => {
        setModalType(
            {
                openModal: true,
                title: "Delete",
                content: "Are you sure you want to delete this recipe?",
                closeModal: () => setModalType({ openModal: false }),
                elements:
                    [
                        <Button isTertiary callback={() => setModalType({ openModal: false })}>Cancel</Button>,
                        <Button callback={() => handleDeleteRecipe()} isHidden={!isOwner}>Delete</Button>
                    ]
            })
    }

    const handleCreateUpdateModal = () => {
        setModalType(
            {
                openModal: true,
                title: isEditRecipe ? "Update" : "Create",
                content: `Are you sure you want to ${isEditRecipe ? "update this" : "create a new"} recipe?`,
                closeModal: () => setModalType({ openModal: false }),
                elements:
                    [
                        <Button isTertiary callback={() => setModalType({ openModal: false })}>Cancel</Button>,
                        <Button callback={() => formRef.current.handleSubmit()} >{isEditRecipe ? "Update" : "Create"}</Button>
                    ]
            })
    }


    useEffect(() => {
        setImageUrl(recipe?.imgUrl || "")
    }, [recipe])

    return (
        <Layout
            title={isEditRecipe ? "Update recipe" : "Add new recipe"}>
            <Card
                title={isEditRecipe ? "Edit this recipe" : "Create your own recipe"}
                headingElements={[
                    <Button isSecondary callback={handleDeleteModal} isHidden={!isOwner}>Delete</Button>,
                    <Button isTertiary callback={() => navigate(-1)}>Back</Button>
                ]}
                elements={
                    [
                        <Button callback={handleCreateUpdateModal}>
                            {isEditRecipe ? "Update recipe" : "Create recipe +"}
                        </Button>,
                    ]
                }
            >
                <Formik
                    innerRef={formRef}
                    enableReinitialize={isEditRecipe}
                    initialValues={{
                        name: recipe?.name || "",
                        description: recipe?.description || "",
                        ingredients: recipe?.ingredients || [],
                        imgUrl: recipe?.imgUrl || "",
                        cookTimeMin: recipe?.cookTimeMin || "",
                        steps: recipe?.steps || [],
                        newIngredient: "",

                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('Recipe name is required')
                            .max(60, 'Recipe name must be less than 60 characters'),
                        description: Yup.string()
                            .required('Description is required')
                            .min(30, 'Description must be at least 30 characters')
                            .max(1500, 'Description must be less than 1500 characters'),
                        ingredients: Yup.array()
                            .of(Yup.string()
                                .required('Ingredient name is required')
                                .max(50, 'Ingredient name must be less than 50 characters')
                            )
                            .min(1, 'At least one ingredient is required')
                            .max(20, 'Maximum number of ingredients is 20'),
                        imgUrl: Yup.string()
                            .url('Image URL is not valid'),
                        cookTimeMin: Yup.number()
                            .typeError('The cook time must be a number')
                            .min(1, 'Cook time must be at least 1 minute')
                            .max(1440, 'Cook time must be less than 1440 minutes (24 hours)'),
                        newIngredient: Yup.string()
                            .max(50, 'New ingredient name must be less than 50 characters'),
                        steps: Yup.array()
                            .of(Yup.string()
                                .required('Step description is required')
                                .max(1500, 'Step must be less than 1500 characters')
                            )
                            .max(20, 'Maximum number of steps is 20'),

                    })}
                    onSubmit={async (values, actions) => {
                        try {
                            const formattedValues = isEditRecipe ?
                                {
                                    name: values.name,
                                    description: values.description,
                                    ingredients: values.ingredients,
                                    cookTimeMin: values.cookTimeMin,
                                    imgUrl: values.imgUrl,
                                    steps: values.steps,
                                } :
                                {
                                    name: values.name,
                                    description: values.description,
                                    ingredients: values.ingredients,
                                    cookTimeMin: values.cookTimeMin,
                                    imgUrl: values.imgUrl,
                                    steps: values.steps,
                                    createdBy: userData.uid || "",
                                    createdAt: new Date()
                                }


                            const afterSubmit = (recipeId) => {
                                actions.setSubmitting(false);
                                setToastType({
                                    open: true,
                                    message: `${values.name} is successfully ${isEditRecipe ? "updated!" : "added!"}`,
                                    type: 'success',
                                });
                                navigate(`/recipes/${recipeId}`)
                            }


                            isEditRecipe ?
                                await putRecipeData(formattedValues, recipeId).then(() => {
                                    afterSubmit(recipeId)
                                })
                                :
                                await postRecipeData(formattedValues).then(recipeId => {
                                    afterSubmit(recipeId)
                                })


                            setModalType({ openModal: false })
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
                                        <TwoInRow width="100%">
                                            <SectionWrapper>
                                                <SectionHeadline>
                                                    Cook time (minutes)
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
                                                                error={newIngredientError}
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
                                                                <Chip size="medium" name={ingredient} type="error" icon={CloseIcon} iconCallback={() => arrayHelpers.remove(index)} />
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
                                                        <SectionHeadline>
                                                            Cooking steps:
                                                        </SectionHeadline>
                                                    </TwoInRow>
                                                </SectionWrapper>
                                                <RecipeStepsWrapper>
                                                    {formik.values.steps.map((step, index) => (
                                                        <SectionWrapper key={index}>
                                                            <TwoInRow width="100%">
                                                                <SectionHeadline>
                                                                    Step {index + 1}
                                                                </SectionHeadline>
                                                                <Button isSecondary type="button" callback={() => arrayHelpers.remove(index)}>Remove step {index + 1}</Button>
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
    )
}

export default RecipesAddNew