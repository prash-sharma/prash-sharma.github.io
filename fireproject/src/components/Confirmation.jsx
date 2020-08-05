import React, {useEffect} from 'react'

export default function Confirmation(props) {
    
    useEffect(() => {
        if(props.bgScroll){
            document.body.style.overflow = 'hidden' 
        } else{
            document.body.style.overflow = 'unset'
        }
        
    }, [props.bgScroll, props.returnConfirmation])

    let prompt = (
        <div className='promptDiv'>
            <div className='confirmationPrompt'>
                <div>
                    {props.children}
                </div>
                
                <div className='promptBtns'>
                    <button className='btnConfirm' onClick={props.onConfirm}>Ok</button>
                    <button className='btnCancel' onClick={props.onCancel}>Not this time</button>
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
