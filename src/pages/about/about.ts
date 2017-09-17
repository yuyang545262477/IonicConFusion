import {Component, Inject, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LeaderProvider} from "../../providers/leader/leader";
import {Leader} from "../../shared/leader";

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit {
  leaders: Leader[];
  errorMsg: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _leaderService: LeaderProvider,
              @Inject('BaseURL') private _baseUrl) {
  }

  ngOnInit() {
    this._leaderService.getLeaders()
      .subscribe(
        (leaders) => this.leaders = leaders,
        (error) => this.errorMsg = error)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }


}
