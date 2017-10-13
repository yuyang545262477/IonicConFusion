import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from "@ionic/storage";
import {LocalNotifications} from "@ionic-native/local-notifications";

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Dish} from "../../shared/dish";
import {DishProvider} from "../dish/dish";

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  storageKey: string = 'favorites';
  favorites: Array<any>;

  constructor(public http: Http,
              private _dishService: DishProvider,
              private _storage: Storage,
              private localNotify: LocalNotifications) {

    this._storage.get(this.storageKey)
      .then(favorites => {
        this.favorites = favorites || [];
      })
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
      this.favorites.push(id);
      this._storage.set(this.storageKey, this.favorites);
      this.localNotify.schedule({
        id,
        text: `Dish ${id} added as favorite successfully`
      })
    }

    return true;

  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id)
  }

  getFavorites(): Observable<Dish[]> {
    return this._dishService.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this._storage.set(this.storageKey, this.favorites);
      return this.getFavorites();
    } else {
      console.log(`Deleting non-existent favorite ${id}`);
      return Observable.throw(`Deleting non-existent favorite ${id}`);
    }
  }
}
