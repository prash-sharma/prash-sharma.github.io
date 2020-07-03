import React, {useEffect, useState} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import edit from '../images/edit.png';
import deleteIcon from '../images/deleteIcon.png';

export default function Members() {
    const editStyle = {
        width: '20px',
        height: '20px'
    }
    useEffect(()=>{
        fetchItems();
    }, [])

    const [items, setItems] = useState([]);
    const [isShown, setIsShown] = useState(false);

    async function fetchItems(){
        const res = await fetch(`http://localhost:3000/members`);
        const data = await res.json();
        console.log(data.length);
        setItems(data);
    }

    function deleteConfirm(item){
        let confirmation = (window.confirm(`Are you sure you wish to delete ${item.name}?`));

        if (confirmation){
            console.log("Delete triggered");
            deleteMemberFunc(item.id)
        }

        async function deleteMemberFunc(id){
            console.log('Ye hahahaha');

            await fetch('http://localhost:3000/members/'+id, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                },
            
            }).then(() => {
                fetchItems();
                // add passive success notification
            })
            
        }
    }

    return (
        <div className="members">
            <h1>Members ({items.length})</h1>
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
                    <tr key={item.id} onMouseEnter={()=>{setIsShown(true)}}
                    onMouseLeave={()=>{setIsShown(false)}}>
                        <td>{item.id}</td>
                        <td>{item.image}</td>
                        <td>{item.name}</td>
                        <td>{item.role}</td>
                        <td>{item.expertise}</td>
                        <td>{item.from}</td>
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
