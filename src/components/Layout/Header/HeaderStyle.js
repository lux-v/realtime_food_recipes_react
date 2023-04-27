import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, breakpoints, border } from '../../../lib/style/theme';
import { ReactComponent as Hamburger } from '../../../assets/img/hamburger-icon.svg';
import { ReactComponent as ArrowIcon } from '../../../assets/img/arrow-icon.svg';


export const HeaderWrapper = styled.header`
  position: relative;
  width: 100%;
  height: 60px;
  padding: 9px 24px;
  user-select: none;
  background-color: ${colors.bgSecondary};
  box-shadow: 0px 3px 2px 0px #0000000a;
  z-index: 4;

  display: flex;
  justify-content: space-between;
  align-items: center;
      

  @media (${breakpoints.tablet}) {
    padding: 8px 87px 8px 8px;
  }

  @media (${breakpoints.desktop}) {
    padding: 10px 40px 10px 8px;
  }

  transition:all 0.2s ease-in;
`;


export const LeftSideWrapper = styled.div`
  position: relative; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  width: 232px; 
  padding-right: 20px;
`;



export const HeaderProfileWrapper = styled.div`
  position: relative;
  height: 100%;
  width:145px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap:5px;
`;



export const LogoLink = styled(Link)`
`;

export const LogoImg = styled.img`
  height: 40px;
`;

export const LogoText = styled.p`
  font-size: 7px;
  font-weight: 500;
  line-height: 8px;
  letter-spacing: 0.1em;
  width: 75px;
  height: 10px;
  text-align: center;
  color: ${colors.logoText};
`;


export const HamburgerIcon = styled(Hamburger)`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius:${border.borderRadius};
  padding:5px;
  
  cursor: pointer;

  :hover{
    background: ${colors.lightRed};
    stroke:${colors.primary}
  }

  transition: all 0.1s ease-in;

  ${props =>
    props.left === true ? `
      display: none;
      ` : `
      display: block;
    `
  }  

  @media (${breakpoints.desktop}) {
    ${props =>
    props.left ? `
      display: block;
      ` : `
      display: none;
    `}  
  }
`;



export const HamburgerContent = styled.div`
  display: none;
  position: fixed;
  right: 0;
  top: 0;
  width: 260px;
  height:100%;
  background-color: ${colors.bgSecondary};

  z-index: 5;
  
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  
  @media (${breakpoints.tablet}) {
    width: 315px;
  }

  @media (${breakpoints.desktop}) {
    display: none;
  }

  ${(props) =>
    props.isSidebarOpen &&
    `
        display: block;
    `
  }
`;


export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${colors.iconsPrimary};
  object-fit:cover;

  background:${colors.bgSecondary};
`;

export const Arrow = styled(ArrowIcon)`
  width: 24px;

  stroke:${colors.primary};
`;


export const HeaderProfile = styled.nav`
  display: none;
  width:100px;
  padding: 4px;
  height:48px;
  
  background:${colors.mediumRed};
  border-radius:50px;

  cursor: pointer;

  :hover{
    background:${colors.primary};

    ${Arrow} {
      stroke: white;
    }
  }
  transition:all 0.2s ease-in;

  @media (${breakpoints.tablet}) {
    display: flex;
    justify-content:space-between;
    align-items:center;
  
    gap: 8px;

  }
  
`;