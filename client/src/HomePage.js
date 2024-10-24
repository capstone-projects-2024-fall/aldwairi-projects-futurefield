import React, { useState, useEffect } from 'react';
import './homepage.css'; 

function Homepage() {
  const [dates, setDates] = useState([]);
  const [currentStartDate, setCurrentStartDate] = useState(new Date());

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
            {dates.map((dateObj) => (
              <div key={dateObj.id} className={`date ${dateObj.isToday ? 'today' : ''}`}>
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
          <div className="event-box">Event 1: 6:35 PM ET</div>
          <div className="event-box">Event 2</div>
          <div className="event-box">Event 3</div>
        </div>
      </main>
    </div>
  );
}

export default Homepage;