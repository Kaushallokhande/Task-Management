import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import NoteState from './context/notes/NoteState';
import Alertx from './components/Alertx';

const App = () => {
  const [alert, setAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <NoteState>
      {isLoggedIn && (
        <div className="logout-container">
          <button
            className="btn btn-primary logout-btn"
            type="button"
            onClick={handleLogout}
          >
            <i className="fas fa-power-off"></i>
          </button>
        </div>
      )}

      {!isLoggedIn && (
        <div className="signup-container">
          <button
            className="btn btn-primary signup-btn"
            type="button"
            onClick={handleSignUp}
          >
            <i className="fas fa-user-plus"></i>
          </button>
        </div>
      )}

      <Alertx alert={alert} />
      <div className="container">
        <Outlet context={{ showAlert }} />
      </div>
    </NoteState>
  );
};


export default App;
