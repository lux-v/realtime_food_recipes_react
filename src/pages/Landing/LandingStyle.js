import styled from "styled-components";
import { colors, fonts, breakpoints } from "../../lib/style/theme";

export const LandingContainer = styled.div`
    position: relative;
    overflow:auto;
    height: 100%;
    background: ${colors.bgPrimary};
`

export const LandingHeader = styled.div`
   position: absolute;
    top: 0;
    right: 0;
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
    gap: 15px;
    background: linear-gradient(269.98deg, #FFFFFF 49.25%, rgba(255, 255, 255, 0) 84.94%);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    z-index: 2;
`


export const LogoWrapper = styled.div`
    display:none;
    position: absolute; 
    top: 20px; 
    left: 20px; 
    z-index: 1;

    @media(${breakpoints.tablet}){
        display:block;
    }
`

export const TwoFoodPlatesWrapper = styled.div`
  position: absolute; 
  display: flex; 
  align-items: center; 
  bottom: 0; 
  left: 0; 
  height: 100%; 
  overflow: hidden;
`

export const TextWrapper = styled.div`
    position: absolute; 
    right: 40px; 
    /* height: calc(100% - 100px);  */
    margin-top: 100px ;
    z-index: 1; 
    display: flex; 
    flex-direction:column;
    align-items: flex-end; 
    text-align: right;
    padding:10px;

    @media(${breakpoints.tablet}){
        right: 15%
    }   
    
`

export const MainTextWrapper = styled.div`
    
`


export const RedTextStyle = styled.p`
    color: ${colors.primary}; 
    font-family: ${fonts.primary}; 
    line-height: 130px; 
    font-size: 128px; 
    font-weight: 700;
`

export const GrayTextStyle = styled.p`
    color: ${colors.textTertiary}; 
    font-family: ${fonts.primary}; 
    line-height: 130px; 
    font-size: 97px; 
    font-weight: 700;
    border-radius: 4px;
    padding:10px;
`

export const GreenTextStyle = styled.p`
    color: ${colors.textSecondary}; 
    font-family: ${fonts.primary}; 
    line-height: 130px; 
    font-size: 97px; 
    font-weight: 700;
`

export const SecondaryTextWrapper = styled.div`
    background-color: ${colors.white05};
    width:600px;
    padding: 10px;
    border-radius: 10px;    
`

export const QuestionText = styled.p`
    color: ${colors.textMenu}; 
    font-family: ${fonts.primary}; 
    line-height: 20px; 
    font-size: 16px; 
    font-weight: 700;
`


export const AnswerText = styled.p`
    color: ${colors.textMenu}; 
    font-family: ${fonts.primary}; 
    line-height: 20px; 
    font-size: 16px; 
    font-weight: 400;
`

export const StartFreeWrapper = styled.div`
    position:absolute;
    bottom: 10%;
    left: 30%
`


