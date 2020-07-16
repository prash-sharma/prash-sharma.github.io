import React from 'react'

export default function Confirmation(props) {
    
    let prompt = (
        <div className='confirmationPrompt'>
            {props.children}
            <div className='promptBtns'>
                <button onClick={props.onConfirm}>Delete</button>
                <button onClick={props.onCancel}>Cancel</button>
            </div>
            
        </div>
    )

    if(!props.trigger){
        prompt = null
    }
    return (
        <div className='promptDiv'>
            {prompt}
        </div>
    )
}
