import styled from "styled-components";
import { border, breakpoints, colors } from "../../lib/style/theme";
import { ReactComponent as FilterIcon } from '../../assets/img/filter-icon.svg'


export const Filter = styled(FilterIcon)`
    width: 20px;
    margin-right: 0.5rem;

`

export const FilterWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height: 40px;
    font-size: 14px;
    padding: 8px;
    border-radius: ${border.borderRadius};
    background-color: ${colors.lightRed};
    user-select: none;

    &:hover {
        color: ${colors.white};
        background-color: ${colors.primary};
        cursor: pointer;
        ${Filter} {
            stroke: ${colors.white};
        }
    }
`



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

