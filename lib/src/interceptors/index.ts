import { Provider } from '@angular/core';

import { RESTANGULAR_INTERCEPTORS } from '../interceptor';
import { BaseUrlInterceptor } from './base-url-interceptor';
import { DefaultHeadersInterceptor } from './default-headers-interceptor';
import { DefaultParamsInterceptor } from './default-params-interceptor';

export const configInterceptors: Provider[] = [
  {provide: RESTANGULAR_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
  {provide: RESTANGULAR_INTERCEPTORS, useClass: DefaultHeadersInterceptor, multi: true},
  {provide: RESTANGULAR_INTERCEPTORS, useClass: DefaultParamsInterceptor, multi: true},
];
