import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {DashboardComponent} from "./components/Dashboard/index";
import {BillComponent} from "./components/Bill/bill.component";
import {PurchaseComponent} from "./components/Purchase/purchase.component";
import {DepositComponent} from "./components/Deposit/deposit.component";
import {EnterpriseComponent} from "./components/Enterprise/enterprise.component";
import {DataComponent} from "./components/Data/data.component";
import {AtmComponent} from "./components/Atm/atm.component";


const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'enterprise',
    component: EnterpriseComponent
  },
  { path: 'account-bills/:id',
    component: BillComponent,
  },
  {
    path: 'account-deposits/:id',
    component: DepositComponent
  },
  {
    path: 'account-purchases/:id',
    component: PurchaseComponent
  },
  {
    path: 'data',
    component: DataComponent
  },
  {
    path:'atms',
    component: AtmComponent
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
