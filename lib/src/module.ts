import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RestangularHandler, RestangularInterceptingHandler } from './handler';
import { RestangularBackend, RestangularHttpBackend } from './backend';
import { InitialRestangular, Restangular } from './restangular';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {provide: Restangular, useClass: InitialRestangular},
    {provide: RestangularHandler, useClass: RestangularInterceptingHandler},
    RestangularHttpBackend,
    {provide: RestangularBackend, useExisting: RestangularHttpBackend},
  ],
})
export class RestangularModule {
}
