import {Injectable} from '@angular/core';
import {Http, Request} from '@angular/http';
import {Observable} from 'rxjs';

import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {RestangularHelper} from './ngx-restangular-helper';


@Injectable()
export class RestangularHttp {
  
  constructor(public http: Http) {
  }
  
  createRequest(options) {
    let requestOptions = RestangularHelper.createRequestOptions(options);
    let request = new Request(requestOptions);
    
    return this.request(request);
  }
  
  request(request) {
    return this.http.request(request)
    .map((response: any) => {
      response.config = {params: request};
      return response;
    })
    .map((response: any) => {
      if (response._body) {
        response.data = typeof response._body == 'string' ? JSON.parse(response._body) : response._body;
      } else {
        response.data = null
      }
      return response;
    })
    .catch(err => {
      try {
        err.data = typeof err._body == 'string' && err._body.length > 0 ? JSON.parse(err._body) : err._body;
      } catch (e) {
        err.data = err._body;
      }
      
      err.request = request;
      err.repeatRequest = (newRequest?) => {
        return this.request(newRequest || request);
      };
      
      return Observable.throw(err);
    })
  }
}

