import { HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';

export class RestangularHelper {

  static createRequest(options) {
    const requestQueryParams = RestangularHelper.createRequestQueryParams(options.params);
    const requestHeaders = RestangularHelper.createRequestHeaders(options.headers);
    const methodName = options.method.toUpperCase();
    const withCredentials = options.withCredentials || false;

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
    );

    if (['GET', 'DELETE', 'HEAD', 'JSONP', 'OPTIONS'].indexOf(methodName) >= 0) {
      request = new HttpRequest(
        methodName,
        options.url,
        {
          headers: requestHeaders,
          params: requestQueryParams,
          responseType: options.responseType,
          withCredentials
        }
      );
    }
    return request;
  }

  static createRequestQueryParams(queryParams) {
    const requestQueryParams = Object.assign({}, queryParams);
    let search: HttpParams = new HttpParams();

    for (const key in requestQueryParams) {
      let value: any = requestQueryParams[key];

      if (Array.isArray(value)) {
        value.forEach(function (val) {
          search = search.append(key, val);
        });
      } else {
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        search = search.append(key, value);
      }
    }

    return search;
  }

  static createRequestHeaders(headers) {
    for (const key in headers) {
      const value: any = headers[key];
      if (typeof value === 'undefined') {
        delete headers[key];
      }
    }

    return new HttpHeaders(Object.assign({}, headers));
  }
}
