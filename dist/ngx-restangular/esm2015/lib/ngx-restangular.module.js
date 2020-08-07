/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-restangular.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RESTANGULAR, RestangularFactory } from './ngx-restangular.config';
import { Restangular } from './ngx-restangular';
import { RestangularHttp } from './ngx-restangular-http';
/** @type {?} */
export const CONFIG_OBJ = new InjectionToken('configObj');
export class RestangularModule {
    /**
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('RestangularModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?=} config1
     * @param {?=} config2
     * @return {?}
     */
    static forRoot(config1, config2) {
        return {
            ngModule: RestangularModule,
            providers: [
                { provide: CONFIG_OBJ, useValue: [config1, config2] },
                { provide: RESTANGULAR, useFactory: RestangularFactory, deps: [CONFIG_OBJ] },
            ]
        };
    }
}
RestangularModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule],
                providers: [RestangularHttp, Restangular]
            },] }
];
/** @nocollapse */
RestangularModule.ctorParameters = () => [
    { type: RestangularModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1yZXN0YW5ndWxhci9zcmMvbGliL25neC1yZXN0YW5ndWxhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFFekQsTUFBTSxPQUFPLFVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBUyxXQUFXLENBQUM7QUFNakUsTUFBTSxPQUFPLGlCQUFpQjs7OztJQUU1QixZQUFvQyxZQUErQjtRQUNqRSxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLHNFQUFzRSxDQUFDLENBQUM7U0FDM0U7SUFDSCxDQUFDOzs7Ozs7SUFJRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQVEsRUFBRSxPQUFRO1FBQy9CLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVCxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFDO2dCQUNuRCxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFDO2FBQzNFO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQXZCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzNCLFNBQVMsRUFBRSxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUM7YUFDMUM7Ozs7WUFHbUQsaUJBQWlCLHVCQUF0RCxRQUFRLFlBQUksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUkVTVEFOR1VMQVIsIFJlc3Rhbmd1bGFyRmFjdG9yeSB9IGZyb20gJy4vbmd4LXJlc3Rhbmd1bGFyLmNvbmZpZyc7XG5pbXBvcnQgeyBSZXN0YW5ndWxhciB9IGZyb20gJy4vbmd4LXJlc3Rhbmd1bGFyJztcbmltcG9ydCB7IFJlc3Rhbmd1bGFySHR0cCB9IGZyb20gJy4vbmd4LXJlc3Rhbmd1bGFyLWh0dHAnO1xuXG5leHBvcnQgY29uc3QgQ09ORklHX09CSiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdjb25maWdPYmonKTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtSZXN0YW5ndWxhckh0dHAsIFJlc3Rhbmd1bGFyXVxufSlcbmV4cG9ydCBjbGFzcyBSZXN0YW5ndWxhck1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBSZXN0YW5ndWxhck1vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1Jlc3Rhbmd1bGFyTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaXQgaW4gdGhlIEFwcE1vZHVsZSBvbmx5Jyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnRnVuY3Rpb24/OiAocHJvdmlkZXI6IGFueSwgLi4uYXJnOiBhbnlbXSkgPT4gdm9pZCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8YW55PjtcbiAgc3RhdGljIGZvclJvb3QocHJvdmlkZXJzPzogYW55W10sIGNvbmZpZ0Z1bmN0aW9uPzogKHByb3ZpZGVyOiBhbnksIC4uLmFyZzogYW55W10pID0+IHZvaWQpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPGFueT47XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzE/LCBjb25maWcyPyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8YW55PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBSZXN0YW5ndWxhck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQ09ORklHX09CSiwgdXNlVmFsdWU6IFtjb25maWcxLCBjb25maWcyXX0sXG4gICAgICAgIHtwcm92aWRlOiBSRVNUQU5HVUxBUiwgdXNlRmFjdG9yeTogUmVzdGFuZ3VsYXJGYWN0b3J5LCBkZXBzOiBbQ09ORklHX09CSl19LFxuICAgICAgXVxuICAgIH07XG4gIH1cblxufVxuIl19