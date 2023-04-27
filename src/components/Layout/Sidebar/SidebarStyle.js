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



export const SidebarWrapper = styled.nav`
  display: none;
  width: 260px;
  height: 100%;

  padding: 8px;
  box-shadow: 16px 12px 20px 0px #00000000;
  background-color: ${colors.bgSecondary};


  @media (${breakpoints.tablet}) {
    width: 315px;
  }

  @media (${breakpoints.desktop}) {
    display: block;
    width: ${props => props.isSidebarOpen ? "240px" : "60px"};
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

  &:hover {
    cursor: pointer;
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

export const LogoImg = styled.img`
  
  height: 75px;
`;

export const LogoText = styled.p`
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
  letter-spacing: 0.1em;
  width: 131px;
  height: 12px;
  color: ${colors.logoText};
`;

export const ExitImg = styled.img`
  width: 18.67px;
  height: 18.67px;

  &:hover {
    cursor: pointer;
  }
`;

export const MenuText = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  width: 106px;
  height: 24px;
  color: ${colors.textPrimary};
`;

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width:100%;
  padding: 44px 0;

  gap:5px;

  @media (${breakpoints.desktop}) {
    padding: 0;
  }
`;





export const IconTextWrapper = styled.div`
  display:flex;
  gap:16px;
  width: 100%;
  height:100%;
`;


const IconStyle = css`
  height:20px;
  width:auto;
  cursor:pointer;

  :hover{
    stroke:${colors.primary}
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

  padding: 12px;
  border-radius: ${border.borderRadius};

  
  color: ${colors.textPrimary};
  cursor: pointer;

  :hover{
    background:${colors.lightRed};
    color:${colors.primary};

    
    ${Food} {
      stroke: ${colors.primary};
    }
    ${AboutUs} {
      stroke: ${colors.primary};
    }
    ${HowItWorks} {
      stroke: ${colors.primary};
    }
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
    ${border.borderRadius};

    ${(props) =>
    props.className === 'mobileNav' &&
    `
        display:none;
    `}
  }

  @media (${breakpoints.tablet}) {
    &.active {
      background:${colors.lightRed};
      color:${colors.primary};
      ${Food} {
        stroke: ${colors.primary};
      }
      ${AboutUs} {
        stroke: ${colors.primary};
      }
      ${HowItWorks} {
        stroke: ${colors.primary};
      }
    }
  }
`;