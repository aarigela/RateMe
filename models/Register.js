//Author : Aaditya Arigela
var express = require('express');
var app = express();
var path = require('path');

var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');

var sequelize = new Sequelize('mysql://b7f2b0155047a9:7b23ad76@us-cdbr-iron-east-04.cleardb.net/heroku_636e68d7f13c57e',{
  define:
  {
    timestamps: false // true by default
  }
})

var buyerRecords = sequelize.define('buyer_records', {
   buyerID: {
      type: Sequelize.INTEGER,
      field: 'buyerID',
      primaryKey: true,
      autoIncrement: true
    },
  buyerFirstName: {
      type: Sequelize.STRING,
      field: 'buyerFirstName'
    },
    buyerLastName:{
      type: Sequelize.STRING,
      field: 'buyerLastName'
    },
    buyerEmail:{
      type: Sequelize.STRING,
      field: 'buyerEmail'
    },
    buyerPhoneNumber:{
      type: Sequelize.STRING,
      field: 'buyerPhoneNumber'
    },
	buyerAddress1: {
      type: Sequelize.STRING,
      field: 'buyerAddress1'
    },
    buyerAddress2:{
      type: Sequelize.STRING,
      field: 'buyerAddress2'
    },
    buyerCity:{
      type: Sequelize.STRING,
      field: 'buyerCity'
    },
	buyerPostcode:{
      type: Sequelize.STRING,
      field: 'buyerPostcode'
    },
	buyerPassword: {
      type: Sequelize.STRING,
      field: 'buyerPassword'
    },
  role: {
        type: Sequelize.STRING,
        field: 'role'
    }
}, {
  hooks: {
    afterValidate: function (buyer_records) {
      buyer_records.buyerPassword = bcrypt.hashSync(buyer_records.buyerPassword, 8);
    }
  }
});


// this method inserts new buyer once registration is successfully validated
exports.insertNewBuyer = (req, res) => {

buyerRecords.findOne({
  where: {
  buyerEmail : req.body.buyerEmail
  }
}).then(function (result){
    //console.log('sdsdssds' + result + 'hhhhhhhhhhhh');
		if(!result) {
      //console.log('not present');
      sequelize.sync().then(function() {
      return buyerRecords.create({
        buyerFirstName: req.body.buyerFirstName,
        buyerLastName: req.body.buyerLastName,
        buyerEmail:req.body.buyerEmail,
        buyerPhoneNumber:req.body.buyerPhoneNumber,
      buyerAddress1: req.body.buyerAddress1,
        buyerAddress2: req.body.buyerAddress2,
        buyerCity:req.body.buyerCity,
      buyerPostcode: req.body.buyerPostcode,
        buyerPassword: req.body.buyerPassword,
        role: 'buyer'
      });
      }).then(function () {
      res.status(200);
      res.sendFile(path.join(__dirname + '/../views'+'/login.html'));
      });
    }
    else{
      //console.log('present');
      res.send('present');
    }
  });
};

var loginDetails = sequelize.define('login_details', {
   login_id: {
      type: Sequelize.STRING,
      field: 'login_id',
      primaryKey: true
    },
	password: {
      type: Sequelize.STRING,
      field: 'password'
    },
  role: {
        type: Sequelize.STRING,
        field: 'role'
    }
}, {
  hooks: {
    afterValidate: function (login_details) {
      login_details.password = bcrypt.hashSync(login_details.password, 8);
    }
  }
});

// this method also inserts data into login table once registration is done
exports.insertLogin = (req, res) => {
  sequelize.sync().then(function() {
    return loginDetails.create({
      login_id: req.body.buyerEmail,
      password: req.body.buyerPassword,
      role: 'buyer'
    });
  }).then(function () {
    //res.sendStatus(200);
    //console.log('Login added');
  });
};



var nodemailer = require('nodemailer');

var router = express.Router();
//this method sends mail to buyer once registration is done successfully
exports.handleSayHello = (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'rateme.16@gmail.com', // Your email id
            pass: 'ffs_nprss' // Your password
        }
    });

    var text = 'Hello ' +   req.body.buyerFirstName + ' \n\n' + 'Thank you for registering with RateMe.\n You can now login into our website.';

      var mailOptions = {
        from: 'rateme.16@gmail.com',
        to:  req.body.buyerEmail,
        subject: 'Welcome to RateMe',
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        };
    });
  }
