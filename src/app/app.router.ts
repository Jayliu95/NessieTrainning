import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {DashboardComponent} from "./components/dashboard/index";
import {UserProfileComponent} from "./components/user_profile/index";
import {StockTableComponent} from "./components/stockTable/index";
import {LoginComponent} from "./components/login/index";
import {RegisterComponent} from "./components/register/index";
import {AuthGuard} from "./guards/index";
import {DonateComponent} from "./components/donate/index";
import {NotificationComponent} from "./components/notification/notification.component";

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'stocktable',
    component: StockTableComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'donate',
    component: DonateComponent,
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
