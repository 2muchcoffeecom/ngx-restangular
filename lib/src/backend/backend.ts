import { RestangularRequest } from './request';
import { HttpBackend, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

export abstract class RestangularBackend {
  abstract handle(req: RestangularRequest<any>): Observable<HttpEvent<any>>;
}

@Injectable()
export class RestangularHttpBackend implements RestangularBackend {

  constructor(private http: HttpBackend) {
  }

  handle(req: RestangularRequest<any>): Observable<HttpEvent<any>> {
    return this.http.handle(req.toHttpRequest());
  }
}
