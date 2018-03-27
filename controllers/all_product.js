//Author Aaditya Arigela--- Controller for Fetching every requested Books Data or Class Notes by the user

var express = require('express');
var app = express();

// Declaring instances of models

var book = require('../models/Book.js');

// To fetch books information requested from the user
//Pre-conditions   --> Need to be on Home Page
//Post-conditions  --> Gives the requested books information after applying user specified categories and filters

exports.booksData = (req, res) => {
    book.books_data(req, res);
}

// To fetch books information for PRODUCT.html
//Pre-conditions   --> Need to be on the product page
//Post-conditions  --> Gives the requested book information to product page

exports.bookInfo = (req,res) => {
    book.bookInfo (req,res);
}