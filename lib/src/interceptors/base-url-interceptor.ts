import { Injectable } from '@angular/core';

import { RestangularInterceptor } from '../interceptor';
import { RestangularRequest } from '../backend';
import { RestangularBaseHandler } from '../handler';
import { RestangularConfig } from '../config';

@Injectable()
export class BaseUrlInterceptor implements RestangularInterceptor {

  constructor(
    private config: RestangularConfig,
  ) {}

  intercept(req: any, next: RestangularBaseHandler) {
    if (this.config.baseUrl) {
      req = req.clone({baseUrl: this.config.baseUrl});
    }
    return next.handle(req);
  }
}
