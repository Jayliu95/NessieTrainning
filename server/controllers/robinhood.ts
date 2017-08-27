var express = require('express');
var router = express.Router();
var robinhoodService = require('../services/robinhood.service');

//routes
//example: localhost:4200/api/v1/robinhood
router.get('/getProfile', getProfile);
router.get('/getAccount', getAccount);
router.get('/getOrders', getOrders);
router.get('/buyOrder', buyOrder);
router.get('/getInstruments', getInstruments);


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

function getOrders(req, res){
  robinhoodService.getOrders()
    .then(function (orders) {
      console.log(orders);
      res.send(orders);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function buyOrder(req, res){
  robinhoodService.buyOrder()
    .then(function (order) {
      console.log(order);
      res.send(order);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getInstruments(req, res){
  robinhoodService.getInstruments()
    .then(function (instruments) {
      console.log(instruments);
      res.send(instruments);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
