import pickle
import joblib
import pandas as pd
from MLB_Statistics import getTeamStats
import models

# Load the pkl model
with open('win_analysis.pkl', 'rb') as file:
    winModel_pkl = pickle.load(file)


# Function to create a DataFrame and get predictions from the pkl model
def get_win_prediction(home_team, visiting_team, season):
    # Retrieve team stats for both home and visiting teams
    home_stats = getTeamStats(home_team, season)
    visiting_stats = getTeamStats(visiting_team, season)

    # Ensure all required stats are valid before making a prediction
    if home_stats['OBP'] != 'N/A' and visiting_stats['OBP'] != 'N/A' and \
       home_stats['SLG'] != 'N/A' and visiting_stats['SLG'] != 'N/A':

        # Create input data for the model
        input_data = pd.DataFrame([[
            home_stats['OBP'],
            visiting_stats['OBP'],
            home_stats['SLG'],
            visiting_stats['SLG']
        ]], columns=['OBP_162_h', 'OBP_162_v', 'SLG_162_h', 'SLG_162_v'])

        # Make a prediction (probability of the home team winning)
        prediction_pkl = winModel_pkl.predict_proba(input_data)[:, 1]

        return {
            "pkl_model_prediction": prediction_pkl[0]  # Return the probability of the home team winning
        }
    else:
        return "One or more statistics were not available. Prediction could not be made."

# Example usage
home_team = "Los Angeles Angels"
visiting_team = "New York Yankees"
season = "2023"

prediction = get_win_prediction(home_team, visiting_team, season)
if isinstance(prediction, dict):
    print(f"Probability of {home_team} winning (pkl model): {prediction['pkl_model_prediction']:.2%}")
else:
    print(prediction)
