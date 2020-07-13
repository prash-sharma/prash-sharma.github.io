import React, {useEffect, useState} from 'react';
import '../App.css'

export default function Notification() {
    const [show, setShow] = useState(true);

    useEffect(()=>{
        setShow(true);
        setTimeout(()=>{
            setShow(false)
        }, 3000)
    }, [])

    return (
        <>
            {show && (<div className='notification'>
                <p className='msgNotification'>Action completed successfully</p>
                <button className='closeNotificationBtn' onClick={()=>{setShow(false)}}>X</button>
            </div>
        )}
    
    </>
    )
}
