import {Component, ViewChild} from '@angular/core';
import {DataTableResource, DataTable, DataTableTranslations} from "angular-2-data-table";
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
  stockResource = new DataTableResource(null);
  stocks:any = [];
  stockCount:number= 0;
  serviceLoaded: boolean = false;

  @ViewChild(DataTable) stocksTable: any;

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
            this.stockResource = new DataTableResource(this.data);
            this.stockResource.count().then(count => this.stockCount = count);
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

  reloadStocks(params:any) {
    console.log(this.stockResource);
    this.stockResource.query(params).then(stocks => this.stocks = stocks);
  }

  // special params:

  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };
}
