import {Component, ViewChild} from '@angular/core';

import {StockService} from "../../services/stock.service";
@Component({
  moduleId: module.id,
  selector: 'stockTable',
  templateUrl: 'stockTable.component.html',
  styleUrls: ['./stockTable.css']
})

export class StockTableComponent {

  id: number;
  data: any;

  stocks:any = [];
  stockCount:number= 0;
  serviceLoaded: boolean = false;


  constructor(private _stockService: StockService) {
    this.id = JSON.parse(localStorage.getItem('currentUser'))['_id'];
    //Get Current User Info
    if(localStorage.getItem('currentUser')) {
      console.log("trying to get stocks for user : " + this.id);
      this._stockService.getStocks(this.id)
        .subscribe(
          data => {
            this.data = this.transformData(data);
            console.log(this.data);
            this.serviceLoaded = true;
          },
          err => {
            console.log("Error with getting stocks! " + err);
          }
        );
    }
  }

  /* Returns Array of Objects*/
  transformData(data: any){
    let resArr:any[] = [];
    for(let index=0; index<data.length; index++){
      let stockIndex = this.findIndex(resArr, data[index]);
      if(stockIndex == -1){
        resArr.push({
          'stockSymbol'     :     data[index]['stockSymbol'],
          'totalShareCount' :     data[index]['shareCount'],
          'totalInvested'   :     data[index]['purchasePrice'] * data[index]['shareCount'],
          'detail'          :
            [{  'shareCount'    : data[index]['shareCount'],
                'purchasePrice' : data[index]['purchasePrice']
            }]
        });
      } else{
        resArr[stockIndex]['totalShareCount'] += data[index]['shareCount'];
        resArr[stockIndex]['totalInvest'] += (data[index]['shareCount'] * data[index]['purchasePrice']);
        resArr[stockIndex]['detail'].push({
          'shareCount'    : data[index]['shareCount'],
          'purchasePrice' : data[index]['purchasePrice']
        });
      }
    }
    return resArr;
  }

  /* Helper function for finding the index of stock in an array*/
  findIndex(data: any[], searchObj: any){
    for(let index = 0; index < data.length; index++){
      if(searchObj.stockSymbol === data[index].stockSymbol){
        return index;
      }
    }
    return -1;
  }

}
