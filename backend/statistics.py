import pandas as pd
import requests


def getPlayerStats(name, season, stat_type):
    # Search for the player by name
    lookup_url = f"https://statsapi.mlb.com/api/v1/people/search?names={name}"
    response = requests.get(lookup_url)
    
    # In case no player is found
    if response.status_code != 200:
        return f"Error retrieving player data: {response.status_code}"

    # Get the JSON data
    players = response.json().get('people', [])
    if not players:
        return f"No player found with the name {name}"
    
    player_id = players[0]['id']
    player_name = players[0]['fullName']
    
    # Retrieve the player's season stats
    stats_url = f"https://statsapi.mlb.com/api/v1/people/{player_id}/stats?stats=season&season={season}&group={stat_type}"
    stats_response = requests.get(stats_url)
    
    # In case stats aren't found
    if stats_response.status_code != 200:
        return f"Error retrieving stats for {player_name}: {stats_response.status_code}"
    
    stats_data = stats_response.json().get('stats', [])
    if stats_data and 'splits' in stats_data[0]:
        # Get the splits data which holds a season's stats
        season_stats = stats_data[0]['splits']
        return { "name": player_name, "season": season, "stat_type": stat_type, "stats": season_stats }


def getTeam_OBP(team_name, season):
    # Get team ID by searching for the team by name
    lookup_url = "https://statsapi.mlb.com/api/v1/teams?sportId=1"
    response = requests.get(lookup_url)
    
    if response.status_code != 200:
        return f"Error retrieving team data: {response.status_code}"
    
    teams = response.json().get('teams', [])
    team_id = None
    
    for team in teams:
        if team_name.lower() in team['name'].lower():
            team_id = team['id']
            break
    
    # In case no team is found
    if not team_id:
        return f"No team found with the name {team_name}"
    
    # Retrieve the team's stats for the specified season
    stats_url = f"https://statsapi.mlb.com/api/v1/teams/{team_id}/stats?stats=season&season={season}&group=hitting"
    stats_response = requests.get(stats_url)
    
    if stats_response.status_code != 200:
        return f"Error retrieving stats for {team_name}: {stats_response.status_code}"
    
    stats_data = stats_response.json().get('stats', [])
    
    if stats_data and 'splits' in stats_data[0]:
        # Get the splits data and find the OBP
        team_stats = stats_data[0]['splits'][0]['stat']
        obp = team_stats.get('obp', 'N/A')
        
        return { "team": team_name, "season": season, "OBP": obp }
    else:
        return f"No OBP stats available for {team_name} in {season}."


def getTeam_SLG(team_name, season):
    # Get team ID by searching for the team by name
    lookup_url = "https://statsapi.mlb.com/api/v1/teams?sportId=1"
    response = requests.get(lookup_url)
    
    # In case no player is found
    if response.status_code != 200:
        return f"Error retrieving team data: {response.status_code}"
    
    # Get the JSON data
    teams = response.json().get('teams', [])
    team_id = None
    
    for team in teams:
        if team_name.lower() in team['name'].lower():
            team_id = team['id']
            break
    
    if not team_id:
        return f"No team found with the name {team_name}"
    
    # Retrieve the team's stats for the specified season
    stats_url = f"https://statsapi.mlb.com/api/v1/teams/{team_id}/stats?stats=season&season={season}&group=hitting"
    stats_response = requests.get(stats_url)
    
    # In case stats aren't found
    if stats_response.status_code != 200:
        return f"Error retrieving stats for {team_name}: {stats_response.status_code}"
    
    stats_data = stats_response.json().get('stats', [])
    
    if stats_data and 'splits' in stats_data[0]:
        # Get the splits data and find the SLG
        team_stats = stats_data[0]['splits'][0]['stat']
        slg = team_stats.get('slg', 'N/A')
        
        return { "team": team_name, "season": season, "SLG": slg }
    else:
        return f"No SLG stats available for {team_name} in {season}."


# Tests
print('\n')
print(getPlayerStats("Bryce Harper", "2024", "fielding"))
print('\n')
print(getTeam_OBP("Los Angeles Angels", "2023"))
print('\n')
print(getTeam_SLG("Los Angeles Angels", "2023"))
print('\n')