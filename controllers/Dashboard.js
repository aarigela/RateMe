//Author Aaditya Arigela--- Controller for Buyer Dashboard Activities
var express = require('express');
var app = express();
var path = require('path');


// Declaring instances of models
var buyer  = require('../models/Buyer.js');
var buyerReviews  = require('../models/Reviews.js');


// To Route user to findTopRated function in the Reviews model file
//Pre-conditions   --> Takes input request from the getTopRated function of app1.js
//Post-conditions  --> Routes the user to findTopRated function in the Reviews model file
exports.getTopRated = (req, res) =>
{
  buyerReviews.findTopRated(req, res);
}

// To Route user to ReviewRating.html Page
//Pre-conditions   --> Takes input request from the reviewRating function of app1.js
//Post-conditions  --> Routes the user to ReviewRating.html Page
exports.reviewRating = (req, res) =>
{
  res.sendFile(path.join(__dirname + '/../views'+'/ReviewRating.html'));
};


// To Route user to PersonalInformation.html Page
//Pre-conditions   --> Takes input request from the personalInformation function of app1.js
//Post-conditions  --> Routes the user to PersonalInformation.html Page
exports.personalInformation = (req, res) =>
{
  console.log('In Dashboard-----------------------'+req.session.emailID);
  console.log('User session -----------------------'+req.session.isUserLoggedIn);
  res.sendFile(path.join(__dirname + '/../views'+'/PersonalInformation.html'));
};


// To Route user to findBuyerRecord function in the Buyer model file
//Pre-conditions   --> Takes input request from the getbuyerProfile function of app1.js
//Post-conditions  --> Routes the user to findBuyerRecord of Buyer model file
exports.getbuyerProfile = (req, res) =>
{
  buyer.findBuyerRecord(req, res);
}


// To Route user to updateBuyerRecords function in the Buyer model file
//Pre-conditions   --> Takes input request from the updateBuyer function of app1.js
//Post-conditions  --> Routes the user to updateBuyerRecords of Buyer model file
exports.updateBuyer = (req, res) =>
{
  buyer.updateBuyerRecords(req, res);
}


// To Route user to findAllOrderRecords function in the Orders model file
//Pre-conditions   --> Takes input request from the getAllOrders function of app1.js
//Post-conditions  --> Routes the user to findAllOrderRecords of Orders model file
exports.getAllOrders = (req, res) =>
{
  buyerOrders.findAllOrderRecords(req, res);
}


// To Route user to findAllReviewRecords function in the Reviews model file
//Pre-conditions   --> Takes input request from the getAllReviews function of app1.js
//Post-conditions  --> Routes the user to findAllReviewRecords of Reviews model file
exports.getAllReviews = (req, res) =>
{
  buyerReviews.findAllReviewRecords(req, res);
}

// To store buyerId as a session
//Pre-conditions   --> Takes input request from the setBuyerIdSession function of app1.js
//Post-conditions  --> Stores buyerId as a session
exports.setBuyerIdSession = (req, res) =>
 {
   req.session.buyerId= req.body.buyerId;
   res.sendStatus(200);
 };

 // To store orderId as a session
 //Pre-conditions   --> Takes input request from the setOrderIdSession function of app1.js
 //Post-conditions  --> Stores orderId as a session
exports.setOrderIdSession = (req, res) =>
{
    req.session.orderId= req.body.orderId;
    res.sendStatus(200);
};
