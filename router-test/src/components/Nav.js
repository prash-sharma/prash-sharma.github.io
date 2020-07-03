import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import firelogo from '../images/fire3.gif'

export default function Nav() {
    const navStyle = {
        color: "white",
        textDecoration: "none"
    }

    const imagestyles = {
        width: '70px',
        height: '70px'
    }

    return (
        <nav>
            <ul className="nav-links" >
                <Link to="/" ><img src={firelogo} alt="fire" style = {imagestyles} /></Link>
                <Link to='/' style={navStyle}>
                    <li>Home</li>
                </Link>
                <Link to='/members' style={navStyle}>
                    <li>Members</li>
                </Link>
                
                <Link to='/create' style={navStyle}>
                    <li>Create</li>
                </Link>
                <Link to='/roadmap' style={navStyle}>
                    <li>Roadmap</li>
                </Link>
            </ul>
        </nav>
    )
}
