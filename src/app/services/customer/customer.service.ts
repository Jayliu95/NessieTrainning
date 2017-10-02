import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import {Observable} from 'rxjs/Rx';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Account} from "../../models/account";
import {Customer} from "../../models/customer";


@Injectable()
export class CustomerService {

  constructor(private _http: Http) {

  }

  getCustomers(){
    return this._http.get('/api/v1/customers');
  }

  getCustomerById(id: number){
    return this._http.get('/api/v1/customers/' + id);
  }

  createCustomer(newCustomer: Customer){
    return this._http.post('/api/v1/customers', newCustomer);
  }

  //Needs to remove the toEditField due to forced change - can be resolved
  createCustomerAccount(id: number, newAccount: Account){
    delete newAccount.toEdit;
    return this._http.post('/api/v1/customers/' + id + '/accounts', newAccount);
  }


}
