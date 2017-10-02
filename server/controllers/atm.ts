var express = require('express');
var router = express.Router();
var atmService = require('../services/atm.service');

// routes
router.get('/', getAllAtms);
router.get('/:id', getAtmById);

module.exports = router;

function getAllAtms(req, res) {
  atmService.getAllAtms()
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getAtmById(req, res){
  atmService.getAtmById(req.params.id)
    .then(function (response) {
      res.send(response);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
