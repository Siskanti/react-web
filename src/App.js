import logo from './logo.svg';
import './App.css';
import React from 'react';
import Products from './Products';
// import Button from "react-bootstrap/Button"
// import "bootstrap/dist/css/bootstrap.min.css"
// import {Button, Card, Nav} from "react-bootstrap"

class App extends React.Component{
  
  render(){
    return(
      <Products />
    )
  }
}

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

export default App;
