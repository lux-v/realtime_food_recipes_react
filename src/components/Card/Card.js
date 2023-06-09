import React, { forwardRef } from "react";

import {
  CardWrapper,
  CardHeading,
  CardContent,
  CardBottom,
  HeadingElementsWrapper,
} from "./CardStyle";

const Card = forwardRef(
  ({ title, children, headingElements = [], elements = [] }, ref) => {
    const isHeading = title || headingElements.length > 0;

    return (
      <CardWrapper ref={ref}>
        {isHeading && (
          <CardHeading>
            {title ? title : null}
            {headingElements.length > 0 && (
              <HeadingElementsWrapper hasTitle={title ? true : false}>
                {headingElements.map((element, index) => (
                  <React.Fragment key={index}>{element}</React.Fragment>
                ))}
              </HeadingElementsWrapper>
            )}
          </CardHeading>
        )}
        <CardContent>{children}</CardContent>
        {elements.length > 0 && (
          <CardBottom>
            {elements.map((element, index) => (
              <React.Fragment key={index}>{element}</React.Fragment>
            ))}
          </CardBottom>
        )}
      </CardWrapper>
    );
  }
);

export default Card;
