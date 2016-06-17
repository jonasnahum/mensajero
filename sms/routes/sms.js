var express = require('express');
var router = express.Router();
//Initialize a REST client in a single line:
var client = require('twilio')('AC12516e1ad10daa153e06a2400bf020f9', '40d3b439050604482a62cefbfcf8e96f');

/* GET home page. */
router.post('/', function(req, res, next) {
 // Use this convenient shorthand to send an SMS:
 console.log(req.body);
 client.sendSms({
       to: req.body.to,//'+524521652247',
       from:'+12675923441',//phone that gives u twilio.
       body: req.body.message//'mensaje desde el servidor de jonas'
   }, function(error, message) {
       if (!error) {
           console.log('Success! The SID for this SMS message is:');
           console.log(message.sid);
           console.log('Message sent on:');
           console.log(message.dateCreated);
       } else {
           console.log('Oops! There was an error.');
           console.log(req.body);
       }
   });
  res.send({ status: 'Ok' });
});

module.exports = router;
/*
curl -i -H Conication/json" -d '{ "to": "+4521652247", "message": "test de mensaje" }' http://localhost:3000/sms
*/
