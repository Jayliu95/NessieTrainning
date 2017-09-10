import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from "@angular/http";

import {Observable} from 'rxjs/Rx';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RobinhoodService {
  constructor(private _http: Http) {

  }

  getAccountInfo(){
    return this._http.get('/api/v1/robinhood/getAccount');
  }

}
