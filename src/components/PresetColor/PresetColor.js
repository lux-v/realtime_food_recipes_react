import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ReactComponent as DoubleTick } from '../../assets/icons/double-tick.svg'

import theme1 from '../../assets/scss/_theme1.module.scss'
import theme2 from '../../assets/scss/_theme2.module.scss'
import theme3 from '../../assets/scss/_theme3.module.scss'

import { PresetColorContainer, PresetColorStyle } from './PresetColorStyle'


const allPresetColors = [
    {
        id: 1,
        name: "theme1",
        color: theme1
    },
    {
        id: 2,
        name: "theme2",
        color: theme2
    },
    {
        id: 3,
        name: "theme3",
        color: theme3
    }

]

const PresetColor = () => {
    const { presetColor, setPresetColor } = useContext(AuthContext)

    return (

        <PresetColorContainer>
            {allPresetColors.map((color) => (
                <PresetColorStyle
                    key={color.id}
                    onClick={() => setPresetColor(color.name)}
                    color={color.color}
                    themeName={color.name}
                    presetColor={presetColor}
                >
                    {presetColor === color.name && <DoubleTick />}
                </PresetColorStyle>
            ))}
        </PresetColorContainer>

    )
}

export default PresetColor