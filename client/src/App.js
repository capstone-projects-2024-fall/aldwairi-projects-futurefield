import React, { useState, useEffect } from 'react';
import Homepage from './HomePage';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [date, setDate] = useState(new Date().toLocaleDateString())


  useEffect(() => {
    console.log("Fetching time...");
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
      .then(data => {
        setDate(data.date);
      });
  }, []);  // Remove `date` from the dependency array so it only runs once
  

  return (
    <div className="App">
      <Homepage />
    </div>
  );
}

export default App;



