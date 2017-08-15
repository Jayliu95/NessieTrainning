var express = require('express');
var router = express.Router();
var stockService = require('../services/stock.service');

//routes
router.get('/', getAllStocks);
router.get('/:_id', getStockBySymbol);
router.post('/', addStockHandler);
router.put('/:id', editStockHandler);
router.delete('/:_id', deleteStockHandler);

module.exports = router;

function getAllStocks(req, res){
  var url = req['baseUrl'].split('/');
  stockService.getAll(url[3])
    .then(function (users) {
      res.send(users);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getStockBySymbol(req, res){
  console.log("getting by id");
  console.log(req.params.id);
  stockService.getBySymbol(req.params.id)
    .then(function (user) {
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function addStockHandler(req, res){
  stockService.addStock(req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function editStockHandler(req, res){
  console.log(req.body);
  stockService.editStock(req.body)
    .then(function () {
      console.log("gucci");
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function deleteStockHandler(req, res){
  var url = req['baseUrl'].split('/');
  stockService.deleteStock(url[3], req.params._id)
    .then(function (user) {
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
