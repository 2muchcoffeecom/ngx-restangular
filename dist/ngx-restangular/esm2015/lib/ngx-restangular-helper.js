/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-restangular-helper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { assign } from 'lodash';
export class RestangularHelper {
    /**
     * @param {?} options
     * @return {?}
     */
    static createRequest(options) {
        /** @type {?} */
        const requestQueryParams = RestangularHelper.createRequestQueryParams(options.params);
        /** @type {?} */
        const requestHeaders = RestangularHelper.createRequestHeaders(options.headers);
        /** @type {?} */
        const methodName = options.method.toUpperCase();
        /** @type {?} */
        const withCredentials = options.withCredentials || false;
        /** @type {?} */
        let request = new HttpRequest(methodName, options.url, options.data, {
            headers: requestHeaders,
            params: requestQueryParams,
            responseType: options.responseType,
            withCredentials
        });
        if (['GET', 'DELETE', 'HEAD', 'JSONP', 'OPTIONS'].indexOf(methodName) >= 0) {
            request = new HttpRequest(methodName, options.url, {
                headers: requestHeaders,
                params: requestQueryParams,
                responseType: options.responseType,
                withCredentials
            });
        }
        return request;
    }
    /**
     * @param {?} queryParams
     * @return {?}
     */
    static createRequestQueryParams(queryParams) {
        /** @type {?} */
        const requestQueryParams = assign({}, queryParams);
        /** @type {?} */
        let search = new HttpParams();
        for (const key in requestQueryParams) {
            /** @type {?} */
            let value = requestQueryParams[key];
            if (Array.isArray(value)) {
                value.forEach((/**
                 * @param {?} val
                 * @return {?}
                 */
                function (val) {
                    search = search.append(key, val);
                }));
            }
            else {
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                search = search.append(key, value);
            }
        }
        return search;
    }
    /**
     * @param {?} headers
     * @return {?}
     */
    static createRequestHeaders(headers) {
        for (const key in headers) {
            /** @type {?} */
            const value = headers[key];
            if (typeof value === 'undefined') {
                delete headers[key];
            }
        }
        return new HttpHeaders(assign({}, headers));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1yZXN0YW5ndWxhci9zcmMvbGliL25neC1yZXN0YW5ndWxhci1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWhDLE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBRTVCLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTzs7Y0FDcEIsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7Y0FDL0UsY0FBYyxHQUFHLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7O2NBQ3hFLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTs7Y0FDekMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLElBQUksS0FBSzs7WUFFcEQsT0FBTyxHQUFHLElBQUksV0FBVyxDQUMzQixVQUFVLEVBQ1YsT0FBTyxDQUFDLEdBQUcsRUFDWCxPQUFPLENBQUMsSUFBSSxFQUNaO1lBQ0UsT0FBTyxFQUFFLGNBQWM7WUFDdkIsTUFBTSxFQUFFLGtCQUFrQjtZQUMxQixZQUFZLEVBQUUsT0FBTyxDQUFDLFlBQVk7WUFDbEMsZUFBZTtTQUNoQixDQUNGO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFFLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FDdkIsVUFBVSxFQUNWLE9BQU8sQ0FBQyxHQUFHLEVBQ1g7Z0JBQ0UsT0FBTyxFQUFFLGNBQWM7Z0JBQ3ZCLE1BQU0sRUFBRSxrQkFBa0I7Z0JBQzFCLFlBQVksRUFBRSxPQUFPLENBQUMsWUFBWTtnQkFDbEMsZUFBZTthQUNoQixDQUNGLENBQUM7U0FDSDtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFdBQVc7O2NBQ25DLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDOztZQUM5QyxNQUFNLEdBQWUsSUFBSSxVQUFVLEVBQUU7UUFFekMsS0FBSyxNQUFNLEdBQUcsSUFBSSxrQkFBa0IsRUFBRTs7Z0JBQ2hDLEtBQUssR0FBUSxrQkFBa0IsQ0FBQyxHQUFHLENBQUM7WUFFeEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN4QixLQUFLLENBQUMsT0FBTzs7OztnQkFBQyxVQUFVLEdBQUc7b0JBQ3pCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxFQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDN0IsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQy9CO2dCQUNELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNwQztTQUNGO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsT0FBTztRQUNqQyxLQUFLLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRTs7a0JBQ25CLEtBQUssR0FBUSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQy9CLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxFQUFFO2dCQUNoQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyQjtTQUNGO1FBRUQsT0FBTyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFJlcXVlc3QsIEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgYXNzaWduIH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGNsYXNzIFJlc3Rhbmd1bGFySGVscGVyIHtcblxuICBzdGF0aWMgY3JlYXRlUmVxdWVzdChvcHRpb25zKSB7XG4gICAgY29uc3QgcmVxdWVzdFF1ZXJ5UGFyYW1zID0gUmVzdGFuZ3VsYXJIZWxwZXIuY3JlYXRlUmVxdWVzdFF1ZXJ5UGFyYW1zKG9wdGlvbnMucGFyYW1zKTtcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IFJlc3Rhbmd1bGFySGVscGVyLmNyZWF0ZVJlcXVlc3RIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgY29uc3QgbWV0aG9kTmFtZSA9IG9wdGlvbnMubWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3Qgd2l0aENyZWRlbnRpYWxzID0gb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgfHwgZmFsc2U7XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBIdHRwUmVxdWVzdChcbiAgICAgIG1ldGhvZE5hbWUsXG4gICAgICBvcHRpb25zLnVybCxcbiAgICAgIG9wdGlvbnMuZGF0YSxcbiAgICAgIHtcbiAgICAgICAgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMsXG4gICAgICAgIHBhcmFtczogcmVxdWVzdFF1ZXJ5UGFyYW1zLFxuICAgICAgICByZXNwb25zZVR5cGU6IG9wdGlvbnMucmVzcG9uc2VUeXBlLFxuICAgICAgICB3aXRoQ3JlZGVudGlhbHNcbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKFsnR0VUJywgJ0RFTEVURScsICdIRUFEJywgJ0pTT05QJywgJ09QVElPTlMnXS5pbmRleE9mKG1ldGhvZE5hbWUpID49IDApIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgSHR0cFJlcXVlc3QoXG4gICAgICAgIG1ldGhvZE5hbWUsXG4gICAgICAgIG9wdGlvbnMudXJsLFxuICAgICAgICB7XG4gICAgICAgICAgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMsXG4gICAgICAgICAgcGFyYW1zOiByZXF1ZXN0UXVlcnlQYXJhbXMsXG4gICAgICAgICAgcmVzcG9uc2VUeXBlOiBvcHRpb25zLnJlc3BvbnNlVHlwZSxcbiAgICAgICAgICB3aXRoQ3JlZGVudGlhbHNcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlUmVxdWVzdFF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKSB7XG4gICAgY29uc3QgcmVxdWVzdFF1ZXJ5UGFyYW1zID0gYXNzaWduKHt9LCBxdWVyeVBhcmFtcyk7XG4gICAgbGV0IHNlYXJjaDogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiByZXF1ZXN0UXVlcnlQYXJhbXMpIHtcbiAgICAgIGxldCB2YWx1ZTogYW55ID0gcmVxdWVzdFF1ZXJ5UGFyYW1zW2tleV07XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICBzZWFyY2ggPSBzZWFyY2guYXBwZW5kKGtleSwgdmFsKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHNlYXJjaCA9IHNlYXJjaC5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlYXJjaDtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVSZXF1ZXN0SGVhZGVycyhoZWFkZXJzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gaGVhZGVycykge1xuICAgICAgY29uc3QgdmFsdWU6IGFueSA9IGhlYWRlcnNba2V5XTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyhhc3NpZ24oe30sIGhlYWRlcnMpKTtcbiAgfVxufVxuIl19