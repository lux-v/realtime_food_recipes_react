import styled from "styled-components";
import {
    breakpoints,
    colors
} from "../../lib/style/theme";


export const RecipieCardWrapper = styled.div`
    display: flex;
    flex-direction:column;
    max-width: 650px;
    height: auto;
    max-height:500px;
    background: white;
    border-radius: 8px;
    padding: 10px;
    gap: 10px;


    @media (${breakpoints.tablet}) {
        height: 200px;
        flex-direction:row;
    }

    &:hover {
        
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        background-color: ${colors.columnBackground};
        scale: 1.01;
    }

`;

export const ImageWrapper = styled.div`
`;

export const RecipeImage = styled.img`
    width: 100%;
    height: 175px;
    object-fit: cover;
    border-radius: 8px;

    @media (${breakpoints.tablet}) {
        width: 175px;
        height: 175px;
        object-fit: cover;
    }
`;


export const TextWrapper = styled.p`
    user-select:none;
`;

export const RecipeName = styled.p`
    color: ${colors.textPrimary};
    font-size: 16px;
    font-weight: 700;
    line-height: 29px;

    @media (${breakpoints.tablet}) {
        line-height: 39px;
    }
`;

export const RecipeDescription = styled.p`
    color: ${colors.textPrimary};
    font-size: 14px;
    font-weight: 500;


    height:65px;
`;

export const RecipeIngredientsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:5px;
`;


