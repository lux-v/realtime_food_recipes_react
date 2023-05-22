import styled from "styled-components";
import { border, breakpoints, colors, fonts } from "../../lib/style/theme";


export const RecipeLikesWrapper = styled.div`
    /* position:absolute;
    right:0; */
    display:flex;
    gap:5px;
    align-items:center;   
    
`

export const LikesNumber = styled.p`
    color: ${({ theme }) => theme.textMenu}; 
    
    font-family: ${fonts.primary}; 
    line-height: 20px; 
    font-size: 18px; 
    font-weight: 700;
    
`

export const RecipeWrapper = styled.div`
    height:100%;
    width:100%;
`

export const TopSideWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-items:center;
    flex-direction:column-reverse;

    background: ${({ theme }) => theme.primary200};
    border-radius: 48px;

    padding:20px;
    margin:auto;
    

    height:100%;
    width:100%;
    max-width:1200px;
    gap:20px;


    @media (${breakpoints.desktop}) {
        flex-direction:row;
    }
`

export const BottomSideWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-items:center;
    flex-direction:column;

    background: ${({ theme }) => theme.bgPrimaryLight200};
    border-radius: 48px;

    padding:20px;
    margin:auto;

 
    max-width:1200px;

    width:100%;
    margin-top:50px;
    margin-bottom:50px;
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
    /* border-radius: ${border.borderRadius}; */
    border-radius: 48px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

export const SectionWrapper = styled.div`
    width:100%;
    margin-bottom:20px;
`

export const RecipeNameWrapper = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    gap:10px;
    width:100%;
    margin-bottom:20px;
`


export const SectionHeadline = styled.p`
    color: ${({ theme, secondary }) => secondary ? theme.primary700 : theme.textPrimary};

    font-family: ${fonts.primary}; 

    font-size:  ${props => props.fontSize || "18px"};
    font-weight: 700;

    margin: 0 10px 10px 10px;


`

export const TextContent = styled.p`
    color: ${({ secondary, theme }) => secondary ? theme.textPrimary : theme.textPrimary};
    font-family: ${fonts.primary}; 
    font-size: ${props => props.fontSize || "16px"}; 
    font-weight: 400;
    overflow-wrap: anywhere;

`
export const IngredientsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:5px;
    font-family:${fonts.primary};
`


