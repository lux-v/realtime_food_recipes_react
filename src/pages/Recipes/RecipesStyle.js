import styled from "styled-components";
import { breakpoints } from "../../lib/style/theme";


export const RecipesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 2rem;

    width:100%;

    justify-items:center;

    @media (${breakpoints.tablet}) {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        grid-gap: 2rem;
    }
        
    @media (${breakpoints.tablet}) {
        grid-template-columns: repeat(auto-fit, minmax(460px, 1fr));
    }
`

export const LoadingSpinnerWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100%;
`

export const AddNewRecipeCard = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100%;
`

