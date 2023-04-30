import React from 'react'

import {
    CardWrapper,
    CardHeading,
    CardContent,
    CardBottom
} from "./CardStyle"


const Card = ({
    title,
    children,
    headingElements=[],
    elements = [],

}) => {
    return (
        <CardWrapper>
            <CardHeading>
                {title}
                <div>
                {headingElements.map((element, index) => <React.Fragment key={index}>{element}</React.Fragment>)}

                </div>
            </CardHeading>
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