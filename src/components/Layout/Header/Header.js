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
} from '../../Layout/Sidemenu/SidemenuStyle';

import Menu from '../../Menu/Menu';

import LogoImg from '../../../assets/img/logo.png';
import profileImg from '../../../assets/img/profile.svg';
import ExitIcon from '../../../assets/img/exit-icon.svg';
import PresetColor from '../../PresetColor/PresetColor';
import Sidemenu from '../Sidemenu/Sidemenu';


const Header = () => {
  const { isSidebarOpen, setIsSidebarOpen, logout, userData } = useContext(AuthContext)
  const imageSrc = useCheckImage(userData?.photoURL, profileImg)

  const [openMenu, setOpenMenu] = useState(false);


  const handleHamburgerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setOpenMenu(false);
  };


  const handleMenuClick = (e) => {
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
        <HeaderProfileWrapper >
          <HeaderProfile onClick={handleMenuClick}>
            <ProfileImg src={imageSrc} alt="profileImg" />
            <Arrow />
          </HeaderProfile>
          <HamburgerIcon onClick={handleHamburgerClick} />
          {openMenu && <Menu closePopup={() => setOpenMenu(false)} />}
        </HeaderProfileWrapper>
      </HeaderWrapper>
      <Sidemenu  />
    </>
  );
};
export default Header;
