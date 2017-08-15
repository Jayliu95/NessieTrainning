import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {IntervalObservable} from "rxjs/observable/IntervalObservable";


@Injectable()
export class GoogleFinanceService{
  constructor(private _http: Http){}

  getStockData(req: string){
    return this._http.get(req)
      .map((response: Response) =>
     JSON.parse(response['_body'].toString().substring(3,response['_body'].toString()._length))
    );
  }
}

