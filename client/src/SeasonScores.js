import React, { useState, useEffect } from 'react';
import './seasonscores.css'; 

function SeasonScores() {
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
          </div>
      
    );
}

export default SeasonScores;