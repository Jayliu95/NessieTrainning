import {Component, OnInit, NgZone} from '@angular/core';
import {AccountService} from "../../services/account/account.service";
import {Account} from '../../models/account'
import {AtmService} from "../../services/atm/atm.service";

@Component({
  moduleId: module.id,
  selector: 'nessie_atm',
  templateUrl: 'atm.component.html',
  styleUrls: [
    './style.css'
  ]
})

export class AtmComponent implements OnInit {
  atms: any[];
  currPage: number = 1;
  loaded: boolean;


  constructor(private _atmService: AtmService,) {
  }

  ngOnInit() {
    this.getAllAtms(this.currPage);
  }


  setPrevPage(){
    this.currPage --;
    this.getAllAtms(this.currPage);
  }

  setNextPage(){
    this.currPage ++;
    this.getAllAtms(this.currPage);
  }

  getAllAtms(pageNum: number) {

    this.loaded = false;
    this._atmService.getAtmsById(pageNum)
      .subscribe(response => {
        this.atms = response.json()['data'];
        this.loaded = true;
      });
  }
}
