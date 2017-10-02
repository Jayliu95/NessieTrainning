var express = require('express');
var router = express.Router();
var purchaseService = require('../services/purchase.service');

// routes
router.get('/:id', getPurchaseById);

module.exports = router;

function getPurchaseById(req, res){
  purchaseService.getPurchaseById(req.params.id)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
