var express = require('express');
var request = require('request');
var router = express.Router();

// Routes
router.get('/', getStockData);

module.exports = router;

function getStockData(req, res){
  //Temp solution for formatting req url
  req.url = req.url.substring(9, req.url.length - 3);
  if(req.url.indexOf('%26')){
    let substrings: string[] = req.url.split('%26');
    req.url = substrings[0] + "&" + substrings[1];
  }
  request(req.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // returned value from google finance contains extra chars.
      // the following removes that and converts response to be passed back
      res.json(JSON.parse(body.substring(3, body.toString().length)));
    }
  })
}
