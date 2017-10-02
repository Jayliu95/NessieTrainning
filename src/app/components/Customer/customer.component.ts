import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account/account.service";
import {Account} from '../../models/account'
import {Bill} from "../../models/bill";
import {CustomerService} from "../../services/customer/customer.service";
import {Customer} from "../../models/customer";

@Component({
  moduleId: module.id,
  selector: 'nessie_customer',
  templateUrl: 'customer.component.html',
  styleUrls: [
    './style.css'
  ]
})

export class CustomerComponent implements OnInit{
  types: string[];
  newAccount: any = {};
  searchId: number;
  searchRes: any;
  customers: any;
  bills: Bill;
  loaded: boolean;
  customerCreated: boolean;

  constructor(
    private _customerService : CustomerService
  ){
    this.types = ["Checking", "Credit Card", "Savings"];
    this.customerCreated = false;
  }

  ngOnInit(){
    // Get All Customers
    this.loaded = false;
    this._customerService.getCustomers()
      .subscribe(response => {
        this.customers = response.json();
        this.loaded = true;
      });
  }

  createCustomerAccount(){
    this.loaded = false;
    let accountModel: Account = new Account(
      this.newAccount.type,
      this.newAccount.nickname,
      this.newAccount.rewards,
      this.newAccount.balance,
      (this.newAccount.account_number).toString()
    );
    this._customerService.createCustomerAccount(this.newAccount.customerId, accountModel)
      .subscribe(
        data => {
          this.customerCreated = true;
        },
        error => {
          console.log(error);
          this.loaded = true;
        });

  }

}
