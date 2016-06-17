var express = require('express');
var router = express.Router();
var moment = require('moment');
var bd = require("./../bd/bd");
/*
h hh 	1..12 	12 hour time used with a A.
a A 	am pm 	Post or ante meridiem (Note the one character a p are also considered valid)
m mm 	0..59 	Minutes
*/

// curl http://localhost:3000/appointments/
router.get('/', function(req, res, next) {
  console.log(bd.bd);
  res.send(bd.bd);
});

/*
curl -i -H "Content-Type: application/json" -d '{ "name": "jonastregemino", "phoneNumber": "+524521652247", "notification": "tiene una cita mañana", "time": "5-17-2016 11:00" }' http://localhost:3000/appointments
*/
router.post('/', function(req, res, next) {
  var time = moment(req.body.time, "MM-DD-YYYY hh:mma");

//  var utcDate =
  bd.bd.push({
    name:req.body.name,
    phoneNumber:req.body.phoneNumber,
    notification:req.body.notification,
    time:time,
  });
  console.log(bd.bd);
  res.send({ status: 'Ok' });
});

module.exports = router;
/*
curl -i -H "Content-Type: application/json" -d '{ "name": "jonastregemino", "phoneNumber": "524521652247", "notification": "tiene una cita mañana", "time": "5-17-2016 11:00" }' http://localhost:3000/appointments
*/
