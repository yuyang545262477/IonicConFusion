import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {baseURL} from "../../shared/baseurl";
import {Leader} from "../../shared/leader";
import {ProcessHttpmsgProvider} from "../process-httpmsg/process-httpmsg";

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: Http,
              private _processHttpMsgService: ProcessHttpmsgProvider) {
    console.log('Hello LeaderProvider Provider');
  }

  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseURL + 'leaders')
      .map(res => {
        return this._processHttpMsgService.extractData(res);
      })
      .catch(error => {
        return this._processHttpMsgService.handleError(error);
      });
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get(baseURL + 'leaders/' + id)
      .map(res => {
        return this._processHttpMsgService.extractData(res);
      })
      .catch(error => {
        return this._processHttpMsgService.handleError(error);
      });
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true')
      .map(res => {
        return this._processHttpMsgService.extractData(res)[0];
      })
      .catch(error => {
        return this._processHttpMsgService.handleError(error);
      });
  }

}
