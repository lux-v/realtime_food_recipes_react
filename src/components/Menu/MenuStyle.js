import { Link } from 'react-router-dom';
import style from 'styled-components';
import { colors, fonts, border } from '../../lib/style/theme.js';

export const Menu = style.div`
    position: absolute;
    top: 55px;
    right: 0;
  
    width: 306px;
    box-shadow: ${colors.boxShadow};
        
    background-color: ${colors.secondary};
    border-radius: ${border.borderRadius};
`;

export const MenuLink = style(Link)`
    font-family: ${fonts.primary};
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 12px 18px;
    gap: 10px;
    background-color: ${colors.secondary};
    color: ${colors.textMenu};
    width: 100%;
    cursor: pointer;
    position: relative;

    ${(props) =>
        !props.isLogOut &&
        `
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        `}
    ${(props) =>
        props.isLogOut &&
        `
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
    `}

    &:hover {
        transition: all 0.3s ease-in-out;
        background-color: ${colors.lightRed};
    }  
`;
