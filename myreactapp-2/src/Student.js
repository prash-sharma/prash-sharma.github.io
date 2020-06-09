import React, { Component } from "react";
import Marks from "./Marks";


export default class Student extends Component{
    constructor(){
        super();
        this.state = {
            roll: 101
        }
    }
    
    update = () => {
        console.log('Update btn clicked');
        // this.setState({roll: 102});
        this.setState({roll: this.state.roll + 2});

        console.log(this.state.roll);
        
        
    }

    render(){
        return(
            <div>
                <h1>Hello </h1>
                <Marks roll={this.state.roll}/>
                <button onClick={this.update}>Update roll</button>
            </div>
        )
    }
}


// import React, { Component } from 'react';

// // Class based component with constructor
// class Student extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             name: this.props.name,
//             roll: this.props.roll
//         }
//     }
//     render(){
//     return <h1>Hello {this.props.name}, your roll number is {this.state.roll}</h1>
//     }
// }

// export default Student;

// Fn based component
// const Student = (props) =>{
//     return <h1>Hello {props.name}..</h1>
// }


// class Student extends Component{
//     render(){
//         return <h1>Hello {this.props.name}</h1>
//     }
// }

// Class based component
// class Student extends Component{
//     state = {
//         name: this.props.name,
//         roll: this.props.roll
//     }
    
//     render(){
//         return (
//         <h1>Hello Mr. {this.state.name}, your roll number is: {this.state.roll}</h1>
//         )     
    
//     }
// }