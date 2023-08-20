import styled from 'styled-components';
import { border } from '../../lib/style/theme';

export const StatsCardWrapper = styled.div`
    position:relative;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;

    background: ${({ theme, variant }) => variant === "primary" ? theme.bgPrimaryLight400 : variant === "primary-dark" ? theme.bgPrimaryLight700 : theme.white};
    border-radius: 10px;
    padding: 1rem;
    max-width:${({ maxWidth }) => maxWidth ? maxWidth : "320px"};
    width: 100%;
    height:${({ height }) => height ? height : "80px"};
    box-shadow: ${({ theme }) => theme.boxShadow};
    overflow: hidden;   
    cursor: default;

    ::before {
        content: "";
        position: absolute;
        width: 210px;
        height: 210px;
        background: linear-gradient(140.9deg, ${({ theme, variant }) => variant === "primary" ? theme.bgPrimaryLight700 : variant === "primary-dark" ? theme.bgPrimaryLight900 : theme.white} -14.02%, ${({ theme }) => theme.primaryTransparent} 77.58%);

        border-radius: 50%;
        top: -160px;
        right: -130px;
    }
    ::after {
        content: "";
        position: absolute;
        width: 210px;
        height: 210px;
        background: linear-gradient(210.04deg, ${({ theme, variant }) => variant === "primary" ? theme.bgPrimaryLight700 : variant === "primary-dark" ? theme.bgPrimaryLight900 : theme.white} -50.94%, ${({ theme }) => theme.primaryTransparent} 83.49%);
        border-radius: 50%;
        top: -30px;
        right: -180px;
    }
`;

export const SVGWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme, variant }) => variant === "primary" ? theme.bgPrimaryLight500 : variant === "primary-dark" ? theme.bgPrimaryLight800 : theme.grey100};
    border-radius: ${border.borderRadius};
    padding: 10px;

    svg {
        width: 30px;
        height: 30px;
        stroke: ${({ theme, variant }) => variant === "primary" ? theme.white : variant === "primary-dark" ? theme.white : theme.textPrimary};
    }
`;


export const ValueTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    gap: 5px;

    color: ${({ theme, variant }) => variant === "primary" ? theme.white : variant === "primary-dark" ? theme.white : theme.textPrimary};
    text-align: left;

`;

export const Value = styled.p`
    font-size: 1.2rem;
    font-weight: 700;
    width:100%;
`;

export const Title = styled.h3`
    font-size: 0.9rem;
    font-weight: 400;
    width:100%;
`;

