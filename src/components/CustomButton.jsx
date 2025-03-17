
import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'
import { getContrastingColor } from '../config/helpers'
const CustomButton = ({ type, title, handleClick, customStyles }) => {
    const snap = useSnapshot(state)
    const generateStyle = (type) => {
        if (type == "filled") {
            return ({
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
            )
        } else if (type == "outline") {
            return ({
                color: snap.color,
                borderColor:snap.color,
                borderWidth:"1px"
            }
            )
        }
    }
    return (
        <button onClick={handleClick} className={`${customStyles} rounded-md px-2 py-1.5 flex-1 `} style={generateStyle(type)} >
            {title}
        </button>

    )
}

export default CustomButton
