import React, { useState, useEffect } from 'react';
import './homepage.css'; 

function Homepage() {
  const [dates, setDates] = useState([]);
  const [currentStartDate, setCurrentStartDate] = useState(new Date());
  const [games, setGames] = useState([]); // store games info
  const [errorMessage, setErrorMessage] = useState(null); // store error messages

  useEffect(() => {
    generateWeekDates(currentStartDate);
  }, [currentStartDate]);

  // function to generate the next 7 days starting from the given date
  const generateWeekDates = (startDate) => {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const weekDates = [];
  
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i); // Increment the day
  
      // Format the date in MM/DD/YYYY format manually
      const month = String(day.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
      const dayNumber = String(day.getDate()).padStart(2, '0');
      const year = day.getFullYear();
      const formattedDate = `${month}/${dayNumber}/${year}`;  // MM/DD/YYYY format
  
      weekDates.push({
        dayName: daysOfWeek[day.getDay()],
        dateNumber: day.getDate(),
        isToday: day.toDateString() === new Date().toDateString(), // Check if it's today
        monthName: day.toLocaleString('default', { month: 'short' }),
        formattedDate  // Pass the formatted date
      });
    }
  
    setDates(weekDates);  // Set the generated dates into state
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

  const handleDateClick = (selectedDate) => {
    console.log("Raw Selected Date:", selectedDate);  // Log the raw selected date
  
    setErrorMessage(null);
    setGames([]); // Clear previous games
  
    // Make sure selectedDate is valid before formatting
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  
    console.log("Formatted Date:", formattedDate);  // Log the formatted date for debugging
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: formattedDate })  // Send the formatted date
    };
  
    fetch('http://127.0.0.1:5000/api/date', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.games) {
          setGames(data.games);  // Store the games in state
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
            <li><a href="#stats">Stats</a></li>
            <li><a href="#seasonscores">Season Scores</a></li>
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
        </div>
      </header>
  
      {/* Main content with events */}
    <main className="content">
      <div className="event-container">
        {errorMessage && <p>{errorMessage}</p>}

        {games.length > 0 ? (
          games.map((game, index) => {
            const currentTime = new Date();
            const gameTime = new Date(game.game_time);

            // Check if the game is upcoming or past
            const isUpcoming = gameTime > currentTime;

            const formattedGameTime = gameTime.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            });

            return (
              <div key={index} className="event-box">
                <div className="game-header">
                  <strong>{game.away_team} vs {game.home_team}</strong>
                </div>

                {isUpcoming ? (
                  // Information for upcoming games
                  <div className="upcoming-game">
                    <div className="game-time">Game Time: {gameTime.toLocaleTimeString()}</div>
                    <p>Location: {game.location}</p>
                    <div className="game-links">
                      <a href="#">Buy Tickets</a>
                      <a href="#">MLB.TV</a>
                    </div>
                  </div>
                ) : (
                  // Information for past games
                  <div className="past-game">
                    <div className="game-score">Final Score: {game.away_team} {game.away_score} - {game.home_team} {game.home_score}</div>
                    <div className="game-time">Game time: {formattedGameTime}</div>
                    <div className="game-summary">
                      <p>Summary: {game.summary}</p>
                    </div>
                    <div className="game-links">
                      <a href="#">Watch Highlights</a>
                      <a href="#">Box Score</a>
                      <a href="#">Story</a>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No games to display. Please select a date.</p>
        )}
      </div>
    </main>
    </div>
  );  
}

export default Homepage;