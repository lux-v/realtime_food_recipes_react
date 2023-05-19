import styled from "styled-components";

export const Loading = styled.span`
    ${props =>
        props.size && `
            width: ${props.size};
            height: ${props.size};
        `
    }

    border: 5px solid #FFF;
    border-bottom-color: ${({ theme }) => theme.primaryMain};
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
 `