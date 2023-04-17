import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


import Button from '../../components/Button/Button';
import Toast from '../../components/Toast/Toast';
import icon from '../../assets/img/password-icon.svg';

import * as Yup from 'yup';
import { Formik } from 'formik';
import {
    Form,
    Field,
    FormRow,
    ErrorMesagge,
    FormLabel,
    RequiredSpan,
    PasswordIcon,
} from '../../lib/style/generalStyles';
import Content from '../../components/Layout/Content/Content';
import { BlueLink } from '../LogIn/LoginStyle';

export default function AddNewStudent() {
    const location = useLocation();
    const navigate = useNavigate()

    const { toastType, setToastType, resetPassword } = useContext(AuthContext);



    return (
        <>
            <Content title="Password Reset" isCentered isChangePassword>
                <Formik
                    initialValues={{
                        email: "",
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Invalid e-mail address')
                            .required('Email is required'),
                    })}
                    onSubmit={async (values, actions) => {
                        try {
                            await resetPassword(values.email)

                            actions.setSubmitting(false);
                            actions.resetForm({
                                password: '',
                                passwordConfirmed: '',
                            });

                            setToastType({
                                open: true,
                                message: 'Check your email to futher instructions.',
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
                        <Form profile isCentered>
                            <FormRow>
                                <FormLabel>
                                    Email<RequiredSpan>*</RequiredSpan>
                                </FormLabel>
                                <Field
                                    id="email"
                                    name="email"
                                    type='email'
                                    error={formik.touched.email && formik.errors.email}
                                    placeholder="Your email"
                                    disabled={formik.isSubmitting}
                                />
                                <ErrorMesagge component={'div'} name="email" />
                            </FormRow>
                            <FormRow center>
                                <Button >
                                    Reset Password
                                </Button>

                            </FormRow>
                            <FormRow center >
                                <Button isSecondary type="button" callback={() => navigate("/login")}>
                                    Login
                                </Button>
                            </FormRow>
                            <FormRow center>
                                <FormLabel italic>Don't have an account? <BlueLink to="/signup">Sign up.</BlueLink> </FormLabel>
                            </FormRow>
                        </Form>
                    )}
                </Formik>
                <Toast toastType={toastType} setToastType={setToastType} />
            </Content>
        </>
    );
}
