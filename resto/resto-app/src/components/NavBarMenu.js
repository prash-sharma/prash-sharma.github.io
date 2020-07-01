import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHome, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

export default class NavBarMenu extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link to="/"><FontAwesomeIcon icon={faHome}/></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
              <Link to="/" className="navlinks"> <FontAwesomeIcon icon={faHome}/> Home</Link>
              <Link to="/list" className="navlinks"> <FontAwesomeIcon icon={faList}/> List</Link>
              <Link to="/create" className="navlinks"><FontAwesomeIcon icon={faPlus}/>Create</Link>
              <Link to="/search" className="navlinks"><FontAwesomeIcon icon={faSearch}/>Search</Link>
              
            </Nav>
          </Navbar.Collapse>
        </Navbar>
            </div>
        )
    }
}
