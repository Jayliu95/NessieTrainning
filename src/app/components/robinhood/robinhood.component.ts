import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';

import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Stock} from '../../models/stock';
import {StockService} from "../../services/stock.service";
import {GoogleFinanceService} from "../../services/googleFinance.service";
@Component({
  moduleId: module.id,
  templateUrl: 'robinhood.component.html',
})

export class RobinHoodComponent implements OnInit, OnDestroy{
  @ViewChild('f') form: any;

  id: number;
  model: any = {};
  currUser : User;
  portfolio : any;
  stockData : any[];
  loading = false;
  serviceLoaded = false;
  timer : any;
  constructor(
    private _userService: UserService,
    private _stockService: StockService,
    private _googleFinance: GoogleFinanceService
  ){}

  ngOnInit(){
    this.id = JSON.parse(localStorage.getItem('currentUser'))['_id'];
    //Get Current User Info
    if(localStorage.getItem('currentUser')){
      this._userService.getUser(this.id)
        .subscribe(user => {
          this.currUser = user;
          this.portfolio = user['stockPortfolio'];
          this.serviceLoaded = true;
          this.getStockData();
        });
    }

    this.timer = setInterval(() => {
      this.getStockData();
    }, 1000 * 20); //
  }


  ngOnDestroy() {
    clearInterval(this.timer);
  }

  //TODO: note redundancy in method (consolidate code)
  getQueryingUrl(): string{
    //Parse stock to query
    let queryingUrl = "http://finance.google.com/finance/info?client=ig&q=";
    for(let index = 0; index< this.portfolio.length; index++){
      queryingUrl += this.portfolio[index]['stockSymbol'];
      if(index != this.portfolio.length-1){
        queryingUrl += ',';
      }
    }
    return queryingUrl;
  }

  getStockData(){
    this.stockData = [];
    this._googleFinance.getStockData(this.getQueryingUrl())
      .subscribe(res => {
        this.stockData = res;
        for(let index = 0; index < this.stockData.length; index++){
          if(this.stockData[index]['t']){
            this.stockData[index]["stockImgUrl"] = "https://www.google.com/finance/getchart?q=" + this.stockData[index]['t'];
          }
          this.recalculatePortfolio();
        }
      });

  }

  recalculatePortfolio(){
    let totalInvested = 0;
    let netAsset = 0;
    for(let index = 0; index < this.portfolio.length; index++) {
      let currStockprice = this.getStockPrice(this.portfolio[index]['stockSymbol']);
      totalInvested += (this.portfolio[index]['shareCount'] * this.portfolio[index]['purchasePrice']);
      netAsset += (this.portfolio[index]['shareCount'] * currStockprice);
      if (this.portfolio[index]['currPrice']) {
        if (this.portfolio[index]['currPrice'] > currStockprice) {
          this.portfolio[index]['status'] = 'increasing';
          this.portfolio[index]['statusColor'] = 'text-success';
        } else if (this.portfolio[index]['currPrice'] < currStockprice) {
          this.portfolio[index]['status'] = 'decreasing';
          this.portfolio[index]['statusColor'] = 'text-danger';
        }
      }
      this.portfolio[index].currPrice = currStockprice;
    }

    this.portfolio.totalInvested = parseFloat(totalInvested.toString()).toFixed(2);
    this.portfolio.netAsset = parseFloat(netAsset.toString()).toFixed(2);
    this.portfolio.revenue = parseFloat((netAsset - totalInvested).toString()).toFixed(2);
  }

  getStockPrice(stockSymbol: string): number{
    for(let index = 0; index<this.portfolio.length; index++){
      if(this.stockData[index]['t'] === stockSymbol){
        return this.stockData[index]['l'];
      }
    }
  }


  /**
   * Portfolio Stock Related Functionality
   */
  addStock() {
    this.loading = true;
    this._stockService.createStock(this.id, this.model)
      .subscribe(
        data => {
          //this.alertService.success('Stock added successfully', true);
          this.portfolio.push(this.model);
          this.loading = false;
          this.form._submitted = false;
          this.getStockData();
        },
        error => {
          //this.alertService .error(error._body);
          console.log(error);
          this.loading = false;
        });
  }

  promptEditModal(){
    console.log("prompt edit modal");
  }

  editStock(stock: Object) {
    let newStock = {
      stockSymbol: "VOO", //TODO - restrict edit of symbol
      shareCount: 100,
      purchasePrice: 300
    };
    this._stockService.editStock(this.id, stock, newStock)
      .subscribe(
        data => {
          //this.alertService.success('Stock added successfully', true);
          this.portfolio.pop(stock);
          this.portfolio.push(newStock);
          this.getStockData();
        },
        error => {
          //this.alertService .error(error._body);
          console.log(error);
        });

  }

  deleteStock(stock: Object) {
    console.log("Deleting Stock");
    console.log(stock);
    this._stockService.deleteStock(this.id, stock)
      .subscribe(
        data => {
          this.portfolio.pop(stock);
          this.getStockData();
        },
        error => {
          console.log(error);
        });
  }

  /**
   * Notification Preference Related Functions
   */
  updateNotificationPreference() {
  }

}
