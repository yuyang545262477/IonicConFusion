import {Component, Inject, OnInit} from '@angular/core';
import {
  AlertController,
  ItemSliding,
  LoadingController,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {Dish} from "../../shared/dish";

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {
  errMsg: any;
  favorites: Dish[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _favoriteService: FavoriteProvider,
              private _toastCtrl: ToastController,
              private _alterCtrl: AlertController,
              private _loadingCtrl: LoadingController,
              @Inject('BaseURL') private BaseUrl) {
  }


  ngOnInit() {
    this._favoriteService.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMsg = errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);

    let alert = this._alterCtrl.create({
      title: 'Confirm Delete',
      message: `Do you want to delete Dish ${id}`,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Delete cancelled');
        }
      }, {
        text: 'Delete',
        handler: () => {
          let loading = this._loadingCtrl.create({
            content: 'Deleting....'
          });
          let toast = this._toastCtrl.create({
            message: `Dish ${id} deleted successfully`,
            duration: 3000
          });
          loading.present();
          this._favoriteService.deleteFavorite(id)
            .subscribe(favorites => {
                this.favorites = favorites;
                loading.dismiss();
                toast.present();
              },
              errmess => this.errMsg = errmess);
        }
      }]
    });

    alert.present();
    item.close();

  }


}
