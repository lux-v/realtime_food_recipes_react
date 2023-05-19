import React, { useContext, } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { Menu as MenuWrapper } from './MenuStyle';
import MenuCard from '../MenuCard/MenuCard';


const Menu = ({ closePopup }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const menuItems = [
    {
      id: 1,
      text: "Account settings",
      callback: () => {
        navigate("/account-settings"); closePopup()
      },
      // children: [
      //   {
      //     text: "Account settings",
      //     callback: () => { navigate("/account-settings"); closePopup() },
      //   },
      //   {
      //     text: "Account statistics",
      //     callback: () => { navigate("/profile/account-stats"); closePopup() },
      //   },
      // ],
    },
    {
      id: 2,
      text: "Log out",
      callback: () => logout(),
    },

  ];


  return (
    <MenuWrapper>
      {menuItems.map(item => (
        <MenuCard
          key={item.id}
          text={item.text}
          callback={item.callback}
          subMenuItems={item.children}
        />
      ))}
    </MenuWrapper>
  );
};

export default Menu;
