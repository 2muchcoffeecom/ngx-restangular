/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-restangular-http.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpBackend, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { RestangularHelper } from './ngx-restangular-helper';
import { catchError, filter, map } from 'rxjs/operators';
export class RestangularHttp {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequest(options) {
        /** @type {?} */
        const request = RestangularHelper.createRequest(options);
        return this.request(request);
    }
    /**
     * @param {?} request
     * @return {?}
     */
    request(request) {
        return this.http.handle(request)
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event instanceof HttpResponse)), map((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            if (!response.ok) {
                return throwError(new HttpErrorResponse(response));
            }
            return response;
        })), map((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            response.config = { params: request };
            return response;
        })), catchError((/**
         * @param {?} err
         * @return {?}
         */
        err => {
            err.request = request;
            err.data = err.error;
            err.repeatRequest = (/**
             * @param {?=} newRequest
             * @return {?}
             */
            (newRequest) => {
                return this.request(newRequest || request);
            });
            return throwError(err);
        })));
    }
}
RestangularHttp.decorators = [
    { type: Injectable }
];
/** @nocollapse */
RestangularHttp.ctorParameters = () => [
    { type: HttpBackend }
];
if (false) {
    /** @type {?} */
    RestangularHttp.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLWh0dHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcmVzdGFuZ3VsYXIvc3JjL2xpYi9uZ3gtcmVzdGFuZ3VsYXItaHR0cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBMEIsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFNUcsT0FBTyxFQUFFLFVBQVUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUU5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd6RCxNQUFNLE9BQU8sZUFBZTs7OztJQUUxQixZQUFtQixJQUFpQjtRQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO0lBQ3BDLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLE9BQU87O2NBQ2IsT0FBTyxHQUFHLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFFeEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLE9BQXlCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQy9CLElBQUksQ0FDSCxNQUFNOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFlBQVksWUFBWSxFQUFDLEVBQzlDLEdBQUc7Ozs7UUFBQyxDQUFDLFFBQWEsRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO2dCQUNoQixPQUFPLFVBQVUsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7WUFDRCxPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDLEVBQUMsRUFDRixHQUFHOzs7O1FBQUMsUUFBUSxDQUFDLEVBQUU7WUFDYixRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBQyxDQUFDO1lBQ3BDLE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUMsRUFBQyxFQUNGLFVBQVU7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUNmLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUNyQixHQUFHLENBQUMsYUFBYTs7OztZQUFHLENBQUMsVUFBVyxFQUFFLEVBQUU7Z0JBQ2xDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFBLENBQUM7WUFFRixPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7O1lBcENGLFVBQVU7Ozs7WUFQRixXQUFXOzs7O0lBVU4sK0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEJhY2tlbmQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwRXZlbnQsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IHRocm93RXJyb3IsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUmVzdGFuZ3VsYXJIZWxwZXIgfSBmcm9tICcuL25neC1yZXN0YW5ndWxhci1oZWxwZXInO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXN0YW5ndWxhckh0dHAge1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQmFja2VuZCkge1xuICB9XG5cbiAgY3JlYXRlUmVxdWVzdChvcHRpb25zKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBSZXN0YW5ndWxhckhlbHBlci5jcmVhdGVSZXF1ZXN0KG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChyZXF1ZXN0KTtcbiAgfVxuXG4gIHJlcXVlc3QocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmhhbmRsZShyZXF1ZXN0KVxuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlKSxcbiAgICAgIG1hcCgocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEh0dHBFcnJvclJlc3BvbnNlKHJlc3BvbnNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSksXG4gICAgICBtYXAocmVzcG9uc2UgPT4ge1xuICAgICAgICByZXNwb25zZS5jb25maWcgPSB7cGFyYW1zOiByZXF1ZXN0fTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB7XG4gICAgICAgIGVyci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgZXJyLmRhdGEgPSBlcnIuZXJyb3I7XG4gICAgICAgIGVyci5yZXBlYXRSZXF1ZXN0ID0gKG5ld1JlcXVlc3Q/KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChuZXdSZXF1ZXN0IHx8IHJlcXVlc3QpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycik7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cblxuIl19