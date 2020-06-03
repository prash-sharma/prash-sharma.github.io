import React from 'react'
import './Avatar.css'


const Avatarlist = (props) => {
    return (
            <div className = "avatarstyle">
                <img src = {`https://joeschmoe.io/api/v1/${props.name}`} alt ="avatar"/>
                <h1>{props.name}</h1>
                <p>{props.work}</p>
            </div>
    )
}

export default Avatarlist;