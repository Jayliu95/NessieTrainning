var express = require('express');
var router = express.Router();
var depositService = require('../services/deposit.service');

// routes
router.get('/:id', getDepositById);

module.exports = router;

function getDepositById(req, res){
  depositService.getDepositById(req.params.id)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
