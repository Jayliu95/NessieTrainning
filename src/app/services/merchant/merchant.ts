import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MerchantService {

  constructor(private _http: Http) {

  }
  getMerchants(){
    return this._http.get('/api/v1/merchants');
  }



}
