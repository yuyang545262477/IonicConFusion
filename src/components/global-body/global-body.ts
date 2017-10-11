import {Component} from '@angular/core';

/**
 * Generated class for the GlobalBodyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'global-body',
  templateUrl: 'global-body.html'
})
export class GlobalBodyComponent {

  text: string;

  constructor() {
    console.log('Hello GlobalBodyComponent Component');
    this.text = 'Hello World';
  }

}
