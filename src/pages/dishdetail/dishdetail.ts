import {Component, Inject} from '@angular/core';
import {
  ActionSheetController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {Dish} from "../../shared/dish";
import {CommentPage} from "../comment/comment";
import {SocialSharing} from "@ionic-native/social-sharing";

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
              private _actionSheetCtrl: ActionSheetController,
              private _modalCtrl: ModalController,
              private socialSharing: SocialSharing) {
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
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addFavorite();
          }
        },
        {
          text: 'Add a Comment',
          handler: () => {
            let commentPage = this._modalCtrl.create(CommentPage);
            commentPage.present();
            commentPage.onDidDismiss(data => {
              if (!data) return;
              this.dish.comments.push(data);
            });

          }
        },
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this._baseUrl + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this._baseUrl + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('cancel clicked');
          },
        }]
    });
    actionSheet.present();
  }
}
