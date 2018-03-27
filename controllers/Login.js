var express = require('express');
var app = express();
var path = require('path');

var LoginSuccess  = require('../models/LoginCheck.js');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

exports.confirmLogin = (req, res) => {
      LoginSuccess.login(req, res);
      console.log("Login Successful");
};

exports.confirmLogout = (req, res) => {
    req.session.destroy();
    console.log(req.session.emailID);
    console.log("Logout Successful");
    res.sendFile(path.join(__dirname + '/../views'+'/login.html'));
};

exports.register = (req, res) => {
  res.sendFile(path.join(__dirname + '/../views'+'/register.html'));
};

exports.registerSeller = (req, res) => {
  res.sendFile(path.join(__dirname + '/../views'+'/register_seller.html'));

    console.log('Cancel Order Page');

};
exports.forgotPassword = (req, res) => {
  res.sendFile(path.join(__dirname + '/../views'+'/forgotpassword.html'));
};

exports.getProductPage = (req, res) => {
  res.sendFile(path.join(__dirname + '/../views'+'/product.html'));
};

exports.checkuserlogin = (req, res) => {
  if (req.session.isUserLoggedIn=='true')
  {
    res.send(req.session.isUserLoggedIn);
  }
  else
  {
    res.send('LoggedOut');
  }
}
