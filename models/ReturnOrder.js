//This Model interfaces with the table cancelorder_table in the RateMe database
//maintaining the records of cancelled orders allowing to insert new cancelled orders
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// creating instance of model
var Order  = require('../models/PlaceOrder.js');

// Initializing the ORM to connect to the database
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://b7f2b0155047a9:7b23ad76@us-cdbr-iron-east-04.cleardb.net/heroku_636e68d7f13c57e',{
  define:
  {
    timestamps: false // true by default
  }
});

//creating object of returnorder_table which will be used to map to database
var returnorder_records = sequelize.define('returnorder_table', {
  orderid: {
      type: Sequelize.INTEGER,
      field: 'orderid'
    },
  reasonforreturn: {
      type: Sequelize.STRING,
      field: 'reasonforreturn'
    }

});


//Added by Nikitha --to insert new returned order
exports.returnOrder = (req, res) => {

  sequelize.sync().then(function() {
    return returnorder_records.create({
    //  orderid: req.session.id,
     orderid: req.session.orderId,
      reasonforreturn: req.body.reasonforreturn


    });
  }).then(function () {
    // connects to Order model to change the status of the order
    Order.updateOrderStatusOnReturn(req,res);
  });
};// end of returnOrder
