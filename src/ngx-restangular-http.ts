import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {RestangularHelper} from './ngx-restangular-helper';

@Injectable()
export class RestangularHttp {

  constructor(public http: HttpClient) {
  }

  createRequest(options) {
    let request = RestangularHelper.createRequest(options);

    return this.request(request);
  }

  request(request) {
    return this.http.request(request.method, request.url, {...request, observe: 'response' })
    .map((response: any) => {
      if (!response.ok) {
        return Observable.throw(new HttpErrorResponse(response));
      }
      return response;
    })
    .map(response => {
      response.config = {params: request};
      return response;
    })
    .catch(err => {
      err.request = request;
      err.data = err.error;
      err.repeatRequest = (newRequest?) => {
        return this.request(newRequest || request);
      };

      return Observable.throw(err);
    })
  }
}

