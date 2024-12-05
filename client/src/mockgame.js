import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mockGames from './mockgameVar';
import './mockgame.css';

function MockGame() {
  const { mockGameId } = useParams();
  const [prediction, setPrediction] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Summary');
  const [prediction2, setPrediction2] = useState('Summary');

  const mockGameDetails = mockGames.find((game) => game.game_id === mockGameId);

  useEffect(() => {
    if (selectedTab === 'score predictions' && mockGameDetails) {
      fetchPrediction();
    }
    if (selectedTab === 'pitch predictions' && mockGameDetails) {
      fetchPrediction2(); 
    }
  }, [selectedTab, mockGameDetails]);

  const fetchPrediction = () => {
    if (!mockGameDetails) return;

    const mockData = {
      home_team: mockGameDetails.home_team,
      visiting_team: mockGameDetails.away_team,
      season: '2024',
    };

    fetch('http://127.0.0.1:5000/api/win-prediction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockData),
    })
      .then((response) => response.json())
      .then((data) => setPrediction(data))
      .catch((error) => console.error('Error fetching prediction:', error));
  };

  const fetchPrediction2 = () => {
    if (!mockGameDetails) return;

    const mockData = {
      home_team: mockGameDetails.home_team,
      visiting_team: mockGameDetails.away_team,
      season: '2024',
    };

    fetch('http://127.0.0.1:5000/api/pitch-prediction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockData),
    })
      .then((response) => response.json())
      .then((data) => setPrediction2(data))
      .catch((error) => console.error('Error fetching alternative prediction:', error));
  };

  if (!mockGameDetails) {
    return <p>Game not found. Please check the game ID.</p>;
  }

  return (
    <>
      <div className="game-details">
        <div className="game-header">
          <div className="team">
            <img
              src={`/logos/${mockGameDetails.away_team.replace(/\s/g, '_')}.png`}
              alt={`${mockGameDetails.away_team} logo`}
              className="team-logo"
            />
            <strong>{mockGameDetails.away_team}</strong>
            <p className="score">{mockGameDetails.away_score}</p>
          </div>

          <div className="game-loca">
            <p>
              {mockGameDetails.date} at {mockGameDetails.game_time}{' '}
              {mockGameDetails.ampm}
            </p>
          </div>

          <div className="team">
            <img
              src={`/logos/${mockGameDetails.home_team.replace(/\s/g, '_')}.png`}
              alt={`${mockGameDetails.home_team} logo`}
              className="team-logo"
            />
            <strong>{mockGameDetails.home_team}</strong>
            <p className="score">{mockGameDetails.home_score}</p>
          </div>
        </div>

        <div className="venue-info">
          <p>Location: {mockGameDetails.venue}</p>
        </div>
        <div className="status-info">
          <p>Status: {mockGameDetails.status}</p>
        </div>
      </div>

      <div className="game-details2">
        <h2>Winning Statistics</h2>
        <div className="tabs">
          <button
            onClick={() => setSelectedTab('current_score')}
            className={selectedTab === 'current_score' ? 'active' : ''}
          >
            Current Score
          </button>
          <button
            onClick={() => setSelectedTab('score predictions')}
            className={selectedTab === 'predictions' ? 'active' : ''}
          >
            Predictions
          </button>
        </div>

        {selectedTab === 'score predictions' && prediction && (
          <div className="moneyline-container">
            <div className="team-info">
              <img
                src={`/logos/${mockGameDetails.away_team.replace(/\s/g, '_')}.png`}
                alt={`${mockGameDetails.away_team} logo`}
                className="team-logo"
              />
              <div className="team-details">
                <h3>{mockGameDetails.away_team}</h3>
                <p>Win Probability: {prediction.away_win_prob}%</p>
              </div>
            </div>

            <div className="moneyline-center">
              <p>Moneyline</p>
              <div className="win-bar">
                <div
                  className="away-bar"
                  style={{ width: `${prediction.away_win_prob}%` }}
                ></div>
                <div
                  className="home-bar"
                  style={{ width: `${prediction.home_win_prob}%` }}
                ></div>
              </div>
            </div>

            <div className="team-info">
              <img
                src={`/logos/${mockGameDetails.home_team.replace(/\s/g, '_')}.png`}
                alt={`${mockGameDetails.home_team} logo`}
                className="team-logo"
              />
              <div className="team-details">
                <h3>{mockGameDetails.home_team}</h3>
                <p>Win Probability: {prediction.home_win_prob}%</p>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'current_score' && (
          <div className="moneyline-container">
            <div className="team-info">
              <img
                src={`/logos/${mockGameDetails.away_team.replace(/\s/g, '_')}.png`}
                alt={`${mockGameDetails.away_team} logo`}
                className="team-logo"
              />
              <div className="team-details">
                <h3>{mockGameDetails.away_team}</h3>
                <p>
                  Current Score: {mockGameDetails.away_score} -{' '}
                  {mockGameDetails.home_score}
                </p>
              </div>
            </div>

            <div className="team-info">
              <img
                src={`/logos/${mockGameDetails.home_team.replace(/\s/g, '_')}.png`}
                alt={`${mockGameDetails.home_team} logo`}
                className="team-logo"
              />
              <div className="team-details">
                <h3>{mockGameDetails.home_team}</h3>
                <p>
                  Current Score: {mockGameDetails.home_score} -{' '}
                  {mockGameDetails.away_score}
                </p>
              </div>
            </div>
          </div>
        )}

        <h2>Pitch Statistics</h2>
        <div className="tabs">
          <button
            onClick={() => setSelectedTab('current_pitch')}
            className={selectedTab === 'current_pitch' ? 'active' : ''}
          >
            Current Pitch
          </button>
          <button
            onClick={() => setSelectedTab('pitch predictions')}
            className={selectedTab === 'pitch predictions' ? 'active' : ''}
          >
            Predictions
          </button>
        </div>

        {selectedTab === 'pitch predictions' && prediction && (
          <div className="moneyline-container">
            <div className="team-info">
              <img
                src={`/logos/${mockGameDetails.away_team.replace(/\s/g, '_')}.png`}
                alt={`${mockGameDetails.away_team} logo`}
                className="team-logo"
              />
              <div className="team-details">
                <h3>{mockGameDetails.away_team}</h3>
                <p>Win Probability: {prediction.away_win_prob}%</p>
              </div>
            </div>

            <div className="moneyline-center">
              <p>Moneyline</p>
              <div className="win-bar">
                <div
                  className="away-bar"
                  style={{ width: `${prediction.away_win_prob}%` }}
                ></div>
                <div
                  className="home-bar"
                  style={{ width: `${prediction.home_win_prob}%` }}
                ></div>
              </div>
            </div>

            <div className="team-info">
              <img
                src={`/logos/${mockGameDetails.home_team.replace(/\s/g, '_')}.png`}
                alt={`${mockGameDetails.home_team} logo`}
                className="team-logo"
              />
              <div className="team-details">
                <h3>{mockGameDetails.home_team}</h3>
                <p>Win Probability: {prediction.home_win_prob}%</p>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'current_pitch' && (
          <div className="moneyline-container">
            <div className="team-info">
              <img
                src={`/logos/${mockGameDetails.away_team.replace(/\s/g, '_')}.png`}
                alt={`${mockGameDetails.away_team} logo`}
                className="team-logo"
              />
              <div className="team-details">
                <h3>{mockGameDetails.away_team}</h3>
                <p>
                  Current Score: {mockGameDetails.away_score} -{' '}
                  {mockGameDetails.home_score}
                </p>
              </div>
            </div>

            <div className="team-info">
              <img
                src={`/logos/${mockGameDetails.home_team.replace(/\s/g, '_')}.png`}
                alt={`${mockGameDetails.home_team} logo`}
                className="team-logo"
              />
              <div className="team-details">
                <h3>{mockGameDetails.home_team}</h3>
                <p>
                  Current Score: {mockGameDetails.home_score} -{' '}
                  {mockGameDetails.away_score}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="weather-box">
          <h2 className="weather-title">Game Day Weather</h2>
          <div className="weather-details">
            <p>
              During the game, the weather is likely to be{' '}
              <strong>{mockGameDetails.weather}</strong>.
            </p>
            <p>
              Wind is <strong>{mockGameDetails.wind}</strong>.
            </p>
            <p>
              First pitch happened at{' '}
              <strong>{mockGameDetails.first_pitch}</strong>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MockGame;
