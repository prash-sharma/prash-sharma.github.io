import React from "react";
import Student from './Student';

const App = () => {
  return(
    <>
      <Student name="Bhote" roll="100" />
      <Student name="Sid" roll="101"/>
      <Student name="Aaron" roll="102"/>
    </>
  )
}

export default App;


// Funtion based

// import React, { Component } from "react";

// function App(){
  
//     return <h1>I'm function based..</h1>
  
// }


// CLASS BASED

// import React, { Component } from "react";



// class App extends Component {
//     render(){
//         return <h1>Hello react, I'm learning</h1>;
//     }
// }


// export default App;