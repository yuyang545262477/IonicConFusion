import {Component} from '@angular/core';
import {CallNumber} from "@ionic-native/call-number";
import {NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  phone: string = '+852 1234 5678';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private callNumber: CallNumber) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendEmail() {
    console.log('hello email');
    // Send a text message using default options
  }

  callRestaurant() {
    this.callNumber.callNumber(this.phone, true)
      .then(() => {
        console.log('call right');
      })
      .catch((error) => {
        console.log(`error happen ${error}`);
      })
  }

}
