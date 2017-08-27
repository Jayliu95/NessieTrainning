import {Component, OnInit, OnDestroy} from '@angular/core';
import {GoogleFinanceService} from "../../services/googleFinance.service";
import {UserService} from "../../services/user.service";

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  styleUrls: ['../../../assets/css/style.css'],
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit, OnDestroy{
  id: number;
  portfolio: any;
  stockData: any[];
  timer : any;
  serviceLoaded: boolean = false;
  constructor(
    private _userService : UserService,
    private _googleFinance: GoogleFinanceService,

  ){
  }

  ngOnInit(){
    //Update current user information
    this.id = JSON.parse(localStorage.getItem('currentUser'))['_id'];
    if(localStorage.getItem('currentUser')){
      this._userService.getUser(this.id)
        .subscribe(user => {
          this.portfolio = user['stockPortfolio'];
          this.getStockData();
          this.serviceLoaded = true;
        });
    }
    //Starting timer
    this.stockData = [];
    this.timer = setInterval(() => {
      this.getStockData();
    }, 1000 * 20); //

  }


  ngOnDestroy() {
    clearInterval(this.timer);
  }

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
    this._googleFinance.getStockData(this.getQueryingUrl())
      .subscribe(res => {
        this.stockData = res;
        for(let index = 0; index < this.stockData.length; index++){
          if(this.stockData[index]['t']){
            this.stockData[index]["stockImgUrl"] = "https://www.google.com/finance/getchart?q=" + this.stockData[index]['t'];
          }
          this.recalculatePortfolio();
        }
        this.handlePushNotifications();
      });
  }

  recalculatePortfolio(){
    let totalInvested = 0;
    let netAsset = 0;
    for(let index = 0; index < this.portfolio.length; index++) {
      let currStockPrice = this.getStockPrice(this.portfolio[index]['stockSymbol']);
      totalInvested += (this.portfolio[index]['shareCount'] * this.portfolio[index]['purchasePrice']);
      netAsset += (this.portfolio[index]['shareCount'] * currStockPrice);
      if (this.portfolio[index]['currPrice']) {
        if (this.portfolio[index]['currPrice'] > currStockPrice) {
          this.portfolio[index]['status'] = 'increasing';
          this.portfolio[index]['statusColor'] = 'text-success';
        } else if (this.portfolio[index]['currPrice'] < currStockPrice) {
          this.portfolio[index]['status'] = 'decreasing';
          this.portfolio[index]['statusColor'] = 'text-danger';
        }
      }
      this.portfolio[index].currPrice = currStockPrice;
    }
    this.portfolio.totalInvested = parseFloat(totalInvested.toString()).toFixed(2);
    this.portfolio.netAsset = parseFloat(netAsset.toString()).toFixed(2);
    this.portfolio.revenue = parseFloat((netAsset - totalInvested).toString()).toFixed(2);
  }

  getStockPrice(stockSymbol: string): number{
    for(let index = 0; index<this.portfolio.length; index++){
      if(this.stockData[index]['t'] === stockSymbol){
        return this.stockData[index]['l'];
      }``
    }
  }

  handlePushNotifications(){


  }
}
