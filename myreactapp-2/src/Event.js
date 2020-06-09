import React, { Component } from 'react'
// import React from 'react'



// class Event extends Component{
    
//     state = {
//         name: "United"
//     }
    
//     handleClick = () => {
//         console.log("Button clicked", this);  
//     }

//     render(){
//         return(
//             <div>
//                 <h1>Hello event, your name is: {this.state.name}</h1>
//                 <button onClick={this.handleClick}>Click me</button>
//             </div>
//         ) 
//     }
// }



// Fn-al component
const Event = (props) => {
    // const handleClick = () => {
    //     console.log("Btn clicked");
    // }
    return (
        <div>
            <h1>Hello event, your name is: {props.name}</h1>
            <button onClick={(e) => {
                console.log(e);
                console.log(props);
            }}>Click me</button>
        </div>
    )
}

export default Event;
