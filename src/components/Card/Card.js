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
    elements = [],

}) => {
    return (
        <CardWrapper>
            <CardHeading>
                {title}
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