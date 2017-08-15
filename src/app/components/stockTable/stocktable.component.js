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
var angular_2_data_table_1 = require("angular-2-data-table");
var stock_service_1 = require("../../services/stock.service");
var StockTableComponent = (function () {
    function StockTableComponent(_stockService) {
        var _this = this;
        this._stockService = _stockService;
        this.stockResource = new angular_2_data_table_1.DataTableResource(null);
        this.stocks = [];
        this.stockCount = 0;
        this.serviceLoaded = false;
        // special params:
        this.translations = {
            indexColumn: 'Index column',
            expandColumn: 'Expand column',
            selectColumn: 'Select column',
            paginationLimit: 'Max results',
            paginationRange: 'Result range'
        };
        this.id = JSON.parse(localStorage.getItem('currentUser'))['_id'];
        //Get Current User Info
        if (localStorage.getItem('currentUser')) {
            console.log("trying to get stocks for user : " + this.id);
            this._stockService.getStocks(this.id)
                .subscribe(function (data) {
                _this.data = _this.transformData(data);
                console.log(_this.data);
                _this.stockResource = new angular_2_data_table_1.DataTableResource(_this.data);
                _this.stockResource.count().then(function (count) { return _this.stockCount = count; });
                _this.serviceLoaded = true;
            }, function (err) {
                console.log("Error with getting stocks! " + err);
            });
        }
    }
    /* Returns Array of Objects*/
    StockTableComponent.prototype.transformData = function (data) {
        var resArr = [];
        for (var index = 0; index < data.length; index++) {
            var stockIndex = this.findIndex(resArr, data[index]);
            if (stockIndex == -1) {
                resArr.push({
                    'stockSymbol': data[index]['stockSymbol'],
                    'totalShareCount': data[index]['shareCount'],
                    'totalInvested': data[index]['purchasePrice'] * data[index]['shareCount'],
                    'detail': [{ 'shareCount': data[index]['shareCount'],
                            'purchasePrice': data[index]['purchasePrice']
                        }]
                });
            }
            else {
                resArr[stockIndex]['totalShareCount'] += data[index]['shareCount'];
                resArr[stockIndex]['totalInvest'] += (data[index]['shareCount'] * data[index]['purchasePrice']);
                resArr[stockIndex]['detail'].push({
                    'shareCount': data[index]['shareCount'],
                    'purchasePrice': data[index]['purchasePrice']
                });
            }
        }
        return resArr;
    };
    /* Helper function for finding the index of stock in an array*/
    StockTableComponent.prototype.findIndex = function (data, searchObj) {
        for (var index = 0; index < data.length; index++) {
            if (searchObj.stockSymbol === data[index].stockSymbol) {
                return index;
            }
        }
        return -1;
    };
    StockTableComponent.prototype.reloadStocks = function (params) {
        var _this = this;
        console.log(this.stockResource);
        this.stockResource.query(params).then(function (stocks) { return _this.stocks = stocks; });
    };
    return StockTableComponent;
}());
__decorate([
    core_1.ViewChild(angular_2_data_table_1.DataTable),
    __metadata("design:type", Object)
], StockTableComponent.prototype, "stocksTable", void 0);
StockTableComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'stockTable',
        templateUrl: 'stockTable.component.html',
        styleUrls: ['./stockTable.css']
    }),
    __metadata("design:paramtypes", [stock_service_1.StockService])
], StockTableComponent);
exports.StockTableComponent = StockTableComponent;
//# sourceMappingURL=stocktable.component.js.map