import { Injectable, Injector } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { filter } from 'rxjs/operators/filter';

import { RestangularBaseHandler } from './handler';
import { RestangularBackend, RestangularRequest } from '../backend';
import { RESTANGULAR_INTERCEPTORS, RestangularInterceptorHandler } from '../interceptor';

@Injectable()
export class RestangularInterceptingHandler implements RestangularBaseHandler {
  private chain: RestangularBaseHandler;
  constructor(
    private backend: RestangularBackend,
    private injector: Injector
  ) {
  }

  handle<T>(req: RestangularRequest<T>) {
    const interceptors = this.injector.get(RESTANGULAR_INTERCEPTORS, []);

    this.chain = interceptors.reduceRight((next, interceptor) => new RestangularInterceptorHandler(next, interceptor), this.backend);

    return this.chain.handle(req.clone({setParams: req.params, setHeaders: req.headers}))
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
