import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  LogoContainer,
  LogoImg,
  BlueLink,

  SignUpWrapper,
  FormWrapper,
  ButtonWrapper,
  ImageImage,
  ImageContainer,
  LineEffectWrapper,
  LoginHeadText,
  EnterCredentialsText,

} from '../../lib/style/generalStyles';
import Button from '../../components/Button/Button';
import LogoPic from '../../assets/img/logo.png';

import FruitBowls from '../../assets/img/3-bowel-fruit.png';
import IconProfile from '../../assets/img/profile.svg';
import IconKey from '../../assets/img/key.png';
import LineEffect from '../../assets/img/line-effect.png';
import GoogleIcon from '../../assets/img/google-icon.png';
import { LoginSchema } from '../../utils/validationSchema';



const LogIn = () => {
  const { setToastType, login, setIsLoggedIn
    // googleSignin 
  } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // const handleGoogleSignup = async () => {
  //   try {
  //     await googleSignin()
  //       .then(res => {

  //         const displayName = res.user.displayName
  //         navigate('/dashboard');

  //         setToastType({
  //           open: true,
  //           message: `Hello, ${displayName}`,
  //           type: 'success',
  //         });
  //       })

  //   } catch (err) {
  //     setToastType({
  //       open: true,
  //       message: err.message,
  //       type: 'error',
  //     });
  //   }
  // }

  return (
    <SignUpWrapper>
      <FormWrapper>
        <Formik
          initialValues={{
            email: '',
            password: '',
            isAdmin: false,
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values, actions) => {

            try {
              await login(values.email, values.password)

            } catch (err) {
              setToastType({
                open: true,
                message: err.message,
                type: 'error',
              });

              localStorage.clear("accessToken")
              setIsLoggedIn(false)
            }
          }}
        >
          {(formik) => (
            <FormWrapper>
              <Form>
                <LogoContainer>
                  <LogoImg src={LogoPic} onClick={() => navigate("/")} />
                </LogoContainer>
                <div>
                  <LoginHeadText>Welcome back</LoginHeadText>
                  <EnterCredentialsText>
                    Enter your credentials to continue
                  </EnterCredentialsText>
                </div>
                <FormRow>
                  <FormIcon src={IconProfile} />
                  <Field
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    disabled={formik.isSubmitting}
                    error={
                      formik.touched.email &&
                      formik.errors.email
                    }
                    isSecondary={true}
                    width='100%'
                  />
                  <ErrorMesagge component={'div'} name='email' />
                </FormRow>
                <FormRow>
                  <FormIcon src={IconKey} />
                  <Field
                    type='password'
                    name='password'
                    placeholder='Enter the password'
                    disabled={formik.isSubmitting}
                    error={
                      formik.touched.password &&
                      formik.errors.password
                    }
                    isSecondary={true}
                    width='100%'
                  />
                  <ErrorMesagge
                    component={'div'}
                    name='password'
                  />
                </FormRow>

                <FormRow>
                  <ButtonWrapper>
                    <Button
                      type='submit'
                      disabled={formik.isSubmitting}
                      isBtnOutline
                      isBtnForm
                      width='100%'
                    >
                      {formik.isSubmitting
                        ? 'Processing...'
                        : 'Log in'}
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
                      Log in with Google
                    </p>
                  </Button>
                </ButtonWrapper>
              </FormRow> */}
                <FormRow right>
                  <BlueLink to='/password-reset'>
                    Forgot your password?
                  </BlueLink>
                </FormRow>
                <FormRow center>
                  <FormLabel italic>
                    Don't have an account?{' '}
                    <BlueLink to='/signup'>Sign up.</BlueLink>
                  </FormLabel>
                </FormRow>
              </Form>
            </FormWrapper>
          )}
        </Formik>
      </FormWrapper>
      <ImageContainer login>
        <ImageImage login src={FruitBowls} />
      </ImageContainer>
      <LineEffectWrapper login>
        <img src={LineEffect} alt="line-effect" style={{ height: '100%' }} />
      </LineEffectWrapper>
    </SignUpWrapper>
  );
};
export default LogIn;
