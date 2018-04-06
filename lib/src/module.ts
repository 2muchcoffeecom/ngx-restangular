import { Injectable, NgModule } from '@angular/core';
import { HttpBackend, HttpClientModule } from '@angular/common/http';

import { RestangularHandler, RestangularInterceptingHandler } from './handler';
import { Restangular } from './restangular';
import { DefaultRestangularConfig, RestangularConfig } from './config';
import { configInterceptors } from './interceptors';
import { RestangularClient } from './client';
import { RestangularBuilder } from './builder';

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

  extendConfig(options: any) {
    const handler = this.handler.extendConfig(options);
    return new InitialRestangular(handler);
  }

  withConfig(options: any) {
    const handler = this.handler.withConfig(options);
    return new InitialRestangular(handler);
  }
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    configInterceptors,
    {provide: RestangularConfig, useValue: DefaultRestangularConfig},
    {provide: Restangular, useClass: InitialRestangular},
    {provide: RestangularHandler, useClass: RestangularInterceptingHandler},
  ],
})
export class RestangularModule {

  static config(config: any) {
    let configProvider;
    switch (typeof config) {
      case 'object': {
        configProvider = {provide: RestangularConfig, useValue: config};
        break;
      }
      case 'function': {
        configProvider = {provide: RestangularConfig, useClass: config};
        break;
      }
    }
    return {
      ngModule: RestangularModule,
      providers: [
        configProvider,
      ]
    };
  }
}
