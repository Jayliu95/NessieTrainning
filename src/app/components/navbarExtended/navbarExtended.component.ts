import {Component} from '@angular/core';
@Component({
  moduleId: module.id,
  selector: 'navbarExtended',
  templateUrl: 'navbarExtended.component.html'
})

export class NavbarExtendedComponent {
  dropdownValues: string[];
  constructor(){
    this.dropdownValues = ['Option1, Option2'];
  }
}
