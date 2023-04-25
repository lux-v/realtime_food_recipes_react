import React, { useContext } from 'react';
import { LineEffectWrapper } from '../../../lib/style/generalStyles';
import {
  ContentWrapper,
  Content as ContentWrapper1,
  Heading,
  Title,
  ButtonWrapper,
  ChildrenWrapper,
} from './ContentStyle';
import LineEffect from '../../../assets/img/line-effect.png';
import { AuthContext } from '../../../context/AuthContext';

const Content = ({
  title,
  topLeftEffect = false,
  bottomRightEffect = false,
  isCentered = false,

  elements,
  children,
}) => {

  const { isSidebarOpen } = useContext(AuthContext);
  const showHeading = title != undefined || elements != undefined

  return (
    <ContentWrapper isSidebarOpen={isSidebarOpen}>
      <ContentWrapper1

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
              <Title isCentered={isCentered}>
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
      </ContentWrapper1>
    </ContentWrapper>
  );
};
export default Content;
