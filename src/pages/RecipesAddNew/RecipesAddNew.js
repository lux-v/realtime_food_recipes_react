import React, { useContext, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FieldArray, Formik } from 'formik'
import * as Yup from "yup"
import { AuthContext } from '../../context/AuthContext'
import useCheckImage from '../../hooks/useCheckImage'

import { postRecipeData, putRecipeData } from '../../api/recipes'

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
    LeftSideWrapper,
    RecipeImg,
    RecipeWrapper,
    RightSideWrapper,
    SectionHeadline,
    SectionWrapper,

    TopSideWrapper
} from '../Recipe/RecipeStyle'
import {
    RecipeIngredientsWrapper
} from './RecipesAddNewStyles'

import Layout from '../../components/Layout/Layout'
import Button from '../../components/Button/Button'
import Chip from '../../components/Chip/Chip'
import { ReactComponent as CloseIcon } from '../../assets/img/x-icon.svg';
import RecipeImagePlaceholder from '../../assets/img/recipe-image-placeholder.png';
import useFetchRecipe from '../../hooks/useFetchRecipe'

const RecipesAddNew = ({ isEditRecipe }) => {

    console.log("isEditRecipe: ", isEditRecipe)
    const { setToastType, userData } = useContext(AuthContext)
    const navigate = useNavigate()
    const formRef = useRef(null)
    const recipeId = useParams().id;
    const recipe = useFetchRecipe(recipeId);

    const [imageUrl, setImageUrl] = useState("")
    const imageSrc = useCheckImage(imageUrl, RecipeImagePlaceholder);


    const [newIngredient, setNewIngredient] = useState("")
    const [newIngredientError, setNewIngredientError] = useState(false)

    const handleKeyDown = (e, callback) => {
        formRef.current.handleBlur("ingredients")
        if (newIngredient !== "") {
            if (e.key === "Enter" || e.keyCode === 13) {
                callback(newIngredient)
                setNewIngredient("")
                setNewIngredientError(false)
            }
        }
        else {
            setNewIngredientError(true)
        }
    }

    const handleNewIngredientChange = (e) => {
        formRef.current.handleBlur("ingredients")

        e.target.value === "" ? setNewIngredientError(true) : setNewIngredientError(false)
        setNewIngredient(e.target.value)
    }


    return (
        <Layout
            title={isEditRecipe ? "Edit recipe" : "Add new recipe"}
            elements={
                <>
                    <Button callback={() => formRef.current.handleSubmit()}>
                        {isEditRecipe ? "Edit recipe" : "Add Recipe +"}
                    </Button>
                    <Button isTertiary callback={() => navigate(-1)}>Back</Button>

                </>
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
                    newIngredient: "",

                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Recipe name is required')
                        .max(40, 'Recipe name must be less than 40 characters'),
                    description: Yup.string()
                        .required('Description is required')
                        .min(30, 'Description must be at least 30 characters')
                        .max(1500, 'Description must be less than 1500 characters'),
                    ingredients: Yup.array()
                        .of(Yup.string()
                            .required('Ingredient name is required')
                            .max(20, 'Ingredient name must be less than 20 characters')
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
                        .max(20, 'New ingredient name must be less than 20 characters')

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
                            } :
                            {
                                name: values.name,
                                description: values.description,
                                ingredients: values.ingredients,
                                cookTimeMin: values.cookTimeMin,
                                imgUrl: values.imgUrl,
                                createdBy: userData.uid || "",
                                createdAt: new Date()
                            }

                        isEditRecipe ?
                            await putRecipeData(formattedValues, recipeId)
                            :
                            await postRecipeData(formattedValues)

                        actions.setSubmitting(false);
                        actions.resetForm({
                            name: "",
                            description: "",
                            imgUrl: "",
                            ingredients: "",
                            cookTimeMin: ""
                        });
                        setImageUrl("")

                        // navigate("")

                        setToastType({
                            open: true,
                            // message: values.name + " is successfuly " + isEditRecipe ? "updated!" : "added!",
                            message: `${values.name} is successfully ${isEditRecipe ? "updated!" : "added!"}`,

                            type: 'success',

                        });
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
                                                name="cookTimeMin"
                                                type='cookTimeMin'
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
                                                            onKeyDown={(e) => formik.values.ingredients.length < 20 ?
                                                                handleKeyDown(e, (newValue) => {
                                                                    arrayHelpers.insert(
                                                                        formik.values.ingredients.length - 1,
                                                                        newValue
                                                                    );
                                                                }) : null
                                                            }
                                                            onChange={(e) => handleNewIngredientChange(e)}
                                                        />
                                                        <Button
                                                            type="button"
                                                            callback={() => {
                                                                if (formik.values.ingredients.length < 20) {
                                                                    arrayHelpers.insert(formik.values.ingredients.length - 1, newIngredient);
                                                                    setNewIngredient("");
                                                                }
                                                            }}
                                                            disabled={newIngredient === ""}
                                                            height="100%"
                                                        >
                                                            +
                                                        </Button>
                                                    </div>
                                                    <ErrorMessageCustom isError={newIngredientError}>Ingredient cannot be empty</ErrorMessageCustom>
                                                    <ErrorMesagge component={'div'} name="ingredients" />

                                                </SectionWrapper>
                                                <RecipeIngredientsWrapper>
                                                    {formik.values.ingredients.map((ingredient, index) => (
                                                        <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                                            <Chip size="large" name={ingredient} type="error" icon={CloseIcon} iconCallback={() => arrayHelpers.remove(index)} />
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
                        </RecipeWrapper>
                    </Form>
                )
                }
            </Formik >
        </Layout >
    )
}

export default RecipesAddNew