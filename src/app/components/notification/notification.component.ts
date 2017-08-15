import {Component, OnInit} from '@angular/core';
import {PushNotificationsService} from "angular2-notifications/dist/index";

@Component({
  moduleId: module.id,
  selector: 'notification',
  templateUrl: 'notification.component.html'
})

export class NotificationComponent implements OnInit{
  public toNotify: boolean;
  constructor( private _pushNotifications: PushNotificationsService ) {
    this._pushNotifications.requestPermission();
  }

  ngOnInit(){
    this.toNotify = this._pushNotifications.isSupported();
  }

  testPushNotify(){
    console.log(this.toNotify);
    this._pushNotifications.create("Hello World", {body: 'Chicken Wings'}).subscribe(
      (res: any) => {console.log(res['notification']),
        res['notification']['onclick'] = this.event},
      (err:any) => console.log(err)
    );
  }

  event(){
    window.open("http://localhost:3000/");
  }



}
