import pandas as pd
import requests

def get_player_stats_by_name(name, season, stat_type='hitting'):
    # Search for the player by name
    lookup_url = f"https://statsapi.mlb.com/api/v1/people/search?names={name}"
    response = requests.get(lookup_url)
    
    if response.status_code != 200:
        return f"Error retrieving player data: {response.status_code}"
    
    players = response.json().get('people', [])
    if not players:
        return f"No player found with the name {name}"
    
    player_id = players[0]['id']
    player_name = players[0]['fullName']
    
    # Retrieve the player's season stats
    stats_url = f"https://statsapi.mlb.com/api/v1/people/{player_id}/stats?stats=season&season={season}&group={stat_type}"
    stats_response = requests.get(stats_url)
    
    if stats_response.status_code != 200:
        return f"Error retrieving stats for {player_name}: {stats_response.status_code}"
    
    stats_data = stats_response.json().get('stats', [])
    if stats_data and 'splits' in stats_data[0]:
        # Get the splits data which holds a season's stats
        season_stats = stats_data[0]['splits']
        return { "name": player_name, "season": season, "stat_type": stat_type, "stats": season_stats }
   
print(get_player_stats_by_name("Bryce Harper", "2024", "fielding"))