var express = require('express');
var router = express.Router();
var accountService = require('../services/account.service');


// Enterprise API
router.get('/', getAllEnterpriseAccounts);
router.get('/:id', getEnterpriseAccountById);

module.exports = router;

function getAllEnterpriseAccounts(req, res){
  accountService.getAllEnterpriseAccounts()
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getEnterpriseAccountById(req, res){
  accountService.getEnterpriseAccountById(req.params.id)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
