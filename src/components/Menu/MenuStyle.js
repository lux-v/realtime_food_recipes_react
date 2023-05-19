import styled from 'styled-components';
import { colors, border } from '../../lib/style/theme.js';

export const Menu = styled.div`
    position: absolute;
    top: 55px;
    right: 0;
    z-index:1;
  
    width: 306px;
    box-shadow: ${({ theme }) => theme.boxShadow};
        
    background-color: ${({ theme }) => theme.secondary};
    border-radius: ${border.borderRadius}; 
    > :first-child {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }  
    > :last-child {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
`;
