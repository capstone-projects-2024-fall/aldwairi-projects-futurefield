import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import mockGames from './mockgameVar';
import './mockgame.css';

function MockGame() {
  const { mockGameId } = useParams();
  const [selectedTab, setSelectedTab] = useState('Summary');

  const mockGameDetails = mockGames.find((game) => game.game_id === mockGameId);

  if (!mockGameDetails) {
    return <p>Game not found. Please check the game ID.</p>;
  }

  const renderBoxscore = (teamName, boxscore) => (
    <div>
      <h3>{teamName}</h3>
      <h4>Batters</h4>
      <table>
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
      <h4>Pitchers</h4>
      <table>
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
  );

  return (
    <div className="mock-game">
      <h1>Mock Game Details</h1>
      <div className="game-header">
        <div className="team">
          <h2>{mockGameDetails.away_team}</h2>
          <p>Score: {mockGameDetails.away_score}</p>
        </div>
        <div className="game-info">
          <p>{mockGameDetails.date} at {mockGameDetails.game_time}</p>
          <p>Venue: {mockGameDetails.venue}</p>
          <p>Weather: {mockGameDetails.weather}</p>
          <p>Wind: {mockGameDetails.wind}</p>
        </div>
        <div className="team">
          <h2>{mockGameDetails.home_team}</h2>
          <p>Score: {mockGameDetails.home_score}</p>
        </div>
      </div>

      <div className="tabs">
        <button
          onClick={() => setSelectedTab('Summary')}
          className={selectedTab === 'Summary' ? 'active' : ''}
        >
          Summary
        </button>
        <button
          onClick={() => setSelectedTab('Boxscore')}
          className={selectedTab === 'Boxscore' ? 'active' : ''}
        >
          Boxscore
        </button>
      </div>

      {selectedTab === 'Summary' && (
        <div className="summary">
          <p>This is a {mockGameDetails.status} game.</p>
        </div>
      )}

      {selectedTab === 'Boxscore' && (
        <div className="boxscore">
          {renderBoxscore(mockGameDetails.away_team, mockGameDetails.away_boxscore)}
          {renderBoxscore(mockGameDetails.home_team, mockGameDetails.home_boxscore)}
        </div>
      )}
    </div>
  );
}

export default MockGame;
