import React, { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup"
import { AuthContext } from '../../context/AuthContext'
import useCheckImage from '../../hooks/useCheckImage'


import { Field, Form, ErrorMesagge, FormRow, FormLabel, RequiredSpan } from '../../lib/style/generalStyles'
import { ProfielImageWrapper, ProfileImage } from './ProfileStyle'

import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card'
import Layout from '../../components/Layout/Layout'

import profileImg from '../../assets/img/profile.svg'



const Profile = () => {
    const { userData, setToastType, updateUserProfile } = useContext(AuthContext)
    const imageSrc = useCheckImage(userData?.photoURL, profileImg)
    // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    return (
        <Layout title=" ">
            <Card title="Acount settings" >
                <Formik
                    initialValues={{
                        displayName: userData?.displayName || "",
                        // phoneNumber: userData?.phoneNumber || "",
                        photoURL: userData?.photoURL || "",

                    }}
                    validationSchema={Yup.object({
                        displayName: Yup.string().required("Display name is required."),
                        // phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
                        photoURL: Yup.string(),
                    })}
                    onSubmit={async (values, actions) => {
                        const user = { ...values }

                        try {
                            await updateUserProfile(user)
                            setToastType({
                                open: true,
                                message: "Your profile is successfuly updated.",
                                type: 'success',
                            });

                        } catch (error) {
                            setToastType({
                                open: true,
                                message: error.message,
                                type: 'error',
                            });
                        }
                    }}
                >
                    {(formik) =>
                        <Form>
                            <ProfielImageWrapper>
                                <ProfileImage src={imageSrc} />
                            </ProfielImageWrapper>
                            <FormRow>
                                <FormLabel>Display name <RequiredSpan>*</RequiredSpan></FormLabel>
                                <Field
                                    id="displayName"
                                    name="displayName"
                                    placeholder="Display name"
                                />
                                <ErrorMesagge as={"div"}>{formik.errors.displayName}</ErrorMesagge>
                            </FormRow>
                            {/* <FormRow>
                                <FormLabel>Phone number </FormLabel>
                                <Field
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Phone number"
                                />
                                <ErrorMesagge as={"div"}>{formik.errors.phoneNumber}</ErrorMesagge>
                            </FormRow> */}
                            <FormRow>
                                <FormLabel>Photo URL </FormLabel>
                                <Field
                                    id="photoURL"
                                    name="photoURL"
                                    placeholder="Photo Url"
                                />
                                <ErrorMesagge as={"div"}>{formik.errors.photoURL}</ErrorMesagge>
                            </FormRow>
                            <Button>Update</Button>
                        </Form>
                    }
                </Formik>
            </Card>
        </Layout >
    )
}

export default Profile