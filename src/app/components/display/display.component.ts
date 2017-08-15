import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'display.component.html'
})

export class DisplayComponent implements OnInit{

  ngOnInit(){
    console.log("Displaying initial message");
  }
}
