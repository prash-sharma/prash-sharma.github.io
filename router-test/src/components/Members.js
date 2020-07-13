import React, {useEffect, useState} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import edit from '../images/edit.png';
import deleteIcon from '../images/deleteIcon.png';
import LoadingIndicator from './LoadingIndicator'

export default function Members() {
    const editStyle = {
        width: '20px',
        height: '20px'
    }
    useEffect(()=>{
        fetchItems('');
    }, [])

    const [items, setItems] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const [loader, setLoader] = useState(true);

    async function fetchItems(querytext){
        const res = await fetch(`http://localhost:3000/members/?q=${querytext}`);
        const data = await res.json()
        console.log(data.length);
        setItems(data);
        setLoader(false)
    }

    function deleteConfirm(item){
        
        let confirmation = (window.confirm(`Are you sure you want to delete ${item.name}?`));

        if (confirmation){
            console.log("Delete triggered");
            deleteMemberFunc(item.id)
        }

        async function deleteMemberFunc(id){
            console.log('Ye hahahaha');

            setLoader(true)

            await fetch('http://localhost:3000/members/'+id, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                },
            
            }).then(() => {
                setLoader(true)
                fetchItems('');
                
                // add passive success notification
            })
            
        }
    }

    return (
        <div className="members">
            {loader && (<> <LoadingIndicator /> </>)}
            <input type='search' placeholder='Member search' className='searchBar' onChange={(e)=>{fetchItems(e.target.value)}}/>
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
                    <tr key={item.id} onMouseEnter={()=>
                            setIsShown(true)
                        }
                    onMouseLeave={()=>{setIsShown(false)}}>
                        <td>{item.id}</td>
                        <td>{item.image}</td>
                        <td>{item.name}</td>
                        <td>{item.role}</td>
                        <td>{item.expertise}</td>
                        <td> <a href = {item.from} target='_blank' rel="noopener noreferrer">{item.from}</a></td>
                        <td>
                        {isShown && (
                            <>
                                <Link to={`/update/${item.id}`} className="navlinks"><img style={editStyle} src={edit} alt="edit" /></Link>
                                <Link to={``} onClick={() => deleteConfirm(item)}><img style={editStyle} src={deleteIcon} alt="edit" /></Link>
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
