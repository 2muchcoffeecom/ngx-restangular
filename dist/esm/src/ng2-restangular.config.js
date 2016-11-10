import { OpaqueToken } from "@angular/core";
import * as _ from 'lodash';
export var RESTANGULAR = new OpaqueToken('restangularWithConfig');
export function RestangularFactory() {
    var config = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        config[_i - 0] = arguments[_i];
    }
    return function () {
        var configObj = {
            fn: config[0],
            arrServices: [],
        };
        if (_.isArray(config[0])) {
            configObj = {
                arrServices: config[0],
                fn: config[1]
            };
        }
        return configObj;
    };
}
//# sourceMappingURL=ng2-restangular.config.js.map