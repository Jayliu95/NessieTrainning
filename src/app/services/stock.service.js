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
require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var StockService = (function () {
    function StockService(_http) {
        this._http = _http;
    }
    StockService.prototype.getStocks = function (id) {
        return this._http.get('/api/v1/' + id + '/stocks', this.jwt()).map(function (response) { return response.json(); });
    };
    StockService.prototype.getStock = function (id, stockSymbol) {
        return this._http.get('/api/v1/' + id + '/stocks/' + stockSymbol, this.jwt()).map(function (response) { return response.json(); });
    };
    StockService.prototype.createStock = function (id, stock) {
        var req = {
            '_id': id,
            'stock': stock
        };
        return this._http.post('/api/v1/' + id + '/stocks', req, this.jwt());
    };
    StockService.prototype.editStock = function (id, oldStock, newStock) {
        var req = {
            '_id': id,
            'oldStock': oldStock,
            'newStock': newStock
        };
        return this._http.put('/api/v1/' + id + '/stocks/' + oldStock['stockSymbol'], req, this.jwt())
            .map(function (response) { response; });
    };
    StockService.prototype.deleteStock = function (id, stock) {
        return this._http.delete('/api/v1/' + id + '/stocks/' + stock['stockSymbol'])
            .map(function (response) { console.log(response); response.json(); });
    };
    // private helper methods
    StockService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return StockService;
}());
StockService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], StockService);
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map