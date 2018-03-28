import { HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { RestangularRequest } from './backend';
import { RestangularBaseHandler } from './handler';
import { InjectionToken } from '@angular/core';

export abstract class RestangularInterceptor {
  abstract intercept(req: RestangularRequest<any>, next: RestangularBaseHandler): Observable<HttpEvent<any>>;
}

export const RESTANGULAR_INTERCEPTORS = new InjectionToken<RestangularInterceptor[]>('RESTANGULAR_INTERCEPTORS ');

export class RestangularInterceptorHandler implements RestangularBaseHandler {
  constructor(private next: RestangularBaseHandler, private interceptor: RestangularInterceptor) {}

  handle(req: RestangularRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}

