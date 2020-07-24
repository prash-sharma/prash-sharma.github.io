import React, {useState, useEffect} from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import Confirmation from './Confirmation';
import delIcon from '../images/deleteIcon.png';
import editIcon from '../images/edit.png';
import Loader from './Loader';


export default function Members() {
    const [members, setMembers] = useState([]);
    const [operation, setOperation] = useState(false);
    const [triggerDel, setTriggerDel] = useState(false);
    const [memberName, setMemberName] = useState('');
    const [memberId, setMemberId] = useState('');
    const [memberImage, setMemberImage] = useState('');
    const [loader, setLoader] = useState(false)
    
    const operationStyle = {
        width: '30px',
        height: '30px',
        marginLeft: '10px',
        marginRight: '10px'
    }
    
    // useEffect(()=>{
    //     const fetchData = async() => {
    //         const db = firebase.firestore();
    //         const data = await db.collection('members').get();
    //         setMembers(data.docs.map((doc)=>(
    //             {...doc.data(), id: doc.id})
    //             ))
    //     }
    //     fetchData();

    //     // return ()=>fetchData();

    // }, [members.length])


    useEffect(()=>{
        setLoader(true)
       const unsubscribe = firebase
        .firestore()
        .collection('members')
        .onSnapshot((snapshot)=>{
        const res = snapshot.docs.map((doc)=>({
            id: doc.id, ...doc.data()
        }))
        setMembers(res);
        setLoader(false)
        })
        return () => unsubscribe();
    }, [])

    function deleteMember(id, image){
        console.log('This will remove member');
        const db = firebase.firestore();
        db.collection('members').doc(id).delete();

        const file = firebase.storage();
        file.refFromURL(image).delete()

        setTriggerDel(false);
    }
    
    return (
        <div className="App">

            <h1>Hello fire members - {members.length}</h1>
            {loader && (
                <Loader />
            )}
            
            <Confirmation 
                returnConfirmation = {triggerDel} 
                 
                onConfirm = {()=>{deleteMember(memberId, memberImage)}}
                onCancel = {()=>{setTriggerDel(false)}}>Are you sure you want to delete <b>{memberName}</b>?</Confirmation>

            <div className='membersDiv'>
                {members.map((member)=>
                    <div key={member.id} className='memberDiv' onMouseEnter={(e)=>{setOperation(true); e.preventDefault()}} onMouseLeave={()=>{setOperation(false)}}>
                        <div className={'memberDetails'}>
                            <div>
                                <h3>Name: {member.name}</h3>
                                <h3>Expertise: {member.expertise}</h3>
                                <h3>From: {member.from}</h3>
                            </div>    
                            <div>
                                <img src={`${member.fileUrl}`} alt = {`${member.name}`} width={200} height={200}/>
                            </div>
                        </div>    
                        <div className='operationDiv'>
                            {
                                operation && (<> 
                                    <Link to={`/update/${member.id}`}><img src={editIcon} alt={'editIcon'} style={operationStyle}/></Link>
                                    <Link to={``} onClick={()=>{setTriggerDel(true); 
                                                                setMemberName(member.name);
                                                                setMemberId(member.id);
                                                                setMemberImage(member.fileUrl)}}><img src={delIcon} alt={'delIcon'} style={operationStyle}/></Link>
                                    
                                </>) 
                            }
                        </div>
                        
                    </div>
                )}
            </div>
            
        
        </div>
    );
}
