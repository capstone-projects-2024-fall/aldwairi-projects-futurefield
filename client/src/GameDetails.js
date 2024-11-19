import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './gamedetails.css';

function GameDetails() {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Moneyline');

  useEffect(() => {
    // Fetch game details and prediction data from the backend
    fetch(`http://127.0.0.1:5000/api/game-details`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id: gameId }),
    })
      .then(response => response.json())
      .then(data => setGameDetails(data))
      .catch(error => console.error("Error fetching game details:", error));

    fetch(`http://127.0.0.1:5000/api/game-prediction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id: gameId }),
    })
      .then(response => response.json())
      .then(data => setPrediction(data))
      .catch(error => console.error("Error fetching prediction:", error));
  }, [gameId]);

  if (!gameDetails || !prediction) return <p>Loading...</p>;
  const formattedGameDateTime = `${new Date(gameDetails.game_datetime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })} at ${new Date(gameDetails.game_datetime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })} EDT`;

  return (
    <><div className="game-details">
      <div className="game-header">
        <div className="team">
          <img
            src={`/logos/${gameDetails.away_team.replace(/\s/g, "_")}.png`}
            alt={`${gameDetails.away_team} logo`}
            className="team-logo" />
          <strong>{gameDetails.away_team}</strong>
          <p className="score">{gameDetails.away_score}</p>
        </div>

        <div className="game-loca">
          <p>{formattedGameDateTime}</p>
        </div>

        <div className="team">
          <img
            src={`/logos/${gameDetails.home_team.replace(/\s/g, "_")}.png`}
            alt={`${gameDetails.home_team} logo`}
            className="team-logo" />
          <strong>{gameDetails.home_team}</strong>
          <p className="score">{gameDetails.home_score}</p>
        </div>
      </div>

      <div className="venue-info">
        <p>{gameDetails.venue}</p>
      </div>
      <div className="status-info">
          <p>Status: {gameDetails.status}</p>
      </div>
    </div>
    <div className="game-details2">
      <h2>Game Statistics</h2>
        <div className="tabs">
          <button
            onClick={() => setSelectedTab('current_score')}
            className={selectedTab === 'Moneyline' ? 'active' : ''}
          >
            Current Score
          </button>
          <button
            onClick={() => setSelectedTab('predictions')}
            className={selectedTab === 'Over/Under' ? 'active' : ''}
          >
            Predictions
          </button>
        </div>

        {selectedTab === 'predictions' && (
          <div className="moneyline-container">
            <div className="team-info">
              <img src={`/logos/${gameDetails.away_team.replace(/\s/g, "_")}.png`} alt={`${gameDetails.away_team} logo`} className="team-logo" />
              <div className="team-details">
                <h3>{gameDetails.away_team}</h3>
                <p>Win Probability: {prediction.away_win_probability}%</p>
                <div className="bet-info">
                  <span className="bet-odds">{prediction.away_odds}</span>
                  <span className="bet-provider">bet365</span>
                </div>
                <p>{prediction.away_pitcher} ({prediction.away_pitcher_record})</p>
              </div>
            </div>

            <div className="moneyline-center">
              <p>Moneyline</p>
              <div className="win-bar">
                <div className="away-bar" style={{ width: `${prediction.away_win_probability}%` }}></div>
                <div className="home-bar" style={{ width: `${prediction.home_win_probability}%` }}></div>
              </div>
            </div>

            <div className="team-info">
              <img src={`/logos/${gameDetails.home_team.replace(/\s/g, "_")}.png`} alt={`${gameDetails.home_team} logo`} className="team-logo" />
              <div className="team-details">
                <h3>{gameDetails.home_team}</h3>
                <p>Win Probability: {prediction.home_win_probability}%</p>
                <div className="bet-info">
                  <span className="bet-odds">{prediction.home_odds}</span>
                  <span className="bet-provider">BETMGM</span>
                </div>
                <p>{prediction.home_pitcher} ({prediction.home_pitcher_record})</p>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'current_score' && (
          <div className="score-container">
            <p></p>
          </div>
        )}

        {selectedTab === 'Run Line' && (
          <div className="run-line-container">
            <p>Run Line information will be displayed here.</p>
          </div>
        )}

        <div className="weather-info">
          <h4>Weather Forecast</h4>
          <p>Last Updated: {prediction.weather_last_updated}</p>
          <p>{prediction.weather_forecast}</p>
        </div>
      </div></>
  );
}

export default GameDetails;
