import { Injectable, Injector } from '@angular/core';
import { HttpBackend, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';

import { filter } from 'rxjs/operators/filter';

import { RestangularHandler } from './handler';
import { RestangularRequest } from '../backend';
import { RestangularConfig } from '../config';
import { combineHeaders, combineParams, escapeSlash, isHttpHeaders, isHttpParams, normalizeUrl } from '../utils';
import { RestangularFieldsMap } from '../mapping';

@Injectable()
export class RestangularInterceptingHandler implements RestangularHandler {

  private config: RestangularConfig;

  public restangularFields: RestangularFieldsMap;

  constructor(
    private backend: HttpBackend,
    private injector: Injector,
  ) {
  }

  handle<T>({
    method,
    builder,
    body,
    params = new HttpParams(),
    headers = new HttpHeaders()
  }: RestangularRequest<T>) {
    this.injectConfig();

    const url = this.getNormalizedUrl(builder.pointer);

    headers = this.extendHeadersWithDefault(headers);
    params = this.extendParamsWithDefault(params);

    const httpRequest = new HttpRequest(
      method,
      url,
      body,
      {
        params,
        headers,
      });

    return this.backend.handle(httpRequest)
    .pipe(
      filter(ev => ev instanceof HttpResponse)
    );
  }

  withConfig(options: any) {
    const injector = Injector.create({
      providers: [],
    });
    return new RestangularInterceptingHandler(this.backend, injector);
  }

  extendConfig(options: any) {
    const injector = Injector.create({
      providers: [],
      parent: this.injector,
    });
    return new RestangularInterceptingHandler(this.backend, injector);
  }

  private injectConfig() {
    if (!this.config) {
      this.config = this.injector.get(RestangularConfig);
      this.restangularFields = this.config.restangularFields || new RestangularFieldsMap({});
    }
  }

  private getUrl(pointer: string[]) {
    const baseUrl = typeof this.config.baseUrl === 'undefined' ? '' : this.config.baseUrl;

    return pointer.reduce((acc, item) => escapeSlash(acc) + '/' + item, baseUrl);
  }

  private getNormalizedUrl(pointer: string[]) {
    return normalizeUrl(this.getUrl(pointer));
  }

  private extendHeadersWithDefault(headers: HttpHeaders): HttpHeaders {
    const defaultHeaders = this.config.defaultHeaders;
    if (headers && !isHttpHeaders(headers)) {
      throw new Error('headers must be instance of HttpHeaders');
    }
    if (defaultHeaders && !isHttpHeaders(defaultHeaders)) {
      throw new Error('Configuration defaultHeaders must be instance of HttpHeaders');
    }
    if (defaultHeaders && isHttpHeaders(defaultHeaders)) {
      return combineHeaders(defaultHeaders, headers, this.config.appendHeaders);
    }
    return headers || new HttpHeaders();
  }

  private extendParamsWithDefault(params: HttpParams): HttpParams {
    const defaultParams = this.config.defaultParams;
    if (params && !isHttpParams(params)) {
      throw new Error('params must be instance of HttpParams');
    }
    if (defaultParams && !isHttpParams(defaultParams)) {
      throw new Error('Configuration defaultParams must be instance of HttpParams');
    }
    if (defaultParams && isHttpParams(defaultParams)) {
      return combineParams(defaultParams, params, this.config.appendParams);
    }
    return params || new HttpParams();
  }
}
