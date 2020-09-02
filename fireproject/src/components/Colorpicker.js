import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import './Colorpicker.css'

function Colorpicker() {
    const [rgba, setRGBA] = useState({ r: 255, g: 255, b: 255, a: 1 })

    const [color, setColor] = useState('#ffffff')
    const [transparency, setTransparency] = useState(rgba.a)
    const [displayPicker, setDisplayPicker] = useState(false)

    return (
        <div className="my_div">
            <div className="main__div">
                <div className="color__div">
                    <input
                        // type="text"
                        className="color__text"
                        value={color}
                        onChange={(e) => {
                            setRGBA(e.target.value)
                        }}
                    />

                    <div
                        className="color__circle"
                        style={{
                            backgroundColor: `${color}`,
                            opacity: `${rgba.a}`,
                            transition: 'all 0.4s',
                        }}
                        onClick={() => {
                            !displayPicker
                                ? setDisplayPicker(true)
                                : setDisplayPicker(false)
                        }}
                    ></div>
                    <div className="opacity__div">
                        <input
                            type="number"
                            min="0"
                            max="100"
                            className="opacity__text"
                            value={rgba.a * 100}
                            onChange={(e) => {
                                e.persist()
                                setRGBA((rgba) => {
                                    return { ...rgba, a: e.target.value / 100 }
                                })
                                console.log(rgba.a)
                            }}
                        />
                        <h3>%</h3>
                    </div>
                </div>

                <div>
                    {displayPicker && (
                        <ChromePicker
                            color={rgba}
                            onChange={(selectedColor) => {
                                setRGBA(selectedColor.rgb)
                                setColor(selectedColor.hex)
                                setTransparency(selectedColor.rgb.a)
                                console.log(selectedColor)
                                console.log(transparency)
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Colorpicker
