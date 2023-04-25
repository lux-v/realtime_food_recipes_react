import { useContext, useState } from 'react';

import {
  HeaderWrapper,
  LogoLink,
  LogoImg as LogoElement,
  HamburgerIcon,
  HamburgerContent,
  HeaderProfile,
  ProfileImg,
  Arrow,
  LeftSideWrapper,
  HeaderProfileWrapper,
  BreadcrumbsWrapper,
} from './HeaderStyle';

import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import LogoImg from '../../../assets/img/logo.png';
import profileImg from '../../../assets/img/profile.svg';

import ExitIcon from '../../../assets/img/exit-icon.svg';

import Menu from '../../Menu/Menu';
import { AuthContext } from '../../../context/AuthContext';
import {
  MenuWrapper,
  MenuText,
  ExitImg as ExitElement,
  HeaderNavLink,
  Students as StudentsIcon,
  Criteria as CriteriaIcon,
  LogOut as LogOutIcon,
  YourProfile as YourProfileIcon,
  ItemsWrapper,
  IconTextWrapper,
} from '../../Layout/Sidebar/SidebarStyle';

import Chip from "../../Chip/Chip"

const Header = () => {
  const { isSidebarOpen, setIsSidebarOpen, logout } = useContext(AuthContext)

  const [openMenu, setOpenMenu] = useState(false);

  const handleHamburgerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setOpenMenu(false);
  };


  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <HeaderWrapper isSidebarOpen={isSidebarOpen}>
        <LeftSideWrapper>
          <LogoLink to="/dashboard">
            <LogoElement src={LogoImg} alt="logo" />
          </LogoLink>
          <HamburgerIcon left onClick={handleHamburgerClick} />
        </LeftSideWrapper>
        <BreadcrumbsWrapper>
          <Breadcrumbs />
        </BreadcrumbsWrapper>

        <HeaderProfileWrapper >
          <HeaderProfile onClick={handleMenuClick}>
            <ProfileImg src={profileImg} alt="profileImg" />
            <Arrow />
          </HeaderProfile>
          <HamburgerIcon onClick={handleHamburgerClick} />
          {openMenu && <Menu open={openMenu} />}
        </HeaderProfileWrapper>
      </HeaderWrapper>

      <HamburgerContent isSidebarOpen={isSidebarOpen}>
        <div style={{ display: "block", height: "100%" }}>
          <MenuWrapper className="mobileTabletNav">
            <MenuText>Menu</MenuText>
            <ExitElement
              src={ExitIcon}
              alt="exitIcon"
              onClick={handleHamburgerClick}
            />
          </MenuWrapper>
          <ItemsWrapper>
            <HeaderNavLink to="/recipes">
              {isSidebarOpen ?
                <IconTextWrapper >
                  <StudentsIcon />
                  Recipes
                </IconTextWrapper> : <StudentsIcon />}
            </HeaderNavLink>
            <HeaderNavLink className="mobileNav" to="/profile">

              {isSidebarOpen ?
                <IconTextWrapper >
                  <YourProfileIcon />
                  Your profile
                </IconTextWrapper> : <YourProfileIcon />}
            </HeaderNavLink>
            <HeaderNavLink to="/how-it-works">

              {isSidebarOpen ?
                <IconTextWrapper >
                  <CriteriaIcon />
                  How It Works
                </IconTextWrapper> : <CriteriaIcon />}
            </HeaderNavLink>
            <HeaderNavLink to="/about-us">

              {isSidebarOpen ?
                <IconTextWrapper >
                  <CriteriaIcon />
                  About us
                </IconTextWrapper> : <CriteriaIcon />}
            </HeaderNavLink>

            <HeaderNavLink
              onClick={logout}
              className="mobileNav"
              to="/login"
            >
              <IconTextWrapper >
                <LogOutIcon />
                Log out
              </IconTextWrapper>
            </HeaderNavLink>
          </ItemsWrapper>

        </div>
      </HamburgerContent>
    </>
  );
};
export default Header;
