import { HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { RestangularRequest } from '../backend';

export abstract class RestangularHandler {
  abstract handle<T>(req: RestangularRequest<T>): Observable<HttpEvent<T>>;

  abstract withConfig(options: any): RestangularHandler;

  abstract extendConfig(options: any): RestangularHandler;
}
