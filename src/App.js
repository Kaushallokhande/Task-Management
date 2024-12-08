//npm i react-router-dom concurrently
// *in package.json(scrpit)  "both": "concurrently \"npm start\" \"nodemon backend/index.js\""
// in terminal npm run both
//npm i react-router-dom@5.3.4
//fontawesome script in index.html
//npm i react-infinite-scroll-component

import React, { useState } from 'react'
import NavBar from './components/NavBar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NoteState from './context/notes/NoteState';
import Alertx from './components/Alertx';
import Contact from './components/Contact';
import User from './components/User';


const App = () => {
  const [alert, setAlert] = useState(null);
  
  const showAlert = (mss, type) => {
    setAlert({
      mss: mss,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }

  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alertx alert = {alert} />
          <div className='container'>
            <Switch>
              <Route exact path="/"><Home showAlert= {showAlert}/></Route>
              <Route exact path="/contact"><Contact showAlert= {showAlert}/></Route>
              <Route exact path="/user"><User showAlert= {showAlert}/></Route>
              <Route exact path="/login"><Login showAlert= {showAlert}/></Route>
              <Route exact path="/signup"><SignUp showAlert= {showAlert}/></Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
