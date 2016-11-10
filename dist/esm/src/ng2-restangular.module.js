import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RESTANGULAR, RestangularFactory } from './ng2-restangular.config';
import { Restangular } from './ng2-restangular';
import { RestangularHttp } from './ng2-restangular-http';
export var RestangularModule = (function () {
    function RestangularModule(parentModule) {
        if (parentModule) {
            throw new Error('RestangularModule is already loaded. Import it in the AppModule only');
        }
    }
    RestangularModule.forRoot = function () {
        var config = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            config[_i - 0] = arguments[_i];
        }
        return {
            ngModule: RestangularModule,
            providers: [
                RestangularHttp,
                { provide: RESTANGULAR, useFactory: RestangularFactory.apply(void 0, config) },
            ]
        };
    };
    RestangularModule.decorators = [
        { type: NgModule, args: [{
                    providers: [Restangular]
                },] },
    ];
    /** @nocollapse */
    RestangularModule.ctorParameters = [
        { type: RestangularModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
    ];
    return RestangularModule;
}());
//# sourceMappingURL=ng2-restangular.module.js.map