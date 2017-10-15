import {Component, Inject, OnInit} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {DishProvider} from "../../providers/dish/dish";
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {Dish} from "../../shared/dish";
import {DishdetailPage} from "../dishdetail/dishdetail";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {
  dishes: Dish[];
  errorMsg: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _favoriteService: FavoriteProvider,
              private _dishService: DishProvider,
              private _toastCtrl: ToastController,
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

  addToFavorites(dish: Dish) {
    console.log('Adding to Favorites', dish.id);
    this._favoriteService.addFavorite(dish.id);
    this._toastCtrl.create({
      message: `Dish ${dish.id} added as a favorite successfully`,
      duration: 3000
    }).present();
  }

}
