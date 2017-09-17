import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the ProcessHttpmsgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProcessHttpmsgProvider {

  constructor(public http: Http) {
  }

  extractData(_response: Response) {
    return _response.json() || {};
  }

  handleError(_responseError: Response | any) {
    let backErrorMsg: string;
    if (_responseError instanceof Response) {
      const afterJson_responseError = _responseError.json();
      const errorInfo = afterJson_responseError.error || JSON.stringify(afterJson_responseError);
      backErrorMsg = `${_responseError.status} -  ${_responseError.statusText || ''} ${errorInfo}`
    }
    else {
      backErrorMsg = _responseError.message || _responseError.toString();
    }
    console.log(backErrorMsg);
    return Observable.throw(backErrorMsg);
  }


}
