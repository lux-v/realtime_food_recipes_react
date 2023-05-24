import React, { useContext, } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { Menu as MenuWrapper } from './MenuStyle';
import MenuCard from '../MenuCard/MenuCard';
import PresetColor from '../PresetColor/PresetColor';


const Menu = ({ closePopup }) => {
  const navigate = useNavigate();
  const { logout, presetColor } = useContext(AuthContext);

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

      <div style={{ border: `1px solid #c5d0de`, borderRadius: "8px", margin: "30px 10px 10px 10px" }}>
        <p style={{ borderBottom: "1px solid #c5d0de", padding: "10px", fontWeight: "600" }}>Preset Color</p>

        <div style={{ padding: "10px" }}>
          <PresetColor />
        </div>
      </div>
    </MenuWrapper>
  );
};

export default Menu;
