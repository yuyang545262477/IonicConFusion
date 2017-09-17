import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {baseURL} from "../../shared/baseurl";
import {Promotion} from "../../shared/promotion";
import {ProcessHttpmsgProvider} from "../process-httpmsg/process-httpmsg";

/*
  Generated class for the PromotionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
 */
@Injectable()
export class PromotionProvider {

  constructor(public http: Http,
              private _processHttpMsgService: ProcessHttpmsgProvider) {
    console.log('Hello PromotionProvider Provider');
  }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseURL + 'promotions')
      .map(res => {
        return this._processHttpMsgService.extractData(res);
      })
      .catch(error => {
        return this._processHttpMsgService.handleError(error);
      });
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions/' + id)
      .map(res => {
        return this._processHttpMsgService.extractData(res);
      })
      .catch(error => {
        return this._processHttpMsgService.handleError(error);
      });
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true')
      .map(res => {
        return this._processHttpMsgService.extractData(res)[0];
      })
      .catch(error => {
        return this._processHttpMsgService.handleError(error);
      });
  }

}
