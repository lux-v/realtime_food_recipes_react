import { useState } from 'react';

import {
  HeaderInner,
  LogoLink,
  LogoImg as LogoElement,
  LogoText,
  Hamburger,
  HamburgerContent,
  HeaderProfile,
  ProfileImg,
  Arrow as ArrowDropdown,
} from './HeaderStyle';

import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import LogoImg from '../../../assets/img/logo.svg';
import profileImg from '../../../assets/img/profilePicture.jpg';
import Arrow from '../../../assets/img/arrow-icon.svg';
import Sidebar from '../Sidebar/Sidebar';

import Menu from '../../Menu/Menu';

const Header = () => {
  const [openHamburger, setOpenHamburger] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleHamburgerClick = () => {
    setOpenHamburger(!openHamburger);
    setOpenMenu(false);
  };

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <HeaderInner>
        <LogoLink to="/lectures">
          <LogoElement src={LogoImg} alt="logo"></LogoElement>
          <LogoText>Learning Academy</LogoText>
        </LogoLink>
        <Breadcrumbs />
        <Hamburger onClick={handleHamburgerClick} />
        <HeaderProfile onClick={handleMenuClick}>
          <ProfileImg src={profileImg} alt="profileImg"></ProfileImg>
          <ArrowDropdown src={Arrow} alt="arrow"></ArrowDropdown>
        </HeaderProfile>
        {openMenu && <Menu open={openMenu} />}
      </HeaderInner>
      <HamburgerContent openHamburger={openHamburger}>
        <Sidebar
          openHamburger={openHamburger}
          handleHamburgerClick={handleHamburgerClick}
        />
      </HamburgerContent>
    </>
  );
};
export default Header;
