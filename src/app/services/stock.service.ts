import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {Stock} from "../models/stock";

import {Observable} from 'rxjs/Rx';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StockService {
  constructor(private _http: Http) {

  }

  getStocks(id: number){
    return this._http.get('/api/v1/'+id+'/stocks', this.jwt()).map((response: Response) => response.json());
  }

  getStock(id: number, stockSymbol: string){
    return this._http.get('/api/v1/'+id+'/stocks/'+stockSymbol, this.jwt()).map((response: Response) => response.json());
  }


  createStock(id: number, stock: Stock){
    let req = {
      '_id' : id,
      'stock': stock
    };
    return this._http.post('/api/v1/'+id+'/stocks', req, this.jwt());
  }

  editStock(id: number, oldStock: Object, newStock: Object){
    let req = {
      '_id': id,
      'oldStock':oldStock,
      'newStock': newStock
    };
    return this._http.put('/api/v1/'+id+'/stocks/'+oldStock['stockSymbol'], req, this.jwt())
      .map((response: Response) => {response; });
  }

  deleteStock(id: number, stock: Object){
    return this._http.delete('/api/v1/'+id+'/stocks/'+stock['stockSymbol'])
      .map((response: Response) => {console.log(response); response.json(); });
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
