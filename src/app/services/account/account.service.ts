import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Bill} from "../../models/bill";
import {Purchase} from "../../models/purchase";
import {Deposit} from "../../models/deposit";

@Injectable()
export class AccountService{

  constructor(private _http: Http) {

  }

  getAccounts(){
    return this._http.get('/api/v1/accounts');
  }

  getAccountById(id: number){
    console.log(id);
    return this._http.get('/api/v1/accounts/' + id);
  }

  updateAccount(id: number, newAccount: any){
    return this._http.put('/api/v1/accounts/' + id, newAccount);
  }

  deleteAccount(id: number){
    return this._http.delete('/api/v1/accounts/' + id);
  }

  getAccountBills(id: number){
    return this._http.get('/api/v1/accounts/' + id + '/bills');
  }

  createAccountBills(id: number, newBill: Bill){
    return this._http.post('/api/v1/accounts/' + id + '/bills', newBill);
  }

  getAccountPurchases(id: number){
    return this._http.get('/api/v1/accounts/' + id + '/purchases');
  }

  createAccountPurchases(id: number, newPurchase: Purchase){
    return this._http.post('/api/v1/accounts/' + id + '/purchases', newPurchase);
  }

  getAccountDeposits(id: number){
    return this._http.get('/api/v1/accounts/' + id + '/deposits');
  }

  createAccountDeposit(id: number, newDeposit: Deposit){
    return this._http.post('/api/v1/accounts/' + id + '/deposits', newDeposit);
  }

  getEnterpriseAccounts(){
    return this._http.get('/api/v1/enterprises');
  }

  getEnterpriseAccountById(id: number){
    return this._http.get('/api/v1/enterprises/' + id);
  }

}
