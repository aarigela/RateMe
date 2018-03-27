//Author Aaditya Arigela--- Controller for Seller Dashboard Activities
var express = require('express');
var app = express();
var path = require('path');


// Declaring instances of models
var seller  = require('../models/Seller.js');
var book  = require('../models/Book.js');


// To Route user to SellerProfile.html Page
//Pre-conditions   --> Takes input request from the sellerProfile function of app1.js
//Post-conditions  --> Routes the user to SellerProfile.html Page
exports.sellerProfile = (req, res) =>
{
  res.sendFile(path.join(__dirname + '/../views'+'/SellerProfile.html'));
};


// To Route user to ManageBooks.html Page
//Pre-conditions   --> Takes input request from the manageBooks function of app1.js
//Post-conditions  --> Routes the user to ManageBooks.html Page
exports.manageBooks = (req, res) =>
{
  res.sendFile(path.join(__dirname + '/../views'+'/ManageBooks.html'));
};


// To Route user to InventoryAddBooks.html Page
//Pre-conditions   --> Takes input request from the addBook function of app1.js
//Post-conditions  --> Routes the user to InventoryAddBooks.html Page
exports.addBook = (req, res) =>
{
  res.sendFile(path.join(__dirname + '/../views'+'/InventoryAddBooks.html'));
};

// To Route user to EditBook.html Page
//Pre-conditions   --> Takes input request from the editBook function of app1.js
//Post-conditions  --> Routes the user to EditBook.html Page
exports.editBook = (req, res) =>
{
  res.sendFile(path.join(__dirname + '/../views'+'/EditBook.html'));
};

// To Route user to BooksReport.html Page
//Pre-conditions   --> Takes input request from the booksReport function of app1.js
//Post-conditions  --> Routes the user to BooksReport.html Page
exports.booksReport = (req, res) =>
{
  res.sendFile(path.join(__dirname + '/../views'+'/BooksReport.html'));
};

// To Route user to findSellerRecord function in the Seller model file
//Pre-conditions   --> Takes input request from the getsellerProfile function of app1.js
//Post-conditions  --> Routes the user to findSellerRecord of Seller model file
exports.getsellerProfile = (req, res) =>
{
  seller.findSellerRecord(req, res);
}


// To Route user to updateSellerRecords function in the Seller model file
//Pre-conditions   --> Takes input request from the updateSeller function of app1.js
//Post-conditions  --> Routes the user to updateSellerRecords of Seller model file
exports.updateSeller = (req, res) =>
{
  seller.updateSellerRecords(req, res);
}


// To Route user to getnewProducts function in the Book model file
//Pre-conditions   --> Takes input request from the getnewProducts function of app1.js
//Post-conditions  --> Routes the user to getnewProducts of Book model file
exports.getnewProducts = (req, res) =>
{
  book.findNewProducts(req, res);
}


// To Route user to findNewOffers function in the Book model file
//Pre-conditions   --> Takes input request from the getNewOffers function of app1.js
//Post-conditions  --> Routes the user to findNewOffers of Book model file
exports.getNewOffers = (req, res) =>
{
  book.findNewOffers(req, res);
}
