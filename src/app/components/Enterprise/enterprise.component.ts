import {Component, OnInit, NgZone} from '@angular/core';
import {AccountService} from "../../services/account/account.service";
import {Account} from '../../models/account'

@Component({
  moduleId: module.id,
  selector: 'nessie_enterprise',
  templateUrl: 'enterprise.component.html',
  styleUrls: [
    './style.css'
  ]
})

export class EnterpriseComponent implements OnInit {
  accounts_raw : any;
  accounts: Account[];
  accounts_page_size: number;   //each page = 20 accounts
  accounts_page_array: any = [];
  currentPageRangeStart: number = 0;
  currentPageRangeEnd : number = 19;
  loaded: boolean;

  constructor(private _accountService: AccountService,) {
  }

  ngOnInit() {
    this.getAllAccounts();
  }

  getNumArray(num: number){
    for(let index = 0 ; index < num; index++){
      this.accounts_page_array[index] = index;
    }
  }

  setPrevPage(){
    this.currentPageRangeEnd = this.currentPageRangeStart - 1 ;
    this.currentPageRangeStart -= 20;
    this.accounts = this.accounts_raw.slice(this.currentPageRangeStart, this.currentPageRangeEnd);

  }

  setNextPage(){
    this.currentPageRangeStart = this.currentPageRangeEnd + 1;
    this.currentPageRangeEnd += 20;
    this.accounts = this.accounts_raw.slice(this.currentPageRangeStart, this.currentPageRangeEnd);
  }

  getAllAccounts() {

    this.loaded = false;
    this._accountService.getEnterpriseAccounts()
      .subscribe(response => {
        this.accounts_raw = response.json().results;
        this.accounts = this.accounts_raw.slice(this.currentPageRangeStart, this.currentPageRangeEnd);
        this.accounts_page_size = Math.ceil(this.accounts_raw.length / 20);
        console.log(this.accounts_raw.length);
        this.getNumArray(this.accounts_page_size);
        console.log(this.accounts_page_size);

        this.loaded = true;
      });
  }
}
