import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Menu as MenuWrapper, MenuLink } from './MenuStyle';
import MenuCard from '../MenuCard/MenuCard';

const Menu = () => {
  const { logout } = useContext(AuthContext);


  return (
    <MenuWrapper>
      <MenuLink to={`/profile`}>Your profile</MenuLink>
      <MenuCard
        isLogOut={true}
        text='Log out'
        callback={logout}
      />
    </MenuWrapper>
  );
};

export default Menu;
