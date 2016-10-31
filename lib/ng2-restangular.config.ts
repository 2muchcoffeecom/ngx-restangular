import {OpaqueToken} from "@angular/core";

export const RESTANGULAR = new OpaqueToken('restangularWithConfig');

export function RestangularFactory(arrServices, configFn) {
  return () => {
    return {
      arrServices: arrServices,
      fn: configFn
    };
  };
}
