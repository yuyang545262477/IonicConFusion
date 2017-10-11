import {Component} from '@angular/core';

/**
 * Generated class for the GlobalNavComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'global-nav',
  templateUrl: 'global-nav.html'
})
export class GlobalNavComponent {

  text: string;

  constructor() {
    console.log('Hello GlobalNavComponent Component');
    this.text = 'Hello World';
  }

}
