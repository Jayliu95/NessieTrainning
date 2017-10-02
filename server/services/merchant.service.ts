import * as Q from "q";
import * as request from "request"

let service:any = {};

service.getMerchants = getMerchants;

module.exports = service;



function getMerchants() {
  let deferred = Q.defer();
  request("http://api.reimaginebanking.com/merchants/?key=b0f85320c5b6ffb169bdbcaa572e4b68", function (error, response, body) {
    if (response.statusCode == 200) {
      deferred.resolve(body);
    }
    if (error) deferred.reject(error.name + ': ' + error.message);
  });

  return deferred.promise;

}

