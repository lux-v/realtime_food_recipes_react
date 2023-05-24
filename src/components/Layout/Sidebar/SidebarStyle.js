import styled, { css } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { colors, breakpoints, border } from '../../../lib/style/theme';

import { ReactComponent as LecturesIcon } from '../../../assets/img/lectures-icon.svg';
import { ReactComponent as DashboardIcon } from '../../../assets/img/dashboard-icon.svg';
import { ReactComponent as FoodIcon } from '../../../assets/img/food-icon.svg';
import { ReactComponent as AboutUsIcon } from '../../../assets/img/about-us-icon.svg';
import { ReactComponent as HowItWorksIcon } from '../../../assets/img/how-it-works-icon.svg';
import { ReactComponent as LogOutIcon } from '../../../assets/img/logout-icon.svg';
import { ReactComponent as YourProfileIcon } from '../../../assets/img/yourProfile-icon.svg';



export const NavWrapper = styled.nav`
  display: none;
  width: 260px;
  flex-shrink:0;

  box-shadow: 16px 12px 20px 0px #00000000;
  background-color: ${({ theme }) => theme.mode === "dark" ? theme.bgPrimaryLight700 : theme.bgSecondary};


  @media (${breakpoints.tablet}) {
    width: 315px;
  }

  @media (${breakpoints.desktop}) {
    display: block;
    width: 240px;
    transition: width 0.2s ease-in;
  }
`;


export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
  padding-left: 28px;
  display: none;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
    }
  }
  
  @media (${breakpoints.desktop}) {
    padding-top: 0;
    padding-left: 14px;

    ${(props) =>
    props.className === 'desktopNav' &&
    `
        display:block;
    `}
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 36px 24px 0px 28px;

  @media (${breakpoints.tablet}) {
    padding: 28px 42px 0px 30px;
  }

  @media (${breakpoints.desktop}) {
    display: none;
  }
`;


export const LogoText = styled.p`
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
  letter-spacing: 0.1em;
  width: 131px;
  height: 12px;
  color: ${({ theme }) => theme.logoText};
`;

export const ExitImg = styled.img`
  width: 18.67px;
  height: 18.67px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
    }
  }
  
`;

export const MenuText = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  width: 106px;
  height: 24px;
  color: ${({ theme }) => theme.textPrimary};
`;

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width:100%;
  
  margin-top: 60px;
  gap:5px;

  @media (${breakpoints.desktop}) {
    width: ${props => props.isSidebarOpen ? "240px" : "60px"};
    padding: 8px;
  }
`;

export const IconTextWrapper = styled.div`
  display:flex;
  gap:16px;
  width: 100%;
  height:100%;
`;

export const IconText = styled.p`
  white-space:none;
  width:calc(100% - 36px);
`


const IconStyle = css`
  height:20px;
  width:20px;

  :hover{
    stroke:${({ theme }) => theme.primaryMain}
  }
  @media (hover: hover) and (pointer: fine) {
    cursor:pointer;
  }
`

export const Lectures = styled(LecturesIcon)`
  ${IconStyle}
`;
export const Dashboard = styled(DashboardIcon)`
  ${IconStyle}
`;
export const Food = styled(FoodIcon)`
  ${IconStyle}
`;
export const AboutUs = styled(AboutUsIcon)`
  ${IconStyle}
`;
export const HowItWorks = styled(HowItWorksIcon)`
  ${IconStyle}
`;
export const LogOut = styled(LogOutIcon)`
  ${IconStyle}
`;
export const YourProfile = styled(YourProfileIcon)`
  ${IconStyle}
`;



export const HeaderNavLink = styled(NavLink)`
  display:flex;
  align-items:center;
  justify-content:center;

  width: 100%;
  height: 43px;

  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.textPrimary};
  padding: 12px;


  :hover{
    background:${({ theme }) => theme.bgPrimaryLight50};
    color:${({ theme }) => theme.primaryMain};

    ${Dashboard} {
      stroke: ${({ theme }) => theme.primaryMain};
    }
    ${Food} {
      stroke: ${({ theme }) => theme.primaryMain};
    }
    ${AboutUs} {
      stroke: ${({ theme }) => theme.primaryMain};
    }
    ${HowItWorks} {
      stroke: ${({ theme }) => theme.primaryMain};
    }
  }
  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }

  ${(props) =>
    props.className === 'login' &&
    `
        position: absolute;
    `}

  @media (${breakpoints.tablet}) {
      ${(props) =>
    props.className === 'mobileNav' &&
    `
        display:none;
    `}
  }

  @media (${breakpoints.desktop}) {
   border-radius: ${border.borderRadius};
    ${(props) =>
    props.className === 'mobileNav' &&
    `
        display:none;
    `}
  }

  @media (${breakpoints.tablet}) {
    &.active {
      background:${({ theme }) => theme.bgPrimaryLight50};
      color:${({ theme }) => theme.primaryMain};
      ${Dashboard} {
        stroke: ${({ theme }) => theme.primaryMain};
      }
      ${Food} {
        stroke: ${({ theme }) => theme.primaryMain};
      }
      ${AboutUs} {
        stroke: ${({ theme }) => theme.primaryMain};
      }
      ${HowItWorks} {
        stroke: ${({ theme }) => theme.primaryMain};
      }
    }
  }
`;