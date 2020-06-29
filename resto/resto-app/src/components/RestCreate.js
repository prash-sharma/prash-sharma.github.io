import React, { Component } from 'react'

export default class RestCreate extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            address: "",
            rating: "",
            email: ""

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
                <h1>Create restaurant</h1>
                <div>
                    Name: <input onChange = {(event) => {this.setState({name: event.target.value})}} placeholder = "Rest name"/><br/><br/>
                    Address: <input onChange = {(event) => {this.setState({address: event.target.value})}} placeholder = "Rest address"/><br/><br/>
                    Email: <input onChange = {(event) => {this.setState({email: event.target.value})}} placeholder = "Rest email"/><br/><br/>
                    Rating: <input onChange = {(event) => {this.setState({rating: event.target.value})}} placeholder = "Rest rating"/><br/><br/>
                </div>
                <button onClick = {() => {this.create()}}>Create</button>
            </div>
        )
    }
}
