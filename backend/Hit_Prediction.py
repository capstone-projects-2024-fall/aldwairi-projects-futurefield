import pandas as pd
import joblib
from pybaseball import playerid_lookup, statcast

# Load the hit analysis model
hit_analysis_model = joblib.load('backend\models\hit_analysis_model2.joblib')

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
        raise ValueError(f"Error fetching game data: {e}")

def get_hit_prediction(batter_name: str, pitcher_name: str, zone: int, balls: int, strikes: int, outs: int, on_base: dict):
    """
    Predict the hit event based on the game state.

    Args:
        game_data (pd.DataFrame): Pitch-by-pitch data for the game.
        batter_name (str): Full name of the batter.
        pitcher_name (str): Full name of the pitcher.
        zone (int): Pitch zone.
        balls (int): Number of balls in the count.
        strikes (int): Number of strikes in the count.
        outs (int): Number of outs.
        on_base (dict): Dictionary indicating runners on base {'1b': int, '2b': int, '3b': int}.

    Returns:
        dict: A dictionary containing the prediction and model input.
    """
    try:
        # Fetch player IDs for batter and pitcher
        batter_id = batter_name
        pitcher_id = pitcher_name

        # Prepare model input features
        model_input = {
            'batter': batter_id,
            'pitcher': pitcher_id,
            'zone': zone,
            'balls': balls,
            'on_3b': on_base.get('3b', 0),  # Defaults to 0 if not specified
            'on_2b': on_base.get('2b', 0),  # Defaults to 0 if not specified
            'on_1b': on_base.get('1b', 0),  # Defaults to 0 if not specified
        }

        # Ensure all features are in the correct order
        model_input_ordered = [
            model_input['batter'],
            model_input['pitcher'],
            model_input['zone'],
            model_input['balls'],
            model_input['on_3b'],
            model_input['on_2b'],
            model_input['on_1b'],
        ]

        # Create a DataFrame for model input
        input_df = pd.DataFrame([model_input_ordered], columns=[
            'batter', 'pitcher', 'zone', 'balls', 'on_3b', 'on_2b', 'on_1b'
        ])

        # Make prediction
        prediction = hit_analysis_model.predict(input_df)

        # Define possible outcomes
        conversion = ['hit_into_out', 'other', 'strikeout', 'hit', 'walk']

        # Map the prediction integer to the corresponding outcome
        predicted_outcome = conversion[int(prediction[0])]  # prediction is an integer

        return {
            "prediction": predicted_outcome,  # Now returning the readable outcome
        }
    except Exception as e:
        return {"error": str(e)}

# Example usage
start_date = "2023-03-30"
end_date = "2023-03-30"

try:
    game_data = fetch_game_data(start_date=start_date, end_date=end_date)

    result = get_hit_prediction(
        batter_name=677008,
        pitcher_name=687798,
        zone=5,
        balls=2,
        strikes=1,
        outs=1,
        on_base={'1b': 1, '2b': 0, '3b': 1}  # Using 1 and 0 for on base states
    )

    print("Prediction Result:", result)
except Exception as e:
    print(f"Error: {e}")