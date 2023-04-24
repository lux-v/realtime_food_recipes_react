import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

import { FieldArray, Formik } from 'formik'
import * as Yup from "yup"

import Layout from '../../components/Layout/Layout'
import { Form, FormRow, Field, SmallField, FormLabel, ErrorMesagge, RequiredSpan, TextArea, TwoInRow } from '../../lib/style/generalStyles'

import IngredientCard from '../../components/IngredientCard/IngredientCard'
import {
    IngredientCardWrapper,
    IngredientCardGrid,
} from '../../components/IngredientCard/IngredientCardStyle';
import { Button } from '../../components/Button/ButtonStyle'

const RecipesAddNew = () => {
    const { setToastType } = useContext(AuthContext)

    return (
        <Layout
            title=""
            elements={
                <>
                    <Button>
                        Create
                    </Button>
                </>
            }
        >

            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    ingredients: [],
                    imgUrl: "",
                    cookTimeMin: ""

                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Recipe name is required'),
                    description: Yup.string()
                        .required('Description is required'),
                    ingredients: Yup.array(
                        Yup.object({
                            name: Yup.string().required('Ingredient name is required'),
                        })),
                    imgUrl: Yup.string(),
                    cookTimeMin: Yup.string(),

                })}
                onSubmit={async (values, actions) => {
                    try {

                        const formattedValues = { ...values }

                        // await postRecipe(formattedValues)

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
                            message: 'Recipe is added!',
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
                    <div style={{ display: "flex", justifyContent: "center", height: "100%", width: "100%", }}>

                        <Form>
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

                            <FieldArray name="ingredients">
                                {(fieldArrayProps) => {
                                    const { form } = fieldArrayProps;
                                    const { values } = form;
                                    const { ingredients } = values;

                                    return (
                                        <>
                                            <IngredientCardWrapper>
                                                <IngredientCardGrid>
                                                    {ingredients.map((ingredient, index) => {
                                                        return (
                                                            <IngredientCard
                                                                key={index}
                                                                formik={formik}
                                                                index={index}
                                                                ingredient={ingredient}

                                                            // fetch={fetchingredients}
                                                            />
                                                        );
                                                    })}
                                                </IngredientCardGrid>
                                            </IngredientCardWrapper>
                                        </>
                                    );
                                }}
                            </FieldArray>

                        </Form>
                    </div>

                )}
            </Formik>
        </Layout >
    )
}

export default RecipesAddNew