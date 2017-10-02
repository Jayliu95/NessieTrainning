import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account/account.service";
import {Account} from '../../models/account'
import {ActivatedRoute} from "@angular/router";
import {Purchase} from "../../models/purchase";
import {MerchantService} from "../../services/merchant/merchant";

@Component({
  moduleId: module.id,
  selector: 'nessie_purchase',
  templateUrl: 'purchase.component.html',
  styleUrls: [
    './style.css'
  ]
})

export class PurchaseComponent implements OnInit{
  newPurchase: any = {};
  account: Account;
  merchants: any;
  purchases: Purchase[];
  loaded: boolean;  //Note that this boolean is used to determined if all the resources have been filled in - bad practice for real use
  purchased: boolean;
  id: number;
  private sub: any;

  constructor(
    private _accountService : AccountService,
    private _merchantService: MerchantService,
    private _route: ActivatedRoute
  ){
    this.loaded = false;
  }

  ngOnInit(){
    this.sub = this._route.params.subscribe(params => {
      this.id = params['id'];
      this.getAccountById();
      this.getAccountPurchases();
      this.getMerchants();
    })
  }

  getAccountPurchases(){
    this.loaded = false;
    this._accountService.getAccountPurchases(this.id)
      .subscribe(response => {
        this.loaded = true;
        this.purchases = response.json()
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

  getMerchants(){
    this.loaded = false;
    this._merchantService.getMerchants()
      .subscribe(response => {
        this.loaded = true;
        this.merchants = response.json()['data'];
      });

  }
  createAccountPurchase(){
    this.loaded = false;
    let purchaseModel: Purchase = new Purchase(
      this.newPurchase.merchant_id,
      this.newPurchase.medium,
      this.newPurchase.purchase_date,
      this.newPurchase.amount,
      this.newPurchase.description
    );
    this._accountService.createAccountPurchases(this.id, purchaseModel)
      .subscribe(
        response => {
          this.purchased = true;
        },
        error => {
          console.log(error);
          this.loaded = true;
        });
  }



}
