import { URLSearchParams, Headers, RequestOptions, RequestMethod } from '@angular/http';
export var RestangularHelper = (function () {
    function RestangularHelper() {
    }
    RestangularHelper.createRequestOptions = function (options) {
        var requestQueryParams = RestangularHelper.createRequestQueryParams(options.params);
        var requestHeaders = RestangularHelper.createRequestHeaders(options.headers);
        var methodName = options.method.charAt(0).toUpperCase() + options.method.substr(1).toLowerCase();
        var requestOptions = new RequestOptions({
            method: RequestMethod[methodName],
            headers: requestHeaders,
            search: requestQueryParams,
            url: options.url,
            body: options.data,
        });
        return requestOptions;
    };
    RestangularHelper.createRequestQueryParams = function (queryParams) {
        var requestQueryParams = Object.assign({}, queryParams);
        var search = new URLSearchParams();
        for (var key in requestQueryParams) {
            var value = requestQueryParams[key];
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            search.append(key, value);
        }
        return search;
    };
    RestangularHelper.createRequestHeaders = function (headers) {
        return new Headers(Object.assign({}, headers));
    };
    return RestangularHelper;
}());
//# sourceMappingURL=ng2-restangular-helper.js.map