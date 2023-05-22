import styled from "styled-components";


export const PresetColorContainer = styled.div`
    display: flex;
    gap: 5px;
`


export const PresetColorStyle = styled.div`
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        font-family: Roboto, sans-serif;
        font-size: 1.25rem;
        line-height: 1;
        border-radius: 4px;
        overflow: hidden;
        user-select: none;
        color: rgb(84, 110, 122);
        opacity: ${({ presetColor, themeName }) => presetColor === themeName ? "0.6" : "1"};
        cursor: pointer;
        background: ${({ color }) => `linear-gradient(135deg, ${color.primaryMain} 50%, ${color?.bgPrimaryLight100} 50%)`};
`
