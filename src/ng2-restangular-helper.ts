import {URLSearchParams, Headers, RequestOptions, RequestMethod} from '@angular/http';

export class RestangularHelper {
  
  static createRequestOptions(options) {
    let requestQueryParams = RestangularHelper.createRequestQueryParams(options.params);
    let requestHeaders = RestangularHelper.createRequestHeaders(options.headers);
    let methodName = options.method.charAt(0).toUpperCase() + options.method.substr(1).toLowerCase();
    let withCredentials = options.withCredentials || false;
    
    let requestOptions = new RequestOptions({
      method: RequestMethod[methodName],
      headers: requestHeaders,
      search: requestQueryParams,
      url: options.url,
      body: options.data,
      withCredentials
    });
    
    return requestOptions;
  }
  
  static createRequestQueryParams(queryParams) {
    let requestQueryParams = Object.assign({}, queryParams);
    let search: URLSearchParams = new URLSearchParams();
    
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
    
    return new Headers(Object.assign({}, headers));
  }
}
