var express = require('express');
var router = express.Router();
var customerService = require('../services/customer.service');
// routes
router.get('/', getAllCustomers);
router.get('/:id', getCustomersById);
router.post('/', createCustomer);
router.post('/:id/accounts', createCustomerAccount);

module.exports = router;


function getAllCustomers(req, res) {
  customerService.getAllCustomers()
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getCustomersById(req, res){
  customerService.getCustomerById(req.params.id)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });

}

function createCustomerAccount(req, res){
  customerService.createCustomerAccount(req.params.id, req.body)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function createCustomer(req, res){
  customerService.createCustomer(req.body)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });

}
