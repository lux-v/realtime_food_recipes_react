import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { Formik } from 'formik';
import {
    Form,
    Field,
    FormRow,
    ErrorMesagge,
    FormLabel,
    FormIcon,
    LogoContainer,
    LogoImg,
    BlueLink,

    SignUpWrapper,
    FormWrapper,
    ImageImage,
    ImageContainer,
    ButtonWrapper,
    LineEffectWrapper,
    LoginHeadText,
    EnterCredentialsText,

} from '../../lib/style/generalStyles';
import Button from '../../components/Button/Button';
import LogoPic from '../../assets/img/logo.png';


import FruitBowls from '../../assets/img/3-bowel-fruit.png';
import IconProfile from "../../assets/img/profile.svg"
import IconKey from "../../assets/img/key.png"
import LineEffect from "../../assets/img/line-effect.png"
// import GoogleIcon from '../../assets/img/google-icon.png';
import { SignUpSchema } from '../../utils/validationSchema';

export default function SignUp() {
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    // const handleGoogleSignup = async () => {
    //     try {
    //         await googleSignin()
    //             .then(res => {
    //                 handleUser(res.user)

    //                 const displayName = res.user.displayName
    //                 navigate('/dashboard');

    //                 setToastType({
    //                     open: true,
    //                     message: `Hello, ${displayName}`,
    //                     type: 'success',
    //                 });
    //             })



    //     } catch (err) {
    //         setToastType({
    //             open: true,
    //             message: err.message,
    //             type: 'error',
    //         });
    //     }
    // }

    return (
        <SignUpWrapper>
            <FormWrapper>
                <Formik
                    initialValues={{
                        name: "",
                        email: '',
                        password: '',
                        confirmPassword: "",
                        isAdmin: false,
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={async (values, actions) => {
                        await signup(values.email, values.password, values.name)

                    }}
                >
                    {(formik) => (
                        <Form>
                            <LogoContainer>
                                <LogoImg src={LogoPic} alt="logo" onClick={() => navigate("/")} />
                            </LogoContainer>
                            <div>
                                <LoginHeadText >Sign up</LoginHeadText>
                                <EnterCredentialsText>
                                    Enter your credentials to continue
                                </EnterCredentialsText>
                            </div>
                            <FormRow>
                                <FormIcon src={IconProfile} />
                                <Field
                                    type="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    disabled={formik.isSubmitting}
                                    error={formik.touched.name && formik.errors.name}
                                    isSecondary={true}
                                    width="100%"

                                />
                                <ErrorMesagge component={'div'} name="name" />
                            </FormRow>
                            <FormRow>
                                <FormIcon src={IconProfile} />
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    disabled={formik.isSubmitting}
                                    error={formik.touched.email && formik.errors.email}
                                    isSecondary={true}
                                    width="100%"

                                />
                                <ErrorMesagge component={'div'} name="email" />
                            </FormRow>
                            <FormRow>
                                <FormIcon src={IconKey} />
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter the password"
                                    disabled={formik.isSubmitting}
                                    error={formik.touched.password && formik.errors.password}
                                    isSecondary={true}
                                    width="100%"

                                />
                                <ErrorMesagge component={'div'} name="password" />
                            </FormRow>
                            <FormRow>
                                <FormIcon src={IconKey} />
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    disabled={formik.isSubmitting}
                                    error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    isSecondary={true}
                                    width="100%"

                                />
                                <ErrorMesagge component={'div'} name="confirmPassword" />
                            </FormRow>

                            <FormRow>
                                <ButtonWrapper>
                                    <Button
                                        type="submit"
                                        disabled={formik.isSubmitting}
                                        isBtnOutline
                                        isBtnForm
                                        width='100%'
                                    >
                                        {formik.isSubmitting ? 'Processing...' : 'Sign up'}
                                    </Button>
                                </ButtonWrapper>
                            </FormRow>
                            {/* <FormRow>
                                <ButtonWrapper>
                                    <Button isSecondary type="button" width='100%'
                                    // callback={handleGoogleSignup}
                                    >
                                        <img
                                            src={GoogleIcon}
                                            style={{ height: '25px' }}
                                            alt="google-icon"
                                        />
                                        <p style={{ margin: 'auto' }}>
                                            Sign in with Google
                                        </p>
                                    </Button>
                                </ButtonWrapper>
                            </FormRow> */}
                            <FormRow center>
                                <FormLabel italic>Already have an account? <BlueLink to="/login">Log in.</BlueLink> </FormLabel>
                            </FormRow>
                        </Form>
                    )}
                </Formik>
            </FormWrapper>
            <ImageContainer>
                <ImageImage src={FruitBowls} />
            </ImageContainer>
            <LineEffectWrapper>
                <img src={LineEffect} alt="line-effect" style={{
                    height: "100%", transform: "scaleX(-1)"
                }} />
            </LineEffectWrapper>
        </SignUpWrapper >
    );
}
