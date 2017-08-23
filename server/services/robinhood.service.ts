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

