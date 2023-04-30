import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

import {
  ContentWrapper,
  NavigationWrapper,
  Title,
  ButtonWrapper,
  ChildrenWrapper,
  TitleButtonWrapper,
} from './ContentStyle';

import Breadcrumbs from "../../Breadcrumbs/Breadcrumbs"

const Content = ({
  title,
  isCentered = false,

  elements,
  children,
}) => {

  const { isSidebarOpen, isLoggedIn } = useContext(AuthContext);
  const showHeading = title || elements

  return (
    <ContentWrapper isSidebarOpen={isSidebarOpen}  isLoggedIn={isLoggedIn}>
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
