import React from 'react';
import { useParams } from 'react-router-dom';

function GameDetails() {
  const { gameId } = useParams(); // extract the game ID from the URL

  return (
    <div>
      <h2>Game Details for Game ID: {gameId}</h2>
      {/* Display additional game details here */}
    </div>
  );
}

export default GameDetails;
