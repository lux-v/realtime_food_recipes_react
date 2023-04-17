import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { colors, breakpoints } from '../../../lib/style/theme';

import { ReactComponent as LecturesIcon } from '../../../assets/img/lectures-icon.svg';
import { ReactComponent as StudentsIcon } from '../../../assets/img/students-icon.svg';
import { ReactComponent as CriteriaIcon } from '../../../assets/img/criteria-icon.svg';
import { ReactComponent as LogOutIcon } from '../../../assets/img/logout-icon.svg';
import { ReactComponent as YourProfileIcon } from '../../../assets/img/yourProfile-icon.svg';

export const Sidebar = styled.nav`
  ${(props) =>
    props.openHamburger &&
    `
        display: block;
        height: 100vh;
    `}
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

export const Nav = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  width: calc(100% - 32px);
  height: calc(100% - 60px);
  padding: 44px 0;

  @media (${breakpoints.tablet}) {
    height: calc(100% - 52px);
  }
  @media (${breakpoints.desktop}) {
    padding-top: 56px;
    height: auto;
  }
`;

export const OptionsWrapper = styled.div``;

export const HeaderNavLink = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 236px;
  height: 43px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  padding: 12px 0px 12px 28px;
  color: ${colors.textPrimary};
  cursor: pointer;

  @media (${breakpoints.tablet}) {
    width: 274px;

    ${(props) =>
    props.className === 'mobileNav' &&
    `
        display:none;
    `}
  }

  @media (${breakpoints.desktop}) {
    width: 224px;

    ${(props) =>
    props.className === 'mobileNav' &&
    `
        display:none;
    `}
  }

  &:after {
    content: '';
    position: absolute;
    background-color: ${colors.primary};
    height: 9px;
    right: 20px;
  }

  &:hover:after {
    width: 9px;
    border-radius: 50%;
  }

  &.active:after {
    width: 9px;
    border-radius: 50%;
  }

  @media (${breakpoints.tablet}) {
    &.active {
      background-color: ${colors.lightRed};
    }
  }
`;

export const Lectures = styled(LecturesIcon)`
  height: 18px;
  width: auto;

  path {
    fill: ${colors.textSecondary};
  }
`;

export const Students = styled(StudentsIcon)`
  height: 18px;
  width: auto;

  path {
    fill: ${colors.textSecondary};
  }
`;

export const Criteria = styled(CriteriaIcon)`
  height: 20px;
  width: auto;

  path {
    fill: ${colors.textSecondary};
  }
`;

export const LogOut = styled(LogOutIcon)`
  height: 20px;
  width: auto;

  path {
    fill: ${colors.textSecondary};
  }
`;

export const YourProfile = styled(YourProfileIcon)`
  height: 19px;
  width: auto;

  path {
    fill: ${colors.textSecondary};
  }
`;
