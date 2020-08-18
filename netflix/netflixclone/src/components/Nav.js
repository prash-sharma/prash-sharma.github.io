import React, { useState, useEffect } from 'react'
import './Nav.css'
import avatar from '../images/avatar.png'
import logo from '../images/logo.svg'

function Nav() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setShow(true)
            } else setShow(false)
        })
        return () => {
            window.removeEventListener('scroll')
        }
    }, [])

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <img className="nav__logo" src={logo} alt="Netflix logo" />
            <img className="nav__avatar" src={avatar} alt="Profile avatar" />
        </div>
    )
}

export default Nav
