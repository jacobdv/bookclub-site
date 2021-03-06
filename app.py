# Dependencies
# Flask
from flask import Flask, render_template
from flask_cors import CORS
from flask_pymongo import PyMongo
import pymongo
# Endpoints
import json
from bson import json_util
from bson.json_util import default, dumps

# App
app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True

# Local
# client = pymongo.MongoClient('mongodb+srv://dbUser:dbUserPassword@cluster0.cscep.mongodb.net/test')
# app.config['MONGO_URI'] = 'mongodb+srv://dbUser:dbUserPassword@cluster0.cscep.mongodb.net/test'
# Heroku
import os
client = pymongo.MongoClient(os.environ['MONGO_URI'])
app.config['MONGO_URI'] = os.environ['MONGO_URI']

# Connection to MongoDB Atlas -- Local App
mongo = PyMongo(app)
db = client['BookClub']
books = db['books']
bookReviews = db['reviews']
futures = db['futureList']

# Routes
# Home Route
@app.route('/')
def index():
    return render_template('home.html')
@app.route('/books/')
def booksList():
    return render_template('books.html')
@app.route('/reviews/')
def reviews():
    return render_template('reviews.html')

# Data Routes
@app.route('/books/data/')
def data():
    bookslist = list(books.find())
    return json.dumps(bookslist, default=json_util.default)

@app.route('/reviews/<title>/<person>/')
def reviewsData(title, person):
    title = title.replace('%20',' ')
    print(title, person)
    if title != 'All':
        if person != 'All':
            query = {'title': title, 'name': person}
        else:
            query = {'title': title}
    else:
        if person != 'All':
            query = {'name': person}
        else:
            query = {}
    reviewslist = list(bookReviews.find(query))
    return json.dumps(reviewslist, default=json_util.default)

@app.route('/reviews/<name>/<title>/<review>/<rating>/')
def addReview(name, title, review, rating):
    title = title.replace('%20',' ')
    name = name.replace('%20',' ')
    review = review.replace('%20',' ')
    bookReviews.insert_one({'name':name, 'title':title, 'content':review, 'rating':rating})
    response = 'Success'
    return response

@app.route('/future/<goal>/<title>/<author>/')
def futureBooks(goal, title, author):
    title = title.replace('%20',' ')
    author = author.replace('%20',' ')
    if goal == 'add':
        query = list(futures.find({'author': author, 'title': title}))
        print(query)
        if not query:
            futures.insert_one({'author': author, 'title': title})
    elif goal == 'remove':
        futures.delete_one({'author': author, 'title': title})
    futureslist = list(futures.find())
    return json.dumps(futureslist, default=json_util.default)

# Debug
if __name__ == '__main__':
    app.run(debug=True)