import React, { useState, useEffect } from 'react';
import firebase from '../firebase'

export default function Create(match) {
    console.log(match)
    const [memberDetails, setMemberDetails] = useState({})
    const [name, setName] = useState('');
    const [expertise, setExpertise] = useState('');
    const [fileUrl, setFileUrl] = useState('')

    // useEffect(()=>{
    //     const unsubscribe = firebase
    //      .firestore()
    //      .collection(`members`)
    //      .where('id', '==', `${match}`)
    //      .then((res)=>{
    //          setMemberDetails(res)
    //         })     
    //      return () => unsubscribe();
    //  }, [match])

    useEffect(()=>{
        // console.log(match.params.id)
    }, [match])



    const onFileChange = async(e)=>{
        const file = e.target.files[0];

        const storageRef = firebase.storage().ref(`members/`);
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL())
        
        // const uploadedFile = firebase.storage().ref(`members`).put(file);
        // const fileUrl = await uploadedFile.
        // console.log(fileUrl);
    }

    function onSubmit(e){
        e.preventDefault();
        firebase.firestore().collection('members').add({
            name, expertise, fileUrl
        })
    }
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name: </label>
                    <input type='text' value={memberDetails.name} onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                
                <div>
                    <label>Expertise: </label>
                    <input type='text' onChange={(e)=>{setExpertise(e.target.value)}}/>
                </div>

                <div>
                    <input type="file" onChange={onFileChange}/>
                </div>

                <button>Submit</button>

                
            </form>
        </div>
    )
}
