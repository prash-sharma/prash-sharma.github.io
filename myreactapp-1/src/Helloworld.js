import React, { Component } from 'react';
import './Helloworld.css';

const Helloworld = ({name}) => {
    return <div className ="maindiv_style">
        <h1>Hello {name}, I'm reacting....</h1>
        <p>I'm part of a div..</p>
        <p>I'm Functional based component</p>
    </div>
}   


// class Helloworld extends Component{
//     render(){
//        return <div className ="maindiv_style">
//             <h1>Hello {this.props.name}, I'm reacting......</h1>
//             <p>I'm part of a div..</p>
//             <p>I'm Component based..</p>
//        </div>
//     } 
// }

export default Helloworld;