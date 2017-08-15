import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'notification',
  templateUrl: 'notification.component.html'
})

export class NotificationComponent implements OnInit{
  public toNotify: boolean;
  constructor(  ) {

  }

  ngOnInit(){

  }

  testPushNotify(){
    console.log(this.toNotify);

  }





}
