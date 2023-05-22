import styled from "styled-components";


export const LoadingWrapper = styled.div``

export const ContentWrapper = styled.div`
    position:relative;
    height: 100vh;
    width: 100vw;

    user-select: none;
    pointer-events:none;
    
    background: ${props => props.children ? `
    filter: blur(8px);
    -webkit-filter: blur(8px);
    `: `
        ${props.theme.bgSecondaryLight100}
    `};
`

export const BackdropLoader = styled.div`
    z-index:1;
    position:absolute;
    top:0;
    left:0;
    width: 100%;
    height: 4.8px;
    display: inline-block;

    background: ${({ theme }) => theme.bgPrimaryLight300};
    overflow: hidden;
    }

    ::after {
    content: '';
    width: 192px;
    height: 4.8px;
    background: ${({ theme }) => theme.primaryMain};
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    animation: animloader 1s linear infinite;
    }

    @keyframes animloader {
    0% {
    left: 0;
    transform: translateX(-100%);
    }
    100% {
    left: 100%;
    transform: translateX(0%);
    }
`
