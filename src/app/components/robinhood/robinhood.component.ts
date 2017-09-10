import {Component, OnInit, ViewChild} from '@angular/core';

import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {RobinhoodService} from "../../services/robinhood.service";
@Component({
  moduleId: module.id,
  templateUrl: 'robinhood.component.html',

})

export class RobinHoodComponent implements OnInit{
  @ViewChild('f') form: any;

  id: number;
  model: any = {};
  currUser : User;
  accountDetail : any;
  portfolio : any;
  loading = false;
  serviceLoaded = false;
  timer : any;
  constructor(
    private _userService: UserService,
    private _robinhood: RobinhoodService
  ){
    this.portfolio = {};
  }

  ngOnInit(){
    this.id = JSON.parse(localStorage.getItem('currentUser'))['_id'];
    //Get Current User Info
    if(localStorage.getItem('currentUser')){
      this._userService.getUser(this.id)
        .subscribe(user => {
          this.currUser = user;
          this.serviceLoaded = true;
        });
    }

    //Calling Robinhood
    this._robinhood.getAccountInfo()
      .subscribe(
        data => {
          console.log(data);
          this.accountDetail = JSON.parse(data['_body'])['results'][0];
          console.log(this.accountDetail);
        },
        error => {
          console.log(error);
        });

  }


  //Testing BackEnd
  getAccountRobin(){
    console.log("get Account got called");

    this._robinhood.getAccountInfo()
      .subscribe(
        data => {
          console.log(data);
          this.accountDetail = JSON.parse(data['_body'])['results'][0];
          console.log(this.accountDetail);
        },
        error => {
          console.log(error);
        });

  }

}
