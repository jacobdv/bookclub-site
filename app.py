# Dependencies
# Flask
from flask import Flask, render_template
from flask_cors import CORS
from flask_pymongo import PyMongo
import pymongo
# Endpoints
from bson import json_util
from bson.json_util import dumps
# Access
import os

# App
app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True

# Connection to MongoDB Atlas -- Heroku App
app.config['MONGO_URI'] = os.environ['MONGO_URI']
client = pymongo.MongoClient(os.environ['MONGO_URI'])
connection = client['BookCLub']

# Routes
# Home Route
@app.route('/')
def index():
    return render_template('index.html')

# Debug
if __name__ == '__main__':
    app.run(debug=True)