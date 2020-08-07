/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-restangular.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
import { isArray } from 'lodash';
/** @type {?} */
export const RESTANGULAR = new InjectionToken('restangularWithConfig');
/**
 * @param {?} __0
 * @return {?}
 */
export function RestangularFactory([callbackOrServices, callback]) {
    /** @type {?} */
    let arrServices = [];
    /** @type {?} */
    let fn = callbackOrServices;
    if (isArray(callbackOrServices)) {
        arrServices = callbackOrServices;
        fn = callback;
    }
    return { fn, arrServices };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1yZXN0YW5ndWxhci9zcmMvbGliL25neC1yZXN0YW5ndWxhci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxRQUFRLENBQUM7O0FBR2pDLE1BQU0sT0FBTyxXQUFXLEdBQUcsSUFBSSxjQUFjLENBQVMsdUJBQXVCLENBQUM7Ozs7O0FBRTlFLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQzs7UUFDM0QsV0FBVyxHQUFHLEVBQUU7O1FBQ2hCLEVBQUUsR0FBRyxrQkFBa0I7SUFFM0IsSUFBSSxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUMvQixXQUFXLEdBQUcsa0JBQWtCLENBQUM7UUFDakMsRUFBRSxHQUFHLFFBQVEsQ0FBQztLQUNmO0lBRUQsT0FBTyxFQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUMsQ0FBQztBQUMzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJ2xvZGFzaCc7XG5cblxuZXhwb3J0IGNvbnN0IFJFU1RBTkdVTEFSID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ3Jlc3Rhbmd1bGFyV2l0aENvbmZpZycpO1xuXG5leHBvcnQgZnVuY3Rpb24gUmVzdGFuZ3VsYXJGYWN0b3J5KFtjYWxsYmFja09yU2VydmljZXMsIGNhbGxiYWNrXSkge1xuICBsZXQgYXJyU2VydmljZXMgPSBbXTtcbiAgbGV0IGZuID0gY2FsbGJhY2tPclNlcnZpY2VzO1xuXG4gIGlmIChpc0FycmF5KGNhbGxiYWNrT3JTZXJ2aWNlcykpIHtcbiAgICBhcnJTZXJ2aWNlcyA9IGNhbGxiYWNrT3JTZXJ2aWNlcztcbiAgICBmbiA9IGNhbGxiYWNrO1xuICB9XG5cbiAgcmV0dXJuIHtmbiwgYXJyU2VydmljZXN9O1xufVxuIl19