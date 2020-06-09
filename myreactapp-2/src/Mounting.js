import React, { Component } from "react";
import Student from "./Student"

export default class Mounting extends Component{
    constructor(props){
        super(props);
        console.log(`I'm constructor`);
        console.log(props);
        
        this.state = {
            roll: `101`
        }
    }
    
    static getDerivedStateFromProps(props, state){
        console.log(`I'm getDerivedStateFromProps`);
        console.log(props, state);
        return null;
    }

    componentDidMount(){
        console.log("Component did mount");
        
    }

    render(){
        return(
            <div>
                <Student name="Mounting" />
            </div>
        )
    }
}