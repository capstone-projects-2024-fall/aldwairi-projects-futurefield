import React, { useState, useEffect } from 'react';
import Homepage from './HomePage';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    console.log("Fetching time...");
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <Homepage />
      <p>The current time is {currentTime}.</p>
    </div>
  );
}

export default App;

