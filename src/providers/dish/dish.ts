import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {baseURL} from "../../shared/baseurl";
import {Dish} from "../../shared/dish";
import {ProcessHttpmsgProvider} from "../process-httpmsg/process-httpmsg";

/*
  Generated class for the DishProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishProvider {

  constructor(public http: Http,
              private _processHttpMsgService: ProcessHttpmsgProvider) {
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
      .map(res => {
        return this._processHttpMsgService.extractData(res);
      })
      .catch(error => {
        return this._processHttpMsgService.handleError(error);
      });
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + 'dishes/' + id)
      .map(res => {
        return this._processHttpMsgService.extractData(res);
      })
      .catch(error => {
        return this._processHttpMsgService.handleError(error);
      });
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
      .map(res => {
        return this._processHttpMsgService.extractData(res)[0];
      })
      .catch(error => {
        return this._processHttpMsgService.handleError(error);
      });
  }


}
