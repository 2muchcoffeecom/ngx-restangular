import { Injectable } from '@angular/core';

import { RestangularBuilder } from './builder';
import { RestangularClient } from './client';
import { RestangularHandler } from './handler';

export abstract class Restangular {

  abstract one(id: string | number): RestangularClient;
  abstract one(route: string, id?: string | number): RestangularClient;

  abstract all(route: string): RestangularClient;
}

@Injectable()
export class InitialRestangular {

  constructor(private handler: RestangularHandler) {
  }

  one(routeOrId, id?) {
    let route = routeOrId;
    if (typeof id === 'undefined') {
      id = routeOrId;
      route = undefined;
    }
    const builder = new RestangularBuilder({id, route, isCollection: false});
    return new RestangularClient(builder, this.handler);
  }

  all(route) {
    const builder = new RestangularBuilder({route, isCollection: true});
    return new RestangularClient(builder, this.handler);
  }
}
