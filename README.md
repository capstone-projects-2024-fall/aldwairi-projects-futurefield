**Future Fields**
Future Fields is a comprehensive real-time predictive analytics platform for baseball, providing forecasts on game outcomes, pitch types, hit probabilities, playoff chances, and World Series winning probabilities. This project leverages machine learning models such as logistic regression, random forest, and XGBoost, with an interactive React frontend and a Flask-based backend.

**New Features Implemented**
1. Home Game Display Page UI:  
- A user-friendly interface that showcases live and upcoming game details, including scores, player stats, and key events. 

2. Season Team Analysis Page: 
- An interface tailored to displaying the entire historical data, categorized by team name. 

3. Game Details Page: 
- A comprehensive interface dedicated to a single game, providing an in-depth view of team and player performance during the game. 

4. Real-time Game Input, MLB API Call:  
- Integrates with the MLB API to provide up-to-the-minute game data, ensuring accurate and current information for predictions. 

5. Predictive Win Analysis:  
- Offers forecasts on game outcomes based on team performance metrics, historical data, and current game conditions. 

6. Predictive Pitch Analysis:  
- Analyzes pitcher statistics and current game context to predict their performance and impact on the game. 

7. Predictive Hit Analysis:  
- Evaluates hitters' current form and game conditions to forecast their likelihood of achieving successful hits. 

8. Predictive Team Season Analysis:  
- Projects team performance over the season, considering factors like Win Percentage, Run Differential, Pythagorean Win Percentage, OPS, Team Salary, and historical trends. 

9. Predictive World Series Analysis:  
- Provides forecasts on individual players' performance for the season, based on their past stats and current form. Provides forecasts on team performance and potential World Series outcomes for the upcoming season, leveraging historical trends, current roster strength, and recent performance indicators.

**Known Bugs**
- Frontend Responsiveness: In rare cases, the UI may not fully update in real-time due to delayed API responses.
- Live Data Latency: Sporadic latency issues may occur with external API data fetching during high-traffic periods.
- Browser Compatibility: Older browser versions may have display issues with certain features.

**Instructions to Build, Install, and Configure**
Requirements:
- Docker and Docker Compose
- Node.js (v16 or later) with npm
- Python (v3.8 or later) with pip
- Compatible operating system (Windows, macOS, Linux)

1. Clone the repo
2. To run frontend and backend both together with docker, use "docker-compose up"
docker run --rm -v /c/Users/devli/Documents/Capstone/aldwairi-projects-futurefield/backend/models:/usr/src/app/models train

How to run the frontend separately:
1. go to client : cd client
2. npm install, if doesn't work, use npm ci
3. npm start

**Support and Contributions**
If you encounter any issues or have suggestions, please open an issue or submit a pull request on the GitHub repository.
