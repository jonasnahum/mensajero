var Appointment = (function() {
    var moment = require('moment');
    var twilio = require('twilio');
    var bd = require('./../bd/bd').bd;

    var Appointment = function() {

    };

    Appointment.prototype.requiresNotification = function (fechaHoy, registro) {
      var that = this;
      var jonas =  registro.time >= fechaHoy;
      console.log(jonas);

      return registro.time >= fechaHoy;
      /*
      return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
                              .diff(moment(date).utc())
                            ).asMinutes()) === this.notification;

                */
    };

    Appointment.prototype.sendNotifications = function(callback) {
      var that = this;

      // now
      var searchDate = new Date();
      bd.filter(function(appointment) {
              return that.requiresNotification(searchDate, appointment);
      });

      console.log(bd);

      if (bd.length > 0) {
        sendNotifications(bd);
      }
        // Send messages to all appoinment owners via Twilio
        function sendNotifications(docs) {
            var client = new twilio.RestClient('AC12516e1ad10daa153e06a2400bf020f9', '40d3b439050604482a62cefbfcf8e96f');
            docs.forEach(function(appointment) {
                // Create options to send the message
                var options = {
                    to: "+" + appointment.phoneNumber,
                    from: +12675923441,
                    body: "Hi " + appointment.name + ". Just a reminder that you have an appointment coming up  " + moment(appointment.time).calendar() +"."
                };

                // Send the message!
                client.sendMessage(options, function(err, response) {
                    if (err) {
                        // Just log it for now
                        console.error(err);
                    } else {
                        // Log the last few digits of a phone number
                        var masked = appointment.phoneNumber.substr(0,
                            appointment.phoneNumber.length - 5);
                        masked += '*****';
                        console.log('Message sent to ' + masked);
                    }
                });
            });

            // Don't wait on success/failure, just indicate all messages have been
            // queued for delivery
            if (callback) {
              callback.call(this);
            }
        }
    };


    return Appointment;
})();

module.exports = new Appointment();
