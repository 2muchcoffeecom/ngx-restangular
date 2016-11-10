import { Injectable } from '@angular/core';
import { Http, Request } from '@angular/http';
import { Observable } from 'rxjs';
import { RestangularHelper } from './ng2-restangular-helper';
export var RestangularHttp = (function () {
    function RestangularHttp(http) {
        this.http = http;
    }
    RestangularHttp.prototype.createRequest = function (options) {
        var requestOptions = RestangularHelper.createRequestOptions(options);
        var request = new Request(requestOptions);
        return this.request(request);
    };
    RestangularHttp.prototype.request = function (request) {
        var _this = this;
        return this.http.request(request)
            .map(function (response) {
            response.config = { params: request };
            return response;
        })
            .map(function (response) {
            if (response._body) {
                response.data = typeof response._body == 'string' ? JSON.parse(response._body) : response._body;
            }
            else {
                response.data = null;
            }
            return response;
        })
            .catch(function (err) {
            err.data = typeof err._body == 'string' ? JSON.parse(err._body) : err._body;
            err.request = request;
            err.repeatRequest = function (newRequest) {
                return _this.request(newRequest || request);
            };
            return Observable.throw(err);
        });
    };
    RestangularHttp.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    RestangularHttp.ctorParameters = [
        { type: Http, },
    ];
    return RestangularHttp;
}());
//# sourceMappingURL=ng2-restangular-http.js.map