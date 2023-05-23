import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { breakpoints, border } from '../../../lib/style/theme';
import { ReactComponent as Hamburger } from '../../../assets/img/hamburger-icon.svg';
import { ReactComponent as ArrowIcon } from '../../../assets/img/arrow-icon.svg';


export const HeaderWrapper = styled.header`
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 60px;
  padding: 9px 24px;
  user-select: none;
  background-color: ${({ theme }) => theme.mode === "dark" ? theme.bgPrimaryLight700 : theme.bgSecondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index:3;      

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
  color: ${({ theme }) => theme.logoText};
`;


export const HamburgerIcon = styled(Hamburger)`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius:${border.borderRadius};
  padding:5px;
  
  :hover{
    background: ${({ theme }) => theme.bgPrimaryLight50};
    stroke:${({ theme }) => theme.primaryMain}
  }
  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
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
  background: ${({ theme }) => theme.mode === "dark" ? theme.bgPrimaryLight700 : theme.bgSecondary};
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  z-index: 3;

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
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.iconsPrimary};
  object-fit:cover;

  background:${({ theme }) => theme.bgSecondary};
`;

export const Arrow = styled(ArrowIcon)`
  width: 24px;

  stroke:${({ theme }) => theme.primaryMain};
`;


export const HeaderProfile = styled.nav`
  display: none;
  width:100px;
  padding: 4px;
  height: 42px;
  
  background:${({ theme }) => theme.bgPrimaryLight200};
  border-radius:50px;

  :hover{
      background:${({ theme }) => theme.primaryMain};
      ${Arrow} {
        stroke: white;
      }
    }

  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }

  transition:all 0.2s ease-in;

  @media (${breakpoints.tablet}) {
    display: flex;
    justify-content:space-between;
    align-items:center;
  
    gap: 8px;

  }
  
`;