import {Component, OnInit} from '@angular/core';

import {Stock} from '../../models/stock';
@Component({
  moduleId: module.id,
  templateUrl: 'personal_wallet.component.html',
})

export class PersonalWalletComponent implements OnInit{
  model : any;
  loading: boolean = false;
  constructor() {}

  ngOnInit() {
  }

  test(){}

}

