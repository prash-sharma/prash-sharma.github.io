import React, {useEffect, useState} from 'react';
import '../App.css';
import tick from '../images/tick.png';


export default function Notification(props) {
    const [show, setShow] = useState(false);
    const triggerUseEffect = props.stateChange;
    const tickIcon = {
        width: '30px',
        height: '30px'
    }
    console.log(triggerUseEffect)

    useEffect(()=>{
        setShow(true);
        setTimeout(()=>{
            setShow(false)
        }, 3000)
    }, [triggerUseEffect])

    return (
        <>
            {(show && props.msg) && (<div className='notification' >
                <img src={tick} alt='tick' style={tickIcon}></img>
                <p className='msgNotification'>{props.msg}</p>
                <button className='closeNotificationBtn' onClick={()=>{setShow(false)}}>X</button>
            </div>
        )}
    </>
    )
}
