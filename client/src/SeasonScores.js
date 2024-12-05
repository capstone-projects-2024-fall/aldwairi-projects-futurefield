import React, { useState, useEffect } from 'react';
import './seasonscores.css'; 

function SeasonScores() {

  const currentYear = new Date().getFullYear();
  const [season, setSeason] = useState(currentYear); // Default to current year
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [predictionData, setPredictionData] = useState([]);
  const [playoffPrediction, setPlayoffPrediction] = useState([]);


  useEffect(() => {
    // Fetch the World Series prediction data from the 2025ws.json file
    fetch('/2025ws.json')
      .then((response) => response.json())
      .then((data) => setPredictionData(data))
      .catch((error) => console.error("Error fetching prediction data:", error));
  }, []);

  useEffect(() => {
    // Fetch the World Series prediction data from the 2025ws.json file
    fetch('/playoff_predictions.json')
      .then((response) => response.json())
      .then((data) => setPlayoffPrediction(data))
      .catch((error) => console.error("Error fetching  playoffprediction data:", error));
  }, []);


  useEffect(() => {
    // Fetch season details and prediction data from the backend
    fetch(`http://127.0.0.1:5000/api/seasonStats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ season: season }),
    })
      .then((response) => response.json())
      .then((data) => setSeasonDetails(data))
      .catch((error) => console.error("Error fetching season data:", error));
  }, [season]);

  const generateSeriesHTML = (seriesData) => {
    console.log(seriesData)
    return `
      <div class="series">
        <div class="series-header">${seriesData.series_description}</div>
        <div class="series-details">
          <p> ${seriesData.team_1} - Wins: ${seriesData.team_1_wins} - Losses: ${seriesData.team_2_wins}</p>
          <p> ${seriesData.team_2} - Wins: ${seriesData.team_2_wins} - Losses: ${seriesData.team_1_wins}</p>
        </div>
      </div>
    `;
  };

  const handleShowPrediction = () => {
    const popupWindow = window.open("", "WorldSeriesPrediction", "width=500,height=600");

    // Adding HTML content dynamically to the new window
    let content = "<h2>World Series Prediction for Next Year</h2><ul>";

    predictionData.forEach((team) => {
      content += `<li><strong>${team.name}:</strong> ${Math.round(team.WSWin_Prob * 100)}% chance</li>`;
    });

    content += "</ul><button onclick='window.close()'>Close</button>";

    popupWindow.document.write(content);
    popupWindow.document.close(); // Needed for the content to render
  };

  const handleShowPlayoffPrediction = () => {
    const popupWindow = window.open("", "PlayoffPrediction", "width=500,height=600");

    // Adding HTML content dynamically to the new window
    let content = "<h2>Playoff Prediction for Next Year</h2><ul>";

    playoffPrediction.forEach((team) => {
      content += `<li><strong>${team.teamID}:</strong> ${Math.round(team.Playoff_Prob * 100)}% chance</li>`;
    });

    content += "</ul><button onclick='window.close()'>Close</button>";

    popupWindow.document.write(content);
    popupWindow.document.close(); // Needed for the content to render
  };

  const handleSeasonChange = (e) => {
    const inputYear = Number(e.target.value);

    // Validate if the input is within the range of 1960 to the current year
    if (inputYear >= 1960 && inputYear <= currentYear) {
      setSeason(inputYear);
    } else {
      // If invalid, reset to current year or previous valid value
      e.target.value = season;
    }
  };

  const sortSeries = (series) => {
    const order = {
      "World Series": 1,
      "League Championship Series": 2,
      "Division Series": 3,
      "Wild Card Game": 4,
    };

    return series.sort((a, b) => order[a.series_description] - order[b.series_description]);
  };

  return (
    <div className="seasonscores">
      {/* Header with logo and navigation */}
      <header className="season-header">
        <img src="/FutureFieldLogo.png" alt="Logo" className="logo" />
        <nav className="navbar">
          <ul>
            <span onClick={() => window.location.href = `/homepage`} className="homepage-button">
              Stats
            </span>
            <span onClick={() => window.location.href = `/seasonscores`} className="season-button">
              SeasonScores
            </span>
          </ul>
        </nav>
      </header>

      <div className="season-controls">
        <input
          type="number"
          value={season}
          onChange={handleSeasonChange}
          placeholder="Enter Season Year"
          min="1960"
          max={currentYear}
        />
        <button onClick={handleShowPrediction}>World Series Prediction</button>
        <button onClick={handleShowPlayoffPrediction}>Playoff Prediction</button>
      </div>

      {/* Display Series Results */}
      <div id="series-results" className="series-results">
        {seasonDetails && Object.keys(seasonDetails).length > 0 && (
          <>
            {sortSeries(Object.values(seasonDetails)).map((seriesData, index) => {
              return (
                <div key={index} dangerouslySetInnerHTML={{ __html: generateSeriesHTML(seriesData) }} />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default SeasonScores;