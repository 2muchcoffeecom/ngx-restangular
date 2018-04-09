import { Injectable, Injector } from '@angular/core';
import { HttpBackend, HttpRequest, HttpResponse } from '@angular/common/http';

import { filter } from 'rxjs/operators/filter';

import { RestangularBaseHandler } from './handler';
import { RestangularRequest } from '../backend';
import { RestangularConfig } from '../config';

@Injectable()
export class RestangularInterceptingHandler implements RestangularBaseHandler {

  private config: RestangularConfig;

  constructor(
    private backend: HttpBackend,
    private injector: Injector,
  ) {
  }

  handle<T>({method, builder, body, params, headers}: RestangularRequest<T>) {
    this.injectConfig();

    const url = this.getNormalizedUrl(builder.pointer);
    debugger;
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

    return pointer.reduce((acc, item) => this.escapeSlash(acc) + '/' + item, baseUrl);
  }

  private getNormalizedUrl(pointer: string[]) {
    return this.normalizeUrl(this.getUrl(pointer));
  }

  private normalizeUrl(url: string) {
    const parts = /((?:http[s]?:)?\/\/)?(.*)?/.exec(url);
    parts[2] = parts[2].replace(/[\\\/]+/g, '/');
    return (typeof parts[1] !== 'undefined') ? parts[1] + parts[2] : parts[2];
  }

  private escapeSlash(url: string = '') {
    if (typeof url === 'string') {
      return url.replace(/\/$/, '');
    }
    throw new Error('Couldn\'t transform not string values');
  }
}
