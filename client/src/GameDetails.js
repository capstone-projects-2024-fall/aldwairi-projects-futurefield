import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './gamedetails.css';

function GameDetails() {
  const { gameId } = useParams(); // Get game_id from the URL
  const [gameDetails, setGameDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Fetch game details from the backend
    fetch('http://127.0.0.1:5000/api/game-details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id: gameId }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Game details not found');
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          setGameDetails(data);
        }
      })
      .catch(error => {
        setErrorMessage(error.message || "Error fetching game details.");
        console.error("Error fetching game details:", error);
      });
  }, [gameId]);

  if (errorMessage) return <p>{errorMessage}</p>;
  if (!gameDetails) return <p>Loading...</p>;

  const formattedGameDate = new Date(gameDetails.game_datetime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedGameTime = new Date(gameDetails.game_datetime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  console.log(gameDetails.away_team)

  return (
    <div className="game-details">
      <div className="game-header">
        <div className="team">
        <img
        src={`/logos/${gameDetails.away_team.replace(/\s/g, "_")}.png`}
        alt={`${gameDetails.away_team} logo`}
        className="team-logo"
        />
        <strong>{gameDetails.away_team}</strong>
        <p className="score">{gameDetails.away_score}</p>
        </div>
        <div className="team">
          <strong>{gameDetails.home_team}</strong>
          <p className="score">{gameDetails.home_score}</p>
        </div>
      </div>

      <div className="game-info">
        <p>{formattedGameDate}</p>
        <p>{formattedGameTime} EDT</p>
      </div>

      <div className="venue-info">
        <p>{gameDetails.venue}</p>
      </div>

      <div className="status-info">
        <p>Status: {gameDetails.status}</p>
      </div>
    </div>
  );
}

export default GameDetails;

