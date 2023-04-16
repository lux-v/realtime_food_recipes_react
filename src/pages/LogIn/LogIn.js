import React, { useContext } from 'react';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
// import { loginUser, getUserByID } from '../../api/users';
import { AuthContext } from '../../context/AuthContext';

import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Form,
  Field,
  FormRow,
  ErrorMesagge,
  FormLabel,
  FormIcon,
  RequiredSpan,
} from '../../lib/style/generalStyles';
import Button from '../../components/Button/Button';
import LogoPic from '../../assets/img/logo.svg';
import {
  LogoContainer,
  LogoImg,
  ImageImage,
  ImageContainer,
  Wrapper,
  ButtonWrapper,
  BlueLink,
  BigWrapper,
  LineEffectWrapper,
} from './LoginStyle';
import FruitBowls from '../../assets/img/3-bowel-fruit.png';
import IconProfile from "../../assets/img/profile.svg"
import IconKey from "../../assets/img/key.png"
import LineEffect from "../../assets/img/line-effect.png"

import app from "../../firebase"

const LogIn = () => {
  const { setToastType, userData, setIsLoggedIn, setUserData, login } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <BigWrapper>
      <Wrapper>
        <Formik
          initialValues={{
            email: '',
            password: '',
            isAdmin: false,
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid e-mail address')
              .required('Email is required'),
            password: Yup.string()
              .min(8, 'Password must be at least 8 characters long')
              .required('Password is required'),
          })}
          onSubmit={async (values, actions) => {
            // try {
            //   const res = await loginUser(values);
            //   const userData = await getUserByID(
            //     res.access_token,
            //     jwt(res.access_token).id,
            //   );

            //   localStorage.setItem('userDataAll', JSON.stringify(userData));
            //   localStorage.setItem('accessToken', res.access_token);

            //   setIsLoggedIn(true);
            //   setUserData(userData);
            //   setToastType({
            //     open: true,
            //     message: `Welcome back, ${userData.first_name}.`,
            //     type: 'success',
            //   });

            //   navigate('/lectures');

            //   actions.setSubmitting(false);
            //   actions.resetForm({
            //     email: '',
            //     password: '',
            //   });
            // } catch (err) {
            //   setToastType({
            //     open: true,
            //     message: `Email or password is not correct. Please try again.`,
            //     type: 'error',
            //   });
            // } 
            try {
              await login(values.email, values.password)

              navigate("/")

              setToastType({
                open: true,
                message: `Welcome back, ${userData.first_name}.`,
                type: 'success',
              });

            }
            catch (err) {
              setToastType({
                open: true,
                message: err.message,
                type: 'error',
              });
            }

          }}
        >
          {(formik) => (
            <Form >
              <LogoContainer>
                <LogoImg src={LogoPic} />
              </LogoContainer>
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
              <FormRow right>
                <BlueLink to="/forgotPassword">Forgot your password?</BlueLink>
              </FormRow>
              <FormRow>
                <ButtonWrapper>
                  <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    isBtnOutline
                    isBtnForm
                    width="175px"
                  >
                    {formik.isSubmitting ? 'Processing...' : 'Login'}
                  </Button>
                </ButtonWrapper>
              </FormRow>
              <FormRow center>
                <FormLabel italic>Don't have an account? <BlueLink to="/signup">Sign up.</BlueLink> </FormLabel>
              </FormRow>
            </Form>
          )}
        </Formik>
      </Wrapper>
      <ImageContainer>
        <ImageImage src={FruitBowls} />
      </ImageContainer>
      <LineEffectWrapper>
        <img src={LineEffect} style={{ height: "100%" }} />
      </LineEffectWrapper>
    </BigWrapper >
  );
}
export default LogIn