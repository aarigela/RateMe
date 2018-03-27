var express = require('express');
var app = express();
var path = require('path');
var ResetSuccess  = require('../models/PasswordReset.js');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

exports.confirmPasswordreset = (req, res) => {
  ResetSuccess.reset(req, res);
  console.log("Password reset Successful");
};


exports.resetPasswordCheck = (req, res) => {
  ResetSuccess.confirmPassword(req, res);
  console.log("Password reset match check");
};


exports.gotoReset = (req, res) => {
  res.sendFile(path.join(__dirname + '/../views'+'/ResetPasswordPage.html'));
};
