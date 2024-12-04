from datetime import datetime
from flask import Flask, request, jsonify
import statsapi
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/api/time', methods=['GET'])
def get_current_time():
    return {'time': time.time()}

@app.route('/api/date', methods=['POST'])
def get_games_for_date():
    # retrieve the date from the frontend
    date = request.json.get("date")
    
    if not date:
        return jsonify({'error': 'Date is required'}), 400

    try:
        # fetch the schedule from the statsapi using the selected date
        sched = statsapi.schedule(start_date=date, end_date=date, sportId=1)

        if sched:
            games = []
            for game in sched:

                games.append({
                    'away_team': game['away_name'],
                    'away_score': game['away_score'],
                    'home_team': game['home_name'],
                    'home_score': game['home_score'],
                    'game_time': game['game_datetime'],
                    'venue': game['venue_name'],
                    'game_id': game['game_id'],
                    'winning_pitcher': game['winning_pitcher'],
                    'losing_pitcher': game['losing_pitcher'],
                    'save_pitcher': game['save_pitcher'],
                })

            # return the schedule in the response
            return jsonify({'games': games}), 200
        else:
            return jsonify({'message': 'No games found for this date'}), 404

    except Exception as e:
        print(f"Error fetching schedule: {e}")
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/game/<int:game_id>', methods=['POST'])
def get_game_data(game_id):
    stats_api_url = f"https://statsapi.mlb.com/api/v1.1/game/{game_id}/feed/live"
    response = requests.get(stats_api_url)
    
    if response.status_code == 200:
        game_data = response.json()
        
        date = game_data.get("gameData", {}).get("datetime", {}).get("originalDate", "Unknown")
        time = game_data.get("gameData", {}).get("datetime", {}).get("time", "Unknown")
        ampm = game_data.get("gameData", {}).get("datetime", {}).get("ampm", "Unknown")
        away_games_won = game_data.get("gameData", {}).get("teams", {}).get("away", {}).get("record", {}).get("leagueRecord", {}).get("wins", "Unknown")
        home_games_won = game_data.get("gameData", {}).get("teams", {}).get("home", {}).get("record", {}).get("leagueRecord", {}).get("wins", "Unknown")
        away_games_lost = game_data.get("gameData", {}).get("teams", {}).get("away", {}).get("record", {}).get("leagueRecord", {}).get("losses", "Unknown")
        home_games_lost = game_data.get("gameData", {}).get("teams", {}).get("home", {}).get("record", {}).get("leagueRecord", {}).get("losses", "Unknown")
        away_team = game_data.get("gameData", {}).get("teams", {}).get("away", {}).get("name", "Unknown")
        home_team = game_data.get("gameData", {}).get("teams", {}).get("home", {}).get("name", "Unknown")

        # safely navigate the 'liveData' structure to extract scores
        current_play = game_data.get("liveData", {}).get("plays", {}).get("currentPlay", {})
        away_score = current_play.get("result", {}).get("awayScore", 0)
        home_score = current_play.get("result", {}).get("homeScore", 0)

        # parse the boxscore data
        boxscore = game_data.get("liveData", {}).get("boxscore", {})

        def parse_team_boxscore(team_key):
            team_data = boxscore.get("teams", {}).get(team_key, {})
            batters = []
            pitchers = []

            for batter_id, batter_data in team_data.get("players", {}).items():
                stats = batter_data.get("stats", {}).get("batting", {})
                batters.append({
                    "name": batter_data["person"]["fullName"],
                    "AB": stats.get("atBats", 0),
                    "R": stats.get("runs", 0),
                    "H": stats.get("hits", 0),
                    "RBI": stats.get("rbi", 0),
                    "BB": stats.get("baseOnBalls", 0),
                    "K": stats.get("strikeOuts", 0),
                    "LOB": stats.get("leftOnBase", 0),
                })

            # Extract pitchers
            for pitcher_id, pitcher_data in team_data.get("players", {}).items():
                stats = pitcher_data.get("stats", {}).get("pitching", {})
                if stats:
                    pitchers.append({
                        "name": pitcher_data["person"]["fullName"],
                        "IP": stats.get("inningsPitched", "0.0"),
                        "H": stats.get("hits", 0),
                        "R": stats.get("runs", 0),
                        "ER": stats.get("earnedRuns", 0),
                        "BB": stats.get("baseOnBalls", 0),
                        "K": stats.get("strikeOuts", 0),
                        "HR": stats.get("homeRuns", 0),
                        "ERA": stats.get("era", "0.00"),
                    })

            return {"batters": batters, "pitchers": pitchers}

        away_team_boxscore = parse_team_boxscore("away")
        home_team_boxscore = parse_team_boxscore("home")

        info_data = game_data.get("liveData", {}).get("boxscore", {}).get("info", [])
        venue = "Unknown" 
        weather = "Unknown"
        wind = "Unknown"
        first_pitch = "Unknown"

        for item in info_data:
            if item.get("label") == "Venue":
                venue = item.get("value", "Unknown").strip(".")  
                break
        for item in info_data:
            if item.get("label") == "Weather":
                weather = item.get("value", "Unknown").strip(".")
                break
        for item in info_data:
            if item.get("label") == "Wind":
                wind = item.get("value", "Unknown").strip(".")
                break
        for item in info_data:
            if item.get("label") == "First pitch":
                first_pitch = item.get("value", "Unknown").strip(".")
                break

        formatted_data = {
            "date": date,
            "time": time,
            "ampm": ampm,
            "away_games_won": away_games_won,
            "home_games_won": home_games_won,
            "away_games_lost": away_games_lost,
            "home_games_lost": home_games_lost,
            "away_team": away_team,
            "home_team": home_team,
            "away_score": away_score,
            "home_score": home_score,
            "away_boxscore": away_team_boxscore,
            "home_boxscore": home_team_boxscore,
            "venue": venue,
            "weather": weather,
            "wind": wind,
            "first_pitch": first_pitch,
        }
        return jsonify(formatted_data)
    else:
        return jsonify({"error": "Game not found"}), 404
    
@app.route('/api/game-prediction', methods=['POST'])
def get_game_prediction():
    data = request.get_json()
    game_id = data.get('game_id')
    if not game_id:
        return jsonify({'error': 'Game ID is required'}), 400

    try:
        # simulated prediction data for demonstration purposes
        prediction_data = {
            'away_win_probability': 54,  
            'home_win_probability': 46, 
            'away_odds': '-115',  
            'home_odds': '+100',  
            'away_pitcher': 'Blake Snell',
            'home_pitcher': 'Albert Suárez',
            'away_pitcher_record': '3-3, 3.52 ERA',
            'home_pitcher_record': '8-5, 3.39 ERA',
            'weather_last_updated': 'Sep 17, 7:33AM',
            'weather_forecast': 'Clear skies, 72°F'
        }
        return jsonify(prediction_data), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

