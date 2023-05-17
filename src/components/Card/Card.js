import React from 'react'

import {
    CardWrapper,
    CardHeading,
    CardContent,
    CardBottom,
    HeadingElementsWrapper
} from "./CardStyle"


const Card = ({
    title,
    children,
    headingElements = [],
    elements = [],

}) => {

    const isHeading = title || headingElements.length > 0

    return (
        <CardWrapper>
            {isHeading &&
                <CardHeading>
                    {title || <p></p>}
                    <HeadingElementsWrapper>
                        {headingElements.map((element, index) => <React.Fragment key={index}>{element}</React.Fragment>)}
                    </HeadingElementsWrapper>
                </CardHeading>
            }
            <CardContent>
                {children}
            </CardContent>
            {elements.length > 0 &&
                <CardBottom>
                    {elements.map((element, index) => <React.Fragment key={index}>{element}</React.Fragment>)}
                </CardBottom>
            }
        </CardWrapper>
    )
}

export default Card