import React from 'react';
import logo from './logo-favicon.png';
import './App.css';


class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      newItem: "",
      list: []
    }
  }
  
  addItem(todoValue){
    if(todoValue !== ""){
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false
      };
      const list = [...this.state.list];
      list.push(newItem);
      this.setState({
        list,
        newItem: ""
      });
    }
  }

  render(){
    return(
      <div>
        <div className="headersection">
          <h1>I'm a class based component..</h1>
          <img src={logo} className="App-logo" alt="logo" width="100px" height="100px"/>
        </div>
        <hr/>
        
        <input type="text" placeholder="type something here"/>
        <button>Click me</button>
        <div>
          <ul>
            <li>
              <input type="checkbox"/> Task 1
              <button>Delete</button>
            </li>
          </ul>
        </div>
        
      </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" />
//       </header>
//       <h1>Hello world</h1>
//       <p>I'm here..</p>
//     </div>
//   )
// }

export default App;



// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
