from flask import Flask, request, jsonify
import statsapi
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # enable CORS for all routes

@app.route('/')
def hello_world():
    return "<p>Hello, World!</p>"

# Gets the current time of day and displays it
@app.route('/api/time', methods=['GET'])
def get_current_time():
    return {'time': time.time()}

# Gets the current day of the year
@app.route('/api/date', methods=['POST'])
def getGamesForDate():
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
    
# Gets selected game details
@app.route('/api/game-details', methods=['POST'])
def get_game_details():
    data = request.get_json()
    game_id = data.get('game_id')

    if not game_id:
        return jsonify({'error': 'Game ID is required'}), 400

    try:
        # Use statsapi.schedule with the game_id to get game details
        game_details = statsapi.schedule(game_id=game_id)
        
        if game_details:
            game = game_details[0]  # Since schedule returns a list
            return jsonify({
                'game_datetime': game.get('game_datetime'),
                'game_date': game.get('game_date'),
                'away_team': game.get('away_name'),
                'home_team': game.get('home_name'),
                'away_score': game.get('away_score'),
                'home_score': game.get('home_score'),
                'venue': game.get('venue_name'),
                'status': game.get('status'),
            })
        else:
            return jsonify({'error': 'Game not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# How flask runs
if __name__ == '__main__':
    app.run(debug=True)
