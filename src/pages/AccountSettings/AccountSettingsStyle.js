import styled from "styled-components";
import { colors } from "../../lib/style/theme";


export const CardsWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;

    gap:10px;

`

export const CardWrapper = styled.div`
    width: calc(50% - 5px);
`

export const ProfileImageWrapper = styled.div``

export const ProfileImage = styled.img`
    width:100px;
    height:100px;
    border-radius:50%; 
    object-fit:cover;
    border: 1px solid ${colors.iconsPrimary};
    background:${colors.bgSecondary};
`


