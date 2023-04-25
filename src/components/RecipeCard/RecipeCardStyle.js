import styled from "styled-components";
import {
    breakpoints,
    colors
} from "../../lib/style/theme";

import { ReactComponent as AddFavoriteIcon } from "../../assets/img/add-favorite.svg";

export const AddFavorite = styled(AddFavoriteIcon)`
    width:100%;
    height:100%;
    padding:6px;

    path {
        fill: ${colors.primary};    
    }
`;


export const RecipieCardWrapper = styled.div`
    display: flex;
    flex-direction:column;
    max-width: 650px;
    height: auto;
    max-height:500px;
    background: white;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;

    gap:5px;

    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    border:1px solid ${colors.tableBorder};


    @media (${breakpoints.tablet}) {
        height: 200px;
        flex-direction:row;
    }

    &:hover {
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        background-color: ${colors.white05};
        border-color:${colors.primary}; 
    }

`;

export const ImageWrapper = styled.div`
    border-radius:8px;
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


export const TextWrapper = styled.div`
    user-select:none;
    display:flex;
    flex-direction:column;
    gap:5px;


`;


export const NameFavoritesWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:5px;
`;

export const FavoriteIconWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;

    width:35px;
    height:35px;

    border:1px solid ${colors.modalBorder};
    border-radius:50%;

    background-color: white;

    overflow:hidden;
    
    &:hover {
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        scale: 1.1;
    }
`;



export const RecipeName = styled.p`
    /* LineClampStyle; */
    text-overflow: ellipsis;

    /* Needed to make it work */
    overflow: hidden;
    white-space: nowrap;

    color: ${colors.textPrimary};
    font-size: 16px;
    font-weight: 700;
    line-height: 29px;



    @media (${breakpoints.tablet}) {
        line-height: 39px;
    }
`;

export const RecipeDescription = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    line-height:14.5px;
    
    color: ${colors.textPrimary};
    font-size: 14px;
    font-weight: 500;

    height: 60px;
`;

export const RecipeIngredientsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:5px;

    height:50px;
    overflow:hidden;
`;

export const CookTimeWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;
    gap:5px;
`;

export const CookTimeIcon = styled.img`
    width:20px;
    height:20px;
    
`;
export const CookTimeLabel = styled.p`
    color: ${colors.textPrimary};
    font-size: 14px;
    font-weight: 500;

    height:20px;
`;

