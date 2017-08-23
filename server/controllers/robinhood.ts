var express = require('express');
var router = express.Router();
var robinhoodService = require('../services/robinhood.service');

//routes
//example: localhost:4200/api/v1/robinhood
router.get('/getProfile', getProfile);
router.get('/getAccount', getAccount);

module.exports = router;

function getProfile(req, res){
  robinhoodService.getProfile()
    .then(function (profile) {
      console.log(profile);
      res.send(profile);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getAccount(req, res){
  robinhoodService.getAccount()
    .then(function (account) {
      res.send(account);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
