import React, { useState, useEffect } from 'react';
<<<<<<< Updated upstream
import logo from './FutureFieldLogo.png';
=======
import Homepage from './pages/Homepage/HomePage';
>>>>>>> Stashed changes
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [date, setDate] = useState(new Date().toLocaleDateString())


  useEffect(() => {
    console.log("hello world");
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: '10/17/2024' })
    };
    fetch('/api/date', requestOptions)
      .then(response => response.json())
      .then(data => {setDate(data.date)});
  }, [date]);

  return (
    <div className="App">
<<<<<<< Updated upstream
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Future Field
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>The current time is {currentTime}.</p>
      </header>
=======
      <Homepage />
      <p>The current time is {currentTime}.</p>
      <p>the current date is {date}.</p>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
