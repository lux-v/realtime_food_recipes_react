import { Link } from 'react-router-dom';
import style from 'styled-components';
import { colors, breakpoints, fonts } from '../../lib/style/theme.js';

export const Menu = style.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    width: 306px;
    position: relative;
    box-shadow: ${colors.boxShadow};
    margin-top: 125px;
    margin-right: 65px;
    background-color: ${colors.secondary};
    border-radius: 8px;
    z-index: 1;
    
    visibility: hidden;

    @media (${breakpoints.tablet}) {
        visibility: visible;
    }

    @media (${breakpoints.desktop}) {
        margin-right: 0;
        visibility: visible;
    }
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
        background-color: ${colors.menuHover};
    }  
`;
