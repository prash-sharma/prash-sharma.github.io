import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';

import Create from './components/Create';
import Home from './components/Home';
import Update from './components/Update';
import Roadmap from './components/Roadmap'


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/update/:id" component={Update} />
          <Route path="/roadmap/" component={Roadmap} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
