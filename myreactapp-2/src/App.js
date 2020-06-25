import React from 'react';
import User from "./User"
import Guest from './Guest'

export default function App() {
    return (
        <div>
            <User camp="A"/>
            <Guest camp="B"/>
        </div>
    )
}





// import React, { Component } from 'react';
// import User from "./User";
// import {Provider} from "./Context"

// export default class App extends Component {
//     state = {
//         name: "Prash",
//         value: 10
//     }
//     handleClickContext = () => {
//         this.setState({value: this.state.value + 1})
//     }
//     render() {
//         const contextValue = {
//             data: this.state,
//             handleClick: this.handleClickContext
//         }
//         return (
//             <Provider value={contextValue}>
//                 <User />
//             </Provider>
//         )
//     }
// }




// import React, { Component } from 'react'

// export default class App extends Component {
//     constructor(props){
//         super(props);
//         this.textInput = React.createRef();
//     }
//     componentDidMount() {
//         // console.log(this.textInput);
//         this.textInput.current.focus();
        
//     }
    
//     render() {
//         return (
//             <form>
//                 Name: <input type="text" ref={this.textInput}/>
//                 <br />
//                 <br />
//                 Password: <input type="text" />
//                 <br />
//                 <br />
//                 Address: <input type="text" />
//             </form>
//         )
//     }
// }


// import React, { Component } from 'react'

// export default class App extends Component {
    
//     state = {
//         name: "",
//         password: ""
//     }

//     handleChange = (e) => {
//         // console.log(e.target.name);
//         // this.setState({[e.target.name]: e.target.value})

//         const value = e.target.name === "password"? e.target.value.toUpperCase().substr(0, 10) : e.target.value
//         this.setState({[e.target.name]: value})
//     }

//     handleSubmit = (e) => {
//         console.log(e.target);
        
//         e.preventDefault();
//     }

//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <label>
//                         Name: <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
//                     </label>
//                     <br />
//                     <br />
//                     <label>
//                         Password: <input type="text" value={this.state.password} name="password" onChange={this.handleChange}/>
//                     </label>
//                     <br /> <br />
//                     <input type="submit" value="submit" onSubmit={this.handleSubmit} />
//                 </form>
                
//             </div>
//         )
//     }
// }





// import React, { Component } from 'react'

// export default class App extends Component {
//     render() {

//         const styleSheet = {
//             color: 'blue',
//             outline: 'none',
//             border: 'none'
//         }

//         return (
//             <div>
//                 <button style={styleSheet}>Click me</button>
//             </div>
//         )
//     }
// }






// import React, { Component } from 'react';
// import User from './User'


// export default class App extends Component {
//     render() {

//         const arr = this.props.numbers

//         const newArr = arr.map((val, index)=>{
//             return <User value={val} key={index}/>
//         })

//         return (
//             <div>
//                 {newArr}
//             </div>
//         )
//     }
// }





// import React, { Component } from 'react'

// export default class App extends Component {
//     state = {
//         users: [
//             {id: 101, name: "Bhote", pw: "123abcde"},
//             {id: 102, name: "Aaron", pw: "123abcfg"},
//             {id: 103, name: "Aanya", pw: "123abchij"},
//         ],
//         isLoggedIn: false
//     }
    
//     render() {
//         const newUsers = this.state.users.map((val) => {
//         return <h3 key={val.id} >ID:{val.id}, Name: {val.name}, PW: {val.pw}</h3>
//         })
//         return (
//             <div>
//                 {newUsers}
//             </div>
//         )
//     }
// }




// import React, { Component } from 'react'

// export default class App extends Component {
//     render() {
//         const arr = this.props.numbers
        
        
//         return (
//             <ul>
//                 {arr.map((num) => {
//                     return <li>{num}</li>
//                 })}
//             </ul>
//         )
//     }
// }





// import React from 'react';
// import User from "./User"
// import Guest from "./Guest"


// const App = (props) => {
//     const isRegistered = props.consumer;
//         if(isRegistered){
//             return <User />
//         }
//         return <Guest />
// }


// export default App;
// export default class App extends Component {
//     render() {
//         const isRegistered = this.props.consumer;
//         if(isRegistered){
//             return <User />
//         }
//         return <Guest />
//     }
// }




// import React, {useState, useEffect} from 'react'

// const App = () => {
//     const [count, setCount] = useState(0)
    
//     const handleClick = () => {
//         setCount(count + 1);
//     }

//     useEffect(()=>{
//         console.log('Use effect called')
//     })

//     return(
//         <React.Fragment>
//             <h1>Count up: {count}</h1>
//             <button type="button" onClick={handleClick} >Increment</button>
//         </React.Fragment>
//     )
// }

// export default App;





// import React, {useState} from 'react';

// const App = () => {
//     // const nameStateVar = useState('Someguy');
//     const [name, setName] = useState('Someguy');
//     const handleClick = () => {
//         setName('Another guy');
//     }

//     return <React.Fragment>
//         <h1>{name}</h1>
//         <button type="button" onClick={handleClick}>Change</button>
//     </React.Fragment>
// }







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