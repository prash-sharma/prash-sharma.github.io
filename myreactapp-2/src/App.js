import React, {useState} from 'react';

const App = () => {
    // const nameStateVar = useState('Someguy');
    const [name, setName] = useState('Someguy');
    const handleClick = () => {
        setName('Another guy');
    }

    return <React.Fragment>
        <h1>{name}</h1>
        <button type="button" onClick={handleClick}>Change</button>
    </React.Fragment>
}

export default App;













// import React from "react";
// import Event from "./Event"
// // import Student from './Student';

// const App = () => {
//   return(
//     <>
//       <Event name="Buddy"/>
//     </>
//   )
// }

// export default App;


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