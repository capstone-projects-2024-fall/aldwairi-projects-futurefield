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
      day.setDate(startDate.getDate() + i); // increment the day

      weekDates.push({
        dayName: daysOfWeek[day.getDay()],
        dateNumber: day.getDate(),
        isToday: day.toDateString() === new Date().toDateString(), // check if it's today
        monthName: day.toLocaleString('default', { month: 'short' })
      });
    }

    setDates(weekDates);
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
    setErrorMessage(null);
    setGames([]); // clear previous games

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: selectedDate })
    };

    fetch('/api/date', requestOptions)
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
      <header className="homepage-header">
        <img src="/FutureFieldLogo.png" alt="Logo" className="logo" />
        <nav className="navbar">
          <ul>
            <li><a href="#stats">Stats</a></li>
            <li><a href="#seasonscores">Season Scores</a></li>
          </ul>
        </nav>
      </header>

      <header className="homepage-banner">
        <nav className="banner">
          <h2>Scores</h2>
          <h2>Schedule</h2>
        </nav>
        {/* Calendar container */}
        <div className="calendar-container">
          <div className="calendar-navigation">
          <span className="nav-arrow" onClick={handlePreviousDay} aria-label="Previous Day">&#8249;</span>
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
            <span className="nav-arrow" onClick={handleNextDay}>&#8250;</span>
            <span className="calendar-icon">&#128197;</span>
          </div>
        </div>

      </header>

      <main className="content">
        <div className="event-container">
          {errorMessage && <p>{errorMessage}</p>}
          {games.length > 0 ? (
            games.map((game, index) => (
              <div key={index} className="event-box">
                <div className="game-time">Game Time: {new Date(game.game_time).toLocaleTimeString()}</div>
                <div className="teams-info">
                  <div className="team">
                    <img src={`path_to_logo/${game.away_team}.png`} alt="away team logo" className="team-logo" />
                    <p><strong>{game.away_team}</strong> {game.away_record}</p>
                  </div>
                  <div className="team">
                    <img src={`path_to_logo/${game.home_team}.png`} alt="home team logo" className="team-logo" />
                    <p><strong>{game.home_team}</strong> {game.home_record}</p>
                  </div>
                </div>
                <p><em>Watch on: {game.broadcast_info}</em></p>
                <div className="pitchers">
                  <div>
                    <strong>{game.away_pitcher.name}</strong> LHP<br />
                    {game.away_pitcher.wins}-{game.away_pitcher.losses} | {game.away_pitcher.era} ERA
                  </div>
                  <div>
                    <strong>{game.home_pitcher.name}</strong> RHP<br />
                    {game.home_pitcher.wins}-{game.home_pitcher.losses} | {game.home_pitcher.era} ERA
                  </div>
                </div>
                <div className="game-links">
                  <a href="#">MLB.TV</a>
                  <a href="#">Gameday</a>
                  <a href="#">Tickets</a>
                  <a href="#">Story</a>
                </div>
              </div>
            ))
          ) : (
            <p>No games to display. Please select a date.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Homepage;