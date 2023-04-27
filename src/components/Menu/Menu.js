import React, { useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { Menu as MenuWrapper } from './MenuStyle';
import MenuCard from '../MenuCard/MenuCard';

const handleYourProfile = (navigate, setIsSidebarOpen) => () => {
  navigate("/profile");
  setIsSidebarOpen(false);
};



const Menu = () => {
  const navigate = useNavigate();
  const { logout, setIsSidebarOpen } = useContext(AuthContext);

  const handleProfile = useMemo(() => handleYourProfile(navigate, setIsSidebarOpen), [navigate, setIsSidebarOpen]);

  const handleChildClick = useCallback((callback) => {
    callback(navigate);
    setIsSidebarOpen(false);
  }, [navigate, setIsSidebarOpen]);

  const menuItems = [
    {
      id: 1,
      text: "Your profile",
      callback: handleYourProfile,
      children: [
        {
          text: "Account settings",
          callback: navigate => navigate("/profile/account-settings"),
        },
        {
          text: "Billing information",
          callback: navigate => navigate("/profile/billing-information"),
        },
      ],
    },
    {
      id: 2,
      text: "Log out",
      callback: logout => logout(),
    },
  ];

  return (
    <MenuWrapper>
      {menuItems.map(item => (
        <MenuCard
          key={item.id}
          text={item.text}
          callback={item.children ? handleProfile : () => handleChildClick(item.callback)}
          subMenuItems={item.children}
        />
      ))}
    </MenuWrapper>
  );
};

export default Menu;
