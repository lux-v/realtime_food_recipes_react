import React from 'react'
import { ChipName, ChipWrapper } from './ChipStyle'


const Chip = ({ name = "", type }) => {
    return (
        <ChipWrapper type={type}>
            <ChipName>
                {name}
            </ChipName>
        </ChipWrapper>
    )
}

export default Chip

