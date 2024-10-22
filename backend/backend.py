import socket
import time
from flask import Flask, render_template, request
import os
import statsapi

app = Flask(__name__)


@app.route('/')
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/api/time', methods=['GET'])
def get_current_time():
    return {'time': time.time()}

@app.route('/api/date', methods=['POST'])
def getGamesForDate():
    #date must be in format: '07/31/2018'
    date = request.json.get("date")
    print(date)
    #sched = statsapi.schedule(start_date=date, sportId=1)

    #print(sched)
    return {'date': date}

if __name__ == '__main__':
    #app.run(debug=True, host='0.0.0.0', port=int(5000))
    app.run(debug=True)

