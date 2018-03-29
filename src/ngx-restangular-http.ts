import { Injectable } from '@angular/core';
import { HttpBackend, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';

import { RestangularHelper } from './ngx-restangular-helper';

@Injectable()
export class RestangularHttp {

  constructor(public http: HttpBackend) {
  }

  createRequest(options) {
    const request = RestangularHelper.createRequest(options);

    return this.request(request);
  }

  request(request: HttpRequest<any>) {
    return this.http.handle(request)
    .filter(event => event instanceof HttpResponse)
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

