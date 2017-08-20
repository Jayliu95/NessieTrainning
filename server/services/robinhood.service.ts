import * as _ from "lodash";
import * as bcrypt from "bcryptjs";
import * as Q from "q";

import {robinSecret} from "../config";
import * as robinhoodModule from "robinhood"
let Robinhood = robinhoodModule(robinSecret, function(){
  console.log("connected to robinhood profile");
});

var service:any = {};
service.getProfile = getProfile;

module.exports = service;

function getProfile() {
  console.log("currently working on it");
  let deferred = Q.defer();
  Robinhood.investment_profile(function(err, response, body){
    if(err){
      deferred.reject(err.name + ': ' + err.message);
    }else {
      console.log("investment_profile");
      console.log(body);
      deferred.resolve((body));
    }
  });
  return deferred.promise;
}
