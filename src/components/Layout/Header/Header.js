import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import useCheckImage from "../../../hooks/useCheckImage"

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
} from './HeaderStyle';


import {
  MenuWrapper,
  MenuText,
  ExitImg as ExitElement,
  HeaderNavLink,
  Dashboard as DashboardIcon,
  Food as FoodIcon,
  AboutUs as AboutUsIcon,
  LogOut as LogOutIcon,
  YourProfile as YourProfileIcon,
  ItemsWrapper,
  IconTextWrapper,
  HowItWorks,
} from '../../Layout/Sidebar/SidebarStyle';

import Menu from '../../Menu/Menu';

import LogoImg from '../../../assets/img/logo.png';
import profileImg from '../../../assets/img/profile.svg';
import ExitIcon from '../../../assets/img/exit-icon.svg';
import PresetColor from '../../PresetColor/PresetColor';


const Header = () => {
  const { isSidebarOpen, setIsSidebarOpen, logout, userData } = useContext(AuthContext)
  const imageSrc = useCheckImage(userData?.photoURL, profileImg)

  const [openMenu, setOpenMenu] = useState(false);

  const hamburgerRef = useRef(null);

  const handleHamburgerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setOpenMenu(false);
  };


  const handleMenuClick = (e) => {
    setOpenMenu(!openMenu);
  };

  const handleClickOutside = (e) => {
    const sidebarDimensions = hamburgerRef.current?.getBoundingClientRect() || { top: 0, left: 0, width: 0, height: 0 };

    const isInSidebar = (sidebarDimensions.top <= e.clientY && e.clientY <= sidebarDimensions.top + sidebarDimensions.height
      && sidebarDimensions.left <= e.clientX && e.clientX <= sidebarDimensions.left + sidebarDimensions.width);
    if (!isInSidebar) {
      setIsSidebarOpen(false)
    }
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside)

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  // }, [])



  return (
    <>
      <HeaderWrapper isSidebarOpen={isSidebarOpen}>
        <LeftSideWrapper>
          <LogoLink to="/dashboard">
            <LogoElement src={LogoImg} alt="logo" />
          </LogoLink>
          <HamburgerIcon left onClick={handleHamburgerClick} />
        </LeftSideWrapper>
        <HeaderProfileWrapper >
          <HeaderProfile onClick={handleMenuClick}>
            <ProfileImg src={imageSrc} alt="profileImg" />
            <Arrow />
          </HeaderProfile>
          <HamburgerIcon onClick={handleHamburgerClick} />
          {openMenu && <Menu closePopup={() => setOpenMenu(false)} />}
        </HeaderProfileWrapper>
      </HeaderWrapper>

      <HamburgerContent ref={hamburgerRef} isSidebarOpen={isSidebarOpen}>
        <MenuWrapper className="mobileTabletNav">
          <MenuText>Menu</MenuText>
          <ExitElement
            src={ExitIcon}
            alt="exitIcon"
            onClick={handleHamburgerClick}
          />
        </MenuWrapper>
        <ItemsWrapper>
          <HeaderNavLink to="/" onClick={() => setIsSidebarOpen(false)}>
            {isSidebarOpen ?
              <IconTextWrapper >
                <DashboardIcon />
                Dashboard
              </IconTextWrapper> : <DashboardIcon />}
          </HeaderNavLink>
          <HeaderNavLink to="/recipes" onClick={() => setIsSidebarOpen(false)}>
            {isSidebarOpen ?
              <IconTextWrapper >
                <FoodIcon />
                Recipes
              </IconTextWrapper> : <FoodIcon />}
          </HeaderNavLink>
          <HeaderNavLink className="mobileNav" to="/account-settings" onClick={() => setIsSidebarOpen(false)}>
            {isSidebarOpen ?
              <IconTextWrapper >
                <YourProfileIcon />
                Your profile
              </IconTextWrapper> : <YourProfileIcon />}
          </HeaderNavLink>
          <HeaderNavLink to="/how-it-works" onClick={() => setIsSidebarOpen(false)}>

            {isSidebarOpen ?
              <IconTextWrapper >
                <HowItWorks />
                How It Works
              </IconTextWrapper> : <HowItWorks />}
          </HeaderNavLink>
          <HeaderNavLink to="/about-us" onClick={() => setIsSidebarOpen(false)}>

            {isSidebarOpen ?
              <IconTextWrapper >
                <AboutUsIcon />
                About us
              </IconTextWrapper> : <AboutUsIcon />}
          </HeaderNavLink>

          <div style={{ border: `1px solid #c5d0de`, borderRadius: "8px", margin: "10px" }}>
            <p style={{ borderBottom: "1px solid #c5d0de", padding: "10px", fontWeight: "600" }}>Preset Color</p>

            <div style={{ padding: "10px" }}>
              <PresetColor />
            </div>
          </div>

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
      </HamburgerContent>
    </>
  );
};
export default Header;
