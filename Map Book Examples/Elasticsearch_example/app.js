var express = require('express');
var http = require('http');
var elasticsearch = require('elasticsearch');

var app = express();

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});
/* Server */
var server = http.createServer(app);
server.listen(3000,function(){
  console.log("Server started");
});
