import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import './Colorpicker.css'

function Colorpicker() {
    const [rgba, setRGBA] = useState({ r: 255, g: 255, b: 255, a: 1 })

    const [color, setColor] = useState('#ffffff')

    const [displayPicker, setDisplayPicker] = useState(false)

    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
        // border: '5px solid black',
    }

    function showhidepicker() {
        !displayPicker ? setDisplayPicker(true) : setDisplayPicker(false)
    }

    function convertToRGB(inputHex) {
        return {
            ...rgba,
            r: parseInt(inputHex.slice(1, 3), 16),
            g: parseInt(inputHex.slice(3, 5), 16),
            b: parseInt(inputHex.slice(5, 7), 16),
        }
    }

    return (
        <div className="my_div">
            <div className="main__div">
                <div className="color__div">
                    <input
                        // type="text"
                        className="color__text"
                        value={color}
                        onClick={showhidepicker}
                        style={{ textTransform: 'uppercase' }}
                        onChange={(e) => {
                            let inputHex = e.target.value
                            setColor(inputHex)
                            setRGBA(convertToRGB(inputHex))
                            console.log(rgba)
                        }}
                    />

                    <button
                        className="color__circle"
                        style={{
                            backgroundColor: `${color}`,
                            opacity: `${rgba.a}`,
                            transition: 'all 0.4s',
                        }}
                        onClick={showhidepicker}
                    ></button>
                    <div className="opacity__div">
                        <input
                            type="number"
                            min="0"
                            max="100"
                            className="opacity__text"
                            value={rgba.a * 100}
                            onChange={(e) => {
                                e.persist()
                                // setAlpha(e.target.value)
                                setRGBA(() => {
                                    return { ...rgba, a: e.target.value / 100 }
                                })

                                // console.log(rgba.a)
                            }}
                        />
                        <h3>%</h3>
                    </div>
                </div>

                {displayPicker ? (
                    <>
                        <div style={cover} onClick={showhidepicker} />
                        <ChromePicker
                            className={'color_picker'}
                            color={rgba}
                            onChange={(selectedColor) => {
                                setRGBA(selectedColor.rgb)
                                setColor(selectedColor.hex)
                                console.log(rgba)
                            }}
                        />
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default Colorpicker

// import React, { useState } from 'react'
// import { ChromePicker } from 'react-color'
// import './Colorpicker.css'

// function Colorpicker() {
//     const [rgba, setRGBA] = useState({ r: 255, g: 255, b: 255, a: 1 })

//     const [alpha, setAlpha] = useState(1)

//     const [color, setColor] = useState('#ffffff')
//     // const [transparency, setTransparency] = useState(rgba.a)
//     const [displayPicker, setDisplayPicker] = useState(false)

//     const cover = {
//         position: 'fixed',
//         top: '0px',
//         right: '0px',
//         bottom: '0px',
//         left: '0px',
//         // border: '5px solid black',
//     }

//     function showhidepicker() {
//         !displayPicker ? setDisplayPicker(true) : setDisplayPicker(false)
//     }

//     return (
//         <div className="my_div">
//             <div className="main__div">
//                 <div className="color__div">
//                     <input
//                         // type="text"
//                         className="color__text"
//                         value={color}
//                         // onClick={showhidepicker}
//                         style={{ textTransform: 'uppercase' }}
//                         onChange={(e) => {
//                             setRGBA(e.target.value)
//                         }}
//                     />

//                     <button
//                         className="color__circle"
//                         style={{
//                             backgroundColor: `${color}`,
//                             opacity: `${rgba.a}`,
//                             transition: 'all 0.4s',
//                         }}
//                         onClick={showhidepicker}
//                     ></button>
//                     <div className="opacity__div">
//                         <input
//                             type="number"
//                             min="0"
//                             max="100"
//                             className="opacity__text"
//                             value={rgba.a * 100}
//                             onChange={(e) => {
//                                 e.persist()
//                                 setRGBA((rgba) => {
//                                     return { ...rgba, a: e.target.value / 100 }
//                                 })
//                                 console.log(rgba.a)
//                             }}
//                         />
//                         <h3>%</h3>
//                     </div>
//                 </div>

//                 {displayPicker ? (
//                     <>
//                         <div
//                             style={cover}
//                             onClick={() => {
//                                 !displayPicker
//                                     ? setDisplayPicker(true)
//                                     : setDisplayPicker(false)
//                             }}
//                         />
//                         <ChromePicker
//                             color={rgba}
//                             onChange={(selectedColor) => {
//                                 console.log(selectedColor)
//                                 setRGBA(selectedColor.rgb)
//                                 setColor(selectedColor.hex)
//                                 setAlpha(selectedColor.rgb.a)
//                                 // setTransparency(selectedColor.rgb.a)
//                             }}
//                         />
//                     </>
//                 ) : null}
//             </div>
//         </div>
//     )
// }

// export default Colorpicker
