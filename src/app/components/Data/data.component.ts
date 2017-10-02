import {Component, OnInit, NgZone} from '@angular/core';
import {DataService} from "../../services/data/data.service";

@Component({
  moduleId: module.id,
  selector: 'nessie_data',
  templateUrl: 'data.component.html',
  styleUrls: [
    './style.css'
  ]
})

export class DataComponent implements OnInit{
  typeSelected: string;
  types: string[];
  loaded: boolean;
  deleted: boolean;
  errMsg: string;
  constructor(
    private _dataService : DataService
  ){
    this.types = ["Accounts", "Bills", "Customers", "Deposits", "Purchases"];
  }

  ngOnInit() {
  }

  deleteSelectedData(){
      this.loaded = false;
      this._dataService.deleteData(this.typeSelected)
        .subscribe(
          response => {
          this.loaded = true;
          this.deleted = true
        },
        error => {
          this.errMsg = error._body;
          this.loaded = true;
          this.deleted = false;
        })
  }
}
