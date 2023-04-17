import React from 'react'
import { useNavigate } from 'react-router-dom';
import { colors, fonts } from '../../lib/style/theme'

import LineEffect from '../../assets/img/line-effect.png';
import LogoPic from '../../assets/img/logo.png';
import TwoFoodPlates from "../../assets/img/2-food-plates.png"
import { LineEffectWrapper, LogoContainer, LogoImg } from '../LogIn/LoginStyle';
import Button from '../../components/Button/Button'
import { AnswerText, GrayTextStyle, GreenTextStyle, LandingContainer, LandingHeader, LogoWrapper, MainTextWrapper, QuestionText, RedTextStyle, SecondaryTextWrapper, TextWrapper, TwoFoodPlatesWrapper } from './LandingStyle';


const Landing = () => {
    const navigate = useNavigate()

    return (
        <LandingContainer>
            <LandingHeader>
                <Button
                    isSecondary
                    callback={() => navigate("/how-it-works")}
                >
                    How It Works
                </Button>
                <Button
                    isSecondary
                    callback={() => navigate("/about-us")}
                >
                    About Us
                </Button>
                <Button
                    callback={() => navigate("/login")}
                >
                    Login
                </Button>
            </LandingHeader>


            <LineEffectWrapper topLeft maxWidth="50vh">
                <img src={LineEffect} />
            </LineEffectWrapper>

            <LineEffectWrapper>
                <img src={LineEffect} />
            </LineEffectWrapper>

            <LogoWrapper>
                <img src={LogoPic} style={{ height: "100px" }} />
            </LogoWrapper >

            <TwoFoodPlatesWrapper>
                <img src={TwoFoodPlates} style={{ width: "100%", height: "100%", objectFit: "cover", }} />
            </TwoFoodPlatesWrapper >

            <TextWrapper>
                <MainTextWrapper>
                    <RedTextStyle>
                        GOOD
                    </RedTextStyle>
                    <RedTextStyle>
                        HEALTH
                    </RedTextStyle>
                    <GrayTextStyle>
                        starts with
                    </GrayTextStyle>
                    <GreenTextStyle>GOOD</GreenTextStyle>
                    <GreenTextStyle>CHOICES</GreenTextStyle>

                </MainTextWrapper>

                <SecondaryTextWrapper>
                    <QuestionText>
                        "What sould I eat today?"
                    </QuestionText>
                    <AnswerText>
                        We are here to help you! Choose food that you already have in you'r fridge and we will suggest new and innovative recipes that you can try!
                    </AnswerText>

                </SecondaryTextWrapper>

            </TextWrapper>


        </LandingContainer>
    )
}

export default Landing