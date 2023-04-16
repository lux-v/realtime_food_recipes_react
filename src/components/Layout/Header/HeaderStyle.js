import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, breakpoints } from '../../../lib/style/theme';
import { ReactComponent as HamburgerIcon } from '../../../assets/img/hamburger-icon.svg';

export const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 100%;
  height: 40px;
`;

export const LogoLink = styled(Link)`
  &:hover {
    cursor: pointer;
  }

  @media (${breakpoints.desktop}) {
    display: none;
  }
`;

export const LogoImg = styled.img`
  width: 77px;
  height: 32px;
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

export const Hamburger = styled(HamburgerIcon)`
  width: 27px;
  height: 18px;
  height: auto;
  cursor: pointer;
  position: absolute;
  right: 0%;
  path {
    fill: ${colors.textSecondary};
  }

  @media (${breakpoints.desktop}) {
    display: none;
  }
`;

export const HamburgerContent = styled.div`
  display: none;
  position: fixed;
  right: 0;
  top: 0;
  width: 260px;
  background-color: ${colors.bgSecondary};
  box-shadow: 0px 3px 2px 0px #0000000a;

  @media (${breakpoints.tablet}) {
    width: 315px;
  }

  @media (${breakpoints.desktop}) {
    display: none;
  }

  ${(props) =>
    props.openHamburger &&
    `
        display: block;
    `}
`;

export const HeaderProfile = styled.nav`
  display: none;

  @media (${breakpoints.tablet}) {
    position: absolute;
    right: 0;
    display: flex;
    margin-right: 65px;
    gap: 8px;
    cursor: pointer;
  }
  @media (${breakpoints.desktop}) {
    margin-right: 0px;
  }
`;
export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${colors.iconsPrimary};
`;

export const Arrow = styled.img`
  width: 12px;
  path {
    fill: ${colors.iconsPrimary};
  }
`;
