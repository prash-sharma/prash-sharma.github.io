import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Loader from './Loader';
import Notification from './Notification'

export default function Create(props) {
    // console.log(match)
    const memberId = props.match.params.id;
    const [memberDetails, setMemberDetails] = useState({id: memberId, fileUrl: ''});
    const [loader, setLoader] = useState(false);
    const [notificaiton, setNotification] = useState(false)
    // const [memberId, setMemberID] = useState(`${props.match.params.id}`);
    // const [name, setName] = useState('');
    // const [expertise, setExpertise] = useState('');
    // const [fileLink, setFileLink] = useState('')

    useEffect(()=>{
        // console.log(props.match.params.id);
        setLoader(true)
        firebase
        .firestore()
        .collection('members')
        .doc(memberId)
        .get().then((res)=>{
            // console.log(res.data());
            setMemberDetails(res.data());
            setLoader(false)            
        })
     }, [memberId])

    
    const onFileChange = async(e)=>{
        setLoader(true)
        const file = e.target.files[0];

        const storageRef = firebase.storage().ref(`members/`);
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const fileDlUrl = await fileRef.getDownloadURL();
        
        setMemberDetails((memberDetails) =>{
            return {...memberDetails, fileUrl: fileDlUrl}
        })
        setLoader(false)
    }

    function onSubmit(e){
        setLoader(true)
        e.preventDefault();
        console.log(memberDetails)
        firebase.firestore().collection('members').doc(memberId).update(memberDetails).then(()=>{
            setLoader(false)
            setNotification(true)
        });
        setNotification(false)

    }
    
    return (
        <div>
            {
                loader && (
                    <Loader />
                )
            }

            {
                notificaiton && (
                    <Notification msg = {'Member updated successfully.'}/>
                )
            }
            <h2>Update member details</h2>
            
                <form  onSubmit={onSubmit}>
                    <div className='createMember'>
                        <label>Name:</label>
                        <input  type='text' 
                                value={memberDetails.name || ''} 
                                onChange={(e)=>{
                                    e.persist();
                                    setMemberDetails((memberDetails)=>{
                                        return {...memberDetails, name: e.target.value}
                                    })}}
                        />

                        <label>Expertise:</label>
                        <input  type='text' 
                            value={memberDetails.expertise || ''} 
                            onChange={(e)=>{
                                e.persist()
                                setMemberDetails((memberDetails)=>{
                                    return {...memberDetails, expertise: e.target.value}
                                })}}
                        />
    
                        <label>From:</label>
                        <input  type="text" 
                                value={memberDetails.from || ''} 
                                onChange = { (e)=>{
                                    e.persist();
                                    setMemberDetails((memberDetails)=>{
                                        return {...memberDetails, from: e.target.value}
                                    })
                                }}
                        />

                        <label>Image:</label>
                        <input type="file" onChange={onFileChange}/>
                    </div>
                    
                    <div>
                        <button className='submitBtn'>Submit</button>
                    </div>    
                </form>
        </div>
    )
}
