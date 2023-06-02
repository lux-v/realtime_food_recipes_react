import styled, { css } from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { breakpoints, border } from "../../../lib/style/theme";

import { ReactComponent as LecturesIcon } from "../../../assets/img/lectures-icon.svg";
import { ReactComponent as DashboardIcon } from "../../../assets/img/dashboard-icon.svg";
import { ReactComponent as FoodIcon } from "../../../assets/img/food-icon.svg";
import { ReactComponent as AboutUsIcon } from "../../../assets/img/about-us-icon.svg";
import { ReactComponent as HowItWorksIcon } from "../../../assets/img/how-it-works-icon.svg";
import { ReactComponent as LogOutIcon } from "../../../assets/img/logout-icon.svg";
import { ReactComponent as YourProfileIcon } from "../../../assets/img/yourProfile-icon.svg";

export const NavWrapper = styled.nav`
  display: none;
  flex-shrink: 0;

  box-shadow: 16px 12px 20px 0px #00000000;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? theme.bgPrimaryLight700 : theme.bgSecondary};

  @media (${breakpoints.desktop}) {
    display: block;
    width: 240px;
    transition: width 0.2s ease-in;
  }
`;

export const ItemsWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  width: ${(props) => (props.isSidebarOpen ? "240px" : "60px")};
  padding: 8px;
  margin-top: 60px;
  position: fixed;
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
  padding: 12px;

  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.textPrimary};

  @media (hover: hover) and (pointer: fine) {
    cursor: pointer;
  }

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
  }

  @media (${breakpoints.tablet}) {
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
    }
  }

  @media (${breakpoints.desktop}) {
    border-radius: ${border.borderRadius};
  }
`;
