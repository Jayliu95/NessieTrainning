var express = require('express');
var router = express.Router();
var robinhoodService = require('../services/robinhood.service');

//routes
//example: localhost:4200/api/v1/robinhood
router.get('/getProfile', getProfile);
router.get('/getAccount', getAccount);
router.get('/getOrders', getOrders);
router.get('/getInstruments', getInstruments);
router.post('/buyOrder', buyOrder);

module.exports = router;

/**
 *
 *  Get Routes For RobinHood Api Endpoint
 *
 */

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
  console.log("Getting Account");
  robinhoodService.getAccount()
    .then(function (account) {
      console.log(account);
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

function getInstruments(req, res){
  robinhoodService.getInstruments(req)
    .then(function (instruments) {
      console.log(instruments);
      res.send(instruments);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}


/**
 *
 *  Post Routes For RobinHood Api Endpoint
 *
 */

function buyOrder(req, res){
  robinhoodService.buyOrder(req)
    .then(function (order) {
      console.log(order);
      res.send(order);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
