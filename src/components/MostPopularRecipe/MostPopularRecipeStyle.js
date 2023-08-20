import styled from "styled-components";
import { breakpoints } from "../../lib/style/theme";

export const RecipeNameWrapper = styled.div`
     position: absolute; 
     width: calc(100% - 30px); // 30px = 15px + 15px (padding left + padding right)
     bottom: 25px; 
     left: 15px; 
     height: auto; 
     padding: 0.5rem; 
     background-color:${({ theme }) => theme.primaryTransparent};
     color: white;

    @media (${breakpoints.tablet}) {    
        width: calc(100% - 60px); // 60px = 30px + 30px (padding left + padding right
        bottom: 50px; 
        left: 30px; 
        padding: 1rem; 
    }

`;

export const MostPopularRecipeName = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    text-shadow: 0px 0px 5px black;

    @media (${breakpoints.tablet}) {
        font-size: 1.5rem;
    }

    @media (${breakpoints.desktop}) {
        font-size: 2.5rem;
    }

`;