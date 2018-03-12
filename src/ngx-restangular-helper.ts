import {HttpRequest, HttpHeaders, HttpParams} from '@angular/common/http';

import {assign} from 'core-js/fn/object';

export class RestangularHelper {

  static createRequest(options) {
    let requestQueryParams = RestangularHelper.createRequestQueryParams(options.params);
    let requestHeaders = RestangularHelper.createRequestHeaders(options.headers);
    let methodName = options.method.toUpperCase();
    let withCredentials = options.withCredentials || false;

    let request = new HttpRequest(
      methodName,
      options.url,
      options.data,
      {
        headers: requestHeaders,
        params: requestQueryParams,
        responseType: options.responseType,
        withCredentials
      }
    )

    return request;
  }

  static createRequestQueryParams(queryParams) {
    let requestQueryParams = assign({}, queryParams);
    let search: HttpParams = new HttpParams();

    for (let key in requestQueryParams) {
      let value: any = requestQueryParams[key];

      if (Array.isArray(value)) {
        value.forEach(function(val){
          search.append(key, val);
        });
      } else {
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        search.append(key, value);
      }

    }

    return search;
  }

  static createRequestHeaders(headers) {
    for (let key in headers) {
      let value: any = headers[key];
      if (typeof value === 'undefined') {
        delete headers[key];
      }
    }

    return new HttpHeaders(assign({}, headers));
  }
}
