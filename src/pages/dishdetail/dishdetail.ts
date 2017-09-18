import {Component, Inject} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Dish} from "../../shared/dish";
import {FavoriteProvider} from "../../providers/favorite/favorite";

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMsg: string;
  avgStars: string;
  numComments: number;
  favorite: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _favoriteService: FavoriteProvider,
              @Inject('BaseURL') private _baseUrl) {
    let Total = 0;
    this.dish = this.navParams.get('dish');
    this.numComments = this.dish.comments.length;
    //get total
    this.dish.comments.map((comment) => {
      Total += comment.rating;
    });
    this.favorite = this._favoriteService.isFavorite(this.dish.id);
    //get avg stars;
    this.avgStars = (Total / this.numComments).toFixed(2);

  }

  // noinspection JSUnusedGlobalSymbols
  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    if (this.favorite) return;
    console.log(`Add to Favorites ${this.dish.id}`);
    this.favorite = this._favoriteService.addFavorite(this.dish.id);
  }

}
