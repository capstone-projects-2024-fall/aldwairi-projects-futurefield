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
    fetch(`http://127.0.0.1:5000/api/game/${gameId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id: gameId }),
    })  
      .then((response) => response.json())
      .then((data) => setGameDetails(data))
      .catch((error) => console.error("Error fetching game data:", error));

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

  const renderBoxscore = (teamName, boxscore) => (
    <div className="boxscore-container">
      <h3 className="team-name">{teamName}</h3>
      
      <div className="section">
        <h4>Batters</h4>
        <table className="boxscore-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>AB</th>
              <th>R</th>
              <th>H</th>
              <th>RBI</th>
              <th>BB</th>
              <th>K</th>
              <th>LOB</th>
            </tr>
          </thead>
          <tbody>
            {boxscore.batters.map((batter, index) => (
              <tr key={index}>
                <td>{batter.name}</td>
                <td>{batter.AB}</td>
                <td>{batter.R}</td>
                <td>{batter.H}</td>
                <td>{batter.RBI}</td>
                <td>{batter.BB}</td>
                <td>{batter.K}</td>
                <td>{batter.LOB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <div className="section">
        <h4>Pitchers</h4>
        <table className="boxscore-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>IP</th>
              <th>H</th>
              <th>R</th>
              <th>ER</th>
              <th>BB</th>
              <th>K</th>
              <th>HR</th>
              <th>ERA</th>
            </tr>
          </thead>
          <tbody>
            {boxscore.pitchers.map((pitcher, index) => (
              <tr key={index}>
                <td>{pitcher.name}</td>
                <td>{pitcher.IP}</td>
                <td>{pitcher.H}</td>
                <td>{pitcher.R}</td>
                <td>{pitcher.ER}</td>
                <td>{pitcher.BB}</td>
                <td>{pitcher.K}</td>
                <td>{pitcher.HR}</td>
                <td>{pitcher.ERA}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


  return (
    <>
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

          <div className="game-loca">
            <p>{gameDetails.date} at {gameDetails.time} {gameDetails.ampm}</p>
          </div>

          <div className="team">
            <img
              src={`/logos/${gameDetails.home_team.replace(/\s/g, "_")}.png`}
              alt={`${gameDetails.home_team} logo`}
              className="team-logo"
            />
            <strong>{gameDetails.home_team}</strong>
            <p className="score">{gameDetails.home_score}</p>
          </div>
        </div>

        <div className="venue-info">
          <p>Location: {gameDetails.venue}</p>
        </div>
        <div className="status-info">
          <p>Status: Complete</p>
        </div>
      </div>

      {/* Tabs for Game Statistics */}
      <div className="game-details2">
        <h2>Game Statistics</h2>
        <div className="tabs">
          <button
            onClick={() => setSelectedTab('current_score')}
            className={selectedTab === 'current_score' ? 'active' : ''}
          >
            Current Score
          </button>
          <button
            onClick={() => setSelectedTab('predictions')}
            className={selectedTab === 'predictions' ? 'active' : ''}
          >
            Predictions
          </button>
        </div>

        {selectedTab === 'predictions' && (
          <div className="moneyline-container">
            {/* Prediction details */}
            <div className="team-info">
              <img src={`/logos/${gameDetails.away_team.replace(/\s/g, "_")}.png`} alt={`${gameDetails.away_team} logo`} className="team-logo" />
              <div className="team-details">
                <h3>{gameDetails.away_team}</h3>
                <p>Win Probability: {prediction.away_win_probability}%</p>
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
                <p>{prediction.home_pitcher} ({prediction.home_pitcher_record})</p>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'current_score' && (
          <div className="moneyline-container">
          {/* Prediction details */}
          <div className="team-info">
            <img src={`/logos/${gameDetails.away_team.replace(/\s/g, "_")}.png`} alt={`${gameDetails.away_team} logo`} className="team-logo" />
            <div className="team-details">
              <h3>{gameDetails.away_team}</h3>
              <p>Current Score: {gameDetails.away_score} - {gameDetails.home_score}</p>
              <p>Games won vs lost this season: {gameDetails.away_games_won} vs {gameDetails.away_games_lost}</p>
            </div>
          </div>

          <div className="team-info">
            <img src={`/logos/${gameDetails.home_team.replace(/\s/g, "_")}.png`} alt={`${gameDetails.home_team} logo`} className="team-logo" />
            <div className="team-details">
              <h3>{gameDetails.home_team}</h3>
              <p>Current Score: {gameDetails.home_score} - {gameDetails.away_score}</p>
              <p>Games won vs lost this season: {gameDetails.home_games_won} vs {gameDetails.home_games_lost}</p>
            </div>
          </div>
        </div>  
        )}

        <div className="weather-box">
          <h2 className="weather-title">Game Day Weather</h2>
          <div className="weather-details">
            <p>During the game, the weather is likely to be <strong>{gameDetails.weather}</strong>.</p>
            <p>Wind is <strong>{gameDetails.wind}</strong>.</p>
            <p>First pitch happened at <strong>{gameDetails.first_pitch}</strong>.</p>
          </div>
        </div>

        <div className="boxscore">
          {renderBoxscore(gameDetails.away_team, gameDetails.away_boxscore)}
          {renderBoxscore(gameDetails.home_team, gameDetails.home_boxscore)}
        </div>
      </div>
    </>
  );
}

export default GameDetails;