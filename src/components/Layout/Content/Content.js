import React from 'react';
import { LineEffectWrapper } from '../../../pages/LogIn/LoginStyle';
import {
  Content as ContentWrapper,
  Heading,
  Title,
  ButtonWrapper,
} from './ContentStyle';
import LineEffect from '../../../assets/img/line-effect.png';

const Content = ({
  title,
  topLeftEffect = false,
  bottomRightEffect = false,
  isCentered = false,
  isHeadingVisible = true,
  isSecondary = false,
  elements,
  children,
}) => {
  return (
    <ContentWrapper
      isSecondary={isSecondary}
    >
      {topLeftEffect &&
        <LineEffectWrapper topLeft maxWidth="50vh">
          <img alt="LineEffect" src={LineEffect} />
        </LineEffectWrapper>
      }
      {bottomRightEffect &&
        <LineEffectWrapper>
          <img alt="LineEffect" src={LineEffect} />
        </LineEffectWrapper>
      }
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
