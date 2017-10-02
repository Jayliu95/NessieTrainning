var express = require('express');
var router = express.Router();
var billService = require('../services/bill.service');

// routes
router.get('/:id', getBillById);

module.exports = router;

function getBillById(req, res){
  billService.getBillById(req.params.id)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
