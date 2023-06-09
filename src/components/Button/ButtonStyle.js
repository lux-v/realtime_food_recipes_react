import { border, breakpoints, fonts } from '../../lib/style/theme.js';
import style from 'styled-components';

export const Button = style.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;
    gap: 8px;
    border-radius: ${border.borderRadius};
    position: relative;
    border: none;
    height: ${(props) => props.height || `38px`};
    width: ${(props) => props.width || `auto`};

    white-space: nowrap;

    user-select:none;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    font-family: ${fonts.primary};
    font-style: normal;
    font-spacing:2px;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-size: 14px;
    line-height: 19px;

    background-color: ${({ theme, isError }) => isError ? theme.errorMain : theme.primaryMain};
    color: ${({ theme }) => theme.secondary};

    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: ${({ theme, isError }) => isError ? isError.errorMain : theme.primaryDark};
    }

    @media (hover: hover) and (pointer: fine) {
        cursor: pointer;
    }

    ${({ isSecondary, theme, isError }) =>
        isSecondary &&
        `
            background-color: transparent;
            padding: 12px 16px;
            color: ${isError ? theme.errorMain : theme.primaryMain};
            border: 1px solid ${theme.whiteBorder}; 

            &:hover{
            transition: all 0.3s ease-in-out;
            background-color: ${theme.bgPrimaryLight50};
            }

            @media(hover: hover) and(pointer: fine) {
                cursor: pointer;
            }
        `
    }

    ${(props) =>
        props.isTertiary &&
        `
        background-color: transparent;
        padding: 12px 16px;
        color: ${props.theme.mode === "dark" ? "white" : props.theme.primaryMain};
        border: 1px solid ${props.theme.mode === "dark" ? "white" : props.theme.primaryMain}; 

        &:hover {   
            transition: all 0.3s ease-in-out;
            background-color: ${props.theme.bgPrimaryLight50};
            color: ${props.theme.primaryMain};
            border: 1px solid ${props.theme.primaryMain}; 
        }
        @media (hover: hover) and (pointer: fine) {
            cursor: pointer;
        }
    `}

    ${(props) =>
        props.isCancel &&
        `
        padding: 12px 24px;
        background-color: ${props.theme.bgSecondaryLight100};
        color: ${props.theme.textPrimary};

        &:hover {
            transition: all 0.3s ease-in-out;
            background-color: ${props.theme.cancelBackground};
            color: ${props.theme.textPrimary};
        }
        @media (hover: hover) and (pointer: fine) {
            cursor: pointer;
        }
    `}
    
    ${({ isHidden }) =>
        isHidden &&
        `
        display: none;
        `
    }

    ${(props) =>
        props.disabled &&
        `
        pointer-events: none;
        opacity: 0.7;
    `}


    ${(props) =>
        props.isTransparent && `
          background-color: transparent;
          padding-right: 8px;
          padding-left: 15px;
          color: ${props.theme.textPrimary};
          border: none; 
  
          @media (hover: hover) and (pointer: fine) {
            &:hover {
                transition: all 0.3s ease-in-out;
                cursor: pointer;
                background-color: transparent;
            }
          }
        @media (${breakpoints.tablet}) {
            padding: 12px 24px;
          }
      `}
`;
