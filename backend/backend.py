from flask import Flask, request, jsonify
import statsapi
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # enable CORS for all routes

@app.route('/')
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/api/time', methods=['GET'])
def get_current_time():
    return {'time': time.time()}

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
                    'game_id': game['game_id']
                })

            # return the schedule in the response
            return jsonify({'games': games}), 200
        else:
            return jsonify({'message': 'No games found for this date'}), 404

    except Exception as e:
        print(f"Error fetching schedule: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

