import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AtmService{

  constructor(private _http: Http) {

  }

  getAtms(){
    return this._http.get('/api/v1/atms');
  }

  getAtmsById(pageNum: number){
    return this._http.get('/api/v1/atms/' + pageNum);
  }
}
