from pybaseball import schedule_and_record, statcast

# Step 1: Get the game schedule for a specific team and season
team = "LAD"  # Los Angeles Dodgers
season = 2023
schedule = schedule_and_record(season, team)

# Ensure the game date matches the format in the DataFrame
game_date = "Thursday, Mar 30"  # Match the exact date format in 'Date'
game = schedule[schedule['Date'] == game_date]

# Verify that a game exists for the given date
if game.empty:
    print(f"No game found on {game_date}. Please check the date format.")
else:
    print(game)

    # Step 2: Get pitch-by-pitch data for the specified date
    start_date = "2023-03-30"  # Statcast requires 'YYYY-MM-DD' format
    end_date = "2023-03-30"
    pitch_data = statcast(start_dt=start_date, end_dt=end_date)

    # (Optional) Filter further based on the opponent, etc.
    print(pitch_data.head())
