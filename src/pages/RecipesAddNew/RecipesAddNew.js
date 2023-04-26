import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

import { FieldArray, Formik } from 'formik'
import * as Yup from "yup"

import Layout from '../../components/Layout/Layout'
import { Form, FormRow, Field, SmallField, FormLabel, ErrorMesagge, RequiredSpan, TextArea, TwoInRow, InputField, ErrorMessageCustom } from '../../lib/style/generalStyles'

import Button from '../../components/Button/Button'
import Chip from '../../components/Chip/Chip'
import { RecipeIngredientsWrapper, CloseIcon } from './RecipesAddNewStyles'
import { postRecipeData } from '../../api/recipes'

const RecipesAddNew = () => {
    const { setToastType, userData } = useContext(AuthContext)
    const formRef = useRef(null)

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
            title="Add new recipe"
            elements={
                <>
                    <Button callback={() => formRef.current.handleSubmit()}>
                        Add ++
                    </Button>
                </>
            }
        >
            <Formik
                innerRef={formRef}
                initialValues={{
                    name: "",
                    description: "",
                    ingredients: [],
                    imgUrl: "",
                    cookTimeMin: "",
                    newIngredient: "",

                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Recipe name is required'),
                    description: Yup.string()
                        .required('Description is required'),
                    ingredients: Yup.array(Yup.string().required('Ingredient name is required'),
                    ).max(19, "Maximum number of ingredients is 20"),
                    imgUrl: Yup.string(),
                    cookTimeMin: Yup.string(),
                    newIngredient: Yup.string(),

                })}
                onSubmit={async (values, actions) => {
                    try {
                        const formattedValues = {
                            name: values.name,
                            description: values.description,
                            ingredients: values.ingredients,
                            cookTimeMin: values.cookTimeMin,
                            imgUrl: values.imgUrl,
                            createdBy: userData.uid || "",
                            createdAt: new Date()

                        }

                        console.log("formattedValues: ", formattedValues)

                        await postRecipeData(formattedValues)

                        actions.setSubmitting(false);
                        actions.resetForm({
                            name: "",
                            description: "",
                            imgUrl: "",
                            ingredients: "",
                            cookTimeMin: ""
                        });

                        setToastType({
                            open: true,
                            message: values.name + " is added!",
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
                    console.log("formik :", formik),

                    <Form>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignContent: "center", alignItems: "center", width: "600px", margin: "auto" }}>
                            <FormRow>
                                <FormLabel>
                                    Name: <RequiredSpan>*</RequiredSpan>
                                </FormLabel>

                                <Field id="name"
                                    name="name"
                                    type='name'
                                    error={formik.touched.name && formik.errors.name}
                                    placeholder="Recipe name"
                                    disabled={formik.isSubmitting}
                                />
                                <ErrorMesagge component={'div'} name="name" />
                            </FormRow>
                            <FormRow>
                                <FormLabel>
                                    Description: <RequiredSpan>*</RequiredSpan>
                                </FormLabel>
                                <TextArea
                                    id="description"
                                    name="description"
                                    type='description'
                                    error={formik.touched.description && formik.errors.description}
                                    placeholder="Recipe description"
                                    disabled={formik.isSubmitting}
                                />
                                <ErrorMesagge component={'div'} name="description" />
                            </FormRow>

                            <TwoInRow>
                                <FormRow>
                                    <FormLabel>
                                        Cook time(min):
                                    </FormLabel>
                                    <SmallField
                                        id="cookTimeMin"
                                        name="cookTimeMin"
                                        type='cookTimeMin'
                                        error={formik.touched.cookTimeMin && formik.errors.cookTimeMin}
                                        placeholder="Cook time(min)"
                                        disabled={formik.isSubmitting}
                                    />
                                    <ErrorMesagge component={'div'} name="cookTimeMin" />
                                </FormRow>
                                <FormRow>
                                    <FormLabel>
                                        Image URL:
                                    </FormLabel>
                                    <SmallField
                                        id="imgUrl"
                                        name="imgUrl"
                                        type='imgUrl'
                                        error={formik.touched.imgUrl && formik.errors.imgUrl}
                                        placeholder="Image URL"
                                        disabled={formik.isSubmitting}
                                    />
                                    <ErrorMesagge component={'div'} name="imgUrl" />
                                </FormRow>

                            </TwoInRow>
                            <FieldArray
                                name="ingredients"
                                render={arrayHelpers => (
                                    <>

                                        <FormRow>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <InputField
                                                    id="newIngredient"
                                                    name="newIngredient"
                                                    type='newIngredient'
                                                    error={newIngredientError}
                                                    placeholder="Add ingredient"
                                                    disabled={formik.isSubmitting}
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
                                                    // callback={
                                                    //     () =>
                                                    //         formik.values.ingredients.length < 20 ?
                                                    //             {
                                                    //                 arrayHelpers.insert(
                                                    //                     formik.values.ingredients.length - 1,
                                                    //                     newIngredient
                                                    //                 );
                                                    //                 setNewIngredient("");
                                                    //             }
                                                    //             : null
                                                    // }
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
                                        </FormRow>
                                        <RecipeIngredientsWrapper>
                                            {formik.values.ingredients.map((ingredient, index) => (
                                                <div key={index} style={{ display: "flex", alignItems: "center" }}>
                                                    <Chip name={ingredient} type="error" icon={<CloseIcon onClick={() => arrayHelpers.remove(index)} />} />
                                                </div>
                                            ))}
                                        </RecipeIngredientsWrapper>

                                    </>
                                )}
                            />
                        </div>
                    </Form>
                )
                }
            </Formik >
        </Layout >
    )
}

export default RecipesAddNew