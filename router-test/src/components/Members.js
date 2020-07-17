import React, {useEffect, useState} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import edit from '../images/edit.png';
import deleteIcon from '../images/deleteIcon.png';
import LoadingIndicator from './LoadingIndicator'
import Notification from './Notification';
import Confirmation from './Confirmation'

export default function Members() {
    const editStyle = {
        width: '20px',
        height: '20px'
    }

    useEffect(()=>{
        fetchItems('');
        
    }, [])

    const [items, setItems] = useState([]);
    const [display, setDisplay] = useState(false);
    const [loader, setLoader] = useState(true);
    const [notify, setNotify] = useState(false);
    const [message, setMessage] = useState('');
    const [triggerDel, setTriggerDel] = useState(false);
    const [delMemId, setDelMemId] = useState();
    const [delMemName, setDelMemName] = useState('');

    async function fetchItems(querytext){
        
        const res = await fetch(`http://localhost:3000/members/?q=${querytext}`);
        const data = await res.json()
        console.log(data.length);
        setItems(data);
        setLoader(false);
    }

    
    async function deleteMember(id){
        console.log('Ye hahahaha');
        console.log(delMemId);

        setLoader(true)

        await fetch('http://localhost:3000/members/'+id, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
        }).then(() => {
            setLoader(true);
            setNotify(true);
            setMessage('Member deleted successfully');
            fetchItems('');
            setTriggerDel(false);
        })
    }

    return (
        <div className="members">
            {loader && (<> <LoadingIndicator /> </>)}

            {notify && (<> <Notification msg = {message} stateChange = {items}/></>)}

            <Confirmation trigger = {triggerDel} 
                        onCancel = {(e)=>{setTriggerDel(false); setDelMemId()}} 
                        onConfirm = {(e)=>deleteMember(delMemId)}>Are you sure you want to delete <b>{delMemName}</b>?</Confirmation>

            <input type='search' placeholder='Member search' className='searchBar' onChange={(e)=>{setNotify(false); fetchItems(e.target.value)}}/>
            <h2>Members ({items.length})</h2>
            <table className='memberTable'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Expertise</th>
                        <th>From</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                
                <tbody>
                {items.map((item) => (
                    <tr key={item.id} onMouseEnter = {() => {setDisplay(true)}} onMouseLeave = {() => {setDisplay(false)}}>
                        <td>{item.id}</td>
                        <td>{item.image}</td>
                        <td>{item.name}</td>
                        <td>{item.role}</td>
                        <td>{item.expertise}</td>
                        <td> <a href = {item.from} target='_blank' rel="noopener noreferrer">{item.from}</a></td>
                        <td>
                            {display && (
                                <>
                                    <Link to={`/update/${item.id}`} className="navlinks"><img style={editStyle} src={edit} alt="edit" /></Link>
                                    <Link to={``} onClick={() => {
                                        setDelMemId(item.id);
                                        setDelMemName(item.name)
                                        setTriggerDel(true);}}><img style={editStyle} src={deleteIcon} alt="edit" /></Link>
                                </>
                            )}
                        </td>   
                    </tr>
                    ))}
                </tbody>
            
            </table>
        </div>
    )
}











// import React, {useEffect, useState} from 'react';
// import '../App.css';
// import {Link} from 'react-router-dom';
// import edit from '../images/edit.png';
// import deleteIcon from '../images/deleteIcon.png';
// import LoadingIndicator from './LoadingIndicator'
// import Notification from './Notification';
// import Confirmation from './Confirmation'

// export default function Members() {
//     const editStyle = {
//         width: '20px',
//         height: '20px'
//     }
//     useEffect(()=>{
//         fetchItems('');
//     }, [])

//     const [items, setItems] = useState([]);
//     const [display, setDisplay] = useState(false);
//     const [loader, setLoader] = useState(true);
//     const [notify, setNotify] = useState();
//     const [message, setMessage] = useState('');

//     async function fetchItems(querytext){
//         const res = await fetch(`http://localhost:3000/members/?q=${querytext}`);
//         const data = await res.json()
//         console.log(data.length);
//         setItems(data);
//         setLoader(false)
//     }

//     function deleteConfirm(item){
        
//         let confirmation = (window.confirm(`Are you sure you want to delete ${item.name}?`));

//         if (confirmation){
//             console.log("Delete triggered");
//             deleteMemberFunc(item.id)
//         }

//         async function deleteMemberFunc(id){
//             console.log('Ye hahahaha');

//             setLoader(true)

//             await fetch('http://localhost:3000/members/'+id, {
//                 method: "DELETE",
//                 headers: {
//                     'Content-type': 'application/json'
//                 },
//             }).then(() => {
//                 setLoader(true);
//                 setNotify(true);
//                 setMessage('Member deleted successfully')
//                 fetchItems('');
//             })
            
//         }
//     }

//     return (
//         <div className="members">
//             {loader && (<> <LoadingIndicator /> </>)}
//             {notify && (<> <Notification msg = {message} stateChange = {items}/></>)}
//             <Confirmation>Are you sure?</Confirmation>
//             <input type='search' placeholder='Member search' className='searchBar' onChange={(e)=>{fetchItems(e.target.value)}}/>
//             <h2>Members ({items.length})</h2>
//             <table className='memberTable'>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Image</th>
//                         <th>Name</th>
//                         <th>Role</th>
//                         <th>Expertise</th>
//                         <th>From</th>
//                         <th>Operation</th>
//                     </tr>
//                 </thead>
                
//                 <tbody>
//                 {items.map((item) => (
//                     <tr key={item.id} onMouseEnter = {() => {setDisplay(true)}} onMouseLeave = {() => {setDisplay(false)}}>
//                         <td>{item.id}</td>
//                         <td>{item.image}</td>
//                         <td>{item.name}</td>
//                         <td>{item.role}</td>
//                         <td>{item.expertise}</td>
//                         <td> <a href = {item.from} target='_blank' rel="noopener noreferrer">{item.from}</a></td>
//                         <td>
//                             {display && (
//                                 <>
//                                     <Link to={`/update/${item.id}`} className="navlinks"><img style={editStyle} src={edit} alt="edit" /></Link>
//                                     <Link to={``} onClick={() => deleteConfirm(item)}><img style={editStyle} src={deleteIcon} alt="edit" /></Link>
//                                 </>
//                             )}
//                         </td>   
//                     </tr>
//                     ))}
//                 </tbody>
            
//             </table>
//         </div>
//     )
// }
