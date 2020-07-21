import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer'

import Create from './components/Create';
import Home from './components/Home';
import Update from './components/Update';
import Roadmap from './components/Roadmap'
import MemberDetail from './components/MemberDetail';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/update/:id" component={Update} />
          <Route path="/roadmap" component={Roadmap} />
          <Route path='/members/:id' component={MemberDetail} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
