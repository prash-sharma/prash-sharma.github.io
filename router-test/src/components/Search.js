import React from 'react'
import '../App.css'

export default function Search() {

    async function fetchResults(querytext){
        const res = await fetch(`http://localhost:3000/members/?q=${querytext}`);
        const data = await res.json()
        console.log(data);
    }

    return (
        <div>
            <input type='search' placeholder='Member search' className='searchBar' onChange={(e)=>{fetchResults(e.target.value)}}/>
        </div>
    )
}
