import React from 'react';
import { LineEffectWrapper } from '../../../pages/LogIn/LoginStyle';
import {
  Content as ContentWrapper,
  Heading,
  Title,
  ButtonWrapper,
  ChildrenWrapper,
} from './ContentStyle';
import LineEffect from '../../../assets/img/line-effect.png';

const Content = ({
  title,
  topLeftEffect = false,
  bottomRightEffect = false,
  isCentered = false,
  isSecondary = false,
  elements,
  children,
}) => {
  const showHeading = title != undefined || elements != undefined

  return (
    <ContentWrapper
      isSecondary={isSecondary}
    >
      {/* ----------- styles ----------- */}
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
      {/* ----------------------------- */}

      {showHeading && (
        <Heading
          isCentered={isCentered}
          floatLeft={elements && elements.props.children.length === undefined}
        >
          {title != undefined && (
            <Title isSecondary={isSecondary} isCentered={isCentered}>
              {title}
            </Title>
          )}
          {elements &&
            <ButtonWrapper>{elements}</ButtonWrapper>
          }
        </Heading>
      )}
      <ChildrenWrapper showHeading={showHeading}>
        {children}
      </ChildrenWrapper>
    </ContentWrapper>
  );
};
export default Content;
