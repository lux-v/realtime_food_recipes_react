import styled from "styled-components";
import { colors } from "../../lib/style/theme";

export const ProfileImageWrapper = styled.div`

`

export const ProfileImage = styled.img`
    width:100px;
    height:100px;
    border-radius:50%; 

    object-fit:cover;
    
    border: 1px solid ${colors.iconsPrimary};
    background:${colors.bgSecondary};
`


