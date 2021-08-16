# Dependencies
# Flask
from flask import Flask, render_template
from flask_cors import CORS
from flask_pymongo import PyMongo
import pymongo
# Endpoints
import json
from bson import json_util
from bson.json_util import dumps

# App
app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True

# Local
client = pymongo.MongoClient('mongodb+srv://dbUser:dbUserPassword@cluster0.cscep.mongodb.net/test')
app.config['MONGO_URI'] = 'mongodb+srv://dbUser:dbUserPassword@cluster0.cscep.mongodb.net/test'
# Heroku
# import os
# client = pymongo.MongoClient(os.environ['MONGO_URI'])
# app.config['MONGO_URI'] = os.environ['MONGO_URI']

# Connection to MongoDB Atlas -- Local App
mongo = PyMongo(app)
db = mongo.db['BookClub']
books = db['books']

# Routes
# Home Route
@app.route('/')
def index():
    return render_template('home.html')
@app.route('/books/')
def futureBooks():
    return render_template('books.html')

# Data Routes
@app.route('/books/data/')
def data():
    bookslist = list(books.find())
    return json.dumps(books, default=json_util.default)
# Debug
if __name__ == '__main__':
    app.run(debug=True)