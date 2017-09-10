import * as _ from "lodash";
import * as bcrypt from "bcryptjs";
import * as Q from "q";

import {robinSecret} from "../config";
import * as robinhoodModule from "robinhood"
let Robinhood = robinhoodModule(robinSecret, function(){
  console.log("connected to robinhood profile");
});


//Service Object being exported to be consumed by RobinHood Controller
let service:any = {};
service.getProfile = getProfile;
service.getAccount = getAccount;
service.getOrders = getOrders;
service.buyOrder = buyOrder;
service.getInstruments = getInstruments;



module.exports = service;

function getProfile() {
  let deferred = Q.defer();
  Robinhood.investment_profile(function(err, response, body){
    if(err){
      deferred.reject(err.name + ': ' + err.message);
    }else {
      deferred.resolve((body));
    }
  });
  return deferred.promise;
}

function getAccount(){
  let deferred = Q.defer();
  Robinhood.accounts(function(err, response, body){
    if(err){
      deferred.reject(err.name + ': ' + err.message);
    }else {
      deferred.resolve((body));
    }
  });
  return deferred.promise;
}

function getOrders(){
  let deferred = Q.defer();
  Robinhood.orders(function(err, response, body){
    if(err){
      deferred.reject(err.name + ': ' + err.message);
    }else {
      deferred.resolve((body));
    }
  });
  return deferred.promise;
}

//Get information about stock -> return's object that contains url
function getInstruments(req){

  //Validating that stock symbol is passed as a param
    console.log(req.query.stockSymbol);


  let deferred = Q.defer();
  Robinhood.instruments(req.query.stockSymbol, function(err, response, body){
    if(err){
      deferred.reject(err.name + ': ' + err.message);
    }else {
      deferred.resolve((body));
    }
  });
  return deferred.promise;
}

function buyOrder(req){
  let options = {
    type: req.query.type,
    quantity: req.query.quantity,
    bid_price: req.query.bid_price,
    instrument: {
      url: req.query.url,
      symbol: req.query.symbol
    }
  };
  let deferred = Q.defer();
  Robinhood.place_buy_order(options, function(err, response, body){
    if(err){
      deferred.reject(err.name + ': ' + err.message);
    }else {
      deferred.resolve((body));
    }
  });
  return deferred.promise;
}
