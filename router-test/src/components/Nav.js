import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'

export default function Nav() {
    const navStyle = {
        color: "white",
        textDecoration: "none"
    }

    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links" >
                <Link to='/' style={navStyle}>
                    <li>Home</li>
                </Link>
                <Link to='/members' style={navStyle}>
                    <li>Members</li>
                </Link>
                
                <Link to='/create' style={navStyle}>
                    <li>Create</li>
                </Link>
                
            </ul>
        </nav>
    )
}
