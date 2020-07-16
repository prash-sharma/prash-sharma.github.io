import React, {useState} from 'react';
import LoadingIndicator from './LoadingIndicator';
import Notification from './Notification';

import '../App.css'

export default function Create() {
    
    const [member, setMember] = useState({name:'', role:'', expertise:'', from:'', image:''});
    const [loader, setLoader] = useState(false);
    const [notify, setNotify] = useState(false);
    const [data, setData] = useState({});
    const [message, setMessage] = useState('')
    
    async function createMember(member){
        setLoader(true);
            const res = await fetch('http://localhost:3000/members', {
                                method: "POST",
                                headers: {
                                    'Content-type': 'application/json'
                                },
                                body: JSON.stringify(member)
                            })
            setData(await res.json());
            setMessage('Member created successfully');
            setLoader(false);
            setNotify(true);
        
        console.log('Member successfully created');
        
    }

    return (
        <div>
            {loader && (<><LoadingIndicator /></>)}
            <div> 
                { notify && (<Notification msg = {message} stateChange = {data}/>)}
            </div>  
            
            <h1>Add a member</h1>
            <div className='createMember'>
                
                Name <input id='name' type='text' placeholder='member name' onChange = {(e)=>{
                    e.persist();
                    setMember((member) =>{
                        return {...member, name: e.target.value}
                        })
                    }}  /> <br />

                Role<input type='text' placeholder = 'role' onChange={(e)=>{
                            e.persist();
                            setMember((member)=>{
                                return {...member, role: e.target.value}
                            })
                        }}/> <br />

                Expertise<input type='text' placeholder = 'expertise' onChange={(e)=>{
                            e.persist();
                            setMember((member)=>{
                                return {...member, expertise: e.target.value}
                            })
                        }}/> <br />

                From<input type='text' placeholder = 'from' onChange={(e)=>{
                            e.persist();
                            setMember((member)=>{
                                return {...member, from: e.target.value}
                            })
                        }}/> <br />

                Image  <input type='file' onChange={(e)=>{
                            e.persist();
                            setMember((member)=>{
                                return {...member, image: e.target.value}
                            })
                        }}/> <br />
            </div>
            

            <button className='createBtn' onClick = {()=>{
                createMember(member);

                }}>Add member</button>
                     
        </div>
    )
}



// import React, { Component } from 'react'

// export default class Create extends Component {
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

//     create(){
//         fetch('http://localhost:3000/members', {
//             method: "POST",
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
//                 <h1>Add member</h1>
//                 <div>
//                     Name <br />
//                     <input onChange = {(event) => {this.setState({name: event.target.value})}} placeholder = "Name"/><br/><br/>
//                     Role <br />
//                     <input onChange = {(event) => {this.setState({role: event.target.value})}} placeholder = "Role"/><br/><br/>
//                     Expertise <br />
//                     <input onChange = {(event) => {this.setState({expertise: event.target.value})}} placeholder = "Expertise"/><br/><br/>
//                     From <br />
//                     <input onChange = {(event) => {this.setState({from: event.target.value})}} placeholder = "From"/><br/><br/>
//                     Image: <input type="file" onChange = {(event) => {this.setState({image: event.target.value})}} /><br/><br/>
//                 </div>
//                 <button onClick = {() => {this.create()}}>Create</button>
//             </div>
//         )
//     }
// }

