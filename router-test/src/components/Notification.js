import React, {useEffect} from 'react';
import '../App.css'

export default function Notification(props) {
    console.log(props.msg)

    return (
        <div className='notification'>
            <p>Action completed successfully</p>
            
        </div>
    )
}
