import React, {useEffect, useState} from 'react';
import '../App.css'


export default function Notification(props) {
    const [show, setShow] = useState(false);
    const triggerUseEffect = props.stateChange;
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
                <p className='msgNotification'>{props.msg}</p>
                <button className='closeNotificationBtn' onClick={()=>{setShow(false)}}>X</button>
            </div>
        )}
    </>
    )
}
