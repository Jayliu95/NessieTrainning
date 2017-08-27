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
      console.log("investment_profile");
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
      console.log("investment_account");
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
      console.log("Orders");
      deferred.resolve((body));
    }
  });
  return deferred.promise;
}

//Get information about stock -> return's object that contains url
function getInstruments(){
  let deferred = Q.defer();
  Robinhood.instruments('AMMA',function(err, response, body){
    if(err){
      deferred.reject(err.name + ': ' + err.message);
    }else {
      console.log("instruments");
      deferred.resolve((body));
    }
  });
  return deferred.promise;
}


//Needs Some Work.
// you need to call instrument first, get data such as url, and the pass it in the buy function.
function buyOrder(){
  var options = {
    type: 'limit',
    quantity: 1,
    bid_price: 1.00,
    instrument: {
      url: 'https://api.robinhood.com/instruments/f020f8c9-329a-4075-831b-37a187493a7a/',
      symbol: 'AMMA'
    }
    // // Optional:
    // trigger: String, // Defaults to "gfd" (Good For Day)
    // time: String,    // Defaults to "immediate"
    // type: String     // Defaults to "market"
  }
  let deferred = Q.defer();
  Robinhood.place_buy_order(options,function(err, response, body){
    if(err){
      deferred.reject(err.name + ': ' + err.message);
    }else {
      console.log("Place a Buy Order");
      deferred.resolve((body));
    }
  });
  return deferred.promise;
}
