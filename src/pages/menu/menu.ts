import {Component, Inject, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DishProvider} from "../../providers/dish/dish";
import {Dish} from "../../shared/dish";
import {DishdetailPage} from "../dishdetail/dishdetail";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {
  dishes: Dish[];
  errorMsg: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _dishService: DishProvider,
              @Inject('BaseURL') private _baseUrl) {
  }

  ngOnInit() {
    this._dishService.getDishes()
      .subscribe(
        (dishes) => this.dishes = dishes,
        (errors) => this.errorMsg = <any>errors);
  }


  // noinspection JSUnusedGlobalSymbols
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  dishSelected(event, dish) {
    this.navCtrl.push(DishdetailPage, {dish})
  }

}
