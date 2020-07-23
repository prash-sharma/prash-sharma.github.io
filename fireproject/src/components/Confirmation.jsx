import React from 'react'

export default function Confirmation(props) {
    let prompt = (
        <div className='promptDiv'>
            <div className='confirmationPrompt'>
                <div>
                    {props.children}
                </div>
                
                <div className='promptBtns'>
                    <button className='btnConfirm' onClick={props.onConfirm}>Delete</button>
                    <button className='btnCancel' onClick={props.onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )

    if (!props.returnConfirmation){
        prompt = null
    }
    
    return (
        <div>
            {prompt}
        </div>
    )
}
