const mockGames = [
  {
    game_id: "mock1",
    game_time: "7:00 PM",
    date: "2024-12-05",
    venue: "Mock Stadium",
    status: "Halfway",
    away_team: "Mock Team A",
    home_team: "Mock Team B",
    away_score: 3,
    home_score: 4,
    weather: "Cloudy",
    wind: "5 mph NE",
    first_pitch: "7:10 PM",
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
    game_time: "8:00 PM",
    date: "2024-12-05",
    venue: "Mock Field",
    status: "Complete",
    away_team: "Mock Team C",
    home_team: "Mock Team D",
    away_score: 2,
    home_score: 6,
    weather: "Clear",
    wind: "10 mph W",
    first_pitch: "8:05 PM",
    away_boxscore: {
      batters: [
        { name: "Player 5", AB: 4, R: 1, H: 2, RBI: 1, BB: 0, K: 1, LOB: 2 },
        { name: "Player 6", AB: 3, R: 0, H: 1, RBI: 0, BB: 1, K: 2, LOB: 1 },
      ],
      pitchers: [
        { name: "Pitcher 3", IP: 6, H: 8, R: 5, ER: 5, BB: 2, K: 3, HR: 2, ERA: "5.50" },
      ],
    },
    home_boxscore: {
      batters: [
        { name: "Player 7", AB: 4, R: 3, H: 3, RBI: 2, BB: 1, K: 0, LOB: 0 },
        { name: "Player 8", AB: 3, R: 2, H: 2, RBI: 2, BB: 2, K: 1, LOB: 1 },
      ],
      pitchers: [
        { name: "Pitcher 4", IP: 7, H: 5, R: 2, ER: 2, BB: 3, K: 6, HR: 0, ERA: "2.90" },
      ],
    },
  },
];

export default mockGames;
