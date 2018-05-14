import {InjectionToken} from '@angular/core';
import { isArray } from 'lodash';


export const RESTANGULAR = new InjectionToken<string>('restangularWithConfig');
export function RestangularFactory(config) {
  let configObj = {
    fn: config[0],
    arrServices: [],
  };

  if (isArray(config[0])) {
    configObj = {
      arrServices: config[0],
      fn: config[1]
    };
  }
  return configObj;
}
