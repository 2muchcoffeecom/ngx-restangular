import { HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { RestangularRequest } from './request';
import { RestangularFieldsMap } from './mapping';

export abstract class RestangularBaseHandler {
  abstract handle<T>(req: RestangularRequest<T>): Observable<HttpEvent<T>>;

}

export abstract class RestangularHandler extends RestangularBaseHandler {

  abstract get restangularFields(): RestangularFieldsMap;

  abstract withConfig(options: any): RestangularHandler;

  abstract extendConfig(options: any): RestangularHandler;
}
