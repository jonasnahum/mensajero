//To actually execute our recurring job logic, we create a worker function which uses a Static Model Method to query the database for upcoming appointments and sends reminders as necessary.
var Appointment = require('../models/appointment')

var notificationWorkerFactory =  function(){
  return {
    run: function(){
      Appointment.sendNotifications();
    }
  };
};

module.exports = notificationWorkerFactory();
