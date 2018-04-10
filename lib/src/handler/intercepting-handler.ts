import { Injectable, Injector } from '@angular/core';
import { HttpBackend, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

import { filter } from 'rxjs/operators/filter';

import { RestangularBaseHandler } from './handler';
import { RestangularRequest } from '../backend';
import { RestangularConfig } from '../config';
import { appendHeaders, escapeSlash, isHttpHeaders, normalizeUrl } from '../utils';

@Injectable()
export class RestangularInterceptingHandler implements RestangularBaseHandler {

  private config: RestangularConfig;

  constructor(
    private backend: HttpBackend,
    private injector: Injector,
  ) {
  }

  handle<T>({method, builder, body, params, headers = new HttpHeaders()}: RestangularRequest<T>) {
    this.injectConfig();

    const url = this.getNormalizedUrl(builder.pointer);

    headers = this.extendHeadersWithDefault(headers);

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

  withConfig(options: any): RestangularBaseHandler {
    const injector = Injector.create({
      providers: [],
    });
    return new RestangularInterceptingHandler(this.backend, injector);
  }

  extendConfig(options: any): RestangularBaseHandler {
    const injector = Injector.create({
      providers: [],
      parent: this.injector,
    });
    return new RestangularInterceptingHandler(this.backend, injector);
  }

  private injectConfig() {
    if (!this.config) {
      this.config = this.injector.get(RestangularConfig);
    }
  }

  private getUrl(pointer: string[]) {
    const baseUrl = typeof this.config.baseUrl === 'undefined' ? '' : this.config.baseUrl;

    return pointer.reduce((acc, item) => escapeSlash(acc) + '/' + item, baseUrl);
  }

  private getNormalizedUrl(pointer: string[]) {
    return normalizeUrl(this.getUrl(pointer));
  }

  private extendHeadersWithDefault(headers: HttpHeaders) {
    const defaultHeaders = this.config.defaultHeaders;
    if (headers && !isHttpHeaders(headers)) {
      throw new Error('headers must be instance of HttpHeaders');
    }
    if (defaultHeaders && !isHttpHeaders(defaultHeaders)) {
      throw new Error('Configuration defaultHeaders must be instance of HttpHeaders');
    }
    if (defaultHeaders && isHttpHeaders(defaultHeaders)) {
      return appendHeaders(defaultHeaders, headers, this.config.appendHeaders);
    }
    return headers || new HttpHeaders();
  }
}
