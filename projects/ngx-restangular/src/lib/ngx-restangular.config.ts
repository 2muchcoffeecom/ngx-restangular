import { InjectionToken } from '@angular/core';

import { isArray } from 'lodash';


export const RESTANGULAR = new InjectionToken<string>('restangularWithConfig');

export function RestangularFactory([callbackOrServices, callback]) {
  let arrServices = [];
  let fn = callbackOrServices;

  if (isArray(callbackOrServices)) {
    arrServices = callbackOrServices;
    fn = callback;
  }

  return {fn, arrServices};
}
