import pandas as pd
import numpy as np
import joblib
from pybaseball import statcast

# Load the pitch prediction model
pitch_model = joblib.load('models/pitchType_API_RandomForrest.joblib')

def fetch_game_data(start_date: str, end_date: str) -> pd.DataFrame:
    """
    Fetch pitch-by-pitch data for a given date range.

    Args:
        start_date (str): Start date in 'YYYY-MM-DD' format.
        end_date (str): End date in 'YYYY-MM-DD' format.

    Returns:
        pd.DataFrame: Pitch-by-pitch data for the given date range.
    """
    try:
        return statcast(start_dt=start_date, end_dt=end_date)
    except Exception as e:
        print(f"Error fetching game data: {e}")
        return pd.DataFrame()


pitch_model = joblib.load('models/pitchType_API_RandomForrest.joblib')

def get_pitch_prediction(game_data: pd.DataFrame, inning: int, outs: int, strikes: int, balls: int):
    """
    Predict the next pitch based on the current game state.

    Args:
        game_data (pd.DataFrame): Pitch-by-pitch data for the game.
        inning (int): Current inning.
        outs (int): Number of outs in the current inning.
        strikes (int): Number of strikes in the current count.
        balls (int): Number of balls in the current count.

    Returns:
        dict: A dictionary containing the prediction and model input data.
    """
    try:
        # Filter game data for the current inning
        current_inning_data = game_data[game_data['inning'] == inning]
        
        if current_inning_data.empty:
            return {"error": "No data found for the specified inning."}

        pitcher_hand = current_inning_data['p_throws'].iloc[0]  # Assuming p_throws column exists
        p_throws = 1 if pitcher_hand == 'R' else 0


        model_input = {
            "inning": inning,
            "p_throws": p_throws,
            "strikes": strikes,
            "balls": balls,
            "outs_when_up": outs,
        }

        # Format input as a 2D list for the model
        model_input_list = [[
            model_input['inning'],
            model_input['p_throws'],
            model_input['strikes'],
            model_input['balls'],
            model_input['outs_when_up']
        ]]

        # Make a prediction using the machine learning model
        prediction = pitch_model.predict(model_input_list)[0]

        # Map prediction to pitch type
        types = ['Breaking Ball', 'Fastball']
        pitch_type = types[prediction]

        # Return the pitch type
        return pitch_type

    except Exception as e:
        return {"error": str(e)}
    

# Define the date of the game
start_date = "2023-03-30"  # Game date in YYYY-MM-DD format
end_date = "2023-03-30"    # Same date for a single game

game_data = fetch_game_data(start_date=start_date, end_date=end_date)


# Assuming game_data is a DataFrame from pybaseball.statcast()
inning = 2
outs = 1
strikes = 1
balls = 2

# Call the function
result = get_pitch_prediction(game_data, inning, outs, strikes, balls)

# Print the predicted pitch type directly
print("Predicted Pitch Type:", result)