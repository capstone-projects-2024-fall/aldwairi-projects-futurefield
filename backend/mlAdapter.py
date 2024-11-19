import pickle
import joblib
from joblib import load

# reads win_analysis.pkl in binary
with open('win_analysis.pkl', 'rb') as file:
    # De-serialize the file
    winModel_pkl = pickle.load(file)

# 
model_joblib = load('model.joblib')
