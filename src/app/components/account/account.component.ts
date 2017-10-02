import {Component, OnInit, OnDestroy} from '@angular/core';
import {GoogleFinanceService} from "../../services/googleFinance.service";
import {UserService} from "../../services/user.service";

@Component({
  moduleId: module.id,
  selector: 'account',
  styleUrls: ['../../../assets/css/style.css'],
  templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit, OnDestroy{
  id: number;
  timer : any;
  constructor(
  ){
  }

  ngOnInit(){

  }


  ngOnDestroy() {
  }

  getStockData(){
  }


}
