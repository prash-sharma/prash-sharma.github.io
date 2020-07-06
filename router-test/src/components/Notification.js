import React from 'react'

export default function Notification(props) {
    console.log(props.msg)

    return (
        <>
        {setTimeout(()=>{
            return <p>Successfully updated</p>
        }, 3000)}
            
        </>
    )
}
