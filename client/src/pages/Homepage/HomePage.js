import React from 'react';
import './homepage.css'; 

function Homepage() {
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
        <div class="calendar-navigation">
          <span class="nav-arrow">&#8249;</span>
          <div class="dates">
            <div class="date">
              <span class="day">SUN</span>
              <span class="date-number">SEP 29</span>
            </div>
            <div class="date">
              <span class="day">MON</span>
              <span class="date-number">SEP 30</span>
            </div>
            <div class="date">
              <span class="day">TUE</span>
              <span class="date-number">OCT 1</span>
            </div>
            <div class="date today">
              <span class="day">TODAY</span>
              <span class="date-number">OCT 2</span>
            </div>
            <div class="date">
              <span class="day">THU</span>
              <span class="date-number">OCT 3</span>
            </div>
            <div class="date">
              <span class="day">FRI</span>
              <span class="date-number">OCT 4</span>
            </div>
            <div class="date">
              <span class="day">SAT</span>
              <span class="date-number">OCT 5</span>
            </div>
          </div>
          <span class="nav-arrow">&#8250;</span> 
          <span class="calendar-icon">&#128197;</span> 
        </div>
      </header>


      <main className="content">
          <div className="calendar-grid">
            <div className="event-box">
              <p>6:35 PM ET</p>
            </div>
            <div className="event-box">
              <p>Event 2</p>
            </div>
            <div className="event-box">
              <p>Event 3</p>
            </div>
          </div>
      </main>
    </div>
  );
}

export default Homepage;
