import React from 'react'
import { ChipName, ChipWrapper } from './ChipStyle'


const Chip = ({ name = "", type, icon }) => {


    return (
        <ChipWrapper type={type} key={name} icon={icon}>
            <ChipName>
                {name}
            </ChipName>
            {icon}
        </ChipWrapper>
    )
}

export default Chip

