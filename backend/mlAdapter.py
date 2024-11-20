import joblib
import pandas as pd
from MLB_Statistics import getTeamStats
import warnings
warnings.filterwarnings("ignore")

# Load the win analysis model
winModel_pkl = joblib.load('backend\models\win_analysis.pkl')

# Function to create a DataFrame and get predictions
def get_win_prediction(home_team, visiting_team, season):
    
    # Retrieve team stats
    home_stats = getTeamStats(home_team, season)
    visiting_stats = getTeamStats(visiting_team, season)

    # Ensure stats are valid and convert to numeric
    try:
        home_obp = pd.to_numeric(home_stats['OBP'], errors='coerce')  # Convert to float, NaN for invalid
        visiting_obp = pd.to_numeric(visiting_stats['OBP'], errors='coerce')
        home_slg = pd.to_numeric(home_stats['SLG'], errors='coerce')
        visiting_slg = pd.to_numeric(visiting_stats['SLG'], errors='coerce')

        # Handle NaN values (you can use mean imputation or other methods)
        if pd.isna(home_obp) or pd.isna(visiting_obp) or pd.isna(home_slg) or pd.isna(visiting_slg):
            return "One or more statistics are invalid (NaN). Prediction could not be made."

        # Create input data for the model
        input_data = pd.DataFrame([[
            home_obp,
            visiting_obp,
            home_slg,
            visiting_slg
        ]], columns=['OBP_162_h', 'OBP_162_v', 'SLG_162_h', 'SLG_162_v'])

        # Make predictions
        prediction_pkl = winModel_pkl.predict_proba(input_data)[:, 1]  # Probability of home team winning

        return {
            "pkl_model_prediction": prediction_pkl[0],
        }

    except Exception as e:
        return f"Error during prediction: {e}"

# Example usage
home_team = "Los Angeles Angels"
visiting_team = "New York Yankees"
season = "2023"

prediction = get_win_prediction(home_team, visiting_team, season)
if isinstance(prediction, dict):
    print(f"Probability of {home_team} winning (pkl model): {prediction['pkl_model_prediction']:.2%}")
    print(prediction)