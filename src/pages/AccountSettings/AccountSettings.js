import React, { useContext } from 'react'
import { Formik } from 'formik'
import { AuthContext } from '../../context/AuthContext'
import useCheckImage from '../../hooks/useCheckImage'


import { Field, Form, ErrorMesagge, FormRow, FormLabel, RequiredSpan } from '../../lib/style/generalStyles'
import { ProfileImageWrapper, ProfileImage, CardsWrapper, CardWrapper } from './AccountSettingsStyle'

import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card'
import Layout from '../../components/Layout/Layout'
import profileImg from '../../assets/img/profile.svg'
import { AccountSettingSchema } from '../../utils/validationSchema'


import PresetColor from '../../components/PresetColor/PresetColor'

const AccountSettings = () => {
    const { userData, setToastType, setModalType, updateUserProfile } = useContext(AuthContext)
    const imageSrc = useCheckImage(userData?.photoURL, profileImg)

    // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const handleOpenModal = (formik) => {
        setModalType({
            openModal: true,
            title: "Update account",
            content: "Are you sure you want to update your account?",
            actionCallback: () => formik.handleSubmit(),
        })
    }

    return (
        <Layout title=" ">
            <CardsWrapper>
                <CardWrapper>
                    <Card title="Acount settings">
                        <Formik
                            enableReinitialize
                            initialValues={{
                                displayName: userData?.displayName || "",
                                // phoneNumber: userData?.phoneNumber || "",
                                photoURL: userData?.photoURL || "",

                            }}
                            validationSchema={AccountSettingSchema}
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
                                    <ProfileImageWrapper>
                                        <ProfileImage src={imageSrc} />
                                    </ProfileImageWrapper>
                                    <FormRow>
                                        <FormLabel>Display name <RequiredSpan>*</RequiredSpan></FormLabel>
                                        <Field
                                            id="displayName"
                                            name="displayName"
                                            placeholder="Display name"
                                            width="100%"
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
                                            width="100%"
                                        />
                                        <ErrorMesagge as={"div"}>{formik.errors.photoURL}</ErrorMesagge>
                                    </FormRow>
                                    <Button type='button' callback={() => handleOpenModal(formik)} disabled={Boolean(JSON.stringify(formik.values) === JSON.stringify(formik.initialValues)) || formik.isSubmitting}>Update</Button>
                                </Form>
                            }
                        </Formik>
                    </Card>
                </CardWrapper>
                <CardWrapper>
                    <Card title="Preset color" >

                        <PresetColor />


                        {/* <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
                                <input type="radio" id="color1" name="color" value={"theme1"} checked={presetColor === "theme1"} onChange={() => setPresetColor("theme1")} />
                                <p>Theme1</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <input type="radio" id="color2" name="color" value={"theme2"} checked={presetColor === "theme2"} onChange={() => setPresetColor("theme2")} />
                                <p>Theme2</p>
                            </div>
                        </div> */}

                    </Card>

                    <Card title="Account statistics">
                        <h1>Ove info mozda stavit u dashboard a ne tu</h1>
                        <p>Number of published recipes: xy </p>
                        <p>Saved recipes: xy </p>
                        <p>Total recipes likes: xy</p>
                        <p>Mosed liked recipe: component...</p>
                        <p>Avrage recipe grade:(1-5 stars)</p>
                    </Card>
                </CardWrapper>
            </CardsWrapper>
        </Layout>
    )
}

export default AccountSettings