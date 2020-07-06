import React, { Component } from 'react'

export default class RestUpdate extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            role: "",
            expertise: "",
            from: "",
            id: ""
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/restaurant/'+this.props.match.params.id).then((response) => {
            response.json().then((result) => {
                this.setState({
                    name: result.name,
                    role: result.role,
                    expertise: result.expertise,
                    from: result.from,
                    image: result.image,
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
                    <input value = {this.state.name} placeholder = "Name" onChange = {(event) => {this.setState({name: event.target.value})}} /><br/><br/>
                    <input value = {this.state.role} placeholder = "Role"  onChange = {(event) => {this.setState({role: event.target.value})}} /><br/><br/>
                    <input value = {this.state.expertise} placeholder = "Expertise" onChange = {(event) => {this.setState({expertise: event.target.value})}} /><br/><br/>
                    <input value = {this.state.from} placeholder = "From" onChange = {(event) => {this.setState({from: event.target.value})}} /><br/><br/>
                    <input value = {this.state.image} type="file" onChange = {(event) => {this.setState({image: event.target.value})}} /><br/><br/>
                    <button onClick = {() => {this.update()}}>Update</button>
                </div>
            </div>
        )
    }
}

