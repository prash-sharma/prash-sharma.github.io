import React from 'react';
import '../App.css';
import google from '../images/google.png'
import mtribes from '../images/mtribes.svg'



export default function Footer() {
    const navStyle = {
        color: "white",
        textDecoration: "none"
    }

    const gimagestyles = {
        width: '30px',
        height: '30px'
    }

    const mimagestyles = {
        width: '100px',
        height: '100px'
    }

    

    return (
        <footer>
            <ul className="footer-links" >
                
                <a href='https://www.google.com' target='_blank' rel="noopener noreferrer" ><img src={google} alt='google' style={gimagestyles}/></a>
                <a href='https://www.mtribes.com' target='_blank' rel="noopener noreferrer" style={navStyle}><img src={mtribes} alt='mtribes' style={mimagestyles}/> </a>
                <a href='https://www.github.com' target='_blank' rel="noopener noreferrer" style={navStyle}>Github </a>
            </ul>
        </footer>
    )
}
