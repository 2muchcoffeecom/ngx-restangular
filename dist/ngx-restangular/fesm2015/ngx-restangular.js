import { InjectionToken, Injectable, Optional, Inject, Injector, NgModule, SkipSelf } from '@angular/core';
import { HttpRequest, HttpParams, HttpHeaders, HttpResponse, HttpErrorResponse, HttpBackend, HttpClientModule } from '@angular/common/http';
import { isArray, assign, includes, isUndefined, isNull, defaults, each, extend, find, has, initial, last, clone, reduce, isBoolean, keys, isEmpty, forEach, isObject, isFunction, map as map$1, bind, union, values, pick, isNumber, omit, every, get } from 'lodash';
import { throwError, BehaviorSubject } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-restangular.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const RESTANGULAR = new InjectionToken('restangularWithConfig');
/**
 * @param {?} __0
 * @return {?}
 */
function RestangularFactory([callbackOrServices, callback]) {
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-restangular-helper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RestangularHelper {
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-restangular-http.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RestangularHttp {
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-restangular-config.factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    const safeMethods = ['get', 'head', 'options', 'trace', 'getlist'];
    configuration.isSafe = (/**
     * @param {?} operation
     * @return {?}
     */
    function (operation) {
        return includes(safeMethods, operation.toLowerCase());
    });
    /** @type {?} */
    const absolutePattern = /^https?:\/\//i;
    configuration.isAbsoluteUrl = (/**
     * @param {?} string
     * @return {?}
     */
    function (string) {
        return isUndefined(configuration.absoluteUrl) || isNull(configuration.absoluteUrl) ?
            string && absolutePattern.test(string) :
            configuration.absoluteUrl;
    });
    configuration.absoluteUrl = isUndefined(configuration.absoluteUrl) ? true : configuration.absoluteUrl;
    object.setSelfLinkAbsoluteUrl = (/**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        configuration.absoluteUrl = value;
    });
    /**
     * This is the BaseURL to be used with Restangular
     */
    configuration.baseUrl = isUndefined(configuration.baseUrl) ? '' : configuration.baseUrl;
    object.setBaseUrl = (/**
     * @param {?} newBaseUrl
     * @return {?}
     */
    function (newBaseUrl) {
        configuration.baseUrl = /\/$/.test(newBaseUrl) ?
            newBaseUrl.substring(0, newBaseUrl.length - 1) :
            newBaseUrl;
        return this;
    });
    /**
     * Sets the extra fields to keep from the parents
     */
    configuration.extraFields = configuration.extraFields || [];
    object.setExtraFields = (/**
     * @param {?} newExtraFields
     * @return {?}
     */
    function (newExtraFields) {
        configuration.extraFields = newExtraFields;
        return this;
    });
    /**
     * Some default $http parameter to be used in EVERY call
     **/
    configuration.defaultHttpFields = configuration.defaultHttpFields || {};
    object.setDefaultHttpFields = (/**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        configuration.defaultHttpFields = values;
        return this;
    });
    /**
     * Always return plain data, no restangularized object
     **/
    configuration.plainByDefault = configuration.plainByDefault || false;
    object.setPlainByDefault = (/**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        configuration.plainByDefault = value === true ? true : false;
        return this;
    });
    configuration.withHttpValues = (/**
     * @param {?} httpLocalConfig
     * @param {?} obj
     * @return {?}
     */
    function (httpLocalConfig, obj) {
        return defaults(obj, httpLocalConfig, configuration.defaultHttpFields);
    });
    configuration.encodeIds = isUndefined(configuration.encodeIds) ? true : configuration.encodeIds;
    object.setEncodeIds = (/**
     * @param {?} encode
     * @return {?}
     */
    function (encode) {
        configuration.encodeIds = encode;
    });
    configuration.defaultRequestParams = configuration.defaultRequestParams || {
        get: {},
        post: {},
        put: {},
        remove: {},
        common: {}
    };
    object.setDefaultRequestParams = (/**
     * @param {?} param1
     * @param {?} param2
     * @return {?}
     */
    function (param1, param2) {
        /** @type {?} */
        let methods = [];
        /** @type {?} */
        const params = param2 || param1;
        if (!isUndefined(param2)) {
            if (isArray(param1)) {
                methods = param1;
            }
            else {
                methods.push(param1);
            }
        }
        else {
            methods.push('common');
        }
        each(methods, (/**
         * @param {?} method
         * @return {?}
         */
        function (method) {
            configuration.defaultRequestParams[method] = params;
        }));
        return this;
    });
    object.requestParams = configuration.defaultRequestParams;
    configuration.defaultHeaders = configuration.defaultHeaders || {};
    object.setDefaultHeaders = (/**
     * @param {?} headers
     * @return {?}
     */
    function (headers) {
        configuration.defaultHeaders = headers;
        object.defaultHeaders = configuration.defaultHeaders;
        return this;
    });
    object.defaultHeaders = configuration.defaultHeaders;
    /**
     * Method overriders response Method
     **/
    configuration.defaultResponseMethod = configuration.defaultResponseMethod || 'promise';
    object.setDefaultResponseMethod = (/**
     * @param {?} method
     * @return {?}
     */
    function (method) {
        configuration.defaultResponseMethod = method;
        object.defaultResponseMethod = configuration.defaultResponseMethod;
        return this;
    });
    object.defaultResponseMethod = configuration.defaultResponseMethod;
    /**
     * Method overriders will set which methods are sent via POST with an X-HTTP-Method-Override
     **/
    configuration.methodOverriders = configuration.methodOverriders || [];
    object.setMethodOverriders = (/**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        /** @type {?} */
        const overriders = extend([], values);
        if (configuration.isOverridenMethod('delete', overriders)) {
            overriders.push('remove');
        }
        configuration.methodOverriders = overriders;
        return this;
    });
    configuration.jsonp = isUndefined(configuration.jsonp) ? false : configuration.jsonp;
    object.setJsonp = (/**
     * @param {?} active
     * @return {?}
     */
    function (active) {
        configuration.jsonp = active;
    });
    configuration.isOverridenMethod = (/**
     * @param {?} method
     * @param {?} values
     * @return {?}
     */
    function (method, values) {
        /** @type {?} */
        const search = values || configuration.methodOverriders;
        return !isUndefined(find(search, (/**
         * @param {?} one
         * @return {?}
         */
        function (one) {
            return one.toLowerCase() === method.toLowerCase();
        })));
    });
    /**
     * Sets the URL creator type. For now, only Path is created. In the future we'll have queryParams
     **/
    configuration.urlCreator = configuration.urlCreator || 'path';
    object.setUrlCreator = (/**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (!has(configuration.urlCreatorFactory, name)) {
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
    object.setRestangularFields = (/**
     * @param {?} resFields
     * @return {?}
     */
    function (resFields) {
        configuration.restangularFields =
            extend({}, configuration.restangularFields, resFields);
        return this;
    });
    configuration.isRestangularized = (/**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return !!obj[configuration.restangularFields.restangularized];
    });
    configuration.setFieldToElem = (/**
     * @param {?} field
     * @param {?} elem
     * @param {?} value
     * @return {?}
     */
    function (field, elem, value) {
        /** @type {?} */
        const properties = field.split('.');
        /** @type {?} */
        let idValue = elem;
        each(initial(properties), (/**
         * @param {?} prop
         * @return {?}
         */
        function (prop) {
            idValue[prop] = {};
            idValue = idValue[prop];
        }));
        /** @type {?} */
        const index = last(properties);
        idValue[index] = value;
        return this;
    });
    configuration.getFieldFromElem = (/**
     * @param {?} field
     * @param {?} elem
     * @return {?}
     */
    function (field, elem) {
        /** @type {?} */
        const properties = field.split('.');
        /** @type {?} */
        let idValue = elem;
        each(properties, (/**
         * @param {?} prop
         * @return {?}
         */
        function (prop) {
            if (idValue) {
                idValue = idValue[prop];
            }
        }));
        return clone(idValue);
    });
    configuration.setIdToElem = (/**
     * @param {?} elem
     * @param {?} id
     * @return {?}
     */
    function (elem, id /*, route */) {
        configuration.setFieldToElem(configuration.restangularFields.id, elem, id);
        return this;
    });
    configuration.getIdFromElem = (/**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        return configuration.getFieldFromElem(configuration.restangularFields.id, elem);
    });
    configuration.isValidId = (/**
     * @param {?} elemId
     * @return {?}
     */
    function (elemId) {
        return '' !== elemId && !isUndefined(elemId) && !isNull(elemId);
    });
    configuration.setUrlToElem = (/**
     * @param {?} elem
     * @param {?} url
     * @return {?}
     */
    function (elem, url /*, route */) {
        configuration.setFieldToElem(configuration.restangularFields.selfLink, elem, url);
        return this;
    });
    configuration.getUrlFromElem = (/**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        return configuration.getFieldFromElem(configuration.restangularFields.selfLink, elem);
    });
    configuration.useCannonicalId = isUndefined(configuration.useCannonicalId) ? false : configuration.useCannonicalId;
    object.setUseCannonicalId = (/**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        configuration.useCannonicalId = value;
        return this;
    });
    configuration.getCannonicalIdFromElem = (/**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        /** @type {?} */
        const cannonicalId = elem[configuration.restangularFields.cannonicalId];
        /** @type {?} */
        const actualId = configuration.isValidId(cannonicalId) ? cannonicalId : configuration.getIdFromElem(elem);
        return actualId;
    });
    /**
     * Sets the Response parser. This is used in case your response isn't directly the data.
     * For example if you have a response like {meta: {'meta'}, data: {name: 'Gonto'}}
     * you can extract this data which is the one that needs wrapping
     *
     * The ResponseExtractor is a function that receives the response and the method executed.
     */
    configuration.responseInterceptors = configuration.responseInterceptors ? [...configuration.responseInterceptors] : [];
    configuration.defaultResponseInterceptor = (/**
     * @param {?} data
     * @return {?}
     */
    function (data /*, operation, what, url, response, subject */) {
        return data || {};
    });
    configuration.responseExtractor = (/**
     * @param {?} data
     * @param {?} operation
     * @param {?} what
     * @param {?} url
     * @param {?} response
     * @param {?} subject
     * @return {?}
     */
    function (data, operation, what, url, response, subject) {
        /** @type {?} */
        const interceptors = clone(configuration.responseInterceptors);
        interceptors.push(configuration.defaultResponseInterceptor);
        /** @type {?} */
        let theData = data;
        each(interceptors, (/**
         * @param {?} interceptor
         * @return {?}
         */
        function (interceptor) {
            theData = interceptor(theData, operation, what, url, response, subject);
        }));
        return theData;
    });
    object.addResponseInterceptor = (/**
     * @param {?} extractor
     * @return {?}
     */
    function (extractor) {
        configuration.responseInterceptors.push(extractor);
        return this;
    });
    configuration.errorInterceptors = configuration.errorInterceptors ? [...configuration.errorInterceptors] : [];
    object.addErrorInterceptor = (/**
     * @param {?} interceptor
     * @return {?}
     */
    function (interceptor) {
        configuration.errorInterceptors = [interceptor, ...configuration.errorInterceptors];
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
    configuration.requestInterceptors = configuration.requestInterceptors ? [...configuration.requestInterceptors] : [];
    configuration.defaultInterceptor = (/**
     * @param {?} element
     * @param {?} operation
     * @param {?} path
     * @param {?} url
     * @param {?} headers
     * @param {?} params
     * @param {?} httpConfig
     * @return {?}
     */
    function (element, operation, path, url, headers, params, httpConfig) {
        return {
            element: element,
            headers: headers,
            params: params,
            httpConfig: httpConfig
        };
    });
    configuration.fullRequestInterceptor = (/**
     * @param {?} element
     * @param {?} operation
     * @param {?} path
     * @param {?} url
     * @param {?} headers
     * @param {?} params
     * @param {?} httpConfig
     * @return {?}
     */
    function (element, operation, path, url, headers, params, httpConfig) {
        /** @type {?} */
        const interceptors = clone(configuration.requestInterceptors);
        /** @type {?} */
        const defaultRequest = configuration.defaultInterceptor(element, operation, path, url, headers, params, httpConfig);
        return reduce(interceptors, (/**
         * @param {?} request
         * @param {?} interceptor
         * @return {?}
         */
        function (request, interceptor) {
            /** @type {?} */
            const returnInterceptor = interceptor(request.element, operation, path, url, request.headers, request.params, request.httpConfig);
            return extend(request, returnInterceptor);
        }), defaultRequest);
    });
    object.addRequestInterceptor = (/**
     * @param {?} interceptor
     * @return {?}
     */
    function (interceptor) {
        configuration.requestInterceptors.push((/**
         * @param {?} elem
         * @param {?} operation
         * @param {?} path
         * @param {?} url
         * @param {?} headers
         * @param {?} params
         * @param {?} httpConfig
         * @return {?}
         */
        function (elem, operation, path, url, headers, params, httpConfig) {
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
    object.addFullRequestInterceptor = (/**
     * @param {?} interceptor
     * @return {?}
     */
    function (interceptor) {
        configuration.requestInterceptors.push(interceptor);
        return this;
    });
    object.setFullRequestInterceptor = object.addFullRequestInterceptor;
    configuration.onBeforeElemRestangularized = configuration.onBeforeElemRestangularized || (/**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        return elem;
    });
    object.setOnBeforeElemRestangularized = (/**
     * @param {?} post
     * @return {?}
     */
    function (post) {
        configuration.onBeforeElemRestangularized = post;
        return this;
    });
    object.setRestangularizePromiseInterceptor = (/**
     * @param {?} interceptor
     * @return {?}
     */
    function (interceptor) {
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
    configuration.onElemRestangularized = configuration.onElemRestangularized || (/**
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        return elem;
    });
    object.setOnElemRestangularized = (/**
     * @param {?} post
     * @return {?}
     */
    function (post) {
        configuration.onElemRestangularized = post;
        return this;
    });
    configuration.shouldSaveParent = configuration.shouldSaveParent || (/**
     * @return {?}
     */
    function () {
        return true;
    });
    object.setParentless = (/**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (isArray(values)) {
            configuration.shouldSaveParent = (/**
             * @param {?} route
             * @return {?}
             */
            function (route) {
                return !includes(values, route);
            });
        }
        else if (isBoolean(values)) {
            configuration.shouldSaveParent = (/**
             * @return {?}
             */
            function () {
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
    configuration.suffix = isUndefined(configuration.suffix) ? null : configuration.suffix;
    object.setRequestSuffix = (/**
     * @param {?} newSuffix
     * @return {?}
     */
    function (newSuffix) {
        configuration.suffix = newSuffix;
        return this;
    });
    /**
     * Add element transformers for certain routes.
     */
    configuration.transformers = configuration.transformers || {};
    object.addElementTransformer = (/**
     * @param {?} type
     * @param {?} secondArg
     * @param {?} thirdArg
     * @return {?}
     */
    function (type, secondArg, thirdArg) {
        /** @type {?} */
        let isCollection = null;
        /** @type {?} */
        let transformer = null;
        if (arguments.length === 2) {
            transformer = secondArg;
        }
        else {
            transformer = thirdArg;
            isCollection = secondArg;
        }
        /** @type {?} */
        let typeTransformers = configuration.transformers[type];
        if (!typeTransformers) {
            typeTransformers = configuration.transformers[type] = [];
        }
        typeTransformers.push((/**
         * @param {?} coll
         * @param {?} elem
         * @return {?}
         */
        function (coll, elem) {
            if (isNull(isCollection) || (coll === isCollection)) {
                return transformer(elem);
            }
            return elem;
        }));
        return object;
    });
    object.extendCollection = (/**
     * @param {?} route
     * @param {?} fn
     * @return {?}
     */
    function (route, fn) {
        return object.addElementTransformer(route, true, fn);
    });
    object.extendModel = (/**
     * @param {?} route
     * @param {?} fn
     * @return {?}
     */
    function (route, fn) {
        return object.addElementTransformer(route, false, fn);
    });
    configuration.transformElem = (/**
     * @param {?} elem
     * @param {?} isCollection
     * @param {?} route
     * @param {?} Restangular
     * @param {?} force
     * @return {?}
     */
    function (elem, isCollection, route, Restangular, force) {
        if (!force && !configuration.transformLocalElements && !elem[configuration.restangularFields.fromServer]) {
            return elem;
        }
        /** @type {?} */
        const typeTransformers = configuration.transformers[route];
        /** @type {?} */
        let changedElem = elem;
        if (typeTransformers) {
            each(typeTransformers, (/**
             * @param {?} transformer
             * @return {?}
             */
            function (transformer) {
                changedElem = transformer(isCollection, changedElem);
            }));
        }
        return configuration.onElemRestangularized(changedElem, isCollection, route, Restangular);
    });
    configuration.transformLocalElements = isUndefined(configuration.transformLocalElements) ?
        false :
        configuration.transformLocalElements;
    object.setTransformOnlyServerElements = (/**
     * @param {?} active
     * @return {?}
     */
    function (active) {
        configuration.transformLocalElements = !active;
    });
    configuration.fullResponse = isUndefined(configuration.fullResponse) ? false : configuration.fullResponse;
    object.setFullResponse = (/**
     * @param {?} full
     * @return {?}
     */
    function (full) {
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
    const BaseCreator = (/**
     * @return {?}
     */
    function () {
    });
    BaseCreator.prototype.setConfig = (/**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this.config = config;
        return this;
    });
    BaseCreator.prototype.parentsArray = (/**
     * @param {?} current
     * @return {?}
     */
    function (current) {
        /** @type {?} */
        const parents = [];
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
        const resource = {};
        each(keys(configurer), (/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            /** @type {?} */
            const value = configurer[key];
            // Add default parameters
            value.params = extend({}, value.params, config.defaultRequestParams[value.method.toLowerCase()]);
            // We don't want the ? if no params are there
            if (isEmpty(value.params)) {
                delete value.params;
            }
            if (config.isSafe(value.method)) {
                resource[key] = (/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    const resultConfig = extend(value, {
                        url: url
                    });
                    return $http.createRequest(resultConfig);
                });
            }
            else {
                resource[key] = (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    /** @type {?} */
                    const resultConfig = extend(value, {
                        url: url,
                        data: data
                    });
                    return $http.createRequest(resultConfig);
                });
            }
        }));
        return resource;
    }
    BaseCreator.prototype.resource = (/**
     * @param {?} current
     * @param {?} $http
     * @param {?} localHttpConfig
     * @param {?} callHeaders
     * @param {?} callParams
     * @param {?} what
     * @param {?} etag
     * @param {?} operation
     * @return {?}
     */
    function (current, $http, localHttpConfig, callHeaders, callParams, what, etag, operation) {
        /** @type {?} */
        const params = defaults(callParams || {}, this.config.defaultRequestParams.common);
        /** @type {?} */
        const headers = defaults(callHeaders || {}, this.config.defaultHeaders);
        if (etag) {
            if (!configuration.isSafe(operation)) {
                headers['If-Match'] = etag;
            }
            else {
                headers['If-None-Match'] = etag;
            }
        }
        /** @type {?} */
        let url = this.base(current);
        if (what) {
            /** @type {?} */
            let add = '';
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
    const Path = (/**
     * @return {?}
     */
    function () {
    });
    Path.prototype = new BaseCreator();
    Path.prototype.normalizeUrl = (/**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        const parts = /((?:http[s]?:)?\/\/)?(.*)?/.exec(url);
        parts[2] = parts[2].replace(/[\\\/]+/g, '/');
        return (typeof parts[1] !== 'undefined') ? parts[1] + parts[2] : parts[2];
    });
    Path.prototype.base = (/**
     * @param {?} current
     * @return {?}
     */
    function (current) {
        /** @type {?} */
        const __this = this;
        return reduce(this.parentsArray(current), (/**
         * @param {?} acum
         * @param {?} elem
         * @return {?}
         */
        function (acum, elem) {
            /** @type {?} */
            let elemUrl;
            /** @type {?} */
            const elemSelfLink = __this.config.getUrlFromElem(elem);
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
                    const ids = elem[__this.config.restangularFields.ids];
                    if (ids) {
                        elemUrl += '/' + ids.join(',');
                    }
                }
                else {
                    /** @type {?} */
                    let elemId;
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
    Path.prototype.fetchUrl = (/**
     * @param {?} current
     * @param {?} what
     * @return {?}
     */
    function (current, what) {
        /** @type {?} */
        let baseUrl = this.base(current);
        if (what) {
            baseUrl += '/' + what;
        }
        return baseUrl;
    });
    Path.prototype.fetchRequestedUrl = (/**
     * @param {?} current
     * @param {?} what
     * @return {?}
     */
    function (current, what) {
        /** @type {?} */
        const url = this.fetchUrl(current, what);
        /** @type {?} */
        const params = current[configuration.restangularFields.reqParams];
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
            const resultKeys = [];
            for (const key in obj) {
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
            const sortedKeysArray = sortedKeys(obj);
            for (let i = 0; i < sortedKeysArray.length; i++) {
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
        const parts = [];
        forEachSorted(params, (/**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
        function (value, key) {
            if (value === null || value === undefined) {
                return;
            }
            if (!isArray(value)) {
                value = [value];
            }
            forEach(value, (/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                if (isObject(v)) {
                    v = JSON.stringify(v);
                }
                parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(v));
            }));
        }));
        return url + (this.config.suffix || '') + ((url.indexOf('?') === -1) ? '?' : '&') + parts.join('&');
    });
    configuration.urlCreatorFactory.path = Path;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-restangular.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Restangular {
    /**
     * @param {?} configObj
     * @param {?} injector
     * @param {?} http
     */
    constructor(configObj, injector, http) {
        this.configObj = configObj;
        this.injector = injector;
        this.http = http;
        this.provider = new providerConfig(http);
        /** @type {?} */
        const element = this.provider.$get();
        assign(this, element);
        this.setDefaultConfig();
    }
    /**
     * @return {?}
     */
    setDefaultConfig() {
        if (!this.configObj || !isFunction(this.configObj.fn)) {
            return;
        }
        /** @type {?} */
        const arrDI = map$1(this.configObj.arrServices, (/**
         * @param {?} services
         * @return {?}
         */
        (services) => {
            return this.injector.get(services);
        }));
        this.configObj.fn(...[this.provider, ...arrDI]);
    }
}
Restangular.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Restangular.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [RESTANGULAR,] }] },
    { type: Injector },
    { type: RestangularHttp }
];
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
    const globalConfiguration = {};
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
            const service = {};
            /** @type {?} */
            const urlHandler = new config.urlCreatorFactory[config.urlCreator]();
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
                elem[config.restangularFields.getRestangularUrl] = bind(urlHandler.fetchUrl, urlHandler, elem);
                elem[config.restangularFields.getRequestedUrl] = bind(urlHandler.fetchRequestedUrl, urlHandler, elem);
                elem[config.restangularFields.addRestangularMethod] = bind(addRestangularMethodFunction, elem);
                elem[config.restangularFields.clone] = bind(copyRestangularizedElement, elem);
                elem[config.restangularFields.reqParams] = isEmpty(reqParams) ? null : reqParams;
                elem[config.restangularFields.withHttpConfig] = bind(withHttpConfig, elem);
                elem[config.restangularFields.plain] = bind(stripRestangular, elem, elem);
                // Tag element as restangularized
                elem[config.restangularFields.restangularized] = true;
                // RequestLess connection
                elem[config.restangularFields.one] = bind(one, elem, elem);
                elem[config.restangularFields.all] = bind(all, elem, elem);
                elem[config.restangularFields.several] = bind(several, elem, elem);
                elem[config.restangularFields.oneUrl] = bind(oneUrl, elem, elem);
                elem[config.restangularFields.allUrl] = bind(allUrl, elem, elem);
                elem[config.restangularFields.fromServer] = !!fromServer;
                if (parent && config.shouldSaveParent(route)) {
                    /** @type {?} */
                    const parentId = config.getIdFromElem(parent);
                    /** @type {?} */
                    const parentUrl = config.getUrlFromElem(parent);
                    /** @type {?} */
                    const restangularFieldsForParent = union(values(pick(config.restangularFields, ['route', 'singleOne', 'parentResource'])), config.extraFields);
                    /** @type {?} */
                    const parentResource = pick(parent, restangularFieldsForParent);
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
                let error;
                if (isNumber(route) || isNumber(parent)) {
                    error = 'You\'re creating a Restangular entity with the number ';
                    error += 'instead of the route or the parent. For example, you can\'t call .one(12).';
                    throw new Error(error);
                }
                if (isUndefined(route)) {
                    error = 'You\'re creating a Restangular entity either without the path. ';
                    error += 'For example you can\'t call .one(). Please check if your arguments are valid.';
                    throw new Error(error);
                }
                /** @type {?} */
                const elem = {};
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
                const collection = [];
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
                const elem = {};
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
                const elem = {};
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
                return subject.pipe(filter((/**
                 * @param {?} res
                 * @return {?}
                 */
                res => !!res)));
            }
            /**
             * @param {?} subject
             * @param {?} response
             * @param {?} data
             * @param {?} filledValue
             * @return {?}
             */
            function resolvePromise(subject, response, data, filledValue) {
                extend(filledValue, data);
                // Trigger the full response interceptor.
                if (config.fullResponse) {
                    subject.next(extend(response, {
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
                if (isArray(elem)) {
                    /** @type {?} */
                    const array = [];
                    each(elem, (/**
                     * @param {?} value
                     * @return {?}
                     */
                    function (value) {
                        array.push(config.isRestangularized(value) ? stripRestangular(value) : value);
                    }));
                    return array;
                }
                else {
                    return omit(elem, values(omit(config.restangularFields, 'id')));
                }
            }
            /**
             * @param {?} elem
             * @return {?}
             */
            function addCustomOperation(elem) {
                elem[config.restangularFields.customOperation] = bind(customFunction, elem);
                /** @type {?} */
                const requestMethods = { get: customFunction, delete: customFunction };
                each(['put', 'patch', 'post'], (/**
                 * @param {?} name
                 * @return {?}
                 */
                function (name) {
                    requestMethods[name] = (/**
                     * @param {?} operation
                     * @param {?} element
                     * @param {?} path
                     * @param {?} params
                     * @param {?} headers
                     * @return {?}
                     */
                    function (operation, element, path, params, headers) {
                        return bind(customFunction, this)(operation, path, params, headers, element);
                    });
                }));
                each(requestMethods, (/**
                 * @param {?} requestFunc
                 * @param {?} name
                 * @return {?}
                 */
                function (requestFunc, name) {
                    /** @type {?} */
                    const callOperation = name === 'delete' ? 'remove' : name;
                    each(['do', 'custom'], (/**
                     * @param {?} alias
                     * @return {?}
                     */
                    function (alias) {
                        elem[alias + name.toUpperCase()] = bind(requestFunc, elem, callOperation);
                    }));
                }));
                elem[config.restangularFields.customGETLIST] = bind(fetchFunction, elem);
                elem[config.restangularFields.doGETLIST] = elem[config.restangularFields.customGETLIST];
            }
            /**
             * @param {?} fromElement
             * @param {?=} toElement
             * @return {?}
             */
            function copyRestangularizedElement(fromElement, toElement = {}) {
                /** @type {?} */
                const copiedElement = assign(toElement, fromElement);
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
                const elem = config.onBeforeElemRestangularized(element, false, route);
                /** @type {?} */
                const localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);
                if (config.useCannonicalId) {
                    localElem[config.restangularFields.cannonicalId] = config.getIdFromElem(localElem);
                }
                if (collection) {
                    localElem[config.restangularFields.getParentList] = (/**
                     * @return {?}
                     */
                    function () {
                        return collection;
                    });
                }
                localElem[config.restangularFields.restangularCollection] = false;
                localElem[config.restangularFields.get] = bind(getFunction, localElem);
                localElem[config.restangularFields.getList] = bind(fetchFunction, localElem);
                localElem[config.restangularFields.put] = bind(putFunction, localElem);
                localElem[config.restangularFields.post] = bind(postFunction, localElem);
                localElem[config.restangularFields.remove] = bind(deleteFunction, localElem);
                localElem[config.restangularFields.head] = bind(headFunction, localElem);
                localElem[config.restangularFields.trace] = bind(traceFunction, localElem);
                localElem[config.restangularFields.options] = bind(optionsFunction, localElem);
                localElem[config.restangularFields.patch] = bind(patchFunction, localElem);
                localElem[config.restangularFields.save] = bind(save, localElem);
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
                const elem = config.onBeforeElemRestangularized(element, true, route);
                /** @type {?} */
                const localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);
                localElem[config.restangularFields.restangularCollection] = true;
                localElem[config.restangularFields.post] = bind(postFunction, localElem, null);
                localElem[config.restangularFields.remove] = bind(deleteFunction, localElem);
                localElem[config.restangularFields.head] = bind(headFunction, localElem);
                localElem[config.restangularFields.trace] = bind(traceFunction, localElem);
                localElem[config.restangularFields.putElement] = bind(putElementFunction, localElem);
                localElem[config.restangularFields.options] = bind(optionsFunction, localElem);
                localElem[config.restangularFields.patch] = bind(patchFunction, localElem);
                localElem[config.restangularFields.get] = bind(getById, localElem);
                localElem[config.restangularFields.getList] = bind(fetchFunction, localElem, null);
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
                const collection = restangularizeCollection(parent, element, route, false);
                each(collection, (/**
                 * @param {?} elem
                 * @return {?}
                 */
                function (elem) {
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
                const __this = this;
                /** @type {?} */
                const elemToPut = this[idx];
                /** @type {?} */
                const subject = new BehaviorSubject(null);
                /** @type {?} */
                let filledArray = [];
                filledArray = config.transformElem(filledArray, true, elemToPut[config.restangularFields.route], service);
                elemToPut.put(params, headers)
                    .subscribe((/**
                 * @param {?} serverElem
                 * @return {?}
                 */
                function (serverElem) {
                    /** @type {?} */
                    const newArray = copyRestangularizedElement(__this);
                    newArray[idx] = serverElem;
                    filledArray = newArray;
                    subject.next(newArray);
                }), (/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    subject.error(response);
                }), (/**
                 * @return {?}
                 */
                function () {
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
                const data = config.responseExtractor(resData, operation, route, fetchUrl, response, subject);
                /** @type {?} */
                const etag = response.headers.get('ETag');
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
                const __this = this;
                /** @type {?} */
                const subject = new BehaviorSubject(null);
                /** @type {?} */
                const operation = 'getList';
                /** @type {?} */
                const url = urlHandler.fetchUrl(this, what);
                /** @type {?} */
                const whatFetched = what || __this[config.restangularFields.route];
                /** @type {?} */
                const request = config.fullRequestInterceptor(null, operation, whatFetched, url, headers || {}, reqParams || {}, this[config.restangularFields.httpConfig] || {});
                /** @type {?} */
                let filledArray = [];
                filledArray = config.transformElem(filledArray, true, whatFetched, service);
                /** @type {?} */
                let method = 'getList';
                if (config.jsonp) {
                    method = 'jsonp';
                }
                /** @type {?} */
                const okCallback = (/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    /** @type {?} */
                    const resData = response.body;
                    /** @type {?} */
                    const fullParams = response.config.params;
                    /** @type {?} */
                    let data = parseResponse(resData, operation, whatFetched, url, response, subject);
                    // support empty response for getList() calls (some APIs respond with 204 and empty body)
                    if (isUndefined(data) || '' === data) {
                        data = [];
                    }
                    if (!isArray(data)) {
                        throw new Error('Response for getList SHOULD be an array and not an object or something else');
                    }
                    if (true === config.plainByDefault) {
                        return resolvePromise(subject, response, data, filledArray);
                    }
                    /** @type {?} */
                    let processedData = map$1(data, (/**
                     * @param {?} elem
                     * @return {?}
                     */
                    function (elem) {
                        if (!__this[config.restangularFields.restangularCollection]) {
                            return restangularizeElem(__this, elem, what, true, data);
                        }
                        else {
                            return restangularizeElem(__this[config.restangularFields.parentResource], elem, __this[config.restangularFields.route], true, data);
                        }
                    }));
                    processedData = extend(data, processedData);
                    if (!__this[config.restangularFields.restangularCollection]) {
                        resolvePromise(subject, response, restangularizeCollection(__this, processedData, what, true, fullParams), filledArray);
                    }
                    else {
                        resolvePromise(subject, response, restangularizeCollection(__this[config.restangularFields.parentResource], processedData, __this[config.restangularFields.route], true, fullParams), filledArray);
                    }
                });
                urlHandler.resource(this, $http, request.httpConfig, request.headers, request.params, what, this[config.restangularFields.etag], operation)[method]()
                    .subscribe(okCallback, (/**
                 * @param {?} response
                 * @return {?}
                 */
                function error(response) {
                    if (response.status === 304 && __this[config.restangularFields.restangularCollection]) {
                        resolvePromise(subject, response, __this, filledArray);
                    }
                    else if (every(config.errorInterceptors, (/**
                     * @param {?} cb
                     * @return {?}
                     */
                    function (cb) {
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
                    return bind(elemFunction, this)('post', undefined, params, undefined, headers);
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
                const __this = this;
                /** @type {?} */
                const subject = new BehaviorSubject(null);
                /** @type {?} */
                const resParams = params || {};
                /** @type {?} */
                const route = what || this[config.restangularFields.route];
                /** @type {?} */
                const fetchUrl = urlHandler.fetchUrl(this, what);
                /** @type {?} */
                let callObj = obj || this;
                // fallback to etag on restangular object (since for custom methods we probably don't explicitly specify the etag field)
                /** @type {?} */
                const etag = callObj[config.restangularFields.etag] || (operation !== 'post' ? this[config.restangularFields.etag] : null);
                if (isObject(callObj) && config.isRestangularized(callObj)) {
                    callObj = stripRestangular(callObj);
                }
                /** @type {?} */
                const request = config.fullRequestInterceptor(callObj, operation, route, fetchUrl, headers || {}, resParams || {}, this[config.restangularFields.httpConfig] || {});
                /** @type {?} */
                let filledObject = {};
                filledObject = config.transformElem(filledObject, false, route, service);
                /** @type {?} */
                const okCallback = (/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    /** @type {?} */
                    const resData = get(response, 'body');
                    /** @type {?} */
                    const fullParams = get(response, 'config.params');
                    /** @type {?} */
                    const elem = parseResponse(resData, operation, route, fetchUrl, response, subject);
                    if (elem) {
                        /** @type {?} */
                        let data;
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
                const errorCallback = (/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    if (response.status === 304 && config.isSafe(operation)) {
                        resolvePromise(subject, response, __this, filledObject);
                    }
                    else if (every(config.errorInterceptors, (/**
                     * @param {?} cb
                     * @return {?}
                     */
                    function (cb) {
                        return cb(response, subject, okCallback) !== false;
                    }))) {
                        // triggered if no callback returns false
                        subject.error(response);
                    }
                });
                // Overriding HTTP Method
                /** @type {?} */
                let callOperation = operation;
                /** @type {?} */
                let callHeaders = extend({}, request.headers);
                /** @type {?} */
                const isOverrideOperation = config.isOverridenMethod(operation);
                if (isOverrideOperation) {
                    callOperation = 'post';
                    callHeaders = extend(callHeaders, { 'X-HTTP-Method-Override': operation === 'remove' ? 'DELETE' : operation.toUpperCase() });
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
                return bind(elemFunction, this)('get', undefined, params, undefined, headers);
            }
            /**
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function deleteFunction(params, headers) {
                return bind(elemFunction, this)('remove', undefined, params, undefined, headers);
            }
            /**
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function putFunction(params, headers) {
                return bind(elemFunction, this)('put', undefined, params, undefined, headers);
            }
            /**
             * @param {?} what
             * @param {?} elem
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function postFunction(what, elem, params, headers) {
                return bind(elemFunction, this)('post', what, params, elem, headers);
            }
            /**
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function headFunction(params, headers) {
                return bind(elemFunction, this)('head', undefined, params, undefined, headers);
            }
            /**
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function traceFunction(params, headers) {
                return bind(elemFunction, this)('trace', undefined, params, undefined, headers);
            }
            /**
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function optionsFunction(params, headers) {
                return bind(elemFunction, this)('options', undefined, params, undefined, headers);
            }
            /**
             * @param {?} elem
             * @param {?} params
             * @param {?} headers
             * @return {?}
             */
            function patchFunction(elem, params, headers) {
                return bind(elemFunction, this)('patch', undefined, params, elem, headers);
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
                return bind(elemFunction, this)(operation, path, params, elem, headers);
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
                let bindedFunction;
                if (operation === 'getList') {
                    bindedFunction = bind(fetchFunction, this, path);
                }
                else {
                    bindedFunction = bind(customFunction, this, operation, path);
                }
                /** @type {?} */
                const createdFunction = (/**
                 * @param {?} params
                 * @param {?} headers
                 * @param {?} elem
                 * @return {?}
                 */
                function (params, headers, elem) {
                    /** @type {?} */
                    const callParams = defaults({
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
                    this[name] = (/**
                     * @param {?} elem
                     * @param {?} params
                     * @param {?} headers
                     * @return {?}
                     */
                    function (elem, params, headers) {
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
                const newConfig = clone(omit(config, 'configuration'));
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
                const knownCollectionMethods = values(config.restangularFields);
                /** @type {?} */
                const serv = {};
                /** @type {?} */
                const collection = (parent || service).all(route);
                serv.one = bind(one, (parent || service), parent, route);
                serv.all = bind(collection.all, collection);
                serv.post = bind(collection.post, collection);
                serv.getList = bind(collection.getList, collection);
                serv.withHttpConfig = bind(collection.withHttpConfig, collection);
                serv.get = bind(collection.get, collection);
                for (const prop in collection) {
                    if (collection.hasOwnProperty(prop) && isFunction(collection[prop]) && !includes(knownCollectionMethods, prop)) {
                        serv[prop] = bind(collection[prop], collection);
                    }
                }
                return serv;
            }
            RestangularConfigurer(service, config);
            service.copy = bind(copyRestangularizedElement, service);
            service.service = bind(toService, service);
            service.withConfig = bind(withConfigurationFunction, service);
            service.one = bind(one, service, null);
            service.all = bind(all, service, null);
            service.several = bind(several, service, null);
            service.oneUrl = bind(oneUrl, service, null);
            service.allUrl = bind(allUrl, service, null);
            service.stripRestangular = bind(stripRestangular, service);
            service.restangularizeElement = bind(restangularizeElem, service);
            service.restangularizeCollection = bind(restangularizeCollectionAndElements, service);
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
const CONFIG_OBJ = new InjectionToken('configObj');
class RestangularModule {
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

export { Restangular, RestangularHttp, RestangularModule, CONFIG_OBJ as ɵa, RESTANGULAR as ɵb, RestangularFactory as ɵc };
//# sourceMappingURL=ngx-restangular.js.map
