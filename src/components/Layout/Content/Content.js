import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

import { LineEffectWrapper } from '../../../lib/style/generalStyles';
import {
  ContentWrapper,
  Content as ContentWrapper1,
  NavigationWrapper,
  Title,
  ButtonWrapper,
  ChildrenWrapper,
  TitleButtonWrapper,
  // BreadcrumbsWrapper
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
      <ContentWrapper1
      >
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
      </ContentWrapper1>
    </ContentWrapper>
  );
};
export default Content;
