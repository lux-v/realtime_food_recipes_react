import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ReactComponent as DoubleTick } from '../../assets/icons/double-tick.svg'


const PresetColor = () => {
    const { presetColor, setPresetColor } = useContext(AuthContext)
    return (

        <div style={{ display: "flex", gap: "5px" }}>
            <div style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: "0",
                width: "40px",
                height: "40px",
                fontFamily: "Roboto, sans-serif",
                fontSize: "1.25rem",
                lineHeight: "1",
                borderRadius: "4px",
                overflow: "hidden",
                userSelect: "none",
                color: "rgb(84, 110, 122)",
                background: "linear-gradient(135deg, #7b8b9a 50%, rgba(238, 242, 246, 0.863) 50%)",
                opacity: presetColor === "theme1" ? "0.6" : "1",
                cursor: "pointer"
            }}
                onClick={() => setPresetColor("theme1")}
            >
                {presetColor === "theme1" && <DoubleTick style={{ width: "30px", height: "30px", stroke: "white" }} />}
            </div>



            <div style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: "0",
                width: "40px",
                height: "40px",
                fontFamily: "Roboto, sans-serif",
                fontSize: "1.25rem",
                lineHeight: "1",
                borderRadius: "4px",
                overflow: "hidden",
                userSelect: "none",
                color: "rgb(84, 110, 122)",
                background: "linear-gradient(135deg,#EB2828 50%, rgb(238, 242, 246) 50%)",
                opacity: presetColor === "theme2" ? "0.6" : "1",
                cursor: "pointer"
            }}
                onClick={() => setPresetColor("theme2")}
            >
                {presetColor === "theme2" && <DoubleTick style={{ width: "30px", height: "30px", stroke: "white" }} />}
            </div>
        </div>
    )
}

export default PresetColor