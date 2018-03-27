var express = require('express');
var app = express();
var path = require('path');
var Register  = require('../models/RegisterSeller.js');


exports.confirmsellerRegistration = (req, res) => {
      Register.insertNewSeller(req, res);
      Register.insertLogin(req, res);
      Register.handleSayHello(req, res);
}
