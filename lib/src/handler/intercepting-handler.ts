import { Injectable, Injector } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { filter } from 'rxjs/operators/filter';

import { RestangularHandler } from './handler';
import { RestangularBackend, RestangularRequest } from '../backend';

@Injectable()
export class RestangularInterceptingHandler implements RestangularHandler {
  constructor(
    private backend: RestangularBackend,
    private injector: Injector
  ) {
  }

  handle<T>(req: RestangularRequest<T>) {
    return this.backend.handle(req)
    .pipe(
      filter(ev => ev instanceof HttpResponse)
    );
  }

  withConfig(options: any): RestangularHandler {
    const injector = Injector.create({
      providers: [],
    });
    return new RestangularInterceptingHandler(this.backend, injector);
  }

  extendConfig(options: any): RestangularHandler {
    const injector = Injector.create({
      providers: [],
      parent: this.injector,
    });
    return new RestangularInterceptingHandler(this.backend, injector);
  }
}
