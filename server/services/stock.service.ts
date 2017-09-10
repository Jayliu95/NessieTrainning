import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import * as Q from "q";
import * as mongo from "mongojs";
import {mongoSecret} from "../config";
let db = mongo(mongoSecret.mlabKey, [mongoSecret.collection]);

var service: any = {};

service.getAll = getAllStock;
service.getBySymbol = getBySymbol;
service.addStock = addStock;
service.editStock = editStock;
service.deleteStock = deleteStock;

module.exports = service;

function getAllStock(userId){
  var deferred = Q.defer();
  db.users.findOne({
    _id: mongo.ObjectId(userId)
  }, function(err, user) {
    if (err) {
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
    _id: mongo.ObjectId(userId)
  }, function (err, user) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (user) {
      if(user['stockPortfolio'] == null){
        deferred.reject("Error: No stock Portfolio");
      }
      var stockObj: any = {};
      for(var index = 0; index < user['stockPortfolio'].length; index++) {
        if (user['stockPortfolio'][index]['stockSymbol'] === stockId) {
          stockObj.push(user['stockPortfolio'][index]);
        }
      }
      deferred.resolve(stockObj);
    }
  });
  return deferred.promise;
}

function addStock(req){
  var deferred = Q.defer();
  db.users.findOne({
    _id: mongo.ObjectId(req['_id'])
  }, function(err, user) {

    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (user) {
      let set:any = {};
      if(user['stockPortfolio'] == null){
        user['stockPortfolio'] = [];
      }
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
        {_id: mongo.ObjectId(req['_id'])},
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
    _id: mongo.ObjectId(req._id)
  }, function (err, user) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (user) {
      var set:any = {};
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
        {_id: mongo.ObjectId(req._id)},
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

function deleteStock(userId, stockId) {
  //TODO : current stockId is actually the stock symbol, need to update to actual ID - or create seperate function to do so
  var deferred = Q.defer();
  db.users.findOne({
    _id: mongo.ObjectId(userId)
  }, function (err, user) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (user) {
      var set:any = {};
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
        {_id: mongo.ObjectId(userId)},
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

