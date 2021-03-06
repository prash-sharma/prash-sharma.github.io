import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import RestCreate from './components/RestCreate';
import RestDetails from './components/RestDetails';
import RestSearch from './components/RestSearch';
import RestUpdate from './components/RestUpdate';
import RestList from './components/RestList';
import {Nav, Navbar} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faHome, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';


function App() {
  return (
    <div className="App">
      <Router>
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

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/list">
          <RestList />
        </Route>

        <Route path="/create">
          <RestCreate />
        </Route>

        <Route path="/Search">
          <RestSearch />
        </Route>

        <Route path="/update/:id" render={(props) => (<RestUpdate {...props} />)}>
          
        </Route>

        <Route path="/details">
          <RestDetails />
        </Route>

      </Router>
    </div>
  );
}

export default App;
