import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuCard as Card } from './MenuCardStyle';

function MenuCard({ isLogOut = false, goTo, text, callback }) {
  const navigate = useNavigate();
  return (
    <Card
      isLogOut={isLogOut}
      onClick={
        goTo
          ? () => {
              navigate(goTo);
            }
          : callback
      }
    >
      {text}
    </Card>
  );
}

export default MenuCard;
