import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mockGames from './mockgameVar';
import './mockgame.css';

function MockGame() {
  const { mockGameId } = useParams();
  const [prediction, setPrediction] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Summary');
  const [prediction2, setPrediction2] = useState('Summary');
  const [prediction3, setPrediction3] = useState('Summary');

  const mockGameDetails = mockGames.find((game) => game.game_id === mockGameId);

  useEffect(() => {
    if (selectedTab === 'score predictions' && mockGameDetails) {
      fetchPrediction();
    }
    if (selectedTab === 'pitch predictions' && mockGameDetails) {
      fetchPrediction2();
    }
    if (selectedTab === 'hit predictions' && mockGameDetails) {
      fetchPrediction3();
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

    const mockData2 = {
      inning: mockGameDetails.game_state.inning,
      outs: mockGameDetails.game_state.outs_when_up,
      strikes: mockGameDetails.game_state.strikes,
      balls: mockGameDetails.game_state.balls,
    };

    fetch('http://127.0.0.1:5000/api/pitch-prediction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockData2),
    })
      .then((response) => {
        console.log("Backend response:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Prediction data:", data);
        setPrediction2(data);
      })
      .catch((error) => console.error('Error fetching alternative prediction:', error));
    
  };

  const fetchPrediction3 = () => {
    if (!mockGameDetails) return;
  
    const on_base = {
      "1b": mockGameDetails.game_state.runners_on_base.on_1b,
      "2b": mockGameDetails.game_state.runners_on_base.on_2b,
      "3b": mockGameDetails.game_state.runners_on_base.on_3b,
    };

    const mockData3 = {
      batter_name: mockGameDetails.game_state.batter_name,
      pitcher_name: mockGameDetails.game_state.pitcher_name,
      zone: mockGameDetails.game_state.zone,
      balls: mockGameDetails.game_state.balls,
      strikes: mockGameDetails.game_state.strikes,
      outs: mockGameDetails.game_state.outs_when_up,
      on_base: on_base, 
    };
  
    fetch('http://127.0.0.1:5000/api/hit-prediction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockData3),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Hit Prediction Data:', data);
        setPrediction3(data);
      })
      .catch((error) => {
        console.error('Error fetching hit prediction:', error);
      });
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
              {mockGameDetails.date} at {mockGameDetails.game_time} {mockGameDetails.ampm}
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

      {/* Winning Statistics Section */}
      <div className="box">
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
            className={selectedTab === 'score predictions' ? 'active' : ''}
          >
            Predictions
          </button>
        </div>

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
      </div>

      {/* Hit Statistics Section */}
      <div className="box">
        <h2>Hit Statistics</h2>
        <div className="tabs">
          <button
            onClick={() => setSelectedTab('current_hit')}
            className={selectedTab === 'current_hit' ? 'active' : ''}
          >
            Current Hit
          </button>
          <button
            onClick={() => setSelectedTab('hit predictions')}
            className={selectedTab === 'hit predictions' ? 'active' : ''}
          >
            Predictions
          </button>
        </div>
        {selectedTab === 'hit predictions' && (
          <div className="prediction-container">
            <img
              src="/strikeout.jpg"
              alt="strikeout"
              className="ball-pic"
            />
            <div className="prediction-text">
              The next bat is predicted to be <strong>{prediction3.prediction}</strong>
            </div>
          </div>
        )}

        {selectedTab === 'current_hit' && (
          <div className="current-hit-content">
            <p>
              <strong>Pitcher:</strong> {mockGameDetails.game_state.pitcher}
            </p>
            <p>
              <strong>Batter:</strong> {mockGameDetails.game_state.batter}
            </p>
            <p>
              <strong>Zone:</strong> {mockGameDetails.game_state.zone}
            </p>
            <h4>Runners on Base:</h4>
            <p>
              <strong>1st Base:</strong>{' '}
              {mockGameDetails.game_state.runners_on_base.on_1b}
            </p>
            <p>
              <strong>2nd Base:</strong>{' '}
              {mockGameDetails.game_state.runners_on_base.on_2b}
            </p>
            <p>
              <strong>3rd Base:</strong>{' '}
              {mockGameDetails.game_state.runners_on_base.on_3b}
            </p>
          </div>
        )}
      </div>

      {/* Pitch Statistics Section */}
      <div className="box">
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
        {selectedTab === 'current_pitch' && (
          <div className="current-pitch">
            <p>
              <strong>Inning:</strong> {mockGameDetails.game_state.inning}</p>
            <p>
              <strong>Pitcher Throws:</strong>{' '}
              {mockGameDetails.game_state.p_throws === 0
                ? 'Right-handed'
                : 'Left-handed'}
            </p>
            <p>
              <strong>Strikes:</strong> {mockGameDetails.game_state.strikes}</p>
            <p>
              <strong>Balls:</strong> {mockGameDetails.game_state.balls}</p>
            <p>
              <strong>Outs:</strong> {mockGameDetails.game_state.outs_when_up}</p>
          </div>
        )}
        {selectedTab === 'pitch predictions' && (
          <div className="prediction-container">
            <img
              src="/fastball.jpg"
              alt="fastball"
              className="ball-pic"
            />
            <div className="prediction-text">
              The next ball is predicted to be <strong>{prediction2}</strong>
            </div>
          </div>
        )}
      </div>

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
    </>
  );
}

export default MockGame;
