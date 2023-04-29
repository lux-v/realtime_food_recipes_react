import styled, { css } from "styled-components";
import {
    breakpoints,
    colors,
    border
} from "../../lib/style/theme";

import { ReactComponent as AddFavoriteIcon } from "../../assets/img/add-favorite.svg";
import { ReactComponent as ClockIcon } from "../../assets/img/clock-icon.svg";
import { ReactComponent as Close } from '../../assets/img/x-icon.svg';


const IconStyle = css`
  height:20px;
  width:auto;

`
export const AddFavorite = styled(AddFavoriteIcon)`
    ${IconStyle}
 
    :active{
        scale:1.1;
    }

    @media (hover: hover) and (pointer: fine) {
        :hover{
            fill:${colors.primary}
        }
    } 


    ${props => props.isfavorite && `
        fill:${colors.primary};
    `}
`;

export const CookTime = styled(ClockIcon)`
    ${IconStyle}

    :hover{
        fill: none;
    }
`;


export const RecipieCardWrapper = styled.div`
    display: flex;
    flex-direction:column;
    gap:5px;

    width:100%;
    height: auto;
    max-width: 650px;
    max-height:500px;
    padding: 10px;

    background: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border:1px solid ${colors.tableBorder};
    border-radius: ${border.borderRadius};

    @media (${breakpoints.tablet}) {
        height: 210px;
        flex-direction:row;
    }
    @media (hover: hover) and (pointer: fine) {
        :hover {
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            box-shadow: ${colors.primary} 0px 1px 8px;
        }
    }
`;

export const ImageWrapper = styled.div`
`;

export const RecipeImage = styled.img`
    width: 100%;
    height: 188px;
    object-fit: cover;
    border-radius: ${border.borderRadius};

    @media (${breakpoints.tablet}) {
        width: 188px;
        object-fit: cover;
    }
`;


export const TextWrapper = styled.div`
    user-select:none;
    display:flex;
    flex-direction:column;
    gap:5px;
    width:100%;
    overflow-wrap: anywhere;

    @media (${breakpoints.tablet}) {
        width: calc(100% - 188px);
    }
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
    
    @media (hover: hover) and (pointer: fine) {
        cursor:pointer;
    }

    width:30px;
    height:30px;

    border:1px solid ${colors.modalBorder};
    border-radius:50%;

    background-color: white;
   
`;



export const RecipeName = styled.p`
    text-overflow: ellipsis;
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

export const CloseIcon = styled(Close)`
  width: 10px;
  height: 10px;
  
  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }

  path {
    fill: white;
  }
`

export const RecipeIngredientsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:5px;

    height:54px;
    overflow:hidden;
`;



export const CookTimeWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-end;
`;

export const CookTimeIcon = styled.img`
    width:20px;
    height:20px;
    
`;
export const CookTimeLabel = styled.p`
    color: ${colors.textPrimary};
    font-size: 12px;
    font-weight: 500;

`;

