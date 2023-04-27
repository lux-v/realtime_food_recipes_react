// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MenuCard as Card } from './MenuCardStyle';

// function MenuCard({ text, callback }) {
//   const navigate = useNavigate();
//   return (
//     <Card
//       onClick={callback}
//     >
//       {text}
//     </Card>
//   );
// }

// export default MenuCard;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ChevronRight } from '../../assets/img/chevron-right.svg';
import styled from 'styled-components';
import { colors, fonts } from '../../lib/style/theme.js';

const Card = styled.div`
  font-family: ${fonts.primary};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 18px;
  gap: 10px;
  background-color: ${colors.secondary};
  color: ${colors.textMenu};
  width: 100%;
  cursor: pointer;
  position: relative;

  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: ${colors.lightRed};
  }
`;

const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.secondary};
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  box-shadow: ${colors.boxShadow};
  width: 100%;
`;

const SubMenuItem = styled(Card)`
  padding-left: 30px;
  background-color: ${colors.secondary};
  color: ${colors.textMenu};
`;

const CaretIcon = styled(ChevronRight)`
  color: ${colors.textMenu};
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

function MenuCard({ text, callback, subMenuItems }) {
  const navigate = useNavigate();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleSubMenuClick = (callback) => {
    callback();
    setIsSubMenuOpen(false);
  };

  console.log("subMenuItems: ", subMenuItems)

  return (
    <Card onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
      {text}
      {subMenuItems && <CaretIcon />}
      {isSubMenuOpen && subMenuItems && (
        <SubMenu>
          {subMenuItems.map((subMenuItem) => (
            <SubMenuItem
              key={subMenuItem.text}
              text={subMenuItem.text}
              callback={() => handleSubMenuClick(subMenuItem.callback)}
            >
              {subMenuItem.text}
            </SubMenuItem>
          ))}
        </SubMenu>
      )}
    </Card>
  );
}

export default MenuCard;