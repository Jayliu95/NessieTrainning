import * as Q from "q";
import * as request from "request"

let service:any = {};

service.deleteData = deleteData;

module.exports = service;

function deleteData(type: string){
  let deferred = Q.defer();
  let url = "http://api.reimaginebanking.com/data?type=" + type + "&key=b0f85320c5b6ffb169bdbcaa572e4b68";
  request({
    url: url,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    }
  }, function (error, response, body) {
    //There seems to be an inconsistency with successful delete call - the body seems to be empty
    if (body === "" || body.code == 200 || body.code == 201) {
      deferred.resolve(body);
    }
    if (body.code === 404) {
      deferred.reject(body.message);
    } else {
      deferred.reject(body);
    }
  });

  return deferred.promise;
}
