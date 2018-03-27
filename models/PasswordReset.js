//Author : Aaditya Arigela
var express = require('express');
var app = express();
var path = require('path');
var bcrypt = require('bcryptjs');

var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');

var sequelize = new Sequelize('mysql://b7f2b0155047a9:7b23ad76@us-cdbr-iron-east-04.cleardb.net/heroku_636e68d7f13c57e',{
  define:
  {
    timestamps: false // true by default
  }
});


var loginDetails = sequelize.define('login_details', {
   login_id: {
      type: Sequelize.STRING,
      field: 'login_id',
      primaryKey: true
    },
	password: {
      type: Sequelize.STRING,
      field: 'password'
    }
}, {
  hooks: {
    afterValidate: function (login_details) {
      login_details.password = bcrypt.hashSync(login_details.password, 8);
    }
  }
});

//this method validates the email of the user in database
exports.reset = (req, res) => {
    var x =req.body.resetEmail;
    //console.log(x);
    loginDetails.findById(req.body.resetEmail).then(function(result) {
      //console.log(result);
      if(!result) {
				console.log('email not found');
        res.send('emailnotfound');
        //res.sendFile(path.join(__dirname + '/../views'+'/login.html'));
		}
   else {
      res.send('emailfound');
		}
}
)};


//this method validates the password provided by the customer in database
exports.confirmPassword = (req, res) => {
  loginDetails.findById(req.body.email).then(function(result) {
    if(!result) {
      console.log('email not found');
      res.send('emailnotfound');
      //res.sendFile(path.join(__dirname + '/../views'+'/login.html'));
  }
 else {
    if (req.body.password1 == req.body.password2) {
    loginDetails.update({
      password: req.body.password1,
    },
  {
    where:
    {
      login_id : req.body.email
    }
  }).then(function() {
   res.send('updated');
   res.sendFile(path.join(__dirname + '/../views'+'/login.html'));
 });
  } else {
    res.send('notmatch');

  }

  }
}
		)};
