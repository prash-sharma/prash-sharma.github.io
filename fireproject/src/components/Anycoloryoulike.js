import React, { useState } from 'react'
import { RgbaColorPicker } from 'react-colorful'
import 'react-colorful/dist/index.css'
// import './Anycoloryoulike.css'

export default function App() {
    const [color, setColor] = useState({ r: 200, g: 150, b: 35, a: 0.5 })

    return (
        <div className="App">
            <RgbaColorPicker color={color} onChange={setColor} />
            {console.log(color)}
            <div className="value">{JSON.stringify(color)}</div>
            <div className="buttons">
                <button
                    onClick={() => setColor({ r: 75, g: 75, b: 150, a: 1 })}
                >
                    Choose blue
                </button>
                <button
                    onClick={() => setColor({ r: 50, g: 150, b: 50, a: 1 })}
                >
                    Choose green
                </button>
            </div>
        </div>
    )
}
