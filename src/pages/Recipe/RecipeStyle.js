import styled from "styled-components";
import { border, breakpoints, colors, fonts } from "../../lib/style/theme";


export const RecipeLikesWrapper = styled.div`
    position:absolute;
    right:0;
    display:flex;
    gap:5px;
    align-items:center;    
`

export const LikesNumber = styled.p`
    color: ${colors.textMenu}; 
    font-family: ${fonts.primary}; 
    line-height: 20px; 
    font-size: 18px; 
    font-weight: 700;
    
`

export const RecipeWrapper = styled.div`
    height:100%;
    width:100%;

    /* background: white;
    border-radius: ${border.borderRadius};
    padding: 10px;

    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border:1px solid ${colors.tableBorder}; */
`

export const TopSideWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-items:center;
    flex-direction:column-reverse;
    

    height:100%;
    width:100%;
    gap:20px;
    padding-bottom:5px;

    @media (${breakpoints.desktop}) {
        flex-direction:row;
    }
`

export const BottomSideWrapper = styled.div`
    width:100%;
    margin-bottom: 100px;
    margin-top:50px;
        
    @media (${breakpoints.desktop}) {
        height:100%;
        width:50%;
    }
`

export const LeftSideWrapper = styled.div`
    position:relative;
    height:50%;
    width:100%;

    @media (${breakpoints.desktop}) {
        width:50%;
        min-height:550px;
    }
`

export const RightSideWrapper = styled.div`
    display:flex;
    justify-items:center;
    height:100%;
    width:100%;

    @media (${breakpoints.mobile}) {
        height:350px;
    }

    @media (${breakpoints.tablet}) {
        height:450px;
    }

    @media (${breakpoints.desktop}) {
        width:50%; 
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
    width:100%;
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
    line-height: 18px; 
    font-size: 16px; 
    font-weight: 400;
    overflow-wrap: anywhere;

    @media(${breakpoints.tablet}){
        line-height: 20px; 
        font-size: 18px; 
    }
`
export const IngredientsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:5px;
    font-family:${fonts.primary};
`
