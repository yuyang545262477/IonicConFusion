import {Component, Inject} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {Dish} from "../../shared/dish";

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
  favorite: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _favoriteService: FavoriteProvider,
              private _toastCtrl: ToastController,
              @Inject('BaseURL') private _baseUrl,
              private _actionSheetCtrl: ActionSheetController) {
    let Total = 0;
    this.dish = this.navParams.get('dish');
    this.favorite = this._favoriteService.isFavorite(this.dish.id);
    this.numComments = this.dish.comments.length;
    //get total
    this.dish.comments.map((comment) => {
      Total += comment.rating;
    });
    //get avg stars;
    this.avgStars = (Total / this.numComments).toFixed(2);

  }

  // noinspection JSUnusedGlobalSymbols
  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addFavorite() {
    console.log(`Add to Favorites ${this.dish.id}`);
    this.favorite = this._favoriteService.addFavorite(this.dish.id);
    this._toastCtrl.create({
      message: `Dish ${this.dish.id} added as a favorite successfully`,
      position: 'middle',
      duration: 3000
    }).present();
  }


  callActionSheet() {
    let actionSheet = this._actionSheetCtrl.create({
      buttons: [{
        text: 'Add to Favorites',
        handler: () => {
          this.addFavorite();
        }
      }, {
        text: 'Add a Comment',
        handler: () => {
          console.log('Comment clicked');
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancel clicked');
        }
      }]
    });
    actionSheet.present();
  }
}
