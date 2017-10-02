import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {Observable} from 'rxjs/Rx';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DataService {

  constructor(private _http: Http) {

  }

  deleteData(type: string){
    return this._http.delete('/api/v1/data/' + type);
  }




}
