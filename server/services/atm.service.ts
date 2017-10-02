import * as Q from "q";
import * as request from "request"

let service:any = {};

service.getAllAtms = getAllAtms;
service.getAtmById = getAtmById;

module.exports = service;

function getAllAtms() {
  let deferred = Q.defer();
  request("http://api.reimaginebanking.com/atms?key=b0f85320c5b6ffb169bdbcaa572e4b68", function (error, response, body) {
    if (response.statusCode == 200) {
      deferred.resolve(body);
    }
    if (error) deferred.reject(error.name + ': ' + error.message);
  });

  return deferred.promise;
}

function getAtmById(pageNumber: number) {
  let deferred = Q.defer();
  let url = "http://api.reimaginebanking.com/atms?key=b0f85320c5b6ffb169bdbcaa572e4b68&page=" + pageNumber;

  request(url, function (error, response, body) {
    if (response.statusCode == 200) {
      deferred.resolve(body);
    }
    if (error) deferred.reject(error.name + ': ' + error.message);
  });

  return deferred.promise;

}

