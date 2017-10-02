import * as Q from "q";
import * as request from "request"

let service:any = {};

service.getAllAccounts = getAllAccounts;
service.getAccountById = getAccountById;
service.updateAccount = updateAccount;
service.deleteAccount = deleteAccount;
service.getAllAccountBills = getAllAccountBills;
service.createAccountBill = createAccountBill;
service.getAllAccountPurchases = getAllAccountPurchases;
service.createAccountPurchase = createAccountPurchase;
service.getAllAccountDeposits = getAllAccountDeposits;
service.createAccountDeposit = createAccountDeposit;
service.getAllEnterpriseAccounts = getAllEnterpriseAccounts;
service.getEnterpriseAccountById = getEnterpriseAccountById;
module.exports = service;



function getAllAccounts() {
  let deferred = Q.defer();

  request("http://api.reimaginebanking.com/accounts?key=b0f85320c5b6ffb169bdbcaa572e4b68", function (error, response, body) {
    if (response.statusCode == 200) {
      deferred.resolve(body);
    }
    if (error) deferred.reject(error.name + ': ' + error.message);
});

  return deferred.promise;
}

function getAccountById(id: number) {
  let deferred = Q.defer();
  request("http://api.reimaginebanking.com/accounts/" + id + "?key=b0f85320c5b6ffb169bdbcaa572e4b68", function (error, response, body) {
    if (response.statusCode == 200) {
      deferred.resolve(body);
    }
    if (response.statusCode == 400 || response.statusCode == 404) deferred.reject(body);
  });

  return deferred.promise;
}

function updateAccount(id: number, newAccount) {
  let deferred = Q.defer();
  let url = "http://api.reimaginebanking.com/accounts/" + id + "?key=b0f85320c5b6ffb169bdbcaa572e4b68";

  request({
    url: url,
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
      json: newAccount
    }, function (error, response, body) {
    if (body.code == 200 || body.code == 201 || body.code == 202) {
      deferred.resolve(body);
    }
    if (body.code == 400 || body.code == 404) deferred.reject(body);
    });

  return deferred.promise;
}



function deleteAccount(id: number) {
  let deferred = Q.defer();
  let url = "http://api.reimaginebanking.com/accounts/" + id + "?key=b0f85320c5b6ffb169bdbcaa572e4b68";

  request({
    url: url,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    }
  }, function (error, response, body) {
    if (body.code == 200 || body.code == 201) {
      deferred.resolve(body);
    }
    if (body.code == 400 || body.code == 404) deferred.reject(body);
  });

  return deferred.promise;
}


/**
 *
 * @param id : ID of the account to find all the bills for
 */
function getAllAccountBills(id: number){
  let deferred = Q.defer();
  request("http://api.reimaginebanking.com/accounts/" + id + "/bills/?key=b0f85320c5b6ffb169bdbcaa572e4b68",
    function (error, response, body) {
    if (body.code == 200 || body.code == 201 || body.code == 202) {
      deferred.resolve(body);
    }else if (body.code == 400 || body.code == 404){
      deferred.reject(body)
    } else {
      // Could be blank - resolution as of right now is  resolve body anyways
      deferred.resolve(body);
    }


  });

  return deferred.promise;
}

/**
 * Creates a bill for the specific account
 * @param id : ID of the account to create the bills for
 * @param newBill : Bill Object to be added to the account
 * @returns {Promise<T>}
 */
function createAccountBill(id: number, newBill) {
  let deferred = Q.defer();
  let url = "http://api.reimaginebanking.com/accounts/" + id + "/bills/?key=b0f85320c5b6ffb169bdbcaa572e4b68";

  request({
    url: url,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    json: newBill
  }, function (error, response, body) {
    if (body.code == 200 || body.code == 201) {
      deferred.resolve(body);
    }
    if (body.code == 400 || body.code == 404) deferred.reject(body);
  });

  return deferred.promise;

}

/**
 * Returns the purchases that the account are involved in.
 * @param id : ID of the account to find all the bills for
 */
function getAllAccountPurchases(id: number){
  let deferred = Q.defer();
  request("http://api.reimaginebanking.com/accounts/" + id + "/purchases/?key=b0f85320c5b6ffb169bdbcaa572e4b68", function (error, response, body) {
    if (body.code == 200 || body.code == 201) {
      deferred.resolve(body);
    }
    if (body.code == 400 || body.code == 404) {
      deferred.reject(body);
    } else {
      // Could be blank - resolution as of right now is  resolve body anyways
      deferred.resolve(body);
    }
  });

  return deferred.promise;
}

/**
 * Creates a purchase where the account with the ID specified is the payer.
 * @param id : ID of the account to create the purchase for
 * @param newPurchase: purchase object to be added to account.
 * @returns {Promise<T>}
 */
function createAccountPurchase(id: number, newPurchase){
  let deferred = Q.defer();
  let url = "http://api.reimaginebanking.com/accounts/" + id + "/purchases/?key=b0f85320c5b6ffb169bdbcaa572e4b68";
  request({
    url: url,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    json: newPurchase
  }, function (error, response, body) {
    if (body.code == 200 || body.code == 201) {
      deferred.resolve(body);
    }
    if (body.code == 400 || body.code == 404) {
      deferred.reject(body);
    } else {
      // Could be blank - resolution as of right now is  resolve body anyways
      deferred.resolve(body);
    }
  });

  return deferred.promise;
}

/**
 * Returns the deposits that the account are involved in.
 * @param id
 * @returns {Promise<T>}
 */
function getAllAccountDeposits(id: number){
  let deferred = Q.defer();
  request("http://api.reimaginebanking.com/accounts/" + id + "/deposits/?key=b0f85320c5b6ffb169bdbcaa572e4b68", function (error, response, body) {
    if (body.code == 200 || body.code == 201) {
      deferred.resolve(body);
    }
    if (body.code == 400 || body.code == 404) {
      deferred.reject(body);
    } else {
      // Could be blank - resolution as of right now is  resolve body anyways
      deferred.resolve(body);
    }
  });

  return deferred.promise;
}

/**
 * Creates a deposit where the account with the ID specified receives the amount.
 * @param id
 * @param newDeposit
 * @returns {Promise<T>}
 */
function createAccountDeposit(id: number, newDeposit){
  let deferred = Q.defer();
  let url = "http://api.reimaginebanking.com/accounts/" + id + "/deposits/?key=b0f85320c5b6ffb169bdbcaa572e4b68";
  request({
    url: url,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    json: newDeposit
  }, function (error, response, body) {
    if (body.code == 200 || body.code == 201) {
      deferred.resolve(body);
    }
    if (body.code == 400 || body.code == 404) {
      deferred.reject(body);
    } else {
      // Could be blank - resolution as of right now is  resolve body anyways
      deferred.reject(body);
    }
  });

  return deferred.promise;
}


function getAllEnterpriseAccounts(){
  let deferred = Q.defer();
  request("http://api.reimaginebanking.com/enterprise/accounts?key=b0f85320c5b6ffb169bdbcaa572e4b68", function (error, response, body) {
    if (response.statusCode == 200) {
      deferred.resolve(body);
    }
    if (error) deferred.reject(error.name + ': ' + error.message);
  });

  return deferred.promise;
}

function getEnterpriseAccountById(id: number){
  let deferred = Q.defer();
  request("http://api.reimaginebanking.com/enterprise/accounts/" + id + "?key=b0f85320c5b6ffb169bdbcaa572e4b68", function (error, response, body) {
    if (response.statusCode == 200) {
      deferred.resolve(body);
    }

    if (error) deferred.reject(error.name + ': ' + error.message);
  });

  return deferred.promise;
}


