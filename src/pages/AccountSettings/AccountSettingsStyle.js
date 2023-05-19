import styled from "styled-components";
import { breakpoints, colors } from "../../lib/style/theme";


export const CardsWrapper = styled.div`
    display:flex;
    flex-direction:column;
    flex-wrap:wrap;
    gap:10px;

    @media(${breakpoints.tablet}){
        flex-direction:row;
    }
`

export const CardWrapper = styled.div`
    width:calc(100% - 5px);
    @media(${breakpoints.tablet}){
        width: calc(50% - 5px);
    }
`

export const ProfileImageWrapper = styled.div``

export const ProfileImage = styled.img`
    width:100px;
    height:100px;
    border-radius:50%; 
    object-fit:cover;
    border: 1px solid ${({ theme }) => theme.iconsPrimary};
    background:${({ theme }) => theme.bgSecondary};
`