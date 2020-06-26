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



function App() {
  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/list">List</Link>
          </li>
          <li>
            <Link to="/create">Create</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/update">Update</Link>
          </li>
          <li>
          <Link to="/details">Details</Link>
          </li>  
        </ul>

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

      <Route path="/update">
        <RestUpdate />
      </Route>

      <Route path="/details">
        <RestDetails />
      </Route>

      </Router>
    </div>
  );
}

export default App;
