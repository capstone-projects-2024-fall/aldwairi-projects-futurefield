import socket
import time
from flask import Flask, render_template
import os

app = Flask(__name__)


@app.route('/')
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/api/time', methods=['GET'])
def get_current_time():
    return {'time': time.time()}

if __name__ == '__main__':
    #app.run(debug=True, host='0.0.0.0', port=int(5000))
    app.run(debug=True)