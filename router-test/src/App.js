import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';
import Members from './components/Members';
import Create from './components/Create';
import Home from './components/Home';
import Update from './components/Update'


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/members" component={Members} />
          <Route path="/create" component={Create} />
          <Route path="/update/:id" component={Update} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
