var express = require('express');
var app = express();
var path = require('path');
var Register  = require('../models/Register.js');

exports.confirmRegistrationbuyer = (req, res) => {
      Register.insertNewBuyer(req, res);
      Register.insertLogin(req, res);
      Register.handleSayHello(req, res);
}
