import pickle
import joblib
import pandas as pd
from MLB_Statistics import getTeamStats
import models
import numpy as np
import lightgbm as lgbm
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import duckdb
import ml_insights as mli
import warnings
warnings.filterwarnings("ignore")
import matplotlib.pyplot as plt


winModel_pkl = joblib.load('backend\models\win_analysis.pkl')

# Function to create a DataFrame and get predictions
def get_win_prediction(home_team, visiting_team, season):
    # Retrieve team stats
    home_stats = getTeamStats(home_team, season)
    visiting_stats = getTeamStats(visiting_team, season)

    # Ensure stats are valid
    if home_stats['OBP'] != 'N/A' and visiting_stats['OBP'] != 'N/A' and \
       home_stats['SLG'] != 'N/A' and visiting_stats['SLG'] != 'N/A':

        # Create input data for the model
        input_data = pd.DataFrame([[
            home_stats['OBP'],
            visiting_stats['OBP'],
            home_stats['SLG'],
            visiting_stats['SLG']
        ]], columns=['OBP_162_h', 'OBP_162_v', 'SLG_162_h', 'SLG_162_v'])

        # Make predictions
        prediction_pkl = winModel_pkl.predict_proba(input_data)[:, 1]  # Probability of home team winning

        return {
            "pkl_model_prediction": prediction_pkl[0]
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
    print(f"Probability of {home_team} winning (joblib model): {prediction['joblib_model_prediction']:.2%}")
else:
    print(prediction)