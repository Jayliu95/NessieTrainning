"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
    }
    UserService.prototype.getUsers = function () {
        return this._http.get('/api/v1/users', this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getUser = function (id) {
        return this._http.get('/api/v1/users/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getUsersByName = function (name) {
        return this._http.get('/api/v1/users/names/' + name, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.createUser = function (user) {
        return this._http.post('/api/v1/users', user, this.jwt());
    };
    UserService.prototype.updateUser = function (user, id) {
        console.log(user + "\t" + id);
        return this._http.put('/api/v1/users/' + id, user)
            .map(function (res) { return console.log(res); }) //Switch back to logging in component later
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    UserService.prototype.deleteUser = function (id) {
        return this._http.delete('/api/v1/users/' + id)
            .map(function (res) { return console.log(res); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    //Functions dealing with portfolio of user
    //TODO: review => delete?use
    //Commenting out function -- dealing with this within component for now
    /*
    getTotalInvest(id: number){
      return this._http.get('/api/v1/users/'+id, this.jwt())
        .map((response: Response) => {
        let userStocks = response['stockPortfolio'];
        let sum = 0;
        for(let index = 0; index<userStocks.length; index++){
          sum += userStocks[index]['purchasePrice'];
        }
        console.log(sum);
        });
    }
    */
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map