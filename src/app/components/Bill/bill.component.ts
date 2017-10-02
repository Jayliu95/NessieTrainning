import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account/account.service";
import {Account} from '../../models/account'
import {Bill} from "../../models/bill";
import {ActivatedRoute} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'nessie_bill',
  templateUrl: 'bill.component.html',
  styleUrls: [
    './style.css'
  ]
})

export class BillComponent implements OnInit{
  types: string[];
  newBill: any = {};
  account: Account;
  bills: Bill[];
  loaded: boolean;
  billCreated: boolean;
  id: number;
  private sub: any;

  constructor(
    private _accountService : AccountService,

    private _route: ActivatedRoute
  ){
    this.types = ["Checking", "Credit Card", "Savings"];
  }

  ngOnInit(){
    this.sub = this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getAccountById();
      this.getAccountBills()
  })
}

  getAccountBills(){
    this.loaded = false;
    this._accountService.getAccountBills(this.id)
      .subscribe(response => {
        this.bills = response.json();
        this.loaded = true;
      });

  }

  getAccountById(){
    this.loaded = false;
    this._accountService.getAccountById(this.id)
      .subscribe(response => {
        this.account = response.json();
        this.loaded = true;
      });
  }

  createAccountBill(){
    this.loaded = false;
    let billModel: Bill = new Bill(
      this.newBill.status,
      this.newBill.payee,
      this.newBill.nickname,
      this.newBill.payment_date,
      this.newBill.recurring_date,
      this.newBill.payment_amount
    );
    this._accountService.createAccountBills(this.id, billModel)
      .subscribe(
        data => {
          this.billCreated = true;
        },
        error => {
          console.log(error);
          this.loaded = true;
        });
  }


}
