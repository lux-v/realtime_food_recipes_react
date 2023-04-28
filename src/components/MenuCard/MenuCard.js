import React, { useState } from 'react';
import { Card, CaretIcon, SubMenu, SubMenuItem } from './MenuCardStyle';

function MenuCard({ text, callback, subMenuItems }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleSubMenuClick = (callback) => {
    callback();
    setIsSubMenuOpen(false);
  };


  return (
    <Card onClick={callback ? () => callback() : subMenuItems ? () => setIsSubMenuOpen(!isSubMenuOpen) : null}>
      {text}
      {subMenuItems && <CaretIcon />}
      {
        isSubMenuOpen && subMenuItems && (
          <SubMenu>
            {subMenuItems.map((subMenuItem) => (
              <SubMenuItem
                key={subMenuItem.text}
                text={subMenuItem.text}
                onClick={() => handleSubMenuClick(subMenuItem.callback)}
              >
                {subMenuItem.text}
              </SubMenuItem>
            ))}
          </SubMenu>
        )
      }
    </Card >
  );
}

export default MenuCard;