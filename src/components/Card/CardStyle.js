import styled from "styled-components";
import { border, colors } from "../../lib/style/theme";


export const CardWrapper = styled.div`
    width:100%;
    background:white;
    border-radius:${border.borderRadius};
    
`

export const CardHeading = styled.div`
    display:flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
    width:100%;
    height: 72px;
    font-size:18px;
    padding:24px;
    border-bottom:1px solid ${colors.mediumRed};
`

export const CardContent = styled.div`
    width:100%;
    padding:24px;
`

export const CardBottom = styled.div`
    width:100%;
    padding:24px;
    border-top:1px solid ${colors.mediumRed};
`