//Every minute we'd like our application to check the appointments database to see if any appointments are coming up that require reminders to be sent out. We configure on the start function both the job code we'd like to run, and the interval on which to run it. Then we call it from the application execution entry point like this: scheduler.start()
var CronJob = require('cron').CronJob;
var notificationsWorker = require('./workers/notificationsWorker');
var moment = require('moment');

var schedulerFactory =  function(){
  return {
    start: function(){
      new CronJob('00 * * * * *', function() {
        console.log('Running Send Notifications Worker for ' +  moment().format());
        notificationsWorker.run();
      }, null, true, '');
    }
  };
};

module.exports = schedulerFactory();
