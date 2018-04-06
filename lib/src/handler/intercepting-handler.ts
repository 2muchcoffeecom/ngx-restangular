import { Injectable, Injector } from '@angular/core';
import { HttpBackend, HttpRequest, HttpResponse } from '@angular/common/http';

import { filter } from 'rxjs/operators/filter';

import { RestangularBaseHandler } from './handler';
import { RestangularRequest } from '../backend';

@Injectable()
export class RestangularInterceptingHandler implements RestangularBaseHandler {

  constructor(
    private backend: HttpBackend,
    private injector: Injector
  ) {
  }

  handle<T>({method, builder, body, params, headers}: RestangularRequest<T>) {
    const url = builder.pointer.join('/');
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
}
