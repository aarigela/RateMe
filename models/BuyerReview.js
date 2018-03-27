//Author : Aaditya Arigela
//Model file to interact with review_records table in the database using Sequelize
var express = require('express');
var app = express();
var path = require('path');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://b7f2b0155047a9:7b23ad76@us-cdbr-iron-east-04.cleardb.net/heroku_636e68d7f13c57e',{  
  define:
  {
    timestamps: false // true by default
  }
});

var Book  = require('../models/Book.js');

//To define metadata fields for review_records table
var reviewRecords = sequelize.define('reviews', {
   reviewID: {
      type: Sequelize.INTEGER,
      field: 'reviewID',
      primaryKey: true,
      autoIncrement: true
    },
  buyerEmail: {
      type: Sequelize.STRING,
      field: 'buyerEmail'
    },
    productReview:{
      type: Sequelize.STRING,
      field: 'productReview'
    },
     productRating:{
        type: Sequelize.INTEGER,
        field: 'productRating'
      },
      productName:{
         type: Sequelize.STRING,
         field: 'productName'
       },
       isbn:{
          type: Sequelize.STRING,
          field: 'isbn'
        }
});


// this method inserts review into database
exports.insertNewReview = (req, res) => {
  req.session.isbn = req.body.bookIsbn;
  
  sequelize.sync().then(function() {
    return reviewRecords.create({
      buyerEmail: req.session.emailID,
      productReview: req.body.productReview,
      productRating: req.body.productRating,
      isbn:req.body.bookIsbn,
      productName:req.body.bookName

    });
  }).then(function () {
    res.sendStatus(200);
  });


};

// this method displays reviews on product page
exports.findReview = (req, res) => {
reviewRecords.findAll({
  where: {
  isbn : req.body.bookIsbn
  }
}).then(function(result) {
  var x  = result;
  console.log('hi');
  console.log(x);
  res.json(x);
});
};
