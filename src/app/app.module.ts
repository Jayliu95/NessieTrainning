import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import {AccountComponent} from "./components/Account/account.component";
import {DashboardComponent} from "./components/Dashboard/index";
import {CustomerComponent} from "./components/Customer/index";

import {CustomerService} from "./services/customer/index";
import {
  AccountService
} from "./services/account/index";


import {routing} from "./app.router";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AppComponent} from "./app.component";
import {BillComponent} from "./components/Bill/bill.component";
import {PurchaseComponent} from "./components/Purchase/purchase.component";
import {MerchantService} from "./services/merchant/merchant";
import {DepositComponent} from "./components/Deposit/deposit.component";
import {EnterpriseComponent} from "./components/Enterprise/enterprise.component";
import {NavbarComponent} from "./components/Navbar/navbar.component";
import {DataComponent} from "./components/Data/data.component";
import {DataService} from "./services/data/data.service";
import {AtmComponent} from "./components/Atm/atm.component";
import {AtmService} from "./services/atm/atm.service";


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routing,
  ],
  providers: [
    AccountService,
    AtmService,
    CustomerService,
    DataService,
    MerchantService
  ],
  declarations:
    [ AppComponent,
      AccountComponent,
      AtmComponent,
      BillComponent,
      CustomerComponent,
      DashboardComponent,
      DataComponent,
      DepositComponent,
      EnterpriseComponent,
      NavbarComponent,
      PurchaseComponent
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
