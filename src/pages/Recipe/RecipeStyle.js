import styled from "styled-components";
import { border, breakpoints, colors, fonts } from "../../lib/style/theme";


export const RecipeWrapper = styled.div`
    height:100%;
    width:100%;

    background: white;
    border-radius: ${border.borderRadius};
    padding: 10px;

    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border:1px solid ${colors.tableBorder};
`

export const TopSideWrapper = styled.div`
    display:flex;
    justify-items:center;
    flex-direction:column-reverse;

    height:100%;
    width:100%;
    gap:5px;

    margin-bottom:20px;
    padding-bottom:5px;
    border-bottom:0.5px solid ${colors.primaryError};

    @media (${breakpoints.tablet}) {
        margin-bottom:30px;
    }
        
    @media (${breakpoints.desktop}) {
        margin-bottom:40px;
        flex-direction:row;
    }
`



export const BottomSideWrapper = styled.div`
    /* height:50%; */
    width:100%;

    justify-items:center;

    @media (${breakpoints.tablet}) {

    }
        
    @media (${breakpoints.desktop}) {
        height:100%;
        width:50%;
    }
`

export const LeftSideWrapper = styled.div`
    height:50%;
    width:100%;

    @media (${breakpoints.tablet}) {
 
    }
        
    @media (${breakpoints.desktop}) {
        width:50%;
        /* height:100%; */
        height:550px;
    }
`

export const RightSideWrapper = styled.div`
    display:flex;
    height:50%;
    width:100%;

    justify-items:center;

    @media (${breakpoints.tablet}) {

    }
        
    @media (${breakpoints.desktop}) {
         /* height:100%; */
        width:50%; 
        /* width:550px; */
        height:550px;
    }
`

export const LoadingSpinnerWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100%;
`

export const RecipeImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    border-radius: ${border.borderRadius};

    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`



export const SectionWrapper = styled.div`
    margin-bottom:20px;
`

export const SectionHeadline = styled.p`
    color: ${colors.secondaryError}; 
    font-family: ${fonts.primary}; 
    line-height: 18px; 
    font-size: 16px; 
    font-weight: 700;

    margin: 0 10px 10px 10px;

    @media(${breakpoints.tablet}){
        line-height: 20px; 
        font-size: 18px; 
    }

    @media(${breakpoints.desktop}){
        line-height: 22px; 
        font-size: 20px; 
    }
`

export const TextContent = styled.p`
    color: ${colors.textPrimary}; 
    font-family: ${fonts.primary}; 
    line-height: 16px; 
    font-size: 14px; 
    font-weight: 400;

    @media(${breakpoints.tablet}){
        line-height: 18px; 
        font-size: 16px; 
    }

    @media(${breakpoints.desktop}){
        line-height: 20px; 
        font-size: 18px; 
    }

`
export const IngredientsWrapper = styled.div`
    
    display:flex;
    flex-wrap:wrap;
    gap:5px;
    font-family:${fonts.primary};

    height:50px;
    overflow:hidden;

`
