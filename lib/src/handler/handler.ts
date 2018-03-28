import { HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { RestangularRequest } from '../backend';

export abstract class RestangularBaseHandler {
  abstract handle<T>(req: RestangularRequest<T>): Observable<HttpEvent<T>>;

}

export abstract class RestangularHandler extends RestangularBaseHandler {

  abstract withConfig(options: any): RestangularHandler;

  abstract extendConfig(options: any): RestangularHandler;
}
