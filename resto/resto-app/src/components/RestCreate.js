import React, { Component } from 'react'

export default class RestCreate extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            role: "",
            expertise: "",
            from: "",
            image: ""

        }
    }
    create(){
        fetch('http://localhost:3000/restaurant', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((result) => {
            result.json()
            // add passive success notification
        })
        
    }
    render() {
        return (
            <div>
                <h1>Add member</h1>
                <div>
                    Name: <input onChange = {(event) => {this.setState({name: event.target.value})}} placeholder = "Rest name"/><br/><br/>
                    Role: <input onChange = {(event) => {this.setState({role: event.target.value})}} placeholder = "Rest address"/><br/><br/>
                    Expertise: <input onChange = {(event) => {this.setState({expertise: event.target.value})}} placeholder = "Rest email"/><br/><br/>
                    From: <input onChange = {(event) => {this.setState({from: event.target.value})}} placeholder = "Rest rating"/><br/><br/>
                    Image: <input type="file" onChange = {(event) => {this.setState({image: event.target.value})}} /><br/><br/>
                </div>
                <button onClick = {() => {this.create()}}>Create</button>
            </div>
        )
    }
}
