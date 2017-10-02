import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {LoginComponent} from "./components/login/index";
import {RegisterComponent} from "./components/register/index";
import {AuthGuard} from "./guards/index";
import {AccountComponent} from "./components/account/account.component";
import {PersonalWalletComponent} from "./components/personal_wallet/personal_wallet.component";
import {SettingsComponent} from "./components/settings/settings.component";

const appRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'personal_wallet',
    component: PersonalWalletComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsComponent,
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
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
