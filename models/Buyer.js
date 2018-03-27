//Author - Aaditya Arigela
//Model file to interact with buyer_records table in the database using Sequelize


var express = require('express');
var app = express();
var path = require('path');


//Creating an object of nodemailer to send auto-generated emails to users
var nodemailer = require('nodemailer');
var router = express.Router();

//Declaring a variable of Sequelize
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://b7f2b0155047a9:7b23ad76@us-cdbr-iron-east-04.cleardb.net/heroku_636e68d7f13c57e',{  
  define:
  {
    timestamps: false // true by default
  }
});


//To define metadata fields for buyer_records table
var buyerRecords = sequelize.define('buyer_records',
{
  buyerId:
  {
      type: Sequelize.INTEGER,
      field: 'buyerId',
      primaryKey: true,
      autoIncrement: true
  },
  buyerFirstName:
  {
      type: Sequelize.STRING,
      field: 'buyerFirstName'
  },
  buyerLastName:
  {
      type: Sequelize.STRING,
      field: 'buyerLastName'
  },
  buyerEmail:
  {
      type: Sequelize.STRING,
      field: 'buyerEmail',
  },
  buyerAddress1:
  {
      type: Sequelize.STRING,
      field: 'buyerAddress1',
  },
  buyerAddress2:
  {
      type: Sequelize.STRING,
      field: 'buyerAddress2',
  },
  buyerCity:
  {
      type: Sequelize.STRING,
      field: 'buyerCity',
  },
  buyerPostcode:
  {
      type: Sequelize.STRING,
      field: 'buyerPostcode',
  },
  buyerPassword:
  {
      type: Sequelize.STRING,
      field: 'buyerPassword',
  },
  buyerPhoneNumber:
  {
      type: Sequelize.STRING,
      field: 'buyerPhoneNumber',
  }
});


//Fetches a particular buyer details from database
//Pre-conditions   --> Takes input request from the getbuyerProfile function of Buyer Dashboard Controller
//Post-conditions  --> Fetches information of a particular Buyer from the database and returns the response to success function of PersonalInformation.html page
exports.findBuyerRecord = (req, res) =>
 {

   console.log('in buyer model-------------');
   buyerRecords.findOne({
     where:
     {
       buyerEmail : req.session.emailID
     }
   }).then(function(result)
    {
        var x =
        {
          buyerFirstName:result.buyerFirstName,
          buyerLastName:result.buyerLastName,
          buyerEmail:result.buyerEmail,
          buyerPhoneNumber:result.buyerPhoneNumber,
          buyerAddress1:result.buyerAddress1
        };
        res.json(x);
    });
  };


//Changes and updates buyer profile information of a particular buyer to the database
//Pre-conditions   --> Takes input request from the updateBuyer function of Buyer Dashboard Controller
//Post-conditions  --> Updates information of a particular buyer to the database and returns the response to success function of PersonalInformation.html page
exports.updateBuyerRecords = (req, res) =>
{

  buyerRecords.update(
  {
      buyerFirstName: req.body.buyerFirstName,
      buyerLastName: req.body.buyerLastName,
      buyerEmail:req.body.buyerEmail,
      buyerPhoneNumber:req.body.buyerPhoneNumber,
      buyerAddress1:req.body.buyerAddress1
  },
  {
    where:
    {
       buyerEmail : req.session.emailID
    }
  })
  .then(function()
  {
      res.sendFile(path.join(__dirname + '/../views'+'/PersonalInformation.html'));
  })
};


//Funciton to send auto-generated email to subscribed users
//Pre-conditions   --> Takes input request from the sendEmailToUsers function of Admin Dashboard Controller
//Post-conditions  --> Sends email to all the buyers and returns the response to success function of NewsLetter.html page
exports.sendEmail = (req, res) =>
  {
    var emails;
    var length;
    var senders = ' ';

    buyerRecords.findAll(
      {
        attributes: ['buyerEmail']
      })
      .then(function(result)
      {
        emails = result;
        length = emails.length;

        // for(var i = 0; i<emails.length;i++)
        //   console.log(emails[i].buyerEmail);
        //   // console.log('mail content  '+document.getElementById('mailText').value);
      });

      var transporter = nodemailer.createTransport
      ({
          service: 'Gmail',
          auth:
          {
            user: 'RateMe.16@gmail.com', // Your email id
            pass: 'ffs_nprss' // Your password
          }
        });

      var mailOptions =
      {
          from: 'RateMe.16@gmail.com', // sender address
          to:    'prasan.ubhi@gmail.com',// list of receivers
          subject: 'Hello From RateMe', // Subject line
          text:  req.session.mailText//, // plaintext body
      };

      transporter.sendMail(mailOptions, function(error, info)
      {
          if(error)
          {
            console.log(error);
          }
          else
          {
            console.log('Message sent: ' + info.response);
          };
        });
        res.sendFile(path.join(__dirname + '/../views'+'/NewsLetter.html'));
      }
