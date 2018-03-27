var express = require('express');
var router = express.Router();
var sendgrid = require('sendgrid')('bhavikt0@gmail.com', '12345678se');

router.get('/', function(req,res) {
  sendgrid.send({
    to: 'example@example.com',
    from: 'other@example.com',
    subject: 'Hello',
    text: 'My first email'
  }, function(err,json) {
    if(err) {
      return console.error(err);
    }
    console.log(json);
  });
});

module.exports = router;
