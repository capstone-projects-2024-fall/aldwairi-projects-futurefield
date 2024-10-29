import React, { useState, useEffect } from 'react';
import Homepage from './HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameDetails from './GameDetails'; // create this component for game details
import SeasonScores from './SeasonScores';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game-details/:gameId" element={<GameDetails />} /> 
        <Route path="/season-scores" element={<SeasonScores />} />
      </Routes>
    </Router>
  );
}

export default App;



