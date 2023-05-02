import { border, breakpoints, colors, fonts } from '../../lib/style/theme.js';
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

    user-select:none;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    font-family: ${fonts.primary};
    font-style: normal;
    font-spacing:2px;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-size: 14px;
    line-height: 19px;

    background-color: ${colors.primary};
    color: ${colors.secondary};

    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: ${colors.darkRed};
    }

    @media (hover: hover) and (pointer: fine) {
        cursor: pointer;
    }

    ${(props) =>
        props.isSecondary &&
        `
        background-color: transparent;
        padding: 12px 16px;
        color: ${colors.primary};
        border: 1px solid ${colors.whiteBorder}; 

        &:hover{
            transition: all 0.3s ease-in-out;
            background-color: ${colors.lightRed};
        }
        
        @media (hover: hover) and (pointer: fine) {
            cursor: pointer;
        }
    `}

    ${(props) =>
        props.isTertiary &&
        `
        background-color: transparent;
        padding: 12px 16px;
        color: ${colors.primary};
        border: 1px solid ${colors.primary}; 

        &:hover {   
            transition: all 0.3s ease-in-out;
            background-color: ${colors.lightRed};
        }
        @media (hover: hover) and (pointer: fine) {
            cursor: pointer;
        }
    `}

    ${(props) =>
        props.isCancel &&
        `
        padding: 12px 24px;
        background-color: ${colors.bgPrimary};
        color: ${colors.textPrimary};

        &:hover {
            transition: all 0.3s ease-in-out;
            background-color: ${colors.cancelBackground};
            color: ${colors.textPrimary};
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
          color: ${colors.textPrimary};
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
