import React, {useEffect, useState} from 'react';
import Notification from './Notification';
import LoadingIndicator from './LoadingIndicator';
import '../App.css';

export default function Update({match}) {
    console.log(match);
    const [member, setMember] = useState({name:''});
    const [notify, setNotify] = useState();
    const [loader, setLoader] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(()=>{  
        
        async function fetchMember(){            
            let res = await fetch(`http://localhost:3000/members/${match.params.id}`);
            let data = await res.json()
            console.log(data);
            setMember(data);
            setLoader(false);
        }
        fetchMember();
    }, [match])
    
   
    function updateMember(member){
        console.log(member);
        setLoader(true)
        
        fetch(`http://localhost:3000/members/${member.id}`, {
                        method: "PUT",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(member)
                    }).then(() =>{
                        setLoader(false);
                        setNotify(Math.random())
                        setMessage('Member updated successfully')
                    })
    }
    
    return (
        <div>
            {loader && (
                <> <LoadingIndicator /> </>
            )}

            {member && (
                <> <Notification msg = {message} stateChange = {notify}/> </>
            )}
            <h1>Update member: {member.name}</h1>
            <div className='createMember'>
            
            Name:   <input 
                        type='text' 
                        value ={member.name || ''} 
                        onChange={(e)=>{
                            e.persist();
                            setMember((member)=>{
                                return {...member, name: e.target.value}
                            })
                        }}/> <br />

            Role:   <input 
                        type='text' 
                        value ={member.role || ''} 
                        onChange={(e)=>{
                            e.persist();
                            setMember((member)=>{
                                return {...member, role: e.target.value}
                            })
                        }}/> <br />

            Expertise:<input 
                        type='text' 
                        value ={member.expertise || ''} 
                        onChange={(e)=>{
                            e.persist();
                            setMember((member)=>{
                                return {...member, expertise: e.target.value}
                            })
                        }}/> <br />

            From:   <input 
                        type='text' 
                        value ={member.from || ''} 
                        onChange={(e)=>{
                            e.persist();
                            setMember((member)=>{
                                return {...member, from: e.target.value}
                            })
                        }}/> <br />

            Image:  <input 
                        type='file' 
                        value ={member.image || ''} 
                        onChange={(e)=>{
                            e.persist();
                            setMember((member)=>{
                                return {...member, image: e.target.value}
                            })
                        }}/> <br />
                        </div>

            <button className='updateBtn' onClick = {()=>{updateMember(member)}}>Submit</button>
        </div>
    )
}




// import React, { Component } from 'react'

// export default class Update extends Component {
//     constructor(){
//         super();
//         this.state = {
//             name: '',
//             role: '',
//             expertise: '',
//             from: '',
//             image: ''

//         }
//     }

//     componentDidMount(){
//         fetch('http://localhost:3000/members/'+this.props.match.params.id).then((response) => {
//             response.json().then((result) => {
//                 this.setState({
//                     name: result.name,
//                     role: result.role,
//                     expertise: result.expertise,
//                     from: result.from,
//                     image: result.image,
//                     id: result.id
//                 })
//             })
//         })   
//     }

//     updateMember() {
//         fetch('http://localhost:3000/members/'+this.state.id, {
//             method: "PUT",
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify(this.state)
//         }).then((result) => {
//             result.json()
//             // add passive success notification
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Update member</h1>
//                  Name <br />
//                  <input value={this.state.name} onChange = {(event) => {this.setState({name: event.target.value})}} placeholder = "Rest name"/><br/><br/>
//                  Role <br />
//                  <input value={this.state.role} onChange = {(event) => {this.setState({role: event.target.value})}} placeholder = "Rest address"/><br/><br/>
//                  Expertise <br />
//                  <input value={this.state.expertise} onChange = {(event) => {this.setState({expertise: event.target.value})}} placeholder = "Rest email"/><br/><br/>
//                  From <br />
//                  <input value={this.state.from} onChange = {(event) => {this.setState({from: event.target.value})}} placeholder = "Rest rating"/><br/><br/>
//                  Image <br />
//                  <input type="file" onChange = {(event) => {this.setState({image: event.target.value})}} /><br/><br/>
//                  <button onClick = {() => {this.updateMember()}}>Update</button>
//             </div>
//         )
//     }
// }





// import React, {useState, useEffect} from 'react';
// import '../App.css'

// export default function Update({match}) {
//     useEffect(()=>{
//         async function fetchMember(){
//             const res = await fetch(`http://localhost:3000/members/${match.params.id}`);
//             const data = await res.json();
//             setMember(data);
//             console.log(data);
//         }

//         fetchMember();
//         console.log(match)
//     }, [match]);

//     const [member, setMember] = useState([]);

    

//     async function updateMember(id){

//         await fetch('http://localhost:3000/members/'+id, {
//             method: "PUT",
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify()
        
//         }).then((result)=>{console.log(result.json())})
//     }
//     return (
//         <div>
            
//             Name: <input value={member.name} type='text'/> <br />
//             Role: <input value={member.role} type='text'/> <br />
//             Expertise: <input value={member.expertise} type='text'/> <br />
//             Role: <input value={member.role} type='text'/> <br />
//             From: <input value={member.from} type='text'/> <br />
//             Image: <input value={member.role} type='text'/> <br />

            
//             {/* <input value = {this.state.name} placeholder = "Name" onChange = {(event) => {this.setState({name: event.target.value})}} /><br/><br/>
//             <input value = {this.state.role} placeholder = "Role"  onChange = {(event) => {this.setState({role: event.target.value})}} /><br/><br/>
//             <input value = {this.state.expertise} placeholder = "Expertise" onChange = {(event) => {this.setState({expertise: event.target.value})}} /><br/><br/>
//             <input value = {this.state.from} placeholder = "From" onChange = {(event) => {this.setState({from: event.target.value})}} /><br/><br/>
//             <input value = {this.state.image} type="file" onChange = {(event) => {this.setState({image: event.target.value})}} /><br/><br/> */}
//             <button onClick = {() => {updateMember(member.id)}}>Update</button>
//         </div>
//     )
// }
