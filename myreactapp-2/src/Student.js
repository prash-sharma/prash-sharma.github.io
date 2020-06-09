import React, { Component } from 'react';

// Class based component with constructor
class Student extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: this.props.name,
            roll: this.props.roll
        }
    }
    render(){
    return <h1>Hello {this.props.name}, your roll number is {this.state.roll}</h1>
    }
}

export default Student;

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