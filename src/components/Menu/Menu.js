import React, { useContext, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { Menu as MenuWrapper } from './MenuStyle';
import MenuCard from '../MenuCard/MenuCard';
import PresetColor from '../PresetColor/PresetColor';


const Menu = ({ closePopup }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const menuRef = React.useRef(null);

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


  const handleClickOutside = (e) => {
    const menuDimensions = menuRef.current?.getBoundingClientRect() || { top: 0, left: 0, width: 0, height: 0 };

    const isInMenu = (menuDimensions.top <= e.clientY && e.clientY <= menuDimensions.top + menuDimensions.height
      && menuDimensions.left <= e.clientX && e.clientX <= menuDimensions.left + menuDimensions.width);
    if (!isInMenu) {
      closePopup()
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <MenuWrapper ref={menuRef}>
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
