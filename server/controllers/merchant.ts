var express = require('express');
var router = express.Router();
var merchantService = require('../services/merchant.service');

// routes
router.get('/', getMerchant);

module.exports = router;

function getMerchant(req, res){
  merchantService.getMerchants()
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
