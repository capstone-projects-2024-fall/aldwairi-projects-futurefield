const mockGames = [
  {
    game_id: "mock1",
    game_time: "7:00 PM",
    date: "2024-10-05",
    venue: "Mock Stadium",
    status: "Halfway",
    away_team: "Philadelphia_Phillies",
    home_team: "New_York_Mets",
    away_score: 1,
    home_score: 2,
    weather: "Cloudy",
    wind: "5 mph NE",
    first_pitch: "7:10 PM",
    game_state: {
      inning: 4,
      p_throws: 0,
      strikes: 2,
      balls: 1,
      outs_when_up: 2,
      batter: "Bryce Harper",
      pitcher: "José Alvarado",
      zone: 5,
      runners_on_base: {
        on_1b: 0,
        on_2b: 0,
        on_3b: 0,
      },
    },
    away_boxscore: {
      batters: [
        { name: "Player 1", AB: 3, R: 1, H: 1, RBI: 2, BB: 0, K: 1, LOB: 2 },
        { name: "Player 2", AB: 2, R: 0, H: 0, RBI: 0, BB: 1, K: 1, LOB: 1 },
      ],
      pitchers: [
        { name: "Pitcher 1", IP: 5, H: 6, R: 4, ER: 3, BB: 1, K: 4, HR: 1, ERA: "3.60" },
      ],
    },
    home_boxscore: {
      batters: [
        { name: "Player 3", AB: 3, R: 2, H: 2, RBI: 1, BB: 0, K: 0, LOB: 1 },
        { name: "Player 4", AB: 2, R: 1, H: 1, RBI: 3, BB: 1, K: 1, LOB: 0 },
      ],
      pitchers: [
        { name: "Pitcher 2", IP: 5, H: 4, R: 3, ER: 3, BB: 2, K: 5, HR: 1, ERA: "4.20" },
      ],
    },
  },
  {
    game_id: "mock2",
    game_time: "7:00 PM",
    date: "2024-12-05",
    venue: "Mock Stadium",
    status: "Complete",
    away_team: "Philadelphia_Phillies",
    home_team: "New_York_Mets",
    away_score: 2,
    home_score: 7,
    weather: "Cloudy",
    wind: "5 mph NE",
    first_pitch: "7:10 PM",
    game_state: {
      inning: 4,
      p_throws: 0,
      strikes: 2,
      balls: 1,
      outs_when_up: 2,
      batter: "Bryce Harper",
      pitcher: "José Alvarado",
      zone: 5,
      runners_on_base: {
        on_1b: 0,
        on_2b: 0,
        on_3b: 0,
      },
    },
    away_boxscore: {
      batters: [
        { name: "Player 1", AB: 3, R: 1, H: 1, RBI: 2, BB: 0, K: 1, LOB: 2 },
        { name: "Player 2", AB: 2, R: 0, H: 0, RBI: 0, BB: 1, K: 1, LOB: 1 },
      ],
      pitchers: [
        { name: "Pitcher 1", IP: 5, H: 6, R: 4, ER: 3, BB: 1, K: 4, HR: 1, ERA: "3.60" },
      ],
    },
    home_boxscore: {
      batters: [
        { name: "Player 3", AB: 3, R: 2, H: 2, RBI: 1, BB: 0, K: 0, LOB: 1 },
        { name: "Player 4", AB: 2, R: 1, H: 1, RBI: 3, BB: 1, K: 1, LOB: 0 },
      ],
      pitchers: [
        { name: "Pitcher 2", IP: 5, H: 4, R: 3, ER: 3, BB: 2, K: 5, HR: 1, ERA: "4.20" },
      ],
    },
  },
];

export default mockGames;
