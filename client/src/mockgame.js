const mockGames = [
    {
      game_id: "mock1",
      game_times: "6:45 PM 10/30/2024",
      away_team: "Mock Team A",
      home_team: "Mock Team B",
      away_score: 2,
      home_score: 3,        
      venue: "Mock Stadium",
      status: "Halfway",
      box_stats: {
        weather: "rain"
      },
      prediction: {
        winning_team: "Mock Team B",
        confidence: 85,
      }
    },
    {
      game_id: "mock2",
      game_times: "6:45 PM 10/30/2024",
      away_team: "Mock Team A",
      home_team: "Mock Team B",
      away_score: 4,
      home_score: 4,
      venue: "Mock Stadium",
      status: "Complete",
      box_stats: {
        weather: "rain"
      },
      prediction: {
        winning_team: "Mock Team C",
        confidence: 72,
      }
    }
  ];

  export default mockGames;