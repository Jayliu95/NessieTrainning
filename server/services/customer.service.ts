import * as Q from "q";
import * as request from "request"

let service:any = {};

service.getAllCustomers = getAllCustomers;
service.getCustomerById = getCustomerById;
service.createCustomer = createCustomer;
service.createCustomerAccount = createCustomerAccount;

module.exports = service;

function getAllCustomers() {
  let deferred = Q.defer();
  request("http://api.reimaginebanking.com/customers?key=b0f85320c5b6ffb169bdbcaa572e4b68", function (error, response, body) {
    if (response.statusCode == 200) {
      deferred.resolve(body);
    }
    if (error) deferred.reject(error.name + ': ' + error.message);
  });

  return deferred.promise;
}

function getCustomerById(id: number) {
  let deferred = Q.defer();
  request("http://api.reimaginebanking.com/customers/" + id + "?key=b0f85320c5b6ffb169bdbcaa572e4b68", function (error, response, body) {
    if (body.code == 200) {
      deferred.resolve(body);
    }
    if (error) deferred.reject(error.name + ': ' + error.message);
  });

  return deferred.promise;

}


function createCustomerAccount(id: number, newAccount){
  let deferred = Q.defer();

  let url = "http://api.reimaginebanking.com/customers/" + id + "/accounts/?key=b0f85320c5b6ffb169bdbcaa572e4b68";

  request({
    url: url,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    json: newAccount
  }, function (error, response, body) {
    if (body.code == 200 || body.code == 201) {
      deferred.resolve(body);
    }
    if (body.code == 400 || body.code == 404) deferred.reject(body);
  });

  return deferred.promise;
}

/**
 * TODO: Seems to having some issues with processing "state"
 *
 * @returns {Promise<T>}
 */
function createCustomer(newCustomer){
  let deferred = Q.defer();

  let url = "http://api.reimaginebanking.com/customers/?key=b0f85320c5b6ffb169bdbcaa572e4b68";

  request({
    url: url,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    json: newCustomer
  }, function (error, response, body) {
    if (body.code == 200 || body.code == 201) {
      deferred.resolve(body);
    }
    if (body.code == 400 || body.code == 404) deferred.reject(body);
  });

  return deferred.promise;
}

