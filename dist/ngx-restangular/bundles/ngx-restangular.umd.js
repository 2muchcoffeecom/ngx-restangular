(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('lodash'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngx-restangular', ['exports', '@angular/core', '@angular/common/http', 'lodash', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-restangular'] = {}, global.ng.core, global.ng.common.http, global._, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, http, lodash, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /** @type {?} */
    var RESTANGULAR = new core.InjectionToken('restangularWithConfig');
    /**
     * @param {?} __0
     * @return {?}
     */
    function RestangularFactory(_a) {
        var _b = __read(_a, 2), callbackOrServices = _b[0], callback = _b[1];
        /** @type {?} */
        var arrServices = [];
        /** @type {?} */
        var fn = callbackOrServices;
        if (lodash.isArray(callbackOrServices)) {
            arrServices = callbackOrServices;
            fn = callback;
        }
        return { fn: fn, arrServices: arrServices };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-restangular-helper.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RestangularHelper = /** @class */ (function () {
        function RestangularHelper() {
        }
        /**
         * @param {?} options
         * @return {?}
         */
        RestangularHelper.createRequest = function (options) {
            /** @type {?} */
            var requestQueryParams = RestangularHelper.createRequestQueryParams(options.params);
            /** @type {?} */
            var requestHeaders = RestangularHelper.createRequestHeaders(options.headers);
            /** @type {?} */
            var methodName = options.method.toUpperCase();
            /** @type {?} */
            var withCredentials = options.withCredentials || false;
            /** @type {?} */
            var request = new http.HttpRequest(methodName, options.url, options.data, {
                headers: requestHeaders,
                params: requestQueryParams,
                responseType: options.responseType,
                withCredentials: withCredentials
            });
            if (['GET', 'DELETE', 'HEAD', 'JSONP', 'OPTIONS'].indexOf(methodName) >= 0) {
                request = new http.HttpRequest(methodName, options.url, {
                    headers: requestHeaders,
                    params: requestQueryParams,
                    responseType: options.responseType,
                    withCredentials: withCredentials
                });
            }
            return request;
        };
        /**
         * @param {?} queryParams
         * @return {?}
         */
        RestangularHelper.createRequestQueryParams = function (queryParams) {
            /** @type {?} */
            var requestQueryParams = lodash.assign({}, queryParams);
            /** @type {?} */
            var search = new http.HttpParams();
            var _loop_1 = function (key) {
                /** @type {?} */
                var value = requestQueryParams[key];
                if (Array.isArray(value)) {
                    value.forEach(( /**
                     * @param {?} val
                     * @return {?}
                     */function (val) {
                        search = search.append(key, val);
                    }));
                }
                else {
                    if (typeof value === 'object') {
                        value = JSON.stringify(value);
                    }
                    search = search.append(key, value);
                }
            };
            for (var key in requestQueryParams) {
                _loop_1(key);
            }
            return search;
        };
        /**
         * @param {?} headers
         * @return {?}
         */
        RestangularHelper.createRequestHeaders = function (headers) {
            for (var key in headers) {
                /** @type {?} */
                var value = headers[key];
                if (typeof value === 'undefined') {
                    delete headers[key];
                }
            }
            return new http.HttpHeaders(lodash.assign({}, headers));
        };
        return RestangularHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-restangular-http.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RestangularHttp = /** @class */ (function () {
        /**
         * @param {?} http
         */
        function RestangularHttp(http) {
            this.http = http;
        }
        /**
         * @param {?} options
         * @return {?}
         */
        RestangularHttp.prototype.createRequest = function (options) {
            /** @type {?} */
            var request = RestangularHelper.createRequest(options);
            return this.request(request);
        };
        /**
         * @param {?} request
         * @return {?}
         */
        RestangularHttp.prototype.request = function (request) {
            var _this = this;
            return this.http.handle(request)
                .pipe(operators.filter(( /**
         * @param {?} event
         * @return {?}
         */function (/**
         * @param {?} event
         * @return {?}
         */ event) { return event instanceof http.HttpResponse; })), operators.map(( /**
             * @param {?} response
             * @return {?}
             */function (response) {
                if (!response.ok) {
                    return rxjs.throwError(new http.HttpErrorResponse(response));
                }
                return response;
            })), operators.map(( /**
             * @param {?} response
             * @return {?}
             */function (/**
             * @param {?} response
             * @return {?}
             */ response) {
                response.config = { params: request };
                return response;
            })), operators.catchError(( /**
             * @param {?} err
             * @return {?}
             */function (/**
             * @param {?} err
             * @return {?}
             */ err) {
                err.request = request;
                err.data = err.error;
                err.repeatRequest = ( /**
                 * @param {?=} newRequest
                 * @return {?}
                 */function (newRequest) {
                    return _this.request(newRequest || request);
                });
                return rxjs.throwError(err);
            })));
        };
        return RestangularHttp;
    }());
    RestangularHttp.decorators = [
        { type: core.Injectable }
    ];
    /** @nocollapse */
    RestangularHttp.ctorParameters = function () { return [
        { type: http.HttpBackend }
    ]; };
    if (false) {
        /** @type {?} */
        RestangularHttp.prototype.http;
    }

    /**
     * @param {?} object
     * @param {?} configuration
     * @return {?}
     */
    function RestangularConfigurer(object, configuration) {
        object.configuration = configuration;
        /**
         * Those are HTTP safe methods for which there is no need to pass any data with the request.
         * @type {?}
         */
        var safeMethods = ['get', 'head', 'options', 'trace', 'getlist'];
        configuration.isSafe = ( /**
         * @param {?} operation
         * @return {?}
         */function (operation) {
            return lodash.includes(safeMethods, operation.toLowerCase());
        });
        /** @type {?} */
        var absolutePattern = /^https?:\/\//i;
        configuration.isAbsoluteUrl = ( /**
         * @param {?} string
         * @return {?}
         */function (string) {
            return lodash.isUndefined(configuration.absoluteUrl) || lodash.isNull(configuration.absoluteUrl) ?
                string && absolutePattern.test(string) :
                configuration.absoluteUrl;
        });
        configuration.absoluteUrl = lodash.isUndefined(configuration.absoluteUrl) ? true : configuration.absoluteUrl;
        object.setSelfLinkAbsoluteUrl = ( /**
         * @param {?} value
         * @return {?}
         */function (value) {
            configuration.absoluteUrl = value;
        });
        /**
         * This is the BaseURL to be used with Restangular
         */
        configuration.baseUrl = lodash.isUndefined(configuration.baseUrl) ? '' : configuration.baseUrl;
        object.setBaseUrl = ( /**
         * @param {?} newBaseUrl
         * @return {?}
         */function (newBaseUrl) {
            configuration.baseUrl = /\/$/.test(newBaseUrl) ?
                newBaseUrl.substring(0, newBaseUrl.length - 1) :
                newBaseUrl;
            return this;
        });
        /**
         * Sets the extra fields to keep from the parents
         */
        configuration.extraFields = configuration.extraFields || [];
        object.setExtraFields = ( /**
         * @param {?} newExtraFields
         * @return {?}
         */function (newExtraFields) {
            configuration.extraFields = newExtraFields;
            return this;
        });
        /**
         * Some default $http parameter to be used in EVERY call
         **/
        configuration.defaultHttpFields = configuration.defaultHttpFields || {};
        object.setDefaultHttpFields = ( /**
         * @param {?} values
         * @return {?}
         */function (values) {
            configuration.defaultHttpFields = values;
            return this;
        });
        /**
         * Always return plain data, no restangularized object
         **/
        configuration.plainByDefault = configuration.plainByDefault || false;
        object.setPlainByDefault = ( /**
         * @param {?} value
         * @return {?}
         */function (value) {
            configuration.plainByDefault = value === true ? true : false;
            return this;
        });
        configuration.withHttpValues = ( /**
         * @param {?} httpLocalConfig
         * @param {?} obj
         * @return {?}
         */function (httpLocalConfig, obj) {
            return lodash.defaults(obj, httpLocalConfig, configuration.defaultHttpFields);
        });
        configuration.encodeIds = lodash.isUndefined(configuration.encodeIds) ? true : configuration.encodeIds;
        object.setEncodeIds = ( /**
         * @param {?} encode
         * @return {?}
         */function (encode) {
            configuration.encodeIds = encode;
        });
        configuration.defaultRequestParams = configuration.defaultRequestParams || {
            get: {},
            post: {},
            put: {},
            remove: {},
            common: {}
        };
        object.setDefaultRequestParams = ( /**
         * @param {?} param1
         * @param {?} param2
         * @return {?}
         */function (param1, param2) {
            /** @type {?} */
            var methods = [];
            /** @type {?} */
            var params = param2 || param1;
            if (!lodash.isUndefined(param2)) {
                if (lodash.isArray(param1)) {
                    methods = param1;
                }
                else {
                    methods.push(param1);
                }
            }
            else {
                methods.push('common');
            }
            lodash.each(methods, ( /**
             * @param {?} method
             * @return {?}
             */function (method) {
                configuration.defaultRequestParams[method] = params;
            }));
            return this;
        });
        object.requestParams = configuration.defaultRequestParams;
        configuration.defaultHeaders = configuration.defaultHeaders || {};
        object.setDefaultHeaders = ( /**
         * @param {?} headers
         * @return {?}
         */function (headers) {
            configuration.defaultHeaders = headers;
            object.defaultHeaders = configuration.defaultHeaders;
            return this;
        });
        object.defaultHeaders = configuration.defaultHeaders;
        /**
         * Method overriders response Method
         **/
        configuration.defaultResponseMethod = configuration.defaultResponseMethod || 'promise';
        object.setDefaultResponseMethod = ( /**
         * @param {?} method
         * @return {?}
         */function (method) {
            configuration.defaultResponseMethod = method;
            object.defaultResponseMethod = configuration.defaultResponseMethod;
            return this;
        });
        object.defaultResponseMethod = configuration.defaultResponseMethod;
        /**
         * Method overriders will set which methods are sent via POST with an X-HTTP-Method-Override
         **/
        configuration.methodOverriders = configuration.methodOverriders || [];
        object.setMethodOverriders = ( /**
         * @param {?} values
         * @return {?}
         */function (values) {
            /** @type {?} */
            var overriders = lodash.extend([], values);
            if (configuration.isOverridenMethod('delete', overriders)) {
                overriders.push('remove');
            }
            configuration.methodOverriders = overriders;
            return this;
        });
        configuration.jsonp = lodash.isUndefined(configuration.jsonp) ? false : configuration.jsonp;
        object.setJsonp = ( /**
         * @param {?} active
         * @return {?}
         */function (active) {
            configuration.jsonp = active;
        });
        configuration.isOverridenMethod = ( /**
         * @param {?} method
         * @param {?} values
         * @return {?}
         */function (method, values) {
            /** @type {?} */
            var search = values || configuration.methodOverriders;
            return !lodash.isUndefined(lodash.find(search, ( /**
             * @param {?} one
             * @return {?}
             */function (one) {
                return one.toLowerCase() === method.toLowerCase();
            })));
        });
        /**
         * Sets the URL creator type. For now, only Path is created. In the future we'll have queryParams
         **/
        configuration.urlCreator = configuration.urlCreator || 'path';
        object.setUrlCreator = ( /**
         * @param {?} name
         * @return {?}
         */function (name) {
            if (!lodash.has(configuration.urlCreatorFactory, name)) {
                throw new Error('URL Path selected isn\'t valid');
            }
            configuration.urlCreator = name;
            return this;
        });
        /**
         * You can set the restangular fields here. The 3 required fields for Restangular are:
         *
         * id: Id of the element
         * route: name of the route of this element
         * parentResource: the reference to the parent resource
         *
         *  All of this fields except for id, are handled (and created) by Restangular. By default,
         *  the field values will be id, route and parentResource respectively
         */
        configuration.restangularFields = configuration.restangularFields || {
            id: 'id',
            route: 'route',
            parentResource: 'parentResource',
            restangularCollection: 'restangularCollection',
            cannonicalId: '__cannonicalId',
            etag: 'restangularEtag',
            selfLink: 'href',
            get: 'get',
            getList: 'getList',
            put: 'put',
            post: 'post',
            remove: 'remove',
            head: 'head',
            trace: 'trace',
            options: 'options',
            patch: 'patch',
            getRestangularUrl: 'getRestangularUrl',
            getRequestedUrl: 'getRequestedUrl',
            putElement: 'putElement',
            addRestangularMethod: 'addRestangularMethod',
            getParentList: 'getParentList',
            clone: 'clone',
            ids: 'ids',
            httpConfig: '_$httpConfig',
            reqParams: 'reqParams',
            one: 'one',
            all: 'all',
            several: 'several',
            oneUrl: 'oneUrl',
            allUrl: 'allUrl',
            customPUT: 'customPUT',
            customPATCH: 'customPATCH',
            customPOST: 'customPOST',
            customDELETE: 'customDELETE',
            customGET: 'customGET',
            customGETLIST: 'customGETLIST',
            customOperation: 'customOperation',
            doPUT: 'doPUT',
            doPATCH: 'doPATCH',
            doPOST: 'doPOST',
            doDELETE: 'doDELETE',
            doGET: 'doGET',
            doGETLIST: 'doGETLIST',
            fromServer: 'fromServer',
            withConfig: 'withConfig',
            withHttpConfig: 'withHttpConfig',
            singleOne: 'singleOne',
            plain: 'plain',
            save: 'save',
            restangularized: 'restangularized'
        };
        object.setRestangularFields = ( /**
         * @param {?} resFields
         * @return {?}
         */function (resFields) {
            configuration.restangularFields =
                lodash.extend({}, configuration.restangularFields, resFields);
            return this;
        });
        configuration.isRestangularized = ( /**
         * @param {?} obj
         * @return {?}
         */function (obj) {
            return !!obj[configuration.restangularFields.restangularized];
        });
        configuration.setFieldToElem = ( /**
         * @param {?} field
         * @param {?} elem
         * @param {?} value
         * @return {?}
         */function (field, elem, value) {
            /** @type {?} */
            var properties = field.split('.');
            /** @type {?} */
            var idValue = elem;
            lodash.each(lodash.initial(properties), ( /**
             * @param {?} prop
             * @return {?}
             */function (prop) {
                idValue[prop] = {};
                idValue = idValue[prop];
            }));
            /** @type {?} */
            var index = lodash.last(properties);
            idValue[index] = value;
            return this;
        });
        configuration.getFieldFromElem = ( /**
         * @param {?} field
         * @param {?} elem
         * @return {?}
         */function (field, elem) {
            /** @type {?} */
            var properties = field.split('.');
            /** @type {?} */
            var idValue = elem;
            lodash.each(properties, ( /**
             * @param {?} prop
             * @return {?}
             */function (prop) {
                if (idValue) {
                    idValue = idValue[prop];
                }
            }));
            return lodash.clone(idValue);
        });
        configuration.setIdToElem = ( /**
         * @param {?} elem
         * @param {?} id
         * @return {?}
         */function (elem, id /*, route */) {
            configuration.setFieldToElem(configuration.restangularFields.id, elem, id);
            return this;
        });
        configuration.getIdFromElem = ( /**
         * @param {?} elem
         * @return {?}
         */function (elem) {
            return configuration.getFieldFromElem(configuration.restangularFields.id, elem);
        });
        configuration.isValidId = ( /**
         * @param {?} elemId
         * @return {?}
         */function (elemId) {
            return '' !== elemId && !lodash.isUndefined(elemId) && !lodash.isNull(elemId);
        });
        configuration.setUrlToElem = ( /**
         * @param {?} elem
         * @param {?} url
         * @return {?}
         */function (elem, url /*, route */) {
            configuration.setFieldToElem(configuration.restangularFields.selfLink, elem, url);
            return this;
        });
        configuration.getUrlFromElem = ( /**
         * @param {?} elem
         * @return {?}
         */function (elem) {
            return configuration.getFieldFromElem(configuration.restangularFields.selfLink, elem);
        });
        configuration.useCannonicalId = lodash.isUndefined(configuration.useCannonicalId) ? false : configuration.useCannonicalId;
        object.setUseCannonicalId = ( /**
         * @param {?} value
         * @return {?}
         */function (value) {
            configuration.useCannonicalId = value;
            return this;
        });
        configuration.getCannonicalIdFromElem = ( /**
         * @param {?} elem
         * @return {?}
         */function (elem) {
            /** @type {?} */
            var cannonicalId = elem[configuration.restangularFields.cannonicalId];
            /** @type {?} */
            var actualId = configuration.isValidId(cannonicalId) ? cannonicalId : configuration.getIdFromElem(elem);
            return actualId;
        });
        /**
         * Sets the Response parser. This is used in case your response isn't directly the data.
         * For example if you have a response like {meta: {'meta'}, data: {name: 'Gonto'}}
         * you can extract this data which is the one that needs wrapping
         *
         * The ResponseExtractor is a function that receives the response and the method executed.
         */
        configuration.responseInterceptors = configuration.responseInterceptors ? __spread(configuration.responseInterceptors) : [];
        configuration.defaultResponseInterceptor = ( /**
         * @param {?} data
         * @return {?}
         */function (data /*, operation, what, url, response, subject */) {
            return data || {};
        });
        configuration.responseExtractor = ( /**
         * @param {?} data
         * @param {?} operation
         * @param {?} what
         * @param {?} url
         * @param {?} response
         * @param {?} subject
         * @return {?}
         */function (data, operation, what, url, response, subject) {
            /** @type {?} */
            var interceptors = lodash.clone(configuration.responseInterceptors);
            interceptors.push(configuration.defaultResponseInterceptor);
            /** @type {?} */
            var theData = data;
            lodash.each(interceptors, ( /**
             * @param {?} interceptor
             * @return {?}
             */function (interceptor) {
                theData = interceptor(theData, operation, what, url, response, subject);
            }));
            return theData;
        });
        object.addResponseInterceptor = ( /**
         * @param {?} extractor
         * @return {?}
         */function (extractor) {
            configuration.responseInterceptors.push(extractor);
            return this;
        });
        configuration.errorInterceptors = configuration.errorInterceptors ? __spread(configuration.errorInterceptors) : [];
        object.addErrorInterceptor = ( /**
         * @param {?} interceptor
         * @return {?}
         */function (interceptor) {
            configuration.errorInterceptors = __spread([interceptor], configuration.errorInterceptors);
            return this;
        });
        object.setResponseInterceptor = object.addResponseInterceptor;
        object.setResponseExtractor = object.addResponseInterceptor;
        object.setErrorInterceptor = object.addErrorInterceptor;
        /**
         * Response interceptor is called just before resolving promises.
         */
        /**
         * Request interceptor is called before sending an object to the server.
         */
        configuration.requestInterceptors = configuration.requestInterceptors ? __spread(configuration.requestInterceptors) : [];
        configuration.defaultInterceptor = ( /**
         * @param {?} element
         * @param {?} operation
         * @param {?} path
         * @param {?} url
         * @param {?} headers
         * @param {?} params
         * @param {?} httpConfig
         * @return {?}
         */function (element, operation, path, url, headers, params, httpConfig) {
            return {
                element: element,
                headers: headers,
                params: params,
                httpConfig: httpConfig
            };
        });
        configuration.fullRequestInterceptor = ( /**
         * @param {?} element
         * @param {?} operation
         * @param {?} path
         * @param {?} url
         * @param {?} headers
         * @param {?} params
         * @param {?} httpConfig
         * @return {?}
         */function (element, operation, path, url, headers, params, httpConfig) {
            /** @type {?} */
            var interceptors = lodash.clone(configuration.requestInterceptors);
            /** @type {?} */
            var defaultRequest = configuration.defaultInterceptor(element, operation, path, url, headers, params, httpConfig);
            return lodash.reduce(interceptors, ( /**
             * @param {?} request
             * @param {?} interceptor
             * @return {?}
             */function (request, interceptor) {
                /** @type {?} */
                var returnInterceptor = interceptor(request.element, operation, path, url, request.headers, request.params, request.httpConfig);
                return lodash.extend(request, returnInterceptor);
            }), defaultRequest);
        });
        object.addRequestInterceptor = ( /**
         * @param {?} interceptor
         * @return {?}
         */function (interceptor) {
            configuration.requestInterceptors.push(( /**
             * @param {?} elem
             * @param {?} operation
             * @param {?} path
             * @param {?} url
             * @param {?} headers
             * @param {?} params
             * @param {?} httpConfig
             * @return {?}
             */function (elem, operation, path, url, headers, params, httpConfig) {
                return {
                    headers: headers,
                    params: params,
                    element: interceptor(elem, operation, path, url),
                    httpConfig: httpConfig
                };
            }));
            return this;
        });
        object.setRequestInterceptor = object.addRequestInterceptor;
        object.addFullRequestInterceptor = ( /**
         * @param {?} interceptor
         * @return {?}
         */function (interceptor) {
            configuration.requestInterceptors.push(interceptor);
            return this;
        });
        object.setFullRequestInterceptor = object.addFullRequestInterceptor;
        configuration.onBeforeElemRestangularized = configuration.onBeforeElemRestangularized || ( /**
         * @param {?} elem
         * @return {?}
         */function (elem) {
            return elem;
        });
        object.setOnBeforeElemRestangularized = ( /**
         * @param {?} post
         * @return {?}
         */function (post) {
            configuration.onBeforeElemRestangularized = post;
            return this;
        });
        object.setRestangularizePromiseInterceptor = ( /**
         * @param {?} interceptor
         * @return {?}
         */function (interceptor) {
            configuration.restangularizePromiseInterceptor = interceptor;
            return this;
        });
        /**
         * This method is called after an element has been "Restangularized".
         *
         * It receives the element, a boolean indicating if it's an element or a collection
         * and the name of the model
         *
         */
        configuration.onElemRestangularized = configuration.onElemRestangularized || ( /**
         * @param {?} elem
         * @return {?}
         */function (elem) {
            return elem;
        });
        object.setOnElemRestangularized = ( /**
         * @param {?} post
         * @return {?}
         */function (post) {
            configuration.onElemRestangularized = post;
            return this;
        });
        configuration.shouldSaveParent = configuration.shouldSaveParent || ( /**
         * @return {?}
         */function () {
            return true;
        });
        object.setParentless = ( /**
         * @param {?} values
         * @return {?}
         */function (values) {
            if (lodash.isArray(values)) {
                configuration.shouldSaveParent = ( /**
                 * @param {?} route
                 * @return {?}
                 */function (route) {
                    return !lodash.includes(values, route);
                });
            }
            else if (lodash.isBoolean(values)) {
                configuration.shouldSaveParent = ( /**
                 * @return {?}
                 */function () {
                    return !values;
                });
            }
            return this;
        });
        /**
         * This lets you set a suffix to every request.
         *
         * For example, if your api requires that for JSon requests you do /users/123.json, you can set that
         * in here.
         *
         *
         * By default, the suffix is null
         */
        configuration.suffix = lodash.isUndefined(configuration.suffix) ? null : configuration.suffix;
        object.setRequestSuffix = ( /**
         * @param {?} newSuffix
         * @return {?}
         */function (newSuffix) {
            configuration.suffix = newSuffix;
            return this;
        });
        /**
         * Add element transformers for certain routes.
         */
        configuration.transformers = configuration.transformers || {};
        object.addElementTransformer = ( /**
         * @param {?} type
         * @param {?} secondArg
         * @param {?} thirdArg
         * @return {?}
         */function (type, secondArg, thirdArg) {
            /** @type {?} */
            var isCollection = null;
            /** @type {?} */
            var transformer = null;
            if (arguments.length === 2) {
                transformer = secondArg;
            }
            else {
                transformer = thirdArg;
                isCollection = secondArg;
            }
            /** @type {?} */
            var typeTransformers = configuration.transformers[type];
            if (!typeTransformers) {
                typeTransformers = configuration.transformers[type] = [];
            }
            typeTransformers.push(( /**
             * @param {?} coll
             * @param {?} elem
             * @return {?}
             */function (coll, elem) {
                if (lodash.isNull(isCollection) || (coll === isCollection)) {
                    return transformer(elem);
                }
                return elem;
            }));
            return object;
        });
        object.extendCollection = ( /**
         * @param {?} route
         * @param {?} fn
         * @return {?}
         */function (route, fn) {
            return object.addElementTransformer(route, true, fn);
        });
        object.extendModel = ( /**
         * @param {?} route
         * @param {?} fn
         * @return {?}
         */function (route, fn) {
            return object.addElementTransformer(route, false, fn);
        });
        configuration.transformElem = ( /**
         * @param {?} elem
         * @param {?} isCollection
         * @param {?} route
         * @param {?} Restangular
         * @param {?} force
         * @return {?}
         */function (elem, isCollection, route, Restangular, force) {
            if (!force && !configuration.transformLocalElements && !elem[configuration.restangularFields.fromServer]) {
                return elem;
            }
            /** @type {?} */
            var typeTransformers = configuration.transformers[route];
            /** @type {?} */
            var changedElem = elem;
            if (typeTransformers) {
                lodash.each(typeTransformers, ( /**
                 * @param {?} transformer
                 * @return {?}
                 */function (transformer) {
                    changedElem = transformer(isCollection, changedElem);
                }));
            }
            return configuration.onElemRestangularized(changedElem, isCollection, route, Restangular);
        });
        configuration.transformLocalElements = lodash.isUndefined(configuration.transformLocalElements) ?
            false :
            configuration.transformLocalElements;
        object.setTransformOnlyServerElements = ( /**
         * @param {?} active
         * @return {?}
         */function (active) {
            configuration.transformLocalElements = !active;
        });
        configuration.fullResponse = lodash.isUndefined(configuration.fullResponse) ? false : configuration.fullResponse;
        object.setFullResponse = ( /**
         * @param {?} full
         * @return {?}
         */function (full) {
            configuration.fullResponse = full;
            return this;
        });
        // Internal values and functions
        configuration.urlCreatorFactory = {};
        /**
         * Base URL Creator. Base prototype for everything related to it
         *
         * @type {?}
         */
        var BaseCreator = ( /**
         * @return {?}
         */function () {
        });
        BaseCreator.prototype.setConfig = ( /**
         * @param {?} config
         * @return {?}
         */function (config) {
            this.config = config;
            return this;
        });
        BaseCreator.prototype.parentsArray = ( /**
         * @param {?} current
         * @return {?}
         */function (current) {
            /** @type {?} */
            var parents = [];
            while (current) {
                parents.push(current);
                current = current[this.config.restangularFields.parentResource];
            }
            return parents.reverse();
        });
        /**
         * @param {?} config
         * @param {?} $http
         * @param {?} url
         * @param {?} configurer
         * @return {?}
         */
        function RestangularResource(config, $http, url, configurer) {
            /** @type {?} */
            var resource = {};
            lodash.each(lodash.keys(configurer), ( /**
             * @param {?} key
             * @return {?}
             */function (key) {
                /** @type {?} */
                var value = configurer[key];
                // Add default parameters
                value.params = lodash.extend({}, value.params, config.defaultRequestParams[value.method.toLowerCase()]);
                // We don't want the ? if no params are there
                if (lodash.isEmpty(value.params)) {
                    delete value.params;
                }
                if (config.isSafe(value.method)) {
                    resource[key] = ( /**
                     * @return {?}
                     */function () {
                        /** @type {?} */
                        var resultConfig = lodash.extend(value, {
                            url: url
                        });
                        return $http.createRequest(resultConfig);
                    });
                }
                else {
                    resource[key] = ( /**
                     * @param {?} data
                     * @return {?}
                     */function (data) {
                        /** @type {?} */
                        var resultConfig = lodash.extend(value, {
                            url: url,
                            data: data
                        });
                        return $http.createRequest(resultConfig);
                    });
                }
            }));
            return resource;
        }
        BaseCreator.prototype.resource = ( /**
         * @param {?} current
         * @param {?} $http
         * @param {?} localHttpConfig
         * @param {?} callHeaders
         * @param {?} callParams
         * @param {?} what
         * @param {?} etag
         * @param {?} operation
         * @return {?}
         */function (current, $http, localHttpConfig, callHeaders, callParams, what, etag, operation) {
            /** @type {?} */
            var params = lodash.defaults(callParams || {}, this.config.defaultRequestParams.common);
            /** @type {?} */
            var headers = lodash.defaults(callHeaders || {}, this.config.defaultHeaders);
            if (etag) {
                if (!configuration.isSafe(operation)) {
                    headers['If-Match'] = etag;
                }
                else {
                    headers['If-None-Match'] = etag;
                }
            }
            /** @type {?} */
            var url = this.base(current);
            if (what) {
                /** @type {?} */
                var add = '';
                if (!/\/$/.test(url)) {
                    add += '/';
                }
                add += what;
                url += add;
            }
            if (this.config.suffix &&
                url.indexOf(this.config.suffix, url.length - this.config.suffix.length) === -1 && !this.config.getUrlFromElem(current)) {
                url += this.config.suffix;
            }
            current[this.config.restangularFields.httpConfig] = undefined;
            return RestangularResource(this.config, $http, url, {
                getList: this.config.withHttpValues(localHttpConfig, {
                    method: 'GET',
                    params: params,
                    headers: headers
                }),
                get: this.config.withHttpValues(localHttpConfig, {
                    method: 'GET',
                    params: params,
                    headers: headers
                }),
                jsonp: this.config.withHttpValues(localHttpConfig, {
                    method: 'jsonp',
                    params: params,
                    headers: headers
                }),
                put: this.config.withHttpValues(localHttpConfig, {
                    method: 'PUT',
                    params: params,
                    headers: headers
                }),
                post: this.config.withHttpValues(localHttpConfig, {
                    method: 'POST',
                    params: params,
                    headers: headers
                }),
                remove: this.config.withHttpValues(localHttpConfig, {
                    method: 'DELETE',
                    params: params,
                    headers: headers
                }),
                head: this.config.withHttpValues(localHttpConfig, {
                    method: 'HEAD',
                    params: params,
                    headers: headers
                }),
                trace: this.config.withHttpValues(localHttpConfig, {
                    method: 'TRACE',
                    params: params,
                    headers: headers
                }),
                options: this.config.withHttpValues(localHttpConfig, {
                    method: 'OPTIONS',
                    params: params,
                    headers: headers
                }),
                patch: this.config.withHttpValues(localHttpConfig, {
                    method: 'PATCH',
                    params: params,
                    headers: headers
                })
            });
        });
        /**
         * This is the Path URL creator. It uses Path to show Hierarchy in the Rest API.
         * This means that if you have an Account that then has a set of Buildings, a URL to a building
         * would be /accounts/123/buildings/456
         *
         * @type {?}
         */
        var Path = ( /**
         * @return {?}
         */function () {
        });
        Path.prototype = new BaseCreator();
        Path.prototype.normalizeUrl = ( /**
         * @param {?} url
         * @return {?}
         */function (url) {
            /** @type {?} */
            var parts = /((?:http[s]?:)?\/\/)?(.*)?/.exec(url);
            parts[2] = parts[2].replace(/[\\\/]+/g, '/');
            return (typeof parts[1] !== 'undefined') ? parts[1] + parts[2] : parts[2];
        });
        Path.prototype.base = ( /**
         * @param {?} current
         * @return {?}
         */function (current) {
            /** @type {?} */
            var __this = this;
            return lodash.reduce(this.parentsArray(current), ( /**
             * @param {?} acum
             * @param {?} elem
             * @return {?}
             */function (acum, elem) {
                /** @type {?} */
                var elemUrl;
                /** @type {?} */
                var elemSelfLink = __this.config.getUrlFromElem(elem);
                if (elemSelfLink) {
                    if (__this.config.isAbsoluteUrl(elemSelfLink)) {
                        return elemSelfLink;
                    }
                    else {
                        elemUrl = elemSelfLink;
                    }
                }
                else {
                    elemUrl = elem[__this.config.restangularFields.route];
                    if (elem[__this.config.restangularFields.restangularCollection]) {
                        /** @type {?} */
                        var ids = elem[__this.config.restangularFields.ids];
                        if (ids) {
                            elemUrl += '/' + ids.join(',');
                        }
                    }
                    else {
                        /** @type {?} */
                        var elemId = void 0;
                        if (__this.config.useCannonicalId) {
                            elemId = __this.config.getCannonicalIdFromElem(elem);
                        }
                        else {
                            elemId = __this.config.getIdFromElem(elem);
                        }
                        if (configuration.isValidId(elemId) && !elem.singleOne) {
                            elemUrl += '/' + (__this.config.encodeIds ? encodeURIComponent(elemId) : elemId);
                        }
                    }
                }
                acum = acum.replace(/\/$/, '') + '/' + elemUrl;
                return __this.normalizeUrl(acum);
            }), this.config.baseUrl);
        });
        Path.prototype.fetchUrl = ( /**
         * @param {?} current
         * @param {?} what
         * @return {?}
         */function (current, what) {
            /** @type {?} */
            var baseUrl = this.base(current);
            if (what) {
                baseUrl += '/' + what;
            }
            return baseUrl;
        });
        Path.prototype.fetchRequestedUrl = ( /**
         * @param {?} current
         * @param {?} what
         * @return {?}
         */function (current, what) {
            /** @type {?} */
            var url = this.fetchUrl(current, what);
            /** @type {?} */
            var params = current[configuration.restangularFields.reqParams];
            // From here on and until the end of fetchRequestedUrl,
            // the code has been kindly borrowed from angular.js
            // The reason for such code bloating is coherence:
            //   If the user were to use this for cache management, the
            //   serialization of parameters would need to be identical
            //   to the one done by angular for cache keys to match.
            /**
             * @param {?} obj
             * @return {?}
             */
            function sortedKeys(obj) {
                /** @type {?} */
                var resultKeys = [];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        resultKeys.push(key);
                    }
                }
                return resultKeys.sort();
            }
            /**
             * @param {?} obj
             * @param {?=} iterator
             * @param {?=} context
             * @return {?}
             */
            function forEachSorted(obj, iterator, context) {
                /** @type {?} */
                var sortedKeysArray = sortedKeys(obj);
                for (var i = 0; i < sortedKeysArray.length; i++) {
                    iterator.call(context, obj[sortedKeysArray[i]], sortedKeysArray[i]);
                }
                return sortedKeysArray;
            }
            /**
             * @param {?} val
             * @param {?=} pctEncodeSpaces
             * @return {?}
             */
            function encodeUriQuery(val, pctEncodeSpaces) {
                return encodeURIComponent(val)
                    .replace(/%40/gi, '@')
                    .replace(/%3A/gi, ':')
                    .replace(/%24/g, '$')
                    .replace(/%2C/gi, ',')
                    .replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
            }
            if (!params) {
                return url + (this.config.suffix || '');
            }
            /** @type {?} */
            var parts = [];
            forEachSorted(params, ( /**
             * @param {?} value
             * @param {?} key
             * @return {?}
             */function (value, key) {
                if (value === null || value === undefined) {
                    return;
                }
                if (!lodash.isArray(value)) {
                    value = [value];
                }
                lodash.forEach(value, ( /**
                 * @param {?} v
                 * @return {?}
                 */function (v) {
                    if (lodash.isObject(v)) {
                        v = JSON.stringify(v);
                    }
                    parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(v));
                }));
            }));
            return url + (this.config.suffix || '') + ((url.indexOf('?') === -1) ? '?' : '&') + parts.join('&');
        });
        configuration.urlCreatorFactory.path = Path;
    }

    var Restangular = /** @class */ (function () {
        /**
         * @param {?} configObj
         * @param {?} injector
         * @param {?} http
         */
        function Restangular(configObj, injector, http) {
            this.configObj = configObj;
            this.injector = injector;
            this.http = http;
            this.provider = new providerConfig(http);
            /** @type {?} */
            var element = this.provider.$get();
            lodash.assign(this, element);
            this.setDefaultConfig();
        }
        /**
         * @return {?}
         */
        Restangular.prototype.setDefaultConfig = function () {
            var _a;
            var _this = this;
            if (!this.configObj || !lodash.isFunction(this.configObj.fn)) {
                return;
            }
            /** @type {?} */
            var arrDI = lodash.map(this.configObj.arrServices, ( /**
             * @param {?} services
             * @return {?}
             */function (services) {
                return _this.injector.get(services);
            }));
            (_a = this.configObj).fn.apply(_a, __spread([this.provider], arrDI));
        };
        return Restangular;
    }());
    Restangular.decorators = [
        { type: core.Injectable }
    ];
    /** @nocollapse */
    Restangular.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [RESTANGULAR,] }] },
        { type: core.Injector },
        { type: RestangularHttp }
    ]; };
    if (false) {
        /** @type {?} */
        Restangular.prototype.provider;
        /** @type {?} */
        Restangular.prototype.addElementTransformer;
        /** @type {?} */
        Restangular.prototype.extendCollection;
        /** @type {?} */
        Restangular.prototype.extendModel;
        /** @type {?} */
        Restangular.prototype.copy;
        /** @type {?} */
        Restangular.prototype.configuration;
        /** @type {?} */
        Restangular.prototype.service;
        /** @type {?} */
        Restangular.prototype.id;
        /** @type {?} */
        Restangular.prototype.route;
        /** @type {?} */
        Restangular.prototype.parentResource;
        /** @type {?} */
        Restangular.prototype.restangularCollection;
        /** @type {?} */
        Restangular.prototype.cannonicalId;
        /** @type {?} */
        Restangular.prototype.etag;
        /** @type {?} */
        Restangular.prototype.selfLink;
        /** @type {?} */
        Restangular.prototype.get;
        /** @type {?} */
        Restangular.prototype.getList;
        /** @type {?} */
        Restangular.prototype.put;
        /** @type {?} */
        Restangular.prototype.post;
        /** @type {?} */
        Restangular.prototype.remove;
        /** @type {?} */
        Restangular.prototype.head;
        /** @type {?} */
        Restangular.prototype.trace;
        /** @type {?} */
        Restangular.prototype.options;
        /** @type {?} */
        Restangular.prototype.patch;
        /** @type {?} */
        Restangular.prototype.getRestangularUrl;
        /** @type {?} */
        Restangular.prototype.getRequestedUrl;
        /** @type {?} */
        Restangular.prototype.putElement;
        /** @type {?} */
        Restangular.prototype.addRestangularMethod;
        /** @type {?} */
        Restangular.prototype.getParentList;
        /** @type {?} */
        Restangular.prototype.clone;
        /** @type {?} */
        Restangular.prototype.ids;
        /** @type {?} */
        Restangular.prototype.httpConfig;
        /** @type {?} */
        Restangular.prototype.reqParams;
        /** @type {?} */
        Restangular.prototype.one;
        /** @type {?} */
        Restangular.prototype.all;
        /** @type {?} */
        Restangular.prototype.several;
        /** @type {?} */
        Restangular.prototype.oneUrl;
        /** @type {?} */
        Restangular.prototype.allUrl;
        /** @type {?} */
        Restangular.prototype.customPUT;
        /** @type {?} */
        Restangular.prototype.customPATCH;
        /** @type {?} */
        Restangular.prototype.customPOST;
        /** @type {?} */
        Restangular.prototype.customDELETE;
        /** @type {?} */
        Restangular.prototype.customGET;
        /** @type {?} */
        Restangular.prototype.customGETLIST;
        /** @type {?} */
        Restangular.prototype.customOperation;
        /** @type {?} */
        Restangular.prototype.doPUT;
        /** @type {?} */
        Restangular.prototype.doPATCH;
        /** @type {?} */
        Restangular.prototype.doPOST;
        /** @type {?} */
        Restangular.prototype.doDELETE;
        /** @type {?} */
        Restangular.prototype.doGET;
        /** @type {?} */
        Restangular.prototype.doGETLIST;
        /** @type {?} */
        Restangular.prototype.fromServer;
        /** @type {?} */
        Restangular.prototype.withConfig;
        /** @type {?} */
        Restangular.prototype.withHttpConfig;
        /** @type {?} */
        Restangular.prototype.singleOne;
        /** @type {?} */
        Restangular.prototype.plain;
        /** @type {?} */
        Restangular.prototype.save;
        /** @type {?} */
        Restangular.prototype.restangularized;
        /** @type {?} */
        Restangular.prototype.restangularizeElement;
        /** @type {?} */
        Restangular.prototype.restangularizeCollection;
        /** @type {?} */
        Restangular.prototype.configObj;
        /**
         * @type {?}
         * @private
         */
        Restangular.prototype.injector;
        /**
         * @type {?}
         * @private
         */
        Restangular.prototype.http;
    }
    /**
     * @param {?} $http
     * @return {?}
     */
    function providerConfig($http) {
        /** @type {?} */
        var globalConfiguration = {};
        RestangularConfigurer(this, globalConfiguration);
        this.$get = $get;
        /**
         * @return {?}
         */
        function $get() {
            /**
             * @param {?} config
             * @return {?}
             */
            function createServiceForConfiguration(config) {
                /** @type {?} */
                var service = {};
                /** @type {?} */
                var urlHandler = new config.urlCreatorFactory[config.urlCreator]();
                urlHandler.setConfig(config);
                /**
                 * @param {?} parent
                 * @param {?} elem
                 * @param {?} route
                 * @param {?} reqParams
                 * @param {?} fromServer
                 * @return {?}
                 */
                function restangularizeBase(parent, elem, route, reqParams, fromServer) {
                    elem[config.restangularFields.route] = route;
                    elem[config.restangularFields.getRestangularUrl] = lodash.bind(urlHandler.fetchUrl, urlHandler, elem);
                    elem[config.restangularFields.getRequestedUrl] = lodash.bind(urlHandler.fetchRequestedUrl, urlHandler, elem);
                    elem[config.restangularFields.addRestangularMethod] = lodash.bind(addRestangularMethodFunction, elem);
                    elem[config.restangularFields.clone] = lodash.bind(copyRestangularizedElement, elem);
                    elem[config.restangularFields.reqParams] = lodash.isEmpty(reqParams) ? null : reqParams;
                    elem[config.restangularFields.withHttpConfig] = lodash.bind(withHttpConfig, elem);
                    elem[config.restangularFields.plain] = lodash.bind(stripRestangular, elem, elem);
                    // Tag element as restangularized
                    elem[config.restangularFields.restangularized] = true;
                    // RequestLess connection
                    elem[config.restangularFields.one] = lodash.bind(one, elem, elem);
                    elem[config.restangularFields.all] = lodash.bind(all, elem, elem);
                    elem[config.restangularFields.several] = lodash.bind(several, elem, elem);
                    elem[config.restangularFields.oneUrl] = lodash.bind(oneUrl, elem, elem);
                    elem[config.restangularFields.allUrl] = lodash.bind(allUrl, elem, elem);
                    elem[config.restangularFields.fromServer] = !!fromServer;
                    if (parent && config.shouldSaveParent(route)) {
                        /** @type {?} */
                        var parentId = config.getIdFromElem(parent);
                        /** @type {?} */
                        var parentUrl = config.getUrlFromElem(parent);
                        /** @type {?} */
                        var restangularFieldsForParent = lodash.union(lodash.values(lodash.pick(config.restangularFields, ['route', 'singleOne', 'parentResource'])), config.extraFields);
                        /** @type {?} */
                        var parentResource = lodash.pick(parent, restangularFieldsForParent);
                        if (config.isValidId(parentId)) {
                            config.setIdToElem(parentResource, parentId, route);
                        }
                        if (config.isValidId(parentUrl)) {
                            config.setUrlToElem(parentResource, parentUrl, route);
                        }
                        elem[config.restangularFields.parentResource] = parentResource;
                    }
                    else {
                        elem[config.restangularFields.parentResource] = null;
                    }
                    return elem;
                }
                /**
                 * @param {?} parent
                 * @param {?} route
                 * @param {?} id
                 * @param {?} singleOne
                 * @return {?}
                 */
                function one(parent, route, id, singleOne) {
                    /** @type {?} */
                    var error;
                    if (lodash.isNumber(route) || lodash.isNumber(parent)) {
                        error = 'You\'re creating a Restangular entity with the number ';
                        error += 'instead of the route or the parent. For example, you can\'t call .one(12).';
                        throw new Error(error);
                    }
                    if (lodash.isUndefined(route)) {
                        error = 'You\'re creating a Restangular entity either without the path. ';
                        error += 'For example you can\'t call .one(). Please check if your arguments are valid.';
                        throw new Error(error);
                    }
                    /** @type {?} */
                    var elem = {};
                    config.setIdToElem(elem, id, route);
                    config.setFieldToElem(config.restangularFields.singleOne, elem, singleOne);
                    return restangularizeElem(parent, elem, route, false);
                }
                /**
                 * @param {?} parent
                 * @param {?} route
                 * @return {?}
                 */
                function all(parent, route) {
                    return restangularizeCollection(parent, [], route, false);
                }
                /**
                 * @param {?} parent
                 * @param {?} route
                 * @return {?}
                 */
                function several(parent, route /*, ids */) {
                    /** @type {?} */
                    var collection = [];
                    collection[config.restangularFields.ids] = Array.prototype.splice.call(arguments, 2);
                    return restangularizeCollection(parent, collection, route, false);
                }
                /**
                 * @param {?} parent
                 * @param {?} route
                 * @param {?} url
                 * @return {?}
                 */
                function oneUrl(parent, route, url) {
                    if (!route) {
                        throw new Error('Route is mandatory when creating new Restangular objects.');
                    }
                    /** @type {?} */
                    var elem = {};
                    config.setUrlToElem(elem, url, route);
                    return restangularizeElem(parent, elem, route, false);
                }
                /**
                 * @param {?} parent
                 * @param {?} route
                 * @param {?} url
                 * @return {?}
                 */
                function allUrl(parent, route, url) {
                    if (!route) {
                        throw new Error('Route is mandatory when creating new Restangular objects.');
                    }
                    /** @type {?} */
                    var elem = {};
                    config.setUrlToElem(elem, url, route);
                    return restangularizeCollection(parent, elem, route, false);
                }
                // Promises
                /**
                 * @param {?} subject
                 * @param {?} isCollection
                 * @param {?} valueToFill
                 * @return {?}
                 */
                function restangularizeResponse(subject, isCollection, valueToFill) {
                    return subject.pipe(operators.filter(( /**
                     * @param {?} res
                     * @return {?}
                     */function (/**
                     * @param {?} res
                     * @return {?}
                     */ res) { return !!res; })));
                }
                /**
                 * @param {?} subject
                 * @param {?} response
                 * @param {?} data
                 * @param {?} filledValue
                 * @return {?}
                 */
                function resolvePromise(subject, response, data, filledValue) {
                    lodash.extend(filledValue, data);
                    // Trigger the full response interceptor.
                    if (config.fullResponse) {
                        subject.next(lodash.extend(response, {
                            data: data
                        }));
                    }
                    else {
                        subject.next(data);
                    }
                    subject.complete();
                }
                // Elements
                /**
                 * @param {?} elem
                 * @return {?}
                 */
                function stripRestangular(elem) {
                    if (lodash.isArray(elem)) {
                        /** @type {?} */
                        var array_1 = [];
                        lodash.each(elem, ( /**
                         * @param {?} value
                         * @return {?}
                         */function (value) {
                            array_1.push(config.isRestangularized(value) ? stripRestangular(value) : value);
                        }));
                        return array_1;
                    }
                    else {
                        return lodash.omit(elem, lodash.values(lodash.omit(config.restangularFields, 'id')));
                    }
                }
                /**
                 * @param {?} elem
                 * @return {?}
                 */
                function addCustomOperation(elem) {
                    elem[config.restangularFields.customOperation] = lodash.bind(customFunction, elem);
                    /** @type {?} */
                    var requestMethods = { get: customFunction, delete: customFunction };
                    lodash.each(['put', 'patch', 'post'], ( /**
                     * @param {?} name
                     * @return {?}
                     */function (name) {
                        requestMethods[name] = ( /**
                         * @param {?} operation
                         * @param {?} element
                         * @param {?} path
                         * @param {?} params
                         * @param {?} headers
                         * @return {?}
                         */function (operation, element, path, params, headers) {
                            return lodash.bind(customFunction, this)(operation, path, params, headers, element);
                        });
                    }));
                    lodash.each(requestMethods, ( /**
                     * @param {?} requestFunc
                     * @param {?} name
                     * @return {?}
                     */function (requestFunc, name) {
                        /** @type {?} */
                        var callOperation = name === 'delete' ? 'remove' : name;
                        lodash.each(['do', 'custom'], ( /**
                         * @param {?} alias
                         * @return {?}
                         */function (alias) {
                            elem[alias + name.toUpperCase()] = lodash.bind(requestFunc, elem, callOperation);
                        }));
                    }));
                    elem[config.restangularFields.customGETLIST] = lodash.bind(fetchFunction, elem);
                    elem[config.restangularFields.doGETLIST] = elem[config.restangularFields.customGETLIST];
                }
                /**
                 * @param {?} fromElement
                 * @param {?=} toElement
                 * @return {?}
                 */
                function copyRestangularizedElement(fromElement, toElement) {
                    if (toElement === void 0) { toElement = {}; }
                    /** @type {?} */
                    var copiedElement = lodash.assign(toElement, fromElement);
                    return restangularizeElem(copiedElement[config.restangularFields.parentResource], copiedElement, copiedElement[config.restangularFields.route], true);
                }
                /**
                 * @param {?} parent
                 * @param {?} element
                 * @param {?} route
                 * @param {?=} fromServer
                 * @param {?=} collection
                 * @param {?=} reqParams
                 * @return {?}
                 */
                function restangularizeElem(parent, element, route, fromServer, collection, reqParams) {
                    /** @type {?} */
                    var elem = config.onBeforeElemRestangularized(element, false, route);
                    /** @type {?} */
                    var localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);
                    if (config.useCannonicalId) {
                        localElem[config.restangularFields.cannonicalId] = config.getIdFromElem(localElem);
                    }
                    if (collection) {
                        localElem[config.restangularFields.getParentList] = ( /**
                         * @return {?}
                         */function () {
                            return collection;
                        });
                    }
                    localElem[config.restangularFields.restangularCollection] = false;
                    localElem[config.restangularFields.get] = lodash.bind(getFunction, localElem);
                    localElem[config.restangularFields.getList] = lodash.bind(fetchFunction, localElem);
                    localElem[config.restangularFields.put] = lodash.bind(putFunction, localElem);
                    localElem[config.restangularFields.post] = lodash.bind(postFunction, localElem);
                    localElem[config.restangularFields.remove] = lodash.bind(deleteFunction, localElem);
                    localElem[config.restangularFields.head] = lodash.bind(headFunction, localElem);
                    localElem[config.restangularFields.trace] = lodash.bind(traceFunction, localElem);
                    localElem[config.restangularFields.options] = lodash.bind(optionsFunction, localElem);
                    localElem[config.restangularFields.patch] = lodash.bind(patchFunction, localElem);
                    localElem[config.restangularFields.save] = lodash.bind(save, localElem);
                    addCustomOperation(localElem);
                    return config.transformElem(localElem, false, route, service, true);
                }
                /**
                 * @param {?} parent
                 * @param {?} element
                 * @param {?} route
                 * @param {?=} fromServer
                 * @param {?=} reqParams
                 * @return {?}
                 */
                function restangularizeCollection(parent, element, route, fromServer, reqParams) {
                    /** @type {?} */
                    var elem = config.onBeforeElemRestangularized(element, true, route);
                    /** @type {?} */
                    var localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);
                    localElem[config.restangularFields.restangularCollection] = true;
                    localElem[config.restangularFields.post] = lodash.bind(postFunction, localElem, null);
                    localElem[config.restangularFields.remove] = lodash.bind(deleteFunction, localElem);
                    localElem[config.restangularFields.head] = lodash.bind(headFunction, localElem);
                    localElem[config.restangularFields.trace] = lodash.bind(traceFunction, localElem);
                    localElem[config.restangularFields.putElement] = lodash.bind(putElementFunction, localElem);
                    localElem[config.restangularFields.options] = lodash.bind(optionsFunction, localElem);
                    localElem[config.restangularFields.patch] = lodash.bind(patchFunction, localElem);
                    localElem[config.restangularFields.get] = lodash.bind(getById, localElem);
                    localElem[config.restangularFields.getList] = lodash.bind(fetchFunction, localElem, null);
                    addCustomOperation(localElem);
                    return config.transformElem(localElem, true, route, service, true);
                }
                /**
                 * @param {?} parent
                 * @param {?} element
                 * @param {?} route
                 * @return {?}
                 */
                function restangularizeCollectionAndElements(parent, element, route) {
                    /** @type {?} */
                    var collection = restangularizeCollection(parent, element, route, false);
                    lodash.each(collection, ( /**
                     * @param {?} elem
                     * @return {?}
                     */function (elem) {
                        if (elem) {
                            restangularizeElem(parent, elem, route, false);
                        }
                    }));
                    return collection;
                }
                /**
                 * @param {?} id
                 * @param {?} reqParams
                 * @param {?} headers
                 * @return {?}
                 */
                function getById(id, reqParams, headers) {
                    return this.customGET(id.toString(), reqParams, headers);
                }
                /**
                 * @param {?} idx
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function putElementFunction(idx, params, headers) {
                    /** @type {?} */
                    var __this = this;
                    /** @type {?} */
                    var elemToPut = this[idx];
                    /** @type {?} */
                    var subject = new rxjs.BehaviorSubject(null);
                    /** @type {?} */
                    var filledArray = [];
                    filledArray = config.transformElem(filledArray, true, elemToPut[config.restangularFields.route], service);
                    elemToPut.put(params, headers)
                        .subscribe(( /**
                 * @param {?} serverElem
                 * @return {?}
                 */function (serverElem) {
                        /** @type {?} */
                        var newArray = copyRestangularizedElement(__this);
                        newArray[idx] = serverElem;
                        filledArray = newArray;
                        subject.next(newArray);
                    }), ( /**
                     * @param {?} response
                     * @return {?}
                     */function (response) {
                        subject.error(response);
                    }), ( /**
                     * @return {?}
                     */function () {
                        subject.complete();
                    }));
                    return restangularizeResponse(subject, true, filledArray);
                }
                /**
                 * @param {?} resData
                 * @param {?} operation
                 * @param {?} route
                 * @param {?} fetchUrl
                 * @param {?} response
                 * @param {?} subject
                 * @return {?}
                 */
                function parseResponse(resData, operation, route, fetchUrl, response, subject) {
                    /** @type {?} */
                    var data = config.responseExtractor(resData, operation, route, fetchUrl, response, subject);
                    /** @type {?} */
                    var etag = response.headers.get('ETag');
                    if (data && etag) {
                        data[config.restangularFields.etag] = etag;
                    }
                    return data;
                }
                /**
                 * @param {?} what
                 * @param {?} reqParams
                 * @param {?} headers
                 * @return {?}
                 */
                function fetchFunction(what, reqParams, headers) {
                    /** @type {?} */
                    var __this = this;
                    /** @type {?} */
                    var subject = new rxjs.BehaviorSubject(null);
                    /** @type {?} */
                    var operation = 'getList';
                    /** @type {?} */
                    var url = urlHandler.fetchUrl(this, what);
                    /** @type {?} */
                    var whatFetched = what || __this[config.restangularFields.route];
                    /** @type {?} */
                    var request = config.fullRequestInterceptor(null, operation, whatFetched, url, headers || {}, reqParams || {}, this[config.restangularFields.httpConfig] || {});
                    /** @type {?} */
                    var filledArray = [];
                    filledArray = config.transformElem(filledArray, true, whatFetched, service);
                    /** @type {?} */
                    var method = 'getList';
                    if (config.jsonp) {
                        method = 'jsonp';
                    }
                    /** @type {?} */
                    var okCallback = ( /**
                     * @param {?} response
                     * @return {?}
                     */function (response) {
                        /** @type {?} */
                        var resData = response.body;
                        /** @type {?} */
                        var fullParams = response.config.params;
                        /** @type {?} */
                        var data = parseResponse(resData, operation, whatFetched, url, response, subject);
                        // support empty response for getList() calls (some APIs respond with 204 and empty body)
                        if (lodash.isUndefined(data) || '' === data) {
                            data = [];
                        }
                        if (!lodash.isArray(data)) {
                            throw new Error('Response for getList SHOULD be an array and not an object or something else');
                        }
                        if (true === config.plainByDefault) {
                            return resolvePromise(subject, response, data, filledArray);
                        }
                        /** @type {?} */
                        var processedData = lodash.map(data, ( /**
                         * @param {?} elem
                         * @return {?}
                         */function (elem) {
                            if (!__this[config.restangularFields.restangularCollection]) {
                                return restangularizeElem(__this, elem, what, true, data);
                            }
                            else {
                                return restangularizeElem(__this[config.restangularFields.parentResource], elem, __this[config.restangularFields.route], true, data);
                            }
                        }));
                        processedData = lodash.extend(data, processedData);
                        if (!__this[config.restangularFields.restangularCollection]) {
                            resolvePromise(subject, response, restangularizeCollection(__this, processedData, what, true, fullParams), filledArray);
                        }
                        else {
                            resolvePromise(subject, response, restangularizeCollection(__this[config.restangularFields.parentResource], processedData, __this[config.restangularFields.route], true, fullParams), filledArray);
                        }
                    });
                    urlHandler.resource(this, $http, request.httpConfig, request.headers, request.params, what, this[config.restangularFields.etag], operation)[method]()
                        .subscribe(okCallback, ( /**
                 * @param {?} response
                 * @return {?}
                 */function error(response) {
                        if (response.status === 304 && __this[config.restangularFields.restangularCollection]) {
                            resolvePromise(subject, response, __this, filledArray);
                        }
                        else if (lodash.every(config.errorInterceptors, ( /**
                         * @param {?} cb
                         * @return {?}
                         */function (cb) {
                            return cb(response, subject, okCallback) !== false;
                        }))) {
                            // triggered if no callback returns false
                            subject.error(response);
                        }
                    }));
                    return restangularizeResponse(subject, true, filledArray);
                }
                /**
                 * @param {?} httpConfig
                 * @return {?}
                 */
                function withHttpConfig(httpConfig) {
                    this[config.restangularFields.httpConfig] = httpConfig;
                    return this;
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function save(params, headers) {
                    if (this[config.restangularFields.fromServer]) {
                        return this[config.restangularFields.put](params, headers);
                    }
                    else {
                        return lodash.bind(elemFunction, this)('post', undefined, params, undefined, headers);
                    }
                }
                /**
                 * @param {?} operation
                 * @param {?} what
                 * @param {?} params
                 * @param {?} obj
                 * @param {?} headers
                 * @return {?}
                 */
                function elemFunction(operation, what, params, obj, headers) {
                    /** @type {?} */
                    var __this = this;
                    /** @type {?} */
                    var subject = new rxjs.BehaviorSubject(null);
                    /** @type {?} */
                    var resParams = params || {};
                    /** @type {?} */
                    var route = what || this[config.restangularFields.route];
                    /** @type {?} */
                    var fetchUrl = urlHandler.fetchUrl(this, what);
                    /** @type {?} */
                    var callObj = obj || this;
                    // fallback to etag on restangular object (since for custom methods we probably don't explicitly specify the etag field)
                    /** @type {?} */
                    var etag = callObj[config.restangularFields.etag] || (operation !== 'post' ? this[config.restangularFields.etag] : null);
                    if (lodash.isObject(callObj) && config.isRestangularized(callObj)) {
                        callObj = stripRestangular(callObj);
                    }
                    /** @type {?} */
                    var request = config.fullRequestInterceptor(callObj, operation, route, fetchUrl, headers || {}, resParams || {}, this[config.restangularFields.httpConfig] || {});
                    /** @type {?} */
                    var filledObject = {};
                    filledObject = config.transformElem(filledObject, false, route, service);
                    /** @type {?} */
                    var okCallback = ( /**
                     * @param {?} response
                     * @return {?}
                     */function (response) {
                        /** @type {?} */
                        var resData = lodash.get(response, 'body');
                        /** @type {?} */
                        var fullParams = lodash.get(response, 'config.params');
                        /** @type {?} */
                        var elem = parseResponse(resData, operation, route, fetchUrl, response, subject);
                        if (elem) {
                            /** @type {?} */
                            var data = void 0;
                            if (true === config.plainByDefault) {
                                return resolvePromise(subject, response, elem, filledObject);
                            }
                            if (operation === 'post' && !__this[config.restangularFields.restangularCollection]) {
                                data = restangularizeElem(__this[config.restangularFields.parentResource], elem, route, true, null, fullParams);
                                resolvePromise(subject, response, data, filledObject);
                            }
                            else {
                                data = restangularizeElem(__this[config.restangularFields.parentResource], elem, __this[config.restangularFields.route], true, null, fullParams);
                                data[config.restangularFields.singleOne] = __this[config.restangularFields.singleOne];
                                resolvePromise(subject, response, data, filledObject);
                            }
                        }
                        else {
                            resolvePromise(subject, response, undefined, filledObject);
                        }
                    });
                    /** @type {?} */
                    var errorCallback = ( /**
                     * @param {?} response
                     * @return {?}
                     */function (response) {
                        if (response.status === 304 && config.isSafe(operation)) {
                            resolvePromise(subject, response, __this, filledObject);
                        }
                        else if (lodash.every(config.errorInterceptors, ( /**
                         * @param {?} cb
                         * @return {?}
                         */function (cb) {
                            return cb(response, subject, okCallback) !== false;
                        }))) {
                            // triggered if no callback returns false
                            subject.error(response);
                        }
                    });
                    // Overriding HTTP Method
                    /** @type {?} */
                    var callOperation = operation;
                    /** @type {?} */
                    var callHeaders = lodash.extend({}, request.headers);
                    /** @type {?} */
                    var isOverrideOperation = config.isOverridenMethod(operation);
                    if (isOverrideOperation) {
                        callOperation = 'post';
                        callHeaders = lodash.extend(callHeaders, { 'X-HTTP-Method-Override': operation === 'remove' ? 'DELETE' : operation.toUpperCase() });
                    }
                    else if (config.jsonp && callOperation === 'get') {
                        callOperation = 'jsonp';
                    }
                    if (config.isSafe(operation)) {
                        if (isOverrideOperation) {
                            urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params, what, etag, callOperation)[callOperation]({}).subscribe(okCallback, errorCallback);
                        }
                        else {
                            urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params, what, etag, callOperation)[callOperation]().subscribe(okCallback, errorCallback);
                        }
                    }
                    else {
                        urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params, what, etag, callOperation)[callOperation](request.element).subscribe(okCallback, errorCallback);
                    }
                    return restangularizeResponse(subject, false, filledObject);
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function getFunction(params, headers) {
                    return lodash.bind(elemFunction, this)('get', undefined, params, undefined, headers);
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function deleteFunction(params, headers) {
                    return lodash.bind(elemFunction, this)('remove', undefined, params, undefined, headers);
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function putFunction(params, headers) {
                    return lodash.bind(elemFunction, this)('put', undefined, params, undefined, headers);
                }
                /**
                 * @param {?} what
                 * @param {?} elem
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function postFunction(what, elem, params, headers) {
                    return lodash.bind(elemFunction, this)('post', what, params, elem, headers);
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function headFunction(params, headers) {
                    return lodash.bind(elemFunction, this)('head', undefined, params, undefined, headers);
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function traceFunction(params, headers) {
                    return lodash.bind(elemFunction, this)('trace', undefined, params, undefined, headers);
                }
                /**
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function optionsFunction(params, headers) {
                    return lodash.bind(elemFunction, this)('options', undefined, params, undefined, headers);
                }
                /**
                 * @param {?} elem
                 * @param {?} params
                 * @param {?} headers
                 * @return {?}
                 */
                function patchFunction(elem, params, headers) {
                    return lodash.bind(elemFunction, this)('patch', undefined, params, elem, headers);
                }
                /**
                 * @param {?} operation
                 * @param {?} path
                 * @param {?} params
                 * @param {?} headers
                 * @param {?} elem
                 * @return {?}
                 */
                function customFunction(operation, path, params, headers, elem) {
                    return lodash.bind(elemFunction, this)(operation, path, params, elem, headers);
                }
                /**
                 * @param {?} name
                 * @param {?} operation
                 * @param {?} path
                 * @param {?} defaultParams
                 * @param {?} defaultHeaders
                 * @param {?} defaultElem
                 * @return {?}
                 */
                function addRestangularMethodFunction(name, operation, path, defaultParams, defaultHeaders, defaultElem) {
                    /** @type {?} */
                    var bindedFunction;
                    if (operation === 'getList') {
                        bindedFunction = lodash.bind(fetchFunction, this, path);
                    }
                    else {
                        bindedFunction = lodash.bind(customFunction, this, operation, path);
                    }
                    /** @type {?} */
                    var createdFunction = ( /**
                     * @param {?} params
                     * @param {?} headers
                     * @param {?} elem
                     * @return {?}
                     */function (params, headers, elem) {
                        /** @type {?} */
                        var callParams = lodash.defaults({
                            params: params,
                            headers: headers,
                            elem: elem
                        }, {
                            params: defaultParams,
                            headers: defaultHeaders,
                            elem: defaultElem
                        });
                        return bindedFunction(callParams.params, callParams.headers, callParams.elem);
                    });
                    if (config.isSafe(operation)) {
                        this[name] = createdFunction;
                    }
                    else {
                        this[name] = ( /**
                         * @param {?} elem
                         * @param {?} params
                         * @param {?} headers
                         * @return {?}
                         */function (elem, params, headers) {
                            return createdFunction(params, headers, elem);
                        });
                    }
                }
                /**
                 * @param {?} configurer
                 * @return {?}
                 */
                function withConfigurationFunction(configurer) {
                    /** @type {?} */
                    var newConfig = lodash.clone(lodash.omit(config, 'configuration'));
                    RestangularConfigurer(newConfig, newConfig);
                    configurer(newConfig);
                    return createServiceForConfiguration(newConfig);
                }
                /**
                 * @param {?} route
                 * @param {?} parent
                 * @return {?}
                 */
                function toService(route, parent) {
                    /** @type {?} */
                    var knownCollectionMethods = lodash.values(config.restangularFields);
                    /** @type {?} */
                    var serv = {};
                    /** @type {?} */
                    var collection = (parent || service).all(route);
                    serv.one = lodash.bind(one, (parent || service), parent, route);
                    serv.all = lodash.bind(collection.all, collection);
                    serv.post = lodash.bind(collection.post, collection);
                    serv.getList = lodash.bind(collection.getList, collection);
                    serv.withHttpConfig = lodash.bind(collection.withHttpConfig, collection);
                    serv.get = lodash.bind(collection.get, collection);
                    for (var prop in collection) {
                        if (collection.hasOwnProperty(prop) && lodash.isFunction(collection[prop]) && !lodash.includes(knownCollectionMethods, prop)) {
                            serv[prop] = lodash.bind(collection[prop], collection);
                        }
                    }
                    return serv;
                }
                RestangularConfigurer(service, config);
                service.copy = lodash.bind(copyRestangularizedElement, service);
                service.service = lodash.bind(toService, service);
                service.withConfig = lodash.bind(withConfigurationFunction, service);
                service.one = lodash.bind(one, service, null);
                service.all = lodash.bind(all, service, null);
                service.several = lodash.bind(several, service, null);
                service.oneUrl = lodash.bind(oneUrl, service, null);
                service.allUrl = lodash.bind(allUrl, service, null);
                service.stripRestangular = lodash.bind(stripRestangular, service);
                service.restangularizeElement = lodash.bind(restangularizeElem, service);
                service.restangularizeCollection = lodash.bind(restangularizeCollectionAndElements, service);
                return service;
            }
            return createServiceForConfiguration(globalConfiguration);
        }
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-restangular.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CONFIG_OBJ = new core.InjectionToken('configObj');
    var RestangularModule = /** @class */ (function () {
        /**
         * @param {?} parentModule
         */
        function RestangularModule(parentModule) {
            if (parentModule) {
                throw new Error('RestangularModule is already loaded. Import it in the AppModule only');
            }
        }
        /**
         * @param {?=} config1
         * @param {?=} config2
         * @return {?}
         */
        RestangularModule.forRoot = function (config1, config2) {
            return {
                ngModule: RestangularModule,
                providers: [
                    { provide: CONFIG_OBJ, useValue: [config1, config2] },
                    { provide: RESTANGULAR, useFactory: RestangularFactory, deps: [CONFIG_OBJ] },
                ]
            };
        };
        return RestangularModule;
    }());
    RestangularModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [http.HttpClientModule],
                    providers: [RestangularHttp, Restangular]
                },] }
    ];
    /** @nocollapse */
    RestangularModule.ctorParameters = function () { return [
        { type: RestangularModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] }
    ]; };

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: public_api.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: ngx-restangular.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.Restangular = Restangular;
    exports.RestangularHttp = RestangularHttp;
    exports.RestangularModule = RestangularModule;
    exports.ɵa = CONFIG_OBJ;
    exports.ɵb = RESTANGULAR;
    exports.ɵc = RestangularFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-restangular.umd.js.map
