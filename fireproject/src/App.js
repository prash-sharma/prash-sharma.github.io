import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import firebase from './firebase';
// import Members from './components/Members'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Nav from './components/Nav';
import Update from './components/Update'
import Roadmap from './components/Roadmap'
// import Footer from './components/Footer';

// firebase.firestore().collection('members').add({
//   name: 'Firebase test',
//   expertise: `Cloud storage`
// })


export default function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/update/:id" component={Update} />
          <Route path="/roadmap" component={Roadmap} />
          {/* <Route path='/members/:id' component={MemberDetail} /> */}
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}