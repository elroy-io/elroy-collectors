var Elroy = require('elroy-cloud');
var Server = new Elroy();
var UG = require('usergrid');
var Splunk = require('splunkstorm2');
if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY
  });
}
var apigee = new UG.client({
  orgName:'mtraining',
  appName:'sandbox'
});

var API_KEY = process.env.API_KEY;
var PROJECT_ID = process.env.PROJECT_ID;

var logger = new Splunk(API_KEY, PROJECT_ID);

Server.collector('photosensor/value', function(data) {
  logger.send(JSON.stringify({type: 'photosensor/value', data:data}));
});

/*Server.collector('photosensor/xbee-photosensor-6dd5/value', function(data) {
  logger.send(JSON.stringify({type: 'photosensor/xbee-photosensor-6dd5/value', data:data}));
});*/


Server.collector(function(data) {
  logger.send(JSON.stringify(data));
});



Server.listen(process.env.PORT || 3000);
