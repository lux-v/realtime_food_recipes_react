import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Menu as MenuWrapper, MenuLink } from './MenuStyle';
import MenuCard from '../MenuCard/MenuCard';

const Menu = () => {
  const { setIsLoggedIn, setUserData } = useContext(AuthContext);

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.clear('accessToken');
    setUserData(null);
  };
  return (
    <MenuWrapper>
      <MenuLink to={`/profile`}>Your profile</MenuLink>
      <MenuCard isLogOut={true} text={'Log out'} callback={handleLogOut} />
    </MenuWrapper>
  );
};

export default Menu;
