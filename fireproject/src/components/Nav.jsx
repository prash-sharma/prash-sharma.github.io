import React from 'react';
import '../App.css';
import {NavLink} from 'react-router-dom';
import firelogo from '../images/fire3.gif'

export default function Nav() {
    const navStyle = {
        color: "white",
        textDecoration: "none"
    }

    const imagestyles = {
        width: '60px',
        height: '60px'
    }

    return (
        <nav>
            <ul className="nav-links" >
                <NavLink exact to="/" ><img src={firelogo} alt="fire" style = {imagestyles} /></NavLink>

                <NavLink exact to='/' activeStyle={{color: 'orange'}} style={navStyle}>
                    <li>Home</li>
                </NavLink>
                
                <NavLink to='/create' activeStyle={{color: 'orange'}} style={navStyle}>
                    <li>Create</li>
                </NavLink>
                
                <NavLink to='/roadmap' activeStyle={{color: 'orange'}} style={navStyle}>
                    <li>Roadmap</li>
                </NavLink>
            </ul>
        </nav>
    )
}
