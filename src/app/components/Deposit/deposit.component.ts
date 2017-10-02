import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account/account.service";
import {Account} from '../../models/account'
import {ActivatedRoute} from "@angular/router";
import {Deposit} from "../../models/deposit";

@Component({
  moduleId: module.id,
  selector: 'nessie_deposit',
  templateUrl: 'deposit.component.html',
  styleUrls: [
    './style.css'
  ]
})

export class DepositComponent implements OnInit{
  newDeposit: any = {};
  account: Account;
  merchants: any;
  deposits: Deposit[];
  loaded: boolean;  //Note that this boolean is used to determined if all the resources have been filled in - bad practice for real use
  deposited: boolean;
  id: number;
  private sub: any;

  constructor(
    private _accountService : AccountService,
    private _route: ActivatedRoute
  ){
    this.loaded = false;
  }

  ngOnInit(){
    this.sub = this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getAccountById();
      this.getAccountDeposits();
    })
  }

  getAccountDeposits(){
    this.loaded = false;
    this._accountService.getAccountDeposits(this.id)
      .subscribe(response => {
        this.loaded = true;
        this.deposits = response.json()
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


  createAccountDeposit(){
    this.loaded = false;
    let depositModel: Deposit = new Deposit(
      this.newDeposit.medium,
      this.newDeposit.transaction_date,
      this.newDeposit.amount,
      this.newDeposit.description
    );
    this._accountService.createAccountDeposit(this.id, depositModel)
      .subscribe(
        response => {
          this.deposited = true;
          this.getAccountDeposits();
        },
        error => {
          console.log(error);
          this.loaded = true;
        });
  }



}
