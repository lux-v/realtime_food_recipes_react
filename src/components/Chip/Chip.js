import React from 'react'
import { ChipName, ChipWrapper, StyledIcon } from './ChipStyle'


//size = small | medium | large
const Chip = ({ name = "", type, icon: IconComponent, iconCallback, size = "small", style }) => {

    return (
        <ChipWrapper type={type} key={name} icon={IconComponent} size={size} style={style}>
            <ChipName>
                {name}
            </ChipName>
            {IconComponent && <StyledIcon as={IconComponent} size={size} onClick={iconCallback || null} />}
        </ChipWrapper>
    )
}

export default Chip;
