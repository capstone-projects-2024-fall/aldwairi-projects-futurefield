import React, { useState, useEffect } from 'react';
import './homepage.css'; 
import mockGames from './mockgameVar.js';

function Homepage() {
  const [dates, setDates] = useState([]);
  const [currentStartDate, setCurrentStartDate] = useState(new Date());
  const [games, setGames] = useState([]); // store games info
  const [errorMessage, setErrorMessage] = useState(null); // store error messages
  const [showMockGames, setShowMockGames] = useState(false);

  useEffect(() => {
    generateWeekDates(currentStartDate);

    // automatically fetch today's games on page load
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',   
      day: '2-digit'
    });
    handleDateClick(today);
  }, [currentStartDate]);

  // function to generate the next 7 days starting from the given date
  const generateWeekDates = (startDate) => {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const weekDates = [];
  
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i); // increment the day
  
      // format the date in MM/DD/YYYY format manually
      const month = String(day.getMonth() + 1).padStart(2, '0'); 
      const dayNumber = String(day.getDate()).padStart(2, '0');
      const year = day.getFullYear();
      const formattedDate = `${month}/${dayNumber}/${year}`;  // MM/DD/YYYY format
  
      weekDates.push({
        dayName: daysOfWeek[day.getDay()],
        dateNumber: day.getDate(),
        isToday: day.toDateString() === new Date().toDateString(), // check if it's today
        monthName: day.toLocaleString('default', { month: 'short' }),
        formattedDate  // pass the formatted date
      });
    }
  
    setDates(weekDates);  // set the generated dates into state
  };

  // function to handle moving to the next day
  const handleNextDay = () => {
    const newStartDate = new Date(currentStartDate);
    newStartDate.setDate(currentStartDate.getDate() + 1); 
    setCurrentStartDate(newStartDate);
  };

  // function to handle moving to the previous day
  const handlePreviousDay = () => {
    const newStartDate = new Date(currentStartDate);
    newStartDate.setDate(currentStartDate.getDate() - 1); 
    setCurrentStartDate(newStartDate);
  };

  // Toggle the display mode
  const handleMockGameClick = () => {
    setShowMockGames(true); // Show mock games
  };

  const handleNormalGameClick = () => {
    setShowMockGames(false); // Show normal games
  };

  const handleDateClick = (selectedDate) => { 
    setErrorMessage(null);
    setGames([]); 
  
    // make sure selectedDate is valid before formatting
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  
    console.log("Formatted Date:", formattedDate);  // log the formatted date for debugging
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: formattedDate })  // send the formatted date
    };
  
    fetch('http://127.0.0.1:5000/api/date', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.games) {
          setGames(data.games);  // store the games in state
        } else {
          setErrorMessage(data.message || "No games found.");
        }
      })
      .catch(error => {
        setErrorMessage("Error fetching games. Please try again.");
        console.error("Error fetching games:", error);
      });
  };
   
  return (
    <div className="homepage">
      {/* Header with logo and navigation */}
      <header className="homepage-header">
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
  
      {/* Banner with Scores and Schedule */}
      <header className="homepage-banner">
        <nav className="banner">
          <h2>Scores</h2>
          <h2>Schedule</h2>
        </nav>
  
        {/* Calendar container */}
        <div className="calendar-container">
          <div className="calendar-navigation">
            {/* Previous Day Arrow */}
            <span className="nav-arrow" onClick={handlePreviousDay} aria-label="Previous Day">&#8249;</span>
  
            {/* Dates */}
            <div className="dates">
              {dates.map((dateObj, index) => (
                <div
                  key={index}
                  className={`date ${dateObj.isToday ? 'today' : ''}`}
                  onClick={() => handleDateClick(dateObj.formattedDate)} // click to fetch games for this date
                >
                  <span className="day">{dateObj.isToday ? 'TODAY' : dateObj.dayName}</span>
                  <span className="date-number">{`${dateObj.monthName} ${dateObj.dateNumber}`}</span>
                </div>
              ))}
            </div>
  
            {/* Next Day Arrow */}
            <span className="nav-arrow" onClick={handleNextDay}>&#8250;</span>
  
            {/* Calendar Icon */}
            <span className="calendar-icon" role="img" aria-label="Calendar">&#128197;</span>
          </div>

          {/* Mock Games Button */}
          <div className="mock-games-button-container">
            <button className="mock-games-button" onClick={handleMockGameClick}>
              Show Mock Games
            </button>
            <button className="mock-games-button" onClick={handleNormalGameClick}>
              Close
            </button>
          </div>
        </div>
      </header>
  
      {/* Main content with events */}
      <main className="content">
        <div className="event-container">
          {showMockGames ? (
            mockGames.map((selectedMockGame) =>  (
              <div key={selectedMockGame.game_id} className="event-box">
                <div className="box-banner">
                  <p>World Series </p>
                  <p>{selectedMockGame.away_team} vs {selectedMockGame.home_team}</p>
                </div>
                <div className="game-header">
                  <div className="team1">
                    <strong>{selectedMockGame.away_team}</strong>
                    <p className="score">{selectedMockGame.away_score} - {selectedMockGame.home_score}</p>
                  </div>
                  <div className="team2">
                    <strong>{selectedMockGame.home_team}</strong>
                    <p className="score">{selectedMockGame.home_score} - {selectedMockGame.away_score}</p>
                  </div>
                  <div className="pitcher-header">
                    <div>Location: {selectedMockGame.venue}</div>
                    <div>Time: {selectedMockGame.game_times}</div>
                    <div>Status: {selectedMockGame.status}</div>
                  </div>
                </div>
                <div className="game-details-button">
                  <button
                    onClick={() => window.location.href = `/mockgame/${selectedMockGame.game_id}`}
                    className="details-button"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            games.length > 0 && (
              games.map((game, index) => {
                const currentTime = new Date();
                const gameTime = new Date(game.game_time);

                // check if the game is upcoming or past
                const isUpcoming = gameTime > currentTime;
                const winningTeam = game.away_score > game.home_score ? game.away_team : game.home_team;
                const finalScore = `${game.away_score} - ${game.home_score}`;

                return (
                  <div key={index} className="event-box">
                    <div className="box-banner">
                      <p>World Series </p>
                      <p>{winningTeam} wins {finalScore}</p>
                    </div>
                    {isUpcoming ? (
                      <div className="upcoming-game">
                        <div className="game-header">
                          <div><strong>{game.away_team}</strong></div>
                          <div><strong>{game.home_team}</strong></div>
                        </div>
                        <p>Location: {game.venue}</p>
                        <p>Time: {game.formattedGameTime}</p>
                      </div>
                    ) : (
                      <div className="game-header">
                        <div className="team1">
                          <strong>{game.away_team}</strong>
                          <p className="score">{game.away_score} - {game.home_score}</p>
                        </div>
                        <div className="team2">
                          <strong>{game.home_team}</strong>
                          <p className="score">{game.home_score} - {game.away_score}</p>
                        </div>
                        <div className="pitcher-header">
                          <div>W: {game.winning_pitcher || "N/A"}</div>
                          <div>L: {game.losing_pitcher || "N/A"}</div>
                          <div>S: {game.save_pitcher || "N/A"}</div>
                        </div>
                      </div>
                    )}
                    <div className="game-details-button">
                      <button
                        onClick={() => window.location.href = `/game-details/${game.game_id}`}
                        className="details-button"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                );
              })
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Homepage;