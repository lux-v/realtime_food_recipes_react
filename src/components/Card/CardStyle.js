import styled from "styled-components";
import { border, breakpoints, colors } from "../../lib/style/theme";


export const CardWrapper = styled.div`
    width:100%;
    background:white;
    border-radius:${border.borderRadius};

    margin-bottom:10px;
    
`

export const CardHeading = styled.div`
    display:flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
    width:100%;
    min-height:72px;
    font-size:18px;
    padding:24px;
    border-bottom:1px solid ${({ theme }) => theme.bgPrimaryLight300};
`

export const HeadingElementsWrapper = styled.div`
    display:flex;
    align-items: center;
    gap: 10px;
`
export const CardContent = styled.div`
    width:100%;
    padding:12px;

    @media(${breakpoints.tablet}){
        padding:24px;
    }
`

export const CardBottom = styled.div`
    display:flex;
    justify-content:flex-end;
    gap:10px;
    width:100%;
    padding:24px;
    border-top:1px solid ${({ theme }) => theme.bgPrimaryLight300};
`