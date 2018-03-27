//Author - Aaditya Arigela
//Model file to interact with review_records table in the database using Sequelize

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Declaring a variable of Sequelize
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://b7f2b0155047a9:7b23ad76@us-cdbr-iron-east-04.cleardb.net/heroku_636e68d7f13c57e',{
  define:
  {
    timestamps: false // true by default
  }
});

//To define metadata fields for review_records table
var reviewrecords = sequelize.define('reviews', {
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


//Fetches a list of all reviews posted by a particular buyer from database
//Pre-conditions   --> Takes input request from the getAllReviews function of Buyer Dashboard Controller
//Post-conditions  --> Fetches all reviews for a particular buyer from the database and returns the response to success function of ReviewRating.html page
exports.findAllReviewRecords = (req, res) =>
{
    reviewrecords.findAll
    ({
      where:
      {
          buyerEmail : req.session.emailID
        }
    })
    .then(function(result)
    {
      var x  = result;
      res.json(x);
    });
};


//Fetches a list of all top Rated products from database
//Pre-conditions   --> Takes input request from the getTopRated function of Buyer Dashboard Controller
//Post-conditions  --> Fetches all top rated products from the database and returns the response to success function of NewsLetter.html page
exports.findTopRated = (req, res) =>
{
  reviewrecords.findAll
  ({
      where:
      {
          $or: [{productRating :'5'}, {productRating :'4'}]
      }
  })
  .then(function(result)
  {
      var x  =result;
      res.json(x);
  });
};
