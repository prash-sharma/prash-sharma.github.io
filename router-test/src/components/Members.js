import React, {useEffect, useState} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

export default function Members() {

    useEffect(()=>{
        fetchItems();
    }, [])

    const [items, setItems] = useState([])

    async function fetchItems(){
        const res = await fetch(`http://localhost:3000/members`);
        const data = await res.json();
        console.log(data.length);
        setItems(data);
    }

    function deleteConfirm(item){
        let confirmation = (window.confirm(`Are you sure you wish to delete ${item.name} entry?`));

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
            <h1>Members list ({items.length})</h1>
            <table>
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
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.image}</td>
                        <td>{item.name}</td>
                        <td>{item.role}</td>
                        <td>{item.expertise}</td>
                        <td>{item.from}</td>
                        <td>
                            <Link to={`/update/${item.id}`} className="navlinks">Update</Link>
                            <i onClick={() => deleteConfirm(item)}>Delete</i>
                        </td>
                    </tr>
                    ))}
                </tbody>
            
            </table>
        </div>
    )
}
