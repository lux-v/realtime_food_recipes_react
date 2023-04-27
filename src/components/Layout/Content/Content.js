import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

import { LineEffectWrapper } from '../../../lib/style/generalStyles';
import {
  ContentWrapper,
  NavigationWrapper,
  Title,
  ButtonWrapper,
  ChildrenWrapper,
  TitleButtonWrapper,
} from './ContentStyle';

import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs"
import LineEffect from '../../../assets/img/line-effect.png';

const Content = ({
  title,
  topLeftEffect = true,
  bottomRightEffect = true,
  isCentered = false,

  elements,
  children,
}) => {

  const { isSidebarOpen } = useContext(AuthContext);
  const showHeading = title || elements

  return (
    <ContentWrapper isSidebarOpen={isSidebarOpen}>
      {/* ----------- styles ----------- */}
      {topLeftEffect &&
        <LineEffectWrapper login topLeft maxWidth="50vh">
          <img alt="LineEffect" src={LineEffect} />
        </LineEffectWrapper>
      }
      {bottomRightEffect &&
        <LineEffectWrapper login>
          <img alt="LineEffect" src={LineEffect} />
        </LineEffectWrapper>
      }
      {/* ----------------------------- */}

      {showHeading && (
        <NavigationWrapper>
          <TitleButtonWrapper>
            {title && (
              <Title isCentered={isCentered}>
                {title}
              </Title>
            )}
            {elements &&
              <ButtonWrapper>{elements}</ButtonWrapper>
            }
          </TitleButtonWrapper>
          <Breadcrumbs />
        </NavigationWrapper>
      )}
      <ChildrenWrapper showHeading={showHeading}>
        {children}
      </ChildrenWrapper>
    </ContentWrapper>
  );
};
export default Content;
