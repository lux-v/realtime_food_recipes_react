import { colors, fonts } from '../../lib/style/theme.js';
import style from 'styled-components';

export const MenuCard = style.div`
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

    &:hover {  
        transition: all 0.3s ease-in-out;
        background-color: ${colors.lightRed};
    }    
`;
