import Homepage from './HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameDetails from './GameDetails'; // create this component for game details
import SeasonScores from './SeasonScores';
import MockGame from './mockgame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/game-details/:gameId" element={<GameDetails />} /> 
        <Route path="/seasonscores" element={<SeasonScores />} />
        <Route path="/mockgame/:mockGameId" element={<MockGame />} />
      </Routes>
    </Router>
  );
}

export default App;



