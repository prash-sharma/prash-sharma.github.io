import React, { Component } from 'react'

export default class RestUpdate extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            address: "",
            rating: "",
            email: "",
            id: ""
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/restaurant/'+this.props.match.params.id).then((response) => {
            response.json().then((result) => {
                this.setState({
                    name: result.name,
                    address: result.address,
                    rating: result.rating,
                    email: result.email,
                    id: result.id
                })
            })
        })
            
    }

    update(){
        fetch('http://localhost:3000/restaurant/'+this.state.id, {
            method: "PUT",
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
        console.log(this.props.match.params.id);
        
        return (
            <div>
                <h2>Update </h2>
                <h3 style={{color:"blue"}}>{this.state.name}</h3> 
                <div>
                    <input onChange = {(event) => {this.setState({name: event.target.value})}} placeholder = "Rest name" value = {this.state.name} /><br/><br/>
                    <input onChange = {(event) => {this.setState({address: event.target.value})}} placeholder = "Rest address" value = {this.state.address}/><br/><br/>
                    <input onChange = {(event) => {this.setState({email: event.target.value})}} placeholder = "Rest email" value = {this.state.email}/><br/><br/>
                    <input onChange = {(event) => {this.setState({rating: event.target.value})}} placeholder = "Rest rating" value = {this.state.rating}/><br/><br/>
                    <button onClick = {() => {this.update()}}>Update</button>
                </div>
            </div>
        )
    }
}

