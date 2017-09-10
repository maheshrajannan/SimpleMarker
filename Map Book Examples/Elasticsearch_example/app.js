var express = require('express');
var http = require('http');
var elasticsearch = require('elasticsearch');
var app = express();

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  // sniffOnStart: true,
  // sniffInterval: 60000,
});

/* Count */
client.count({
  index: 'mapbook'
}, function (error, response) {
  console.log(response);
});

/* Creating Index */

// client.index({
//   index: 'example_index',
//   type: 'posts',
//   id: '1',
//   body: {
//     user: 'me',
//     post_date: new Date(),
//     message: 'Hello World!'
//   },
//   refresh: true
// });

/* Searching Data */
client.search({
  index: 'mapbook',
  type: 'userlocation',
  body: {
    query: {
      match_all: {}
    }
  }
}, function (error, response) {
  console.log(response.hits);
});

// module.exports.search = function(searchData, callback) {
//   client.search({
//     index: 'example_index',
//     type: 'posts',
//     body: {
//       query: {
//         bool: {
//           must: {
//             match: {
//               "description": searchData.searchTerm
//             }
//           }
//         }
//       }
//     }
//   }).then(function (resp) {
//     callback(resp.hits.hits);
//   }, function (err) {
//       callback(err.message)
//       console.log(err.message);
//   });
// }

/* Server */

var server = http.createServer(app);
server.listen(3000,function(){
  console.log("Server started, Port : 3000");
});
