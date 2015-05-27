var express = require('express');

var allLayersAnalysis = require('../allLayersAnalysis');

var app = express();

app.use(express.static(__dirname));

app.get('/sentimentjs', function(req, res) {

  var results = allLayersAnalysis.stringsArray(['I love dogs. They are wonderful! 😍 😍', 'I hate brussel sprouts. They are terrible. 😾', 'This is great! But also bad.']);

  res.send(results);

});

var port = 3000;

app.listen(port);
console.log('Listening on port ' + port);