import React, {useState, useEffect} from 'react';
import '../App.css'

export default function Update({match}) {
    useEffect(()=>{
        async function fetchMember(){
            const res = await fetch(`http://localhost:3000/members/${match.params.id}`);
            const data = await res.json();
            setMember(data);
            console.log(data);
        }

        fetchMember();
        console.log(match)
    }, [match]);

    const [member, setMember] = useState([]);

    

    async function updateMember(id){

        await fetch('http://localhost:3000/members/'+id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify()
        
        }).then((result)=>{console.log(result.json())})
    }
    return (
        <div>
            
            Name: <input value={member.name} type='text'/> <br />
            Role: <input value={member.role} type='text'/> <br />
            Expertise: <input value={member.expertise} type='text'/> <br />
            Role: <input value={member.role} type='text'/> <br />
            From: <input value={member.from} type='text'/> <br />
            Image: <input value={member.role} type='text'/> <br />

            
            {/* <input value = {this.state.name} placeholder = "Name" onChange = {(event) => {this.setState({name: event.target.value})}} /><br/><br/>
            <input value = {this.state.role} placeholder = "Role"  onChange = {(event) => {this.setState({role: event.target.value})}} /><br/><br/>
            <input value = {this.state.expertise} placeholder = "Expertise" onChange = {(event) => {this.setState({expertise: event.target.value})}} /><br/><br/>
            <input value = {this.state.from} placeholder = "From" onChange = {(event) => {this.setState({from: event.target.value})}} /><br/><br/>
            <input value = {this.state.image} type="file" onChange = {(event) => {this.setState({image: event.target.value})}} /><br/><br/> */}
            <button onClick = {() => {updateMember(member.id)}}>Update</button>
        </div>
    )
}
