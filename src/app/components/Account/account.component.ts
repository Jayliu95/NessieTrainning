import {Component, OnInit, NgZone} from '@angular/core';
import {AccountService} from "../../services/account/account.service";
import {Account} from '../../models/account'

@Component({
  moduleId: module.id,
  selector: 'nessie_account',
  templateUrl: 'account.component.html',
  styleUrls: [
    './style.css'
  ]
})

export class AccountComponent implements OnInit{
  types: string[];
  searchId: number;
  searchRes: any;
  accounts: Account[];
  updatedAccountModel:any = {};
  loaded: boolean;

  constructor(
    private _accountService : AccountService,
    public zone: NgZone
  ){
    this.types = ["Checking", "Credit Card", "Savings"];
  }

  ngOnInit(){
    this.getAllAccounts();
  }

  getAllAccounts(){
    this.loaded = false;
    this._accountService.getAccounts()
      .subscribe(response => {
        this.accounts = response.json();
        this.loaded = true;
      });
  }


  searchAccount(){
    this.loaded = false;
    this._accountService.getAccountById(this.searchId)
      .subscribe(response => {
        this.searchRes = response.json();
        this.loaded = true;
      })
  }

  triggerUpdateAccount(accountIndex: number){
    this.accounts[accountIndex].toEdit = true;
    this.updatedAccountModel = {
      type : this.accounts[accountIndex].type,
      nickname : this.accounts[accountIndex].nickname,
      rewards : this.accounts[accountIndex].rewards,
      balance: this.accounts[accountIndex].balance,
      account_number: this.accounts[accountIndex].account_number
    }
  }

  closeUpdateAccount(accountIndex: number){
    this.accounts[accountIndex].toEdit = false;
    this.updatedAccountModel = {};
  }

  updateAccount(id: number, accountIndex: number){
    this.loaded = false;
    //Validate updated account model
    if(this.checkObjectProperties(this.updatedAccountModel) == false){
      console.log("Not all fields are filled out");
      this.loaded = true;
      this.accounts[accountIndex].toEdit = false;
    }else {
      this._accountService.updateAccount(id, {
        nickname : this.updatedAccountModel.nickname,
        account_number : this.updatedAccountModel.account_number.toString()
      })
        .subscribe(response => {
          this.zone.run(() =>  {
            this.accounts[accountIndex].toEdit = false;
            this.getAllAccounts();
          });
        }, error => {
          console.log(error);
        })
    }
  }
  checkObjectProperties(obj: {}): boolean{
    if (obj == null || Object.keys(obj).length == 0){ return false;}
    for (var key in obj) {
      if (obj[key] === null && obj[key] == "")
        return false;
    }
    return true;
  }

  deleteAccount(id: number){
    this.loaded = false;
    this._accountService.deleteAccount(id)
      .subscribe(response => {
        this.zone.run(() => {
          this.loaded = true;
          this.getAllAccounts()
        });
      })
  }
}
