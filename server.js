'use strict';

var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
  });

  var time = function() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    return h + ':' + m;
  };

  var nameGet = function (url) {
    var urlArray = url.split("/");
    return urlArray;
  };

  var urlName = nameGet(req.url);

  switch(urlName[1]) {
    case 'time':
      var curTime = time();
      res.write('the current time is: ' + curTime +'\n');
      break;
    case 'greet':
      res.write('Hello ' + urlName[2] + '\n');
      break;
    default :
      res.write('did not hit a route\n');
  }

  res.end();
});

server.listen(3000);