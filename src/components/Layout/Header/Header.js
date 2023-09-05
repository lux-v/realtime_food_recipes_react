import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import useCheckImage from "../../../hooks/useCheckImage"

import {
  HeaderWrapper,
  LogoLink,
  LogoImg as LogoElement,
  HamburgerIcon,
  HeaderProfile,
  ProfileImg,
  Arrow,
  LeftSideWrapper,
  HeaderProfileWrapper,
} from './HeaderStyle';


import Menu from '../../Menu/Menu';

import LogoImg from '../../../assets/img/logo.png';
import profileImg from '../../../assets/img/profile.svg';
import Sidemenu from '../Sidemenu/Sidemenu';


const Header = () => {
  const { isSidebarOpen, setIsSidebarOpen, userData } = useContext(AuthContext)
  const imageSrc = useCheckImage(userData?.photoURL, profileImg)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsMenuOpen(false);
  };

  const handleMenuClick = (e) => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <HeaderWrapper>
        <LeftSideWrapper>
          <LogoLink to="/">
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
          {isMenuOpen && <Menu closePopup={() => setIsMenuOpen(false)} />}
        </HeaderProfileWrapper>
      </HeaderWrapper>
      <Sidemenu />
    </>
  );
};
export default Header;
