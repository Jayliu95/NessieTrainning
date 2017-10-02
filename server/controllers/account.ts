var express = require('express');
var router = express.Router();
var accountService = require('../services/account.service');

// routes
router.get('/', getAllAccounts);

router.get('/:id', getAccountById);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

router.get('/:id/bills', getAllAccountBills);
router.post('/:id/bills', createAccountBill);

router.get('/:id/purchases', getAllAccountPurchases);
router.post('/:id/purchases', createAccountPurchase);

router.get('/:id/deposits', getAllAccountDeposits);
router.post('/:id/deposits', createAccountDeposit);


module.exports = router;

function getAllAccounts(req, res) {
  accountService.getAllAccounts()
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getAccountById(req, res){
  accountService.getAccountById(req.params.id)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function updateAccount(req, res) {
  accountService.updateAccount(req.params.id, req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function deleteAccount(req, res) {
  accountService.deleteAccount(req.params.id)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getAllAccountBills(req, res){
  accountService.getAllAccountBills(req.params.id)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function createAccountBill(req, res){
  accountService.createAccountBill(req.params.id, req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getAllAccountPurchases(req, res){
  accountService.getAllAccountPurchases(req.params.id)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function createAccountPurchase(req, res){
  accountService.createAccountPurchase(req.params.id, req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });

}

function getAllAccountDeposits(req, res){
  accountService.getAllAccountDeposits(req.params.id)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function createAccountDeposit(req, res){
  accountService.createAccountDeposit(req.params.id, req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });

}

