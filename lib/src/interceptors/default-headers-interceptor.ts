import { Injectable } from '@angular/core';

import { RestangularInterceptor } from '../interceptor';
import { RestangularRequest } from '../backend';
import { RestangularBaseHandler } from '../handler';
import { RestangularConfig } from '../config';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class DefaultHeadersInterceptor implements RestangularInterceptor {

  constructor(
    private config: RestangularConfig,
  ) {}

  intercept(req: any, next: RestangularBaseHandler) {
    let setHeaders: {[name: string]: string};
    if (this.config.defaultHeaders) {
      if (this.config.defaultHeaders instanceof HttpHeaders) {
        setHeaders = this.config.defaultHeaders.keys()
        .reduce((acc, key) => ({...acc, [key]: (this.config.defaultHeaders as HttpHeaders).get(key)}), {});
      } else {
        setHeaders = this.config.defaultHeaders as {[name: string]: string};
      }
      req = req.clone({setHeaders});
    }
    return next.handle(req);
  }
}
