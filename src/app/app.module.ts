import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent }  from './app.component';
import {NavbarComponent} from "./components/navbar/index";
import {RegisterComponent} from "./components/register/index";
import {LoginComponent} from "./components/login/index";

import {
  GoogleFinanceService,
  AuthenticationService,
  UserService,
  AlertService,
  StockService
} from "./services/index";

import {routing} from "./app.router";
import {AppConfig} from "./app.config";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthGuard} from "./guards/auth.guard";
import {FooterComponent} from "./components/footer/index";
import {NavbarExtendedComponent} from "./components/navbarExtended/index";
import {RobinhoodService} from "./services/robinhood.service";
import {AccountComponent} from "./components/account/account.component";
import {PersonalWalletComponent} from "./components/personal_wallet/personal_wallet.component";
import {SettingsComponent} from "./components/settings/settings.component";



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
    AppConfig,
    GoogleFinanceService,
    AuthenticationService,
    UserService,
    StockService,
    AuthGuard,
    AlertService,
    RobinhoodService
  ],
  declarations:
    [ AppComponent,
      AccountComponent,
      PersonalWalletComponent,
      SettingsComponent,
      RegisterComponent,
      LoginComponent,
      NavbarComponent,
      NavbarExtendedComponent,
      FooterComponent,
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
