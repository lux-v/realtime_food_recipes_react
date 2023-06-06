import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { breakpoints } from "../../../lib/style/theme";

import { ReactComponent as LecturesIcon } from "../../../assets/img/lectures-icon.svg";
import { ReactComponent as DashboardIcon } from "../../../assets/img/dashboard-icon.svg";
import { ReactComponent as FoodIcon } from "../../../assets/img/food-icon.svg";
import { ReactComponent as AboutUsIcon } from "../../../assets/img/about-us-icon.svg";
import { ReactComponent as HowItWorksIcon } from "../../../assets/img/how-it-works-icon.svg";
import { ReactComponent as LogOutIcon } from "../../../assets/img/logout-icon.svg";
import { ReactComponent as YourProfileIcon } from "../../../assets/img/yourProfile-icon.svg";

export const NavWrapper = styled.nav`
  display: ${({ isSidebarOpen }) => (isSidebarOpen ? "block" : "none")};
  width: 260px;
  height: 100vh;

  position: fixed;
  top: 0;
  right: 0;

  z-index: 3;

  box-shadow: 16px 12px 20px 0px #00000000;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? theme.bgPrimaryLight700 : theme.bgSecondary};

  @media (${breakpoints.tablet}) {
    width: 315px;
  }

  @media (${breakpoints.desktop}) {
    display: none;
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 60px;
  padding: 0 16px;

  @media (${breakpoints.desktop}) {
    display: none;
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

export const ExitImg = styled.img`
  width: 18.67px;
  height: 18.67px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  margin: 20px 0;
  height: calc(100vh - 100px);
  overflow-y: auto;
  gap: 5px;
`;

export const IconTextWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 100%;
`;

export const IconText = styled.p`
  white-space: none;
  width: calc(100% - 36px);
`;

const IconStyle = css`
  height: 20px;
  width: 20px;

  :hover {
    stroke: ${({ theme }) => theme.primaryMain};
  }
  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }
`;

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
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 43px;

  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.textPrimary};
  padding: 12px;

  :hover {
    background: ${({ theme }) => theme.bgPrimaryLight50};
    color: ${({ theme }) => theme.primaryMain};

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
    ${YourProfile} {
      stroke: ${({ theme }) => theme.primaryMain};
    }
  }
  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }

  ${(props) =>
    props.className === "login" &&
    `
        position: absolute;
    `}

  @media (${breakpoints.tablet}) {
    ${(props) =>
      props.className === "mobileNav" &&
      `
        display:none;
    `}
  }

  &.active {
    background: ${({ theme }) => theme.bgPrimaryLight50};
    color: ${({ theme }) => theme.primaryMain};
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
    ${YourProfile} {
      stroke: ${({ theme }) => theme.primaryMain};
    }
  }
`;
