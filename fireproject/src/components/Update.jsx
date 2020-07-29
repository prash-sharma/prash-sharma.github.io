import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import Loader from './Loader'

export default function Create(props) {
    // console.log(match)
    const memberId = props.match.params.id;
    const [memberDetails, setMemberDetails] = useState({id: memberId, fileUrl: ''});
    const [loader, setLoader] = useState(false)
    // const [memberId, setMemberID] = useState(`${props.match.params.id}`);
    // const [name, setName] = useState('');
    // const [expertise, setExpertise] = useState('');
    // const [fileLink, setFileLink] = useState('')

    useEffect(()=>{
        // console.log(props.match.params.id);
        firebase
        .firestore()
        .collection('members')
        .doc(memberId)
        .get().then((res)=>{
            // console.log(res.data());
            setMemberDetails(res.data())            
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
        });
        
    }
    
    return (
        <div>
            {
                loader && (
                    <Loader />
                )
            }
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name: </label>
                    <input  type='text' 
                            value={memberDetails.name || ''} 
                            onChange={(e)=>{
                                e.persist();
                                setMemberDetails((memberDetails)=>{
                                    return {...memberDetails, name: e.target.value}})}}
                    />
                </div>
                
                <div>
                    <label>Expertise: </label>
                    <input type='text' value={memberDetails.expertise || ''} onChange={(e)=>{
                        e.persist()
                        setMemberDetails((memberDetails)=>{
                            return {...memberDetails, expertise: e.target.value}
                        })}}/>
                </div>

                <div>
                    <input type="file" onChange={onFileChange}/>
                </div>

                <button>Submit</button>

                
            </form>
        </div>
    )
}
