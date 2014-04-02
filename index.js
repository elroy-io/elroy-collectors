var Elroy = require('elroy-cloud');
var Server = new Elroy();
var Splunk = require('splunkstorm2');

var API_KEY = process.env.API_KEY;
var PROJECT_ID = process.env.PROJECT_ID;

var logger = new Splunk(API_KEY, PROJECT_ID);

var count = 0;

var throttleA = 0;
Server.collector('photosensor/xbee-photosensor-392e/value', function(data) {
  var now = new Date().getTime();
  if(now-throttleA > 1000){
    var d = JSON.stringify({type: 'photosensor/xbee-photosensor-392e/value', data:data});
    logger.send(d);
    throttleA = now;
    count++;
  }
});

var throttleB = 0;
Server.collector('photosensor/xbee-photosensor-6dd5/value', function(data) {
  console.log(data);
  var now = new Date().getTime();
  if(now-throttleB > 1000){
    var d = JSON.stringify({type: 'photosensor/xbee-photosensor-6dd5/value', data:data});
    logger.send(d);
    throttleB = now;
    count++;
  } 
});
 
var throttleC = 0;
Server.collector(function(data) {
  var now = new Date().getTime();
  if(now-throttleC > 1000){
    var d = JSON.stringify(data);
    logger.send(d);
    throttleC = now;
    count++;
  }
});

setInterval(function(){
  //console.log('Log Requests per seconds '+count);
  count=0;
},1000);

Server.listen(process.env.PORT || 3000);
