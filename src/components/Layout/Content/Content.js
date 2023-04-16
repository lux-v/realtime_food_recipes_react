import React from 'react';
import {
  Content as ContentWrapper,
  Heading,
  Title,
  ButtonWrapper,
} from './ContentStyle';

const Content = ({
  title,
  isCentered = false,
  isHeadingVisible = true,
  isSecondary = false,
  isChangePassword = false,
  elements,
  children,
}) => {
  return (
    <ContentWrapper
      isSecondary={isSecondary}
      isChangePassword={isChangePassword}
    >
      {isHeadingVisible && (
        <Heading
          isCentered={isCentered}
          floatLeft={elements && elements.props.children.length === undefined}
        >
          {title && (
            <Title isSecondary={isSecondary} isCentered={isCentered}>
              {title}
            </Title>
          )}
          <ButtonWrapper>{elements}</ButtonWrapper>
        </Heading>
      )}
      {children}
    </ContentWrapper>
  );
};
export default Content;
