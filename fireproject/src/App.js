import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Nav from './components/Nav';
import Update from './components/Update'
import Roadmap from './components/Roadmap'
import Colorpicker from './components/Colorpicker'
// import Footer from './components/Footer';

import { client, session, collections } from "./mtspace/fire";



client.sessionLock = false;
// client.waitForMsec = 5000;
client.serviceUrl = 'https://client.mtribes.dev';
async function sessionInit () {
  // await session.start({userId: 'xyz123@gmail.com'});
  await session.start();
  console.log(session.ready)
  console.log(collections.membercards.membercardexp.data.cardheight)
  console.log(collections.membercards.membercardexp.data.cardwidth)
  // await session.start({ userId: user.id });
}


export default function App() {
  sessionInit();
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/update/:id" component={Update} />
          <Route path="/roadmap" component={Roadmap} />
          <Route path="/colorpicker" component={Colorpicker} />
          {/* <Route path='/members/:id' component={MemberDetail} /> */}
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}