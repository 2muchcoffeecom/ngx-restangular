import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { RestangularInterceptor } from '../interceptor';
import { RestangularRequest } from '../backend';
import { RestangularBaseHandler } from '../handler';
import { RestangularConfig } from '../config';

@Injectable()
export class DefaultParamsInterceptor implements RestangularInterceptor {

  constructor(
    private config: RestangularConfig,
  ) {}

  intercept(req: RestangularRequest<any>, next: RestangularBaseHandler) {
    let setParams: {[name: string]: string};
    if (this.config.defaultParams) {
      if (this.config.defaultParams instanceof HttpParams) {
        setParams = this.config.defaultParams.keys()
        .reduce((acc, key) => ({...acc, [key]: (this.config.defaultParams as HttpParams).get(key)}), {});
      } else {
        setParams = this.config.defaultParams as {[name: string]: string};
      }
      req = req.clone({setParams});
    }
    return next.handle(req);
  }
}
