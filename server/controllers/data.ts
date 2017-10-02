var express = require('express');
var router = express.Router();
var dataService = require('../services/data.service');

// routes
router.delete('/:id', deleteData);

module.exports = router;

function deleteData(req, res){
  dataService.deleteData(req.params.id)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      console.log(err);
      res.status(400).send(err);
    });
}
