import React, {useState, useEffect} from 'react';
import firebase from '../firebase';
import Loader from './Loader';
import Member from './Member';


export default function Members() {
    const [members, setMembers] = useState([]);
    const [loader, setLoader] = useState(false); 

    useEffect(()=>{
        setLoader(true)
        const unsubscribe = firebase.firestore().collection('members')
        .onSnapshot((snapshot)=>{
            const res = snapshot.docs.map((doc)=>({
                id: doc.id, ...doc.data()
            }))
        setMembers(res);
        setLoader(false)
        })
        return () => unsubscribe();
    }, [])

    return (
        <div className="App">
            {loader && (
                <Loader />
            )}

            <h1>{members.length} members and counting..</h1>

            <div className='membersDiv'>
                {members.map((member)=>
                    <div  key = {member.id}>
                        <Member member = {member} />
                    </div>
                    
                )}
                
            </div>
        </div>
    );
}










// import React, {useState, useEffect} from 'react';
// import firebase from '../firebase';
// import { Link } from 'react-router-dom';
// import Confirmation from './Confirmation';
// import delIcon from '../images/deleteIcon.png';
// import editIcon from '../images/edit.png';
// import Loader from './Loader';


// export default function Members() {
//     const [members, setMembers] = useState([]);
//     const [operation, setOperation] = useState(false);
//     const [triggerDel, setTriggerDel] = useState(false);
//     const [memberName, setMemberName] = useState('');
//     const [memberId, setMemberId] = useState('');
//     const [memberImage, setMemberImage] = useState('');
//     const [loader, setLoader] = useState(false);
//     const [bGScroll, setBgScroll] = useState(false)
    
//     const operationStyle = {
//         width: '30px',
//         height: '30px',
//         marginLeft: '10px',
//         marginRight: '10px'
//     }

//     useEffect(()=>{
//         setLoader(true)
//         const unsubscribe = firebase.firestore().collection('members')
//         .onSnapshot((snapshot)=>{
//             const res = snapshot.docs.map((doc)=>({
//                 id: doc.id, ...doc.data()
//             }))
//         setMembers(res);
//         setLoader(false)
//         })
//         return () => unsubscribe();
//     }, [])

//     function deleteMember(id, image){
//         console.log('This will remove member');
//         const db = firebase.firestore();
//         db.collection('members').doc(id).delete();

//         if(image){
//             const file = firebase.storage();
//             file.refFromURL(image).delete()
//         }
        

//         setTriggerDel(false);
//     }
    
//     return (
//         <div className="App">

//             <h1>{members.length} members and counting..</h1>

//             {loader && (
//                 <Loader />
//             )}
            
//             <Confirmation 
//                 returnConfirmation = {triggerDel}

//                 bgScroll = {bGScroll}
                 
//                 onConfirm = {()=>{
//                     deleteMember(memberId, memberImage);
//                     setTriggerDel(false)
//                     setBgScroll(false)
//                 }}

//                 onCancel = {()=>{
//                     setTriggerDel(false);
//                     setBgScroll(false)
//                 }}>Yeah he doesn't have enough firepower, let's kick <b>{memberName}</b> out!!</Confirmation>

//             <div className='membersDiv'>
//                 {members.map((member)=>
//                     <div key={member.id} className='memberDiv' onMouseEnter={(e)=>{setOperation(true); e.preventDefault()}} onMouseLeave={()=>{setOperation(false)}}>
//                         <div className={'memberDetails'}>
//                             <div>
//                                 <h3>Name:</h3> <p>{member.name}</p>
//                                 <h3>Expertise:</h3> <p>{member.expertise}</p>
//                                 <h3>From:</h3><p>{member.from}</p>
//                             </div>    
//                             <div>
//                                 <img src={`${member.fileUrl}`} alt = {`${member.name}`} width={200} height={200}/>
//                             </div>
//                         </div>    
//                         <div className='operationDiv'>
//                             {
//                                 operation && (<> 
//                                     <Link to={`/update/${member.id}`}><img src={editIcon} alt={'editIcon'} style={operationStyle}/></Link>

//                                     <Link to={``} onClick={()=>{setTriggerDel(true); 
//                                                                 setMemberName(member.name);
//                                                                 setMemberId(member.id);
//                                                                 setMemberImage(member.fileUrl);
//                                                                 setBgScroll(true)}}><img src={delIcon} alt={'delIcon'} style={operationStyle}/></Link>
                                    
//                                 </>) 
//                             }
//                         </div>
                        
//                     </div>
//                 )}
//             </div>
            
        
//         </div>
//     );
// }
