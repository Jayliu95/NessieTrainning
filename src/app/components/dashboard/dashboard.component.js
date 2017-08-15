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
var googleFinance_service_1 = require("../../services/googleFinance.service");
var user_service_1 = require("../../services/user.service");
var index_1 = require("angular2-notifications/dist/index");
var DashboardComponent = (function () {
    function DashboardComponent(_userService, _googleFinance, _pushNotifications) {
        this._userService = _userService;
        this._googleFinance = _googleFinance;
        this._pushNotifications = _pushNotifications;
        this.serviceLoaded = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Update current user information
        this.id = JSON.parse(localStorage.getItem('currentUser'))['_id'];
        if (localStorage.getItem('currentUser')) {
            this._userService.getUser(this.id)
                .subscribe(function (user) {
                _this.portfolio = user['stockPortfolio'];
                _this.getStockData();
                _this.serviceLoaded = true;
            });
        }
        //Starting timer
        this.stockData = [];
        this.timer = setInterval(function () {
            _this.getStockData();
        }, 1000 * 20); //
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.timer);
    };
    DashboardComponent.prototype.getQueryingUrl = function () {
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
    DashboardComponent.prototype.getStockData = function () {
        var _this = this;
        this._googleFinance.getStockData(this.getQueryingUrl())
            .subscribe(function (res) {
            _this.stockData = res;
            for (var index = 0; index < _this.stockData.length; index++) {
                if (_this.stockData[index]['t']) {
                    _this.stockData[index]["stockImgUrl"] = "https://www.google.com/finance/getchart?q=" + _this.stockData[index]['t'];
                }
                _this.recalculatePortfolio();
            }
            _this.handlePushNotifications();
        });
    };
    DashboardComponent.prototype.recalculatePortfolio = function () {
        var totalInvested = 0;
        var netAsset = 0;
        for (var index = 0; index < this.portfolio.length; index++) {
            var currStockPrice = this.getStockPrice(this.portfolio[index]['stockSymbol']);
            totalInvested += (this.portfolio[index]['shareCount'] * this.portfolio[index]['purchasePrice']);
            netAsset += (this.portfolio[index]['shareCount'] * currStockPrice);
            if (this.portfolio[index]['currPrice']) {
                if (this.portfolio[index]['currPrice'] > currStockPrice) {
                    this.portfolio[index]['status'] = 'increasing';
                    this.portfolio[index]['statusColor'] = 'text-success';
                }
                else if (this.portfolio[index]['currPrice'] < currStockPrice) {
                    this.portfolio[index]['status'] = 'decreasing';
                    this.portfolio[index]['statusColor'] = 'text-danger';
                }
            }
            this.portfolio[index].currPrice = currStockPrice;
        }
        this.portfolio.totalInvested = parseFloat(totalInvested.toString()).toFixed(2);
        this.portfolio.netAsset = parseFloat(netAsset.toString()).toFixed(2);
        this.portfolio.revenue = parseFloat((netAsset - totalInvested).toString()).toFixed(2);
    };
    DashboardComponent.prototype.getStockPrice = function (stockSymbol) {
        for (var index = 0; index < this.portfolio.length; index++) {
            if (this.stockData[index]['t'] === stockSymbol) {
                return this.stockData[index]['l'];
            }
            "";
        }
    };
    DashboardComponent.prototype.handlePushNotifications = function () {
        if (!this._pushNotifications.isSupported()) {
            return;
        }
        if (this.portfolio.revenue < 0) {
            this._pushNotifications.create("Revenue changed", {
                body: 'Your current revenue is: ' + this.portfolio.revenue + "! Which is below your threshold.",
                icon: 'http://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2014/10/03/102058445-up-down-chart.530x298.jpg?v=1412369312'
            }).subscribe(console.log("sent!"));
        }
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dashboard',
        styleUrls: ['../../../assets/css/style.css'],
        templateUrl: 'dashboard.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        googleFinance_service_1.GoogleFinanceService,
        index_1.PushNotificationsService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map