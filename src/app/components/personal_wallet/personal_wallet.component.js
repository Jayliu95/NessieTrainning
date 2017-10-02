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
var user_service_1 = require("../../services/user.service");
var stock_service_1 = require("../../services/stock.service");
var googleFinance_service_1 = require("../../services/googleFinance.service");
var UserProfileComponent = (function () {
    function UserProfileComponent(_userService, _stockService, _googleFinance) {
        this._userService = _userService;
        this._stockService = _stockService;
        this._googleFinance = _googleFinance;
        this.model = {};
        this.loading = false;
        this.serviceLoaded = false;
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = JSON.parse(localStorage.getItem('currentUser'))['_id'];
        //Get Current User Info
        if (localStorage.getItem('currentUser')) {
            this._userService.getUser(this.id)
                .subscribe(function (user) {
                _this.currUser = user;
                _this.portfolio = user['stockPortfolio'];
                _this.serviceLoaded = true;
                _this.getStockData();
            });
        }
        this.timer = setInterval(function () {
            _this.getStockData();
        }, 1000 * 20); //
    };
    UserProfileComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.timer);
    };
    //TODO: note redundancy in method (consolidate code)
    UserProfileComponent.prototype.getQueryingUrl = function () {
        //Parse stock to query
        var queryingUrl = "http://finance.google.com/finance/info?client=ig&q=";
        for (var index = 0; index < this.portfolio.length; index++) {
            queryingUrl += this.portfolio[index]['stockSymbol'];
            if (index != this.portfolio.length - 1) {
                queryingUrl += ',';
            }
        }
        return queryingUrl;
    };
    UserProfileComponent.prototype.getStockData = function () {
        var _this = this;
        this.stockData = [];
        this._googleFinance.getStockData(this.getQueryingUrl())
            .subscribe(function (res) {
            _this.stockData = res;
            for (var index = 0; index < _this.stockData.length; index++) {
                if (_this.stockData[index]['t']) {
                    _this.stockData[index]["stockImgUrl"] = "https://www.google.com/finance/getchart?q=" + _this.stockData[index]['t'];
                }
                _this.recalculatePortfolio();
            }
        });
    };
    UserProfileComponent.prototype.recalculatePortfolio = function () {
        var totalInvested = 0;
        var netAsset = 0;
        for (var index = 0; index < this.portfolio.length; index++) {
            var currStockprice = this.getStockPrice(this.portfolio[index]['stockSymbol']);
            totalInvested += (this.portfolio[index]['shareCount'] * this.portfolio[index]['purchasePrice']);
            netAsset += (this.portfolio[index]['shareCount'] * currStockprice);
            if (this.portfolio[index]['currPrice']) {
                if (this.portfolio[index]['currPrice'] > currStockprice) {
                    this.portfolio[index]['status'] = 'increasing';
                    this.portfolio[index]['statusColor'] = 'text-success';
                }
                else if (this.portfolio[index]['currPrice'] < currStockprice) {
                    this.portfolio[index]['status'] = 'decreasing';
                    this.portfolio[index]['statusColor'] = 'text-danger';
                }
            }
            this.portfolio[index].currPrice = currStockprice;
        }
        this.portfolio.totalInvested = parseFloat(totalInvested.toString()).toFixed(2);
        this.portfolio.netAsset = parseFloat(netAsset.toString()).toFixed(2);
        this.portfolio.revenue = parseFloat((netAsset - totalInvested).toString()).toFixed(2);
    };
    UserProfileComponent.prototype.getStockPrice = function (stockSymbol) {
        for (var index = 0; index < this.portfolio.length; index++) {
            if (this.stockData[index]['t'] === stockSymbol) {
                return this.stockData[index]['l'];
            }
        }
    };
    /**
     * Portfolio Stock Related Functionality
     */
    UserProfileComponent.prototype.addStock = function () {
        var _this = this;
        this.loading = true;
        this._stockService.createStock(this.id, this.model)
            .subscribe(function (data) {
            //this.alertService.success('Stock added successfully', true);
            _this.portfolio.push(_this.model);
            _this.loading = false;
            _this.form._submitted = false;
            _this.getStockData();
        }, function (error) {
            //this.alertService .error(error._body);
            console.log(error);
            _this.loading = false;
        });
    };
    UserProfileComponent.prototype.promptEditModal = function () {
        console.log("prompt edit modal");
    };
    UserProfileComponent.prototype.editStock = function (stock) {
        var _this = this;
        var newStock = {
            stockSymbol: "VOO",
            shareCount: 100,
            purchasePrice: 300
        };
        this._stockService.editStock(this.id, stock, newStock)
            .subscribe(function (data) {
            //this.alertService.success('Stock added successfully', true);
            _this.portfolio.pop(stock);
            _this.portfolio.push(newStock);
            _this.getStockData();
        }, function (error) {
            //this.alertService .error(error._body);
            console.log(error);
        });
    };
    UserProfileComponent.prototype.deleteStock = function (stock) {
        var _this = this;
        console.log("Deleting Stock");
        console.log(stock);
        this._stockService.deleteStock(this.id, stock)
            .subscribe(function (data) {
            _this.portfolio.pop(stock);
            _this.getStockData();
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * Notification Preference Related Functions
     */
    UserProfileComponent.prototype.updateNotificationPreference = function () {
    };
    return UserProfileComponent;
}());
__decorate([
    core_1.ViewChild('f'),
    __metadata("design:type", Object)
], UserProfileComponent.prototype, "form", void 0);
UserProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'personal_wallet.component.html',
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        stock_service_1.StockService,
        googleFinance_service_1.GoogleFinanceService])
], UserProfileComponent);
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=personal_wallet.component.js.map
