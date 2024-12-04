import requests
import pandas as pd

date = "2024-10-25"  # Date of the game
url = f"https://statsapi.mlb.com/api/v1/schedule?date={date}&sportId=1"

response = requests.get(url)
data = response.json()
for game in data['dates'][0]['games']:
    print(game['gamePk'], game['teams']['away']['team']['name'], "at", game['teams']['home']['team']['name'])



# Base URL for MLB StatsAPI
BASE_URL = "https://statsapi.mlb.com/api/v1/"

def get_game_feed(game_pk):
    """
    Fetches the live game feed for a given game_pk.
    """
    url = f"{BASE_URL}game/{game_pk}/playByPlay"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Failed to fetch game data: {response.status_code}")



def parse_pitches(game_feed):
    """
    Extracts pitch-by-pitch data from the game feed.
    """
    pitches_data = []
    plays = game_feed.get("allPlays", [])
    
    for play in plays:
        for pitch in play.get("pitchData", []):
            pitch_info = {
                "pitch_type": pitch.get("details", {}).get("type", {}).get("description", "Unknown"),
                "pitch_speed": pitch.get("pitchData", {}).get("startSpeed"),
                "pitch_break_x": pitch.get("pitchData", {}).get("breakX"),
                "pitch_break_z": pitch.get("pitchData", {}).get("breakZ"),
                "pitch_zone": pitch.get("details", {}).get("zone"),
                # Add more fields as needed
            }
            pitches_data.append(pitch_info)
    
    return pd.DataFrame(pitches_data)

# Example usage
try:
    game_pk = 775300  # Replace with a valid game_pk
    game_feed = get_game_feed(game_pk)
    pitch_data_df = parse_pitches(game_feed)
    print(pitch_data_df.head())
except Exception as e:
    print("Error:", e)
