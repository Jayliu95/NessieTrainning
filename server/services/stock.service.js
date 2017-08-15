var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongojs = require('mongojs');
var config = require('./../config.json')
  , apiKey = config['mlabKey']
  , collection = config['collection']
  , db = mongojs(apiKey, [collection]);

var service = {};

service.getAll = getAll;
service.getBySymbol = getBySymbol;
service.addStock = addStock;
service.editStock = editStock;
service.deleteStock = deleteStock;

module.exports = service;

function getAll(userId){
  var deferred = Q.defer();
  db.users.findOne({
    _id: mongojs.ObjectId(userId)
  }, function(err, user) {
    if (err) {
      console.log("err");
      deferred.reject(err.name + ': ' + err.message);
    }

    if (user) {
      if(user.stockPortfolio){
        deferred.resolve(user.stockPortfolio);
      } else {
        //TODO: resolve this so that it will never occur
        deferred.reject("Error" + ': ' + "No Stock Portfolio");
      }
    }
  });
  return deferred.promise;
}

function getBySymbol(userId, stockId){
  var deferred = Q.defer();
  db.users.findOne({
    _id: mongojs.ObjectId(userId)
  }, function (err, user) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (user) {
      if(user['stockPortfolio'] == null){
        deferred.reject("Error: No stock Portfolio");
      }
      var stockObj = {};
      for(var index = 0; index < user['stockPortfolio'].length; index++) {
        if (user['stockPortfolio'][index]['stockSymbol'] === stockId) {
          stockObj.push(user['stockPortfolio'][index]);
        }
      }
      console.log(stockObj);
      deferred.resolve(stockObj);
    }
  });
  return deferred.promise;
}

function addStock(req){
  var deferred = Q.defer();
  db.users.findOne({
    _id: mongojs.ObjectId(req['_id'])
  }, function(err, user) {

    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (user) {
      var set = {};
      set.stockPortfolio = user['stockPortfolio'];
      set.stockPortfolio.push(req['stock']);
      /*TODO: resolve when no longer needed
       Accepting stocks with same symbol
       else {
        for(var index = 0; index < user['stockPortfolio'].length; index++) {
          if(user['stockPortfolio'][index]['stockSymbol'] === req['stock']['stockSymbol']) {
            deferred.reject("Stock already exists for user");
            return deferred.promise;
          }
        }

        set.stockPortfolio = user['stockPortfolio'];
        set.stockPortfolio.push(req['stock']);
      }
      */
      db.users.update(
        {_id: mongojs.ObjectId(req['_id'])},
        {$set: set},
        function(err, doc){
          if(err) deferred.reject(err.name + ": " + err.message);
          deferred.resolve(doc);
        }
      )
    }
  });
  return deferred.promise;
}

function editStock(req){
  var deferred = Q.defer();
  var isUpdated = false;
  db.users.findOne({
    _id: mongojs.ObjectId(req._id)
  }, function (err, user) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (user) {
      var set = {};
      set.stockPortfolio = [];
      if(user['stockPortfolio'] == null){
        deferred.reject("Error: User does not own any stocks!");
      } else {
        set.stockPortfolio = user['stockPortfolio'];
        for(var index = 0; index < user['stockPortfolio'].length; index++) {
          if(user['stockPortfolio'][index]['stockSymbol'] === req.oldStock.stockSymbol) {
            set.stockPortfolio[index] = req.newStock;
            isUpdated = true;
            break;
          }
          if(!isUpdated){
            deferred.reject("Error: stock was not found - update failed!");
          }
        }
      }
      db.users.update(
        {_id: mongojs.ObjectId(req._id)},
        {$set: set},
        function(err, doc){
          if(err) deferred.reject(err.name + ": " + err.message);
          console.log(doc);
          deferred.resolve(doc);
        }
      )
    }
  });
  return deferred.promise;

}

function deleteStock(userId, stockId) {
  //TODO : current stockId is actually the stock symbol, need to update to actual ID - or create seperate function to do so
  var deferred = Q.defer();
  db.users.findOne({
    _id: mongojs.ObjectId(userId)
  }, function (err, user) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (user) {
      var set = {};
      var isDeleted = false;
      set.stockPortfolio = [];
      if(user['stockPortfolio'] == null){
        deferred.reject("Error: User does not own any stocks!");
      } else {
        set.stockPortfolio = user['stockPortfolio'];
        for(var index = 0; index < user['stockPortfolio'].length; index++) {
          if(user['stockPortfolio'][index]['stockSymbol'] === stockId) {
            set.stockPortfolio.pop(index);
            isDeleted = true;
            break;
          }
        }
        if(!isDeleted){
          deferred.reject("Error: stock was not found - delete failed!");
        }
      }
      db.users.update(
        {_id: mongojs.ObjectId(userId)},
        {$set: set},
        function(err, doc){
          if(err) deferred.reject(err.name + ": " + err.message);
          deferred.resolve(doc);
        }
      )
    }
  });
  return deferred.promise;
}

