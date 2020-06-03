import React from 'react';
import './Avatar.css';
import Avatarlist from './Avatarlist';


const Avatar = () => {

    const avatarlistarr = [
        {
            id: 1,
            name: "Prash Sharma",
            work: "IT Professional"
        },
        {
            id: 1,
            name: "Sid Sharma",
            work: "IT Professional"
        },
        {
            id: 1,
            name: "Aaron Sharma",
            work: "IT Professional"
        },
        {
            id: 1,
            name: "Sh Sharma",
            work: "IT Professional"
        }
    ]

    const avatarlistarrmap = avatarlistarr.map((item, index) => {
        return <Avatarlist name = {avatarlistarr[index].name} id = "1" work = {avatarlistarr[index].work} />
    })

    return (
        <div className="avatarDiv">
            <h1>Welcome to Avatar world</h1>
            <div className = 'allcards'>
                {avatarlistarrmap}
            </div>
            <button>Subscribe</button>
        </div>  
    )     
}


export default Avatar;