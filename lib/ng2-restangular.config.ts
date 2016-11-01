import {OpaqueToken} from "@angular/core";
let _ = require('lodash');


export const RESTANGULAR = new OpaqueToken('restangularWithConfig');
export function RestangularFactory(...config) {
  return () => {
    let configObj = {
      fn: config[0],
      arrServices: [],
    };
    
    if(_.isArray(config[0])){
      configObj= {
        arrServices: config[0],
        fn: config[1]
      }
    }
    
    return configObj;
  };
}
