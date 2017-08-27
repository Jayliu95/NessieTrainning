import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent }  from './app.component';
import {UserProfileComponent} from "./components/user_profile/index";
import {DisplayComponent} from "./components/display/index";
import {DashboardComponent} from "./components/dashboard/index";
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
import {DonateComponent} from "./components/donate/index";
import {FooterComponent} from "./components/footer/index";
import {NavbarExtendedComponent} from "./components/navbarExtended/index";
import {StockTableComponent} from "./components/stockTable/index";
import {NotificationComponent} from "./components/notification/index";
import {RobinHoodComponent} from "./components/robinhood/robinhood.component";
import {RobinhoodService} from "./services/robinhood.service";



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
      UserProfileComponent,
      RobinHoodComponent,
      DisplayComponent,
      DashboardComponent,
      StockTableComponent,
      NotificationComponent,
      RegisterComponent,
      LoginComponent,
      DonateComponent,
      NavbarComponent,
      NavbarExtendedComponent,
      FooterComponent,
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
