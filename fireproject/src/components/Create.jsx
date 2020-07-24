import React, { useState } from 'react';
import firebase from '../firebase';
import Loader from './Loader'

export default function Create() {
    
    const [name, setName] = useState('');
    const [expertise, setExpertise] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [from, setFrom] = useState('');
    const [loader, setLoader] = useState(false);

    const onFileChange = async(e)=>{
        setLoader(true)
        const file = e.target.files[0];

        const storageRef = firebase.storage().ref(`members/`);
        const fileRef = storageRef.child(Math.ceil( Math.random()*10000)+file.name);
        await fileRef.put(file)
        console.log(fileRef.fullPath)
        setFileUrl(await fileRef.getDownloadURL());
        setLoader(false);
        
    }

    function onSubmit(e){
        setLoader(true)
        e.preventDefault();
        firebase.firestore().collection('members').add({
            name, expertise, fileUrl, from
        }).then(()=>{
            setLoader(false)
        })
        
    }
    
    return (
        <div>
            {loader && (
                <Loader />
            )}
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name: </label>
                    <input type='text' onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                
                <div>
                    <label>Expertise: </label>
                    <input type='text' onChange={(e)=>{setExpertise(e.target.value)}}/>
                </div>

                <div>
                    <label>From: </label>
                    <input type='text' onChange={(e)=>{setFrom(e.target.value)}}/>
                </div>

                <div>
                    <input type="file" onChange={onFileChange}/>
                </div>

                <button>Submit</button>

                
            </form>
        </div>
    )
}
