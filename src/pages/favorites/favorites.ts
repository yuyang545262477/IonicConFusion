import {Component, Inject, OnInit} from '@angular/core';
import {IonicPage, ItemSliding, NavController, NavParams} from 'ionic-angular';
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {Dish} from "../../shared/dish";

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
    this._favoriteService.deleteFavorite(id)
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMsg = errmess);
    item.close();

  }


}
