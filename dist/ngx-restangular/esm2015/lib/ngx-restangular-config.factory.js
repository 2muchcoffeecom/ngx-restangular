/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-restangular-config.factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { includes, isUndefined, isNull, isArray, isObject, isBoolean, defaults, each, extend, find, has, initial, last, clone, reduce, keys, isEmpty, forEach, } from 'lodash';
/**
 * @param {?} object
 * @param {?} configuration
 * @return {?}
 */
export function RestangularConfigurer(object, configuration) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLWNvbmZpZy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXJlc3Rhbmd1bGFyL3NyYy9saWIvbmd4LXJlc3Rhbmd1bGFyLWNvbmZpZy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFFBQVEsRUFDUixXQUFXLEVBQ1gsTUFBTSxFQUNOLE9BQU8sRUFDUCxRQUFRLEVBQ1IsU0FBUyxFQUNULFFBQVEsRUFDUixJQUFJLEVBQ0osTUFBTSxFQUNOLElBQUksRUFDSixHQUFHLEVBQ0gsT0FBTyxFQUNQLElBQUksRUFDSixLQUFLLEVBQ0wsTUFBTSxFQUNOLElBQUksRUFDSixPQUFPLEVBQ1AsT0FBTyxHQUNSLE1BQU0sUUFBUSxDQUFDOzs7Ozs7QUFFaEIsTUFBTSxVQUFVLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxhQUFhO0lBQ3pELE1BQU0sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDOzs7OztVQUsvQixXQUFXLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDO0lBQ2xFLGFBQWEsQ0FBQyxNQUFNOzs7O0lBQUcsVUFBVSxTQUFTO1FBQ3hDLE9BQU8sUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUEsQ0FBQzs7VUFFSSxlQUFlLEdBQUcsZUFBZTtJQUN2QyxhQUFhLENBQUMsYUFBYTs7OztJQUFHLFVBQVUsTUFBTTtRQUM1QyxPQUFPLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLE1BQU0sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEMsYUFBYSxDQUFD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UUFFSCxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RyxDQUFDLENBQUEsQ0FBQztJQUVGLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQzlDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBpbmNsdWRlcyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzTnVsbCxcbiAgaXNBcnJheSxcbiAgaXNPYmplY3QsXG4gIGlzQm9vbGVhbixcbiAgZGVmYXVsdHMsXG4gIGVhY2gsXG4gIGV4dGVuZCxcbiAgZmluZCxcbiAgaGFzLFxuICBpbml0aWFsLFxuICBsYXN0LFxuICBjbG9uZSxcbiAgcmVkdWNlLFxuICBrZXlzLFxuICBpc0VtcHR5LFxuICBmb3JFYWNoLFxufSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZnVuY3Rpb24gUmVzdGFuZ3VsYXJDb25maWd1cmVyKG9iamVjdCwgY29uZmlndXJhdGlvbikge1xuICBvYmplY3QuY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb247XG5cbiAgLyoqXG4gICAqIFRob3NlIGFyZSBIVFRQIHNhZmUgbWV0aG9kcyBmb3Igd2hpY2ggdGhlcmUgaXMgbm8gbmVlZCB0byBwYXNzIGFueSBkYXRhIHdpdGggdGhlIHJlcXVlc3QuXG4gICAqL1xuICBjb25zdCBzYWZlTWV0aG9kcyA9IFsnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucycsICd0cmFjZScsICdnZXRsaXN0J107XG4gIGNvbmZpZ3VyYXRpb24uaXNTYWZlID0gZnVuY3Rpb24gKG9wZXJhdGlvbikge1xuICAgIHJldHVybiBpbmNsdWRlcyhzYWZlTWV0aG9kcywgb3BlcmF0aW9uLnRvTG93ZXJDYXNlKCkpO1xuICB9O1xuXG4gIGNvbnN0IGFic29sdXRlUGF0dGVybiA9IC9eaHR0cHM/OlxcL1xcLy9pO1xuICBjb25maWd1cmF0aW9uLmlzQWJzb2x1dGVVcmwgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKGNvbmZpZ3VyYXRpb24uYWJzb2x1dGVVcmwpIHx8IGlzTnVsbChjb25maWd1cmF0aW9uLmFic29sdXRlVXJsKSA/XG4gICAgICBzdHJpbmcgJiYgYWJzb2x1dGVQYXR0ZXJuLnRlc3Qoc3RyaW5nKSA6XG4gICAgICBjb25maWd1cmF0aW9uLmFic29sdXRlVXJsO1xuICB9O1xuXG4gIGNvbmZpZ3VyYXRpb24uYWJzb2x1dGVVcmwgPSBpc1VuZGVmaW5lZChjb25maWd1cmF0aW9uLmFic29sdXRlVXJsKSA/IHRydWUgOiBjb25maWd1cmF0aW9uLmFic29sdXRlVXJsO1xuICBvYmplY3Quc2V0U2VsZkxpbmtBYnNvbHV0ZVVybCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGNvbmZpZ3VyYXRpb24uYWJzb2x1dGVVcmwgPSB2YWx1ZTtcbiAgfTtcbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIEJhc2VVUkwgdG8gYmUgdXNlZCB3aXRoIFJlc3Rhbmd1bGFyXG4gICAqL1xuICBjb25maWd1cmF0aW9uLmJhc2VVcmwgPSBpc1VuZGVmaW5lZChjb25maWd1cmF0aW9uLmJhc2VVcmwpID8gJycgOiBjb25maWd1cmF0aW9uLmJhc2VVcmw7XG4gIG9iamVjdC5zZXRCYXNlVXJsID0gZnVuY3Rpb24gKG5ld0Jhc2VVcmwpIHtcbiAgICBjb25maWd1cmF0aW9uLmJhc2VVcmwgPSAvXFwvJC8udGVzdChuZXdCYXNlVXJsKSA/XG4gICAgICBuZXdCYXNlVXJsLnN1YnN0cmluZygwLCBuZXdCYXNlVXJsLmxlbmd0aCAtIDEpIDpcbiAgICAgIG5ld0Jhc2VVcmw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGV4dHJhIGZpZWxkcyB0byBrZWVwIGZyb20gdGhlIHBhcmVudHNcbiAgICovXG4gIGNvbmZpZ3VyYXRpb24uZXh0cmFGaWVsZHMgPSBjb25maWd1cmF0aW9uLmV4dHJhRmllbGRzIHx8IFtdO1xuICBvYmplY3Quc2V0RXh0cmFGaWVsZHMgPSBmdW5jdGlvbiAobmV3RXh0cmFGaWVsZHMpIHtcbiAgICBjb25maWd1cmF0aW9uLmV4dHJhRmllbGRzID0gbmV3RXh0cmFGaWVsZHM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNvbWUgZGVmYXVsdCAkaHR0cCBwYXJhbWV0ZXIgdG8gYmUgdXNlZCBpbiBFVkVSWSBjYWxsXG4gICAqKi9cbiAgY29uZmlndXJhdGlvbi5kZWZhdWx0SHR0cEZpZWxkcyA9IGNvbmZpZ3VyYXRpb24uZGVmYXVsdEh0dHBGaWVsZHMgfHwge307XG4gIG9iamVjdC5zZXREZWZhdWx0SHR0cEZpZWxkcyA9IGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICBjb25maWd1cmF0aW9uLmRlZmF1bHRIdHRwRmllbGRzID0gdmFsdWVzO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBbHdheXMgcmV0dXJuIHBsYWluIGRhdGEsIG5vIHJlc3Rhbmd1bGFyaXplZCBvYmplY3RcbiAgICoqL1xuICBjb25maWd1cmF0aW9uLnBsYWluQnlEZWZhdWx0ID0gY29uZmlndXJhdGlvbi5wbGFpbkJ5RGVmYXVsdCB8fCBmYWxzZTtcbiAgb2JqZWN0LnNldFBsYWluQnlEZWZhdWx0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgY29uZmlndXJhdGlvbi5wbGFpbkJ5RGVmYXVsdCA9IHZhbHVlID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZ3VyYXRpb24ud2l0aEh0dHBWYWx1ZXMgPSBmdW5jdGlvbiAoaHR0cExvY2FsQ29uZmlnLCBvYmopIHtcbiAgICByZXR1cm4gZGVmYXVsdHMob2JqLCBodHRwTG9jYWxDb25maWcsIGNvbmZpZ3VyYXRpb24uZGVmYXVsdEh0dHBGaWVsZHMpO1xuICB9O1xuXG4gIGNvbmZpZ3VyYXRpb24uZW5jb2RlSWRzID0gaXNVbmRlZmluZWQoY29uZmlndXJhdGlvbi5lbmNvZGVJZHMpID8gdHJ1ZSA6IGNvbmZpZ3VyYXRpb24uZW5jb2RlSWRzO1xuICBvYmplY3Quc2V0RW5jb2RlSWRzID0gZnVuY3Rpb24gKGVuY29kZSkge1xuICAgIGNvbmZpZ3VyYXRpb24uZW5jb2RlSWRzID0gZW5jb2RlO1xuICB9O1xuXG4gIGNvbmZpZ3VyYXRpb24uZGVmYXVsdFJlcXVlc3RQYXJhbXMgPSBjb25maWd1cmF0aW9uLmRlZmF1bHRSZXF1ZXN0UGFyYW1zIHx8IHtcbiAgICBnZXQ6IHt9LFxuICAgIHBvc3Q6IHt9LFxuICAgIHB1dDoge30sXG4gICAgcmVtb3ZlOiB7fSxcbiAgICBjb21tb246IHt9XG4gIH07XG5cbiAgb2JqZWN0LnNldERlZmF1bHRSZXF1ZXN0UGFyYW1zID0gZnVuY3Rpb24gKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgbGV0IG1ldGhvZHMgPSBbXTtcbiAgICBjb25zdCBwYXJhbXMgPSBwYXJhbTIgfHwgcGFyYW0xO1xuICAgIGlmICghaXNVbmRlZmluZWQocGFyYW0yKSkge1xuICAgICAgaWYgKGlzQXJyYXkocGFyYW0xKSkge1xuICAgICAgICBtZXRob2RzID0gcGFyYW0xO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWV0aG9kcy5wdXNoKHBhcmFtMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1ldGhvZHMucHVzaCgnY29tbW9uJyk7XG4gICAgfVxuXG4gICAgZWFjaChtZXRob2RzLCBmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICBjb25maWd1cmF0aW9uLmRlZmF1bHRSZXF1ZXN0UGFyYW1zW21ldGhvZF0gPSBwYXJhbXM7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgb2JqZWN0LnJlcXVlc3RQYXJhbXMgPSBjb25maWd1cmF0aW9uLmRlZmF1bHRSZXF1ZXN0UGFyYW1zO1xuXG4gIGNvbmZpZ3VyYXRpb24uZGVmYXVsdEhlYWRlcnMgPSBjb25maWd1cmF0aW9uLmRlZmF1bHRIZWFkZXJzIHx8IHt9O1xuICBvYmplY3Quc2V0RGVmYXVsdEhlYWRlcnMgPSBmdW5jdGlvbiAoaGVhZGVycykge1xuICAgIGNvbmZpZ3VyYXRpb24uZGVmYXVsdEhlYWRlcnMgPSBoZWFkZXJzO1xuICAgIG9iamVjdC5kZWZhdWx0SGVhZGVycyA9IGNvbmZpZ3VyYXRpb24uZGVmYXVsdEhlYWRlcnM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgb2JqZWN0LmRlZmF1bHRIZWFkZXJzID0gY29uZmlndXJhdGlvbi5kZWZhdWx0SGVhZGVycztcblxuXG4gIC8qKlxuICAgKiBNZXRob2Qgb3ZlcnJpZGVycyByZXNwb25zZSBNZXRob2RcbiAgICoqL1xuICBjb25maWd1cmF0aW9uLmRlZmF1bHRSZXNwb25zZU1ldGhvZCA9IGNvbmZpZ3VyYXRpb24uZGVmYXVsdFJlc3BvbnNlTWV0aG9kIHx8ICdwcm9taXNlJztcbiAgb2JqZWN0LnNldERlZmF1bHRSZXNwb25zZU1ldGhvZCA9IGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICBjb25maWd1cmF0aW9uLmRlZmF1bHRSZXNwb25zZU1ldGhvZCA9IG1ldGhvZDtcbiAgICBvYmplY3QuZGVmYXVsdFJlc3BvbnNlTWV0aG9kID0gY29uZmlndXJhdGlvbi5kZWZhdWx0UmVzcG9uc2VNZXRob2Q7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIG9iamVjdC5kZWZhdWx0UmVzcG9uc2VNZXRob2QgPSBjb25maWd1cmF0aW9uLmRlZmF1bHRSZXNwb25zZU1ldGhvZDtcblxuICAvKipcbiAgICogTWV0aG9kIG92ZXJyaWRlcnMgd2lsbCBzZXQgd2hpY2ggbWV0aG9kcyBhcmUgc2VudCB2aWEgUE9TVCB3aXRoIGFuIFgtSFRUUC1NZXRob2QtT3ZlcnJpZGVcbiAgICoqL1xuICBjb25maWd1cmF0aW9uLm1ldGhvZE92ZXJyaWRlcnMgPSBjb25maWd1cmF0aW9uLm1ldGhvZE92ZXJyaWRlcnMgfHwgW107XG4gIG9iamVjdC5zZXRNZXRob2RPdmVycmlkZXJzID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgIGNvbnN0IG92ZXJyaWRlcnMgPSBleHRlbmQoW10sIHZhbHVlcyk7XG4gICAgaWYgKGNvbmZpZ3VyYXRpb24uaXNPdmVycmlkZW5NZXRob2QoJ2RlbGV0ZScsIG92ZXJyaWRlcnMpKSB7XG4gICAgICBvdmVycmlkZXJzLnB1c2goJ3JlbW92ZScpO1xuICAgIH1cbiAgICBjb25maWd1cmF0aW9uLm1ldGhvZE92ZXJyaWRlcnMgPSBvdmVycmlkZXJzO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZ3VyYXRpb24uanNvbnAgPSBpc1VuZGVmaW5lZChjb25maWd1cmF0aW9uLmpzb25wKSA/IGZhbHNlIDogY29uZmlndXJhdGlvbi5qc29ucDtcbiAgb2JqZWN0LnNldEpzb25wID0gZnVuY3Rpb24gKGFjdGl2ZSkge1xuICAgIGNvbmZpZ3VyYXRpb24uanNvbnAgPSBhY3RpdmU7XG4gIH07XG5cbiAgY29uZmlndXJhdGlvbi5pc092ZXJyaWRlbk1ldGhvZCA9IGZ1bmN0aW9uIChtZXRob2QsIHZhbHVlcykge1xuICAgIGNvbnN0IHNlYXJjaCA9IHZhbHVlcyB8fCBjb25maWd1cmF0aW9uLm1ldGhvZE92ZXJyaWRlcnM7XG4gICAgcmV0dXJuICFpc1VuZGVmaW5lZChmaW5kKHNlYXJjaCwgZnVuY3Rpb24gKG9uZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gb25lLnRvTG93ZXJDYXNlKCkgPT09IG1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICAgIH0pKTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyB0aGUgVVJMIGNyZWF0b3IgdHlwZS4gRm9yIG5vdywgb25seSBQYXRoIGlzIGNyZWF0ZWQuIEluIHRoZSBmdXR1cmUgd2UnbGwgaGF2ZSBxdWVyeVBhcmFtc1xuICAgKiovXG4gIGNvbmZpZ3VyYXRpb24udXJsQ3JlYXRvciA9IGNvbmZpZ3VyYXRpb24udXJsQ3JlYXRvciB8fCAncGF0aCc7XG4gIG9iamVjdC5zZXRVcmxDcmVhdG9yID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIWhhcyhjb25maWd1cmF0aW9uLnVybENyZWF0b3JGYWN0b3J5LCBuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVUkwgUGF0aCBzZWxlY3RlZCBpc25cXCd0IHZhbGlkJyk7XG4gICAgfVxuXG4gICAgY29uZmlndXJhdGlvbi51cmxDcmVhdG9yID0gbmFtZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogWW91IGNhbiBzZXQgdGhlIHJlc3Rhbmd1bGFyIGZpZWxkcyBoZXJlLiBUaGUgMyByZXF1aXJlZCBmaWVsZHMgZm9yIFJlc3Rhbmd1bGFyIGFyZTpcbiAgICpcbiAgICogaWQ6IElkIG9mIHRoZSBlbGVtZW50XG4gICAqIHJvdXRlOiBuYW1lIG9mIHRoZSByb3V0ZSBvZiB0aGlzIGVsZW1lbnRcbiAgICogcGFyZW50UmVzb3VyY2U6IHRoZSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCByZXNvdXJjZVxuICAgKlxuICAgKiAgQWxsIG9mIHRoaXMgZmllbGRzIGV4Y2VwdCBmb3IgaWQsIGFyZSBoYW5kbGVkIChhbmQgY3JlYXRlZCkgYnkgUmVzdGFuZ3VsYXIuIEJ5IGRlZmF1bHQsXG4gICAqICB0aGUgZmllbGQgdmFsdWVzIHdpbGwgYmUgaWQsIHJvdXRlIGFuZCBwYXJlbnRSZXNvdXJjZSByZXNwZWN0aXZlbHlcbiAgICovXG4gIGNvbmZpZ3VyYXRpb24ucmVzdGFuZ3VsYXJGaWVsZHMgPSBjb25maWd1cmF0aW9uLnJlc3Rhbmd1bGFyRmllbGRzIHx8IHtcbiAgICBpZDogJ2lkJyxcbiAgICByb3V0ZTogJ3JvdXRlJyxcbiAgICBwYXJlbnRSZXNvdXJjZTogJ3BhcmVudFJlc291cmNlJyxcbiAgICByZXN0YW5ndWxhckNvbGxlY3Rpb246ICdyZXN0YW5ndWxhckNvbGxlY3Rpb24nLFxuICAgIGNhbm5vbmljYWxJZDogJ19fY2Fubm9uaWNhbElkJyxcbiAgICBldGFnOiAncmVzdGFuZ3VsYXJFdGFnJyxcbiAgICBzZWxmTGluazogJ2hyZWYnLFxuICAgIGdldDogJ2dldCcsXG4gICAgZ2V0TGlzdDogJ2dldExpc3QnLFxuICAgIHB1dDogJ3B1dCcsXG4gICAgcG9zdDogJ3Bvc3QnLFxuICAgIHJlbW92ZTogJ3JlbW92ZScsXG4gICAgaGVhZDogJ2hlYWQnLFxuICAgIHRyYWNlOiAndHJhY2UnLFxuICAgIG9wdGlvbnM6ICdvcHRpb25zJyxcbiAgICBwYXRjaDogJ3BhdGNoJyxcbiAgICBnZXRSZXN0YW5ndWxhclVybDogJ2dldFJlc3Rhbmd1bGFyVXJsJyxcbiAgICBnZXRSZXF1ZXN0ZWRVcmw6ICdnZXRSZXF1ZXN0ZWRVcmwnLFxuICAgIHB1dEVsZW1lbnQ6ICdwdXRFbGVtZW50JyxcbiAgICBhZGRSZXN0YW5ndWxhck1ldGhvZDogJ2FkZFJlc3Rhbmd1bGFyTWV0aG9kJyxcbiAgICBnZXRQYXJlbnRMaXN0OiAnZ2V0UGFyZW50TGlzdCcsXG4gICAgY2xvbmU6ICdjbG9uZScsXG4gICAgaWRzOiAnaWRzJyxcbiAgICBodHRwQ29uZmlnOiAnXyRodHRwQ29uZmlnJyxcbiAgICByZXFQYXJhbXM6ICdyZXFQYXJhbXMnLFxuICAgIG9uZTogJ29uZScsXG4gICAgYWxsOiAnYWxsJyxcbiAgICBzZXZlcmFsOiAnc2V2ZXJhbCcsXG4gICAgb25lVXJsOiAnb25lVXJsJyxcbiAgICBhbGxVcmw6ICdhbGxVcmwnLFxuICAgIGN1c3RvbVBVVDogJ2N1c3RvbVBVVCcsXG4gICAgY3VzdG9tUEFUQ0g6ICdjdXN0b21QQVRDSCcsXG4gICAgY3VzdG9tUE9TVDogJ2N1c3RvbVBPU1QnLFxuICAgIGN1c3RvbURFTEVURTogJ2N1c3RvbURFTEVURScsXG4gICAgY3VzdG9tR0VUOiAnY3VzdG9tR0VUJyxcbiAgICBjdXN0b21HRVRMSVNUOiAnY3VzdG9tR0VUTElTVCcsXG4gICAgY3VzdG9tT3BlcmF0aW9uOiAnY3VzdG9tT3BlcmF0aW9uJyxcbiAgICBkb1BVVDogJ2RvUFVUJyxcbiAgICBkb1BBVENIOiAnZG9QQVRDSCcsXG4gICAgZG9QT1NUOiAnZG9QT1NUJyxcbiAgICBkb0RFTEVURTogJ2RvREVMRVRFJyxcbiAgICBkb0dFVDogJ2RvR0VUJyxcbiAgICBkb0dFVExJU1Q6ICdkb0dFVExJU1QnLFxuICAgIGZyb21TZXJ2ZXI6ICdmcm9tU2VydmVyJyxcbiAgICB3aXRoQ29uZmlnOiAnd2l0aENvbmZpZycsXG4gICAgd2l0aEh0dHBDb25maWc6ICd3aXRoSHR0cENvbmZpZycsXG4gICAgc2luZ2xlT25lOiAnc2luZ2xlT25lJyxcbiAgICBwbGFpbjogJ3BsYWluJyxcbiAgICBzYXZlOiAnc2F2ZScsXG4gICAgcmVzdGFuZ3VsYXJpemVkOiAncmVzdGFuZ3VsYXJpemVkJ1xuICB9O1xuICBvYmplY3Quc2V0UmVzdGFuZ3VsYXJGaWVsZHMgPSBmdW5jdGlvbiAocmVzRmllbGRzKSB7XG4gICAgY29uZmlndXJhdGlvbi5yZXN0YW5ndWxhckZpZWxkcyA9XG4gICAgICBleHRlbmQoe30sIGNvbmZpZ3VyYXRpb24ucmVzdGFuZ3VsYXJGaWVsZHMsIHJlc0ZpZWxkcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlndXJhdGlvbi5pc1Jlc3Rhbmd1bGFyaXplZCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gISFvYmpbY29uZmlndXJhdGlvbi5yZXN0YW5ndWxhckZpZWxkcy5yZXN0YW5ndWxhcml6ZWRdO1xuICB9O1xuXG4gIGNvbmZpZ3VyYXRpb24uc2V0RmllbGRUb0VsZW0gPSBmdW5jdGlvbiAoZmllbGQsIGVsZW0sIHZhbHVlKSB7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgbGV0IGlkVmFsdWUgPSBlbGVtO1xuICAgIGVhY2goaW5pdGlhbChwcm9wZXJ0aWVzKSwgZnVuY3Rpb24gKHByb3A6IGFueSkge1xuICAgICAgaWRWYWx1ZVtwcm9wXSA9IHt9O1xuICAgICAgaWRWYWx1ZSA9IGlkVmFsdWVbcHJvcF07XG4gICAgfSk7XG4gICAgY29uc3QgaW5kZXg6IGFueSA9IGxhc3QocHJvcGVydGllcyk7XG4gICAgaWRWYWx1ZVtpbmRleF0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25maWd1cmF0aW9uLmdldEZpZWxkRnJvbUVsZW0gPSBmdW5jdGlvbiAoZmllbGQsIGVsZW0pIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICBsZXQgaWRWYWx1ZTogYW55ID0gZWxlbTtcbiAgICBlYWNoKHByb3BlcnRpZXMsIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICBpZiAoaWRWYWx1ZSkge1xuICAgICAgICBpZFZhbHVlID0gaWRWYWx1ZVtwcm9wXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY2xvbmUoaWRWYWx1ZSk7XG4gIH07XG5cbiAgY29uZmlndXJhdGlvbi5zZXRJZFRvRWxlbSA9IGZ1bmN0aW9uIChlbGVtLCBpZCAvKiwgcm91dGUgKi8pIHtcbiAgICBjb25maWd1cmF0aW9uLnNldEZpZWxkVG9FbGVtKGNvbmZpZ3VyYXRpb24ucmVzdGFuZ3VsYXJGaWVsZHMuaWQsIGVsZW0sIGlkKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBjb25maWd1cmF0aW9uLmdldElkRnJvbUVsZW0gPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgIHJldHVybiBjb25maWd1cmF0aW9uLmdldEZpZWxkRnJvbUVsZW0oY29uZmlndXJhdGlvbi5yZXN0YW5ndWxhckZpZWxkcy5pZCwgZWxlbSk7XG4gIH07XG5cbiAgY29uZmlndXJhdGlvbi5pc1ZhbGlkSWQgPSBmdW5jdGlvbiAoZWxlbUlkKSB7XG4gICAgcmV0dXJuICcnICE9PSBlbGVtSWQgJiYgIWlzVW5kZWZpbmVkKGVsZW1JZCkgJiYgIWlzTnVsbChlbGVtSWQpO1xuICB9O1xuXG4gIGNvbmZpZ3VyYXRpb24uc2V0VXJsVG9FbGVtID0gZnVuY3Rpb24gKGVsZW0sIHVybCAvKiwgcm91dGUgKi8pIHtcbiAgICBjb25maWd1cmF0aW9uLnNldEZpZWxkVG9FbGVtKGNvbmZpZ3VyYXRpb24ucmVzdGFuZ3VsYXJGaWVsZHMuc2VsZkxpbmssIGVsZW0sIHVybCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlndXJhdGlvbi5nZXRVcmxGcm9tRWxlbSA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgcmV0dXJuIGNvbmZpZ3VyYXRpb24uZ2V0RmllbGRGcm9tRWxlbShjb25maWd1cmF0aW9uLnJlc3Rhbmd1bGFyRmllbGRzLnNlbGZMaW5rLCBlbGVtKTtcbiAgfTtcblxuICBjb25maWd1cmF0aW9uLnVzZUNhbm5vbmljYWxJZCA9IGlzVW5kZWZpbmVkKGNvbmZpZ3VyYXRpb24udXNlQ2Fubm9uaWNhbElkKSA/IGZhbHNlIDogY29uZmlndXJhdGlvbi51c2VDYW5ub25pY2FsSWQ7XG4gIG9iamVjdC5zZXRVc2VDYW5ub25pY2FsSWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBjb25maWd1cmF0aW9uLnVzZUNhbm5vbmljYWxJZCA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGNvbmZpZ3VyYXRpb24uZ2V0Q2Fubm9uaWNhbElkRnJvbUVsZW0gPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgIGNvbnN0IGNhbm5vbmljYWxJZCA9IGVsZW1bY29uZmlndXJhdGlvbi5yZXN0YW5ndWxhckZpZWxkcy5jYW5ub25pY2FsSWRdO1xuICAgIGNvbnN0IGFjdHVhbElkID0gY29uZmlndXJhdGlvbi5pc1ZhbGlkSWQoY2Fubm9uaWNhbElkKSA/IGNhbm5vbmljYWxJZCA6IGNvbmZpZ3VyYXRpb24uZ2V0SWRGcm9tRWxlbShlbGVtKTtcbiAgICByZXR1cm4gYWN0dWFsSWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIFJlc3BvbnNlIHBhcnNlci4gVGhpcyBpcyB1c2VkIGluIGNhc2UgeW91ciByZXNwb25zZSBpc24ndCBkaXJlY3RseSB0aGUgZGF0YS5cbiAgICogRm9yIGV4YW1wbGUgaWYgeW91IGhhdmUgYSByZXNwb25zZSBsaWtlIHttZXRhOiB7J21ldGEnfSwgZGF0YToge25hbWU6ICdHb250byd9fVxuICAgKiB5b3UgY2FuIGV4dHJhY3QgdGhpcyBkYXRhIHdoaWNoIGlzIHRoZSBvbmUgdGhhdCBuZWVkcyB3cmFwcGluZ1xuICAgKlxuICAgKiBUaGUgUmVzcG9uc2VFeHRyYWN0b3IgaXMgYSBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSByZXNwb25zZSBhbmQgdGhlIG1ldGhvZCBleGVjdXRlZC5cbiAgICovXG5cbiAgY29uZmlndXJhdGlvbi5yZXNwb25zZUludGVyY2VwdG9ycyA9IGNvbmZpZ3VyYXRpb24ucmVzcG9uc2VJbnRlcmNlcHRvcnMgPyBbLi4uY29uZmlndXJhdGlvbi5yZXNwb25zZUludGVyY2VwdG9yc10gOiBbXTtcblxuICBjb25maWd1cmF0aW9uLmRlZmF1bHRSZXNwb25zZUludGVyY2VwdG9yID0gZnVuY3Rpb24gKGRhdGEgLyosIG9wZXJhdGlvbiwgd2hhdCwgdXJsLCByZXNwb25zZSwgc3ViamVjdCAqLykge1xuICAgIHJldHVybiBkYXRhIHx8IHt9O1xuICB9O1xuXG4gIGNvbmZpZ3VyYXRpb24ucmVzcG9uc2VFeHRyYWN0b3IgPSBmdW5jdGlvbiAoZGF0YSwgb3BlcmF0aW9uLCB3aGF0LCB1cmwsIHJlc3BvbnNlLCBzdWJqZWN0KSB7XG4gICAgY29uc3QgaW50ZXJjZXB0b3JzID0gY2xvbmUoY29uZmlndXJhdGlvbi5yZXNwb25zZUludGVyY2VwdG9ycyk7XG4gICAgaW50ZXJjZXB0b3JzLnB1c2goY29uZmlndXJhdGlvbi5kZWZhdWx0UmVzcG9uc2VJbnRlcmNlcHRvcik7XG4gICAgbGV0IHRoZURhdGEgPSBkYXRhO1xuICAgIGVhY2goaW50ZXJjZXB0b3JzLCBmdW5jdGlvbiAoaW50ZXJjZXB0b3I6IGFueSkge1xuICAgICAgdGhlRGF0YSA9IGludGVyY2VwdG9yKHRoZURhdGEsIG9wZXJhdGlvbixcbiAgICAgICAgd2hhdCwgdXJsLCByZXNwb25zZSwgc3ViamVjdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoZURhdGE7XG4gIH07XG5cbiAgb2JqZWN0LmFkZFJlc3BvbnNlSW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoZXh0cmFjdG9yKSB7XG4gICAgY29uZmlndXJhdGlvbi5yZXNwb25zZUludGVyY2VwdG9ycy5wdXNoKGV4dHJhY3Rvcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlndXJhdGlvbi5lcnJvckludGVyY2VwdG9ycyA9IGNvbmZpZ3VyYXRpb24uZXJyb3JJbnRlcmNlcHRvcnMgPyBbLi4uY29uZmlndXJhdGlvbi5lcnJvckludGVyY2VwdG9yc10gOiBbXTtcbiAgb2JqZWN0LmFkZEVycm9ySW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoaW50ZXJjZXB0b3IpIHtcbiAgICBjb25maWd1cmF0aW9uLmVycm9ySW50ZXJjZXB0b3JzID0gW2ludGVyY2VwdG9yLCAuLi5jb25maWd1cmF0aW9uLmVycm9ySW50ZXJjZXB0b3JzXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBvYmplY3Quc2V0UmVzcG9uc2VJbnRlcmNlcHRvciA9IG9iamVjdC5hZGRSZXNwb25zZUludGVyY2VwdG9yO1xuICBvYmplY3Quc2V0UmVzcG9uc2VFeHRyYWN0b3IgPSBvYmplY3QuYWRkUmVzcG9uc2VJbnRlcmNlcHRvcjtcbiAgb2JqZWN0LnNldEVycm9ySW50ZXJjZXB0b3IgPSBvYmplY3QuYWRkRXJyb3JJbnRlcmNlcHRvcjtcblxuICAvKipcbiAgICogUmVzcG9uc2UgaW50ZXJjZXB0b3IgaXMgY2FsbGVkIGp1c3QgYmVmb3JlIHJlc29sdmluZyBwcm9taXNlcy5cbiAgICovXG5cblxuICAvKipcbiAgICogUmVxdWVzdCBpbnRlcmNlcHRvciBpcyBjYWxsZWQgYmVmb3JlIHNlbmRpbmcgYW4gb2JqZWN0IHRvIHRoZSBzZXJ2ZXIuXG4gICAqL1xuICBjb25maWd1cmF0aW9uLnJlcXVlc3RJbnRlcmNlcHRvcnMgPSBjb25maWd1cmF0aW9uLnJlcXVlc3RJbnRlcmNlcHRvcnMgPyBbLi4uY29uZmlndXJhdGlvbi5yZXF1ZXN0SW50ZXJjZXB0b3JzXSA6IFtdO1xuXG4gIGNvbmZpZ3VyYXRpb24uZGVmYXVsdEludGVyY2VwdG9yID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wZXJhdGlvbiwgcGF0aCwgdXJsLCBoZWFkZXJzLCBwYXJhbXMsIGh0dHBDb25maWcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgIGh0dHBDb25maWc6IGh0dHBDb25maWdcbiAgICB9O1xuICB9O1xuXG4gIGNvbmZpZ3VyYXRpb24uZnVsbFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcGVyYXRpb24sIHBhdGgsIHVybCwgaGVhZGVycywgcGFyYW1zLCBodHRwQ29uZmlnKSB7XG4gICAgY29uc3QgaW50ZXJjZXB0b3JzID0gY2xvbmUoY29uZmlndXJhdGlvbi5yZXF1ZXN0SW50ZXJjZXB0b3JzKTtcbiAgICBjb25zdCBkZWZhdWx0UmVxdWVzdCA9IGNvbmZpZ3VyYXRpb24uZGVmYXVsdEludGVyY2VwdG9yKGVsZW1lbnQsIG9wZXJhdGlvbiwgcGF0aCwgdXJsLCBoZWFkZXJzLCBwYXJhbXMsIGh0dHBDb25maWcpO1xuICAgIHJldHVybiByZWR1Y2UoaW50ZXJjZXB0b3JzLCBmdW5jdGlvbiAocmVxdWVzdDogYW55LCBpbnRlcmNlcHRvcjogYW55KSB7XG5cbiAgICAgIGNvbnN0IHJldHVybkludGVyY2VwdG9yOiBhbnkgPSBpbnRlcmNlcHRvcihcbiAgICAgICAgcmVxdWVzdC5lbGVtZW50LFxuICAgICAgICBvcGVyYXRpb24sXG4gICAgICAgIHBhdGgsXG4gICAgICAgIHVybCxcbiAgICAgICAgcmVxdWVzdC5oZWFkZXJzLFxuICAgICAgICByZXF1ZXN0LnBhcmFtcyxcbiAgICAgICAgcmVxdWVzdC5odHRwQ29uZmlnXG4gICAgICApO1xuICAgICAgcmV0dXJuIGV4dGVuZChyZXF1ZXN0LCByZXR1cm5JbnRlcmNlcHRvcik7XG4gICAgfSwgZGVmYXVsdFJlcXVlc3QpO1xuICB9O1xuXG4gIG9iamVjdC5hZGRSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbiAoaW50ZXJjZXB0b3IpIHtcbiAgICBjb25maWd1cmF0aW9uLnJlcXVlc3RJbnRlcmNlcHRvcnMucHVzaChmdW5jdGlvbiAoZWxlbSwgb3BlcmF0aW9uLCBwYXRoLCB1cmwsIGhlYWRlcnMsIHBhcmFtcywgaHR0cENvbmZpZykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgIGVsZW1lbnQ6IGludGVyY2VwdG9yKGVsZW0sIG9wZXJhdGlvbiwgcGF0aCwgdXJsKSxcbiAgICAgICAgaHR0cENvbmZpZzogaHR0cENvbmZpZ1xuICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBvYmplY3Quc2V0UmVxdWVzdEludGVyY2VwdG9yID0gb2JqZWN0LmFkZFJlcXVlc3RJbnRlcmNlcHRvcjtcblxuICBvYmplY3QuYWRkRnVsbFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIChpbnRlcmNlcHRvcikge1xuICAgIGNvbmZpZ3VyYXRpb24ucmVxdWVzdEludGVyY2VwdG9ycy5wdXNoKGludGVyY2VwdG9yKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBvYmplY3Quc2V0RnVsbFJlcXVlc3RJbnRlcmNlcHRvciA9IG9iamVjdC5hZGRGdWxsUmVxdWVzdEludGVyY2VwdG9yO1xuXG4gIGNvbmZpZ3VyYXRpb24ub25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkID0gY29uZmlndXJhdGlvbi5vbkJlZm9yZUVsZW1SZXN0YW5ndWxhcml6ZWQgfHwgZnVuY3Rpb24gKGVsZW0pIHtcbiAgICByZXR1cm4gZWxlbTtcbiAgfTtcbiAgb2JqZWN0LnNldE9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZCA9IGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgY29uZmlndXJhdGlvbi5vbkJlZm9yZUVsZW1SZXN0YW5ndWxhcml6ZWQgPSBwb3N0O1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIG9iamVjdC5zZXRSZXN0YW5ndWxhcml6ZVByb21pc2VJbnRlcmNlcHRvciA9IGZ1bmN0aW9uIChpbnRlcmNlcHRvcikge1xuICAgIGNvbmZpZ3VyYXRpb24ucmVzdGFuZ3VsYXJpemVQcm9taXNlSW50ZXJjZXB0b3IgPSBpbnRlcmNlcHRvcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGFmdGVyIGFuIGVsZW1lbnQgaGFzIGJlZW4gXCJSZXN0YW5ndWxhcml6ZWRcIi5cbiAgICpcbiAgICogSXQgcmVjZWl2ZXMgdGhlIGVsZW1lbnQsIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGl0J3MgYW4gZWxlbWVudCBvciBhIGNvbGxlY3Rpb25cbiAgICogYW5kIHRoZSBuYW1lIG9mIHRoZSBtb2RlbFxuICAgKlxuICAgKi9cbiAgY29uZmlndXJhdGlvbi5vbkVsZW1SZXN0YW5ndWxhcml6ZWQgPSBjb25maWd1cmF0aW9uLm9uRWxlbVJlc3Rhbmd1bGFyaXplZCB8fCBmdW5jdGlvbiAoZWxlbSkge1xuICAgIHJldHVybiBlbGVtO1xuICB9O1xuICBvYmplY3Quc2V0T25FbGVtUmVzdGFuZ3VsYXJpemVkID0gZnVuY3Rpb24gKHBvc3QpIHtcbiAgICBjb25maWd1cmF0aW9uLm9uRWxlbVJlc3Rhbmd1bGFyaXplZCA9IHBvc3Q7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgY29uZmlndXJhdGlvbi5zaG91bGRTYXZlUGFyZW50ID0gY29uZmlndXJhdGlvbi5zaG91bGRTYXZlUGFyZW50IHx8IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgb2JqZWN0LnNldFBhcmVudGxlc3MgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgaWYgKGlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgY29uZmlndXJhdGlvbi5zaG91bGRTYXZlUGFyZW50ID0gZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgIHJldHVybiAhaW5jbHVkZXModmFsdWVzLCByb3V0ZSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXNCb29sZWFuKHZhbHVlcykpIHtcbiAgICAgIGNvbmZpZ3VyYXRpb24uc2hvdWxkU2F2ZVBhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF2YWx1ZXM7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBsZXRzIHlvdSBzZXQgYSBzdWZmaXggdG8gZXZlcnkgcmVxdWVzdC5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGlmIHlvdXIgYXBpIHJlcXVpcmVzIHRoYXQgZm9yIEpTb24gcmVxdWVzdHMgeW91IGRvIC91c2Vycy8xMjMuanNvbiwgeW91IGNhbiBzZXQgdGhhdFxuICAgKiBpbiBoZXJlLlxuICAgKlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGUgc3VmZml4IGlzIG51bGxcbiAgICovXG4gIGNvbmZpZ3VyYXRpb24uc3VmZml4ID0gaXNVbmRlZmluZWQoY29uZmlndXJhdGlvbi5zdWZmaXgpID8gbnVsbCA6IGNvbmZpZ3VyYXRpb24uc3VmZml4O1xuICBvYmplY3Quc2V0UmVxdWVzdFN1ZmZpeCA9IGZ1bmN0aW9uIChuZXdTdWZmaXgpIHtcbiAgICBjb25maWd1cmF0aW9uLnN1ZmZpeCA9IG5ld1N1ZmZpeDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQWRkIGVsZW1lbnQgdHJhbnNmb3JtZXJzIGZvciBjZXJ0YWluIHJvdXRlcy5cbiAgICovXG4gIGNvbmZpZ3VyYXRpb24udHJhbnNmb3JtZXJzID0gY29uZmlndXJhdGlvbi50cmFuc2Zvcm1lcnMgfHwge307XG4gIG9iamVjdC5hZGRFbGVtZW50VHJhbnNmb3JtZXIgPSBmdW5jdGlvbiAodHlwZSwgc2Vjb25kQXJnLCB0aGlyZEFyZykge1xuICAgIGxldCBpc0NvbGxlY3Rpb24gPSBudWxsO1xuICAgIGxldCB0cmFuc2Zvcm1lciA9IG51bGw7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHRyYW5zZm9ybWVyID0gc2Vjb25kQXJnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2Zvcm1lciA9IHRoaXJkQXJnO1xuICAgICAgaXNDb2xsZWN0aW9uID0gc2Vjb25kQXJnO1xuICAgIH1cblxuICAgIGxldCB0eXBlVHJhbnNmb3JtZXJzID0gY29uZmlndXJhdGlvbi50cmFuc2Zvcm1lcnNbdHlwZV07XG4gICAgaWYgKCF0eXBlVHJhbnNmb3JtZXJzKSB7XG4gICAgICB0eXBlVHJhbnNmb3JtZXJzID0gY29uZmlndXJhdGlvbi50cmFuc2Zvcm1lcnNbdHlwZV0gPSBbXTtcbiAgICB9XG5cbiAgICB0eXBlVHJhbnNmb3JtZXJzLnB1c2goZnVuY3Rpb24gKGNvbGwsIGVsZW0pIHtcbiAgICAgIGlmIChpc051bGwoaXNDb2xsZWN0aW9uKSB8fCAoY29sbCA9PT0gaXNDb2xsZWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZXIoZWxlbSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG5cbiAgb2JqZWN0LmV4dGVuZENvbGxlY3Rpb24gPSBmdW5jdGlvbiAocm91dGUsIGZuKSB7XG4gICAgcmV0dXJuIG9iamVjdC5hZGRFbGVtZW50VHJhbnNmb3JtZXIocm91dGUsIHRydWUsIGZuKTtcbiAgfTtcblxuICBvYmplY3QuZXh0ZW5kTW9kZWwgPSBmdW5jdGlvbiAocm91dGUsIGZuKSB7XG4gICAgcmV0dXJuIG9iamVjdC5hZGRFbGVtZW50VHJhbnNmb3JtZXIocm91dGUsIGZhbHNlLCBmbik7XG4gIH07XG5cbiAgY29uZmlndXJhdGlvbi50cmFuc2Zvcm1FbGVtID0gZnVuY3Rpb24gKGVsZW0sIGlzQ29sbGVjdGlvbiwgcm91dGUsIFJlc3Rhbmd1bGFyLCBmb3JjZSkge1xuICAgIGlmICghZm9yY2UgJiYgIWNvbmZpZ3VyYXRpb24udHJhbnNmb3JtTG9jYWxFbGVtZW50cyAmJiAhZWxlbVtjb25maWd1cmF0aW9uLnJlc3Rhbmd1bGFyRmllbGRzLmZyb21TZXJ2ZXJdKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gICAgY29uc3QgdHlwZVRyYW5zZm9ybWVycyA9IGNvbmZpZ3VyYXRpb24udHJhbnNmb3JtZXJzW3JvdXRlXTtcbiAgICBsZXQgY2hhbmdlZEVsZW0gPSBlbGVtO1xuICAgIGlmICh0eXBlVHJhbnNmb3JtZXJzKSB7XG4gICAgICBlYWNoKHR5cGVUcmFuc2Zvcm1lcnMsIGZ1bmN0aW9uICh0cmFuc2Zvcm1lcjogKGlzQ29sbGVjdGlvbjogYm9vbGVhbiwgY2hhbmdlZEVsZW06IGFueSkgPT4gYW55KSB7XG4gICAgICAgIGNoYW5nZWRFbGVtID0gdHJhbnNmb3JtZXIoaXNDb2xsZWN0aW9uLCBjaGFuZ2VkRWxlbSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZ3VyYXRpb24ub25FbGVtUmVzdGFuZ3VsYXJpemVkKGNoYW5nZWRFbGVtLCBpc0NvbGxlY3Rpb24sIHJvdXRlLCBSZXN0YW5ndWxhcik7XG4gIH07XG5cbiAgY29uZmlndXJhdGlvbi50cmFuc2Zvcm1Mb2NhbEVsZW1lbnRzID0gaXNVbmRlZmluZWQoY29uZmlndXJhdGlvbi50cmFuc2Zvcm1Mb2NhbEVsZW1lbnRzKSA/XG4gICAgZmFsc2UgOlxuICAgIGNvbmZpZ3VyYXRpb24udHJhbnNmb3JtTG9jYWxFbGVtZW50cztcblxuICBvYmplY3Quc2V0VHJhbnNmb3JtT25seVNlcnZlckVsZW1lbnRzID0gZnVuY3Rpb24gKGFjdGl2ZSkge1xuICAgIGNvbmZpZ3VyYXRpb24udHJhbnNmb3JtTG9jYWxFbGVtZW50cyA9ICFhY3RpdmU7XG4gIH07XG5cbiAgY29uZmlndXJhdGlvbi5mdWxsUmVzcG9uc2UgPSBpc1VuZGVmaW5lZChjb25maWd1cmF0aW9uLmZ1bGxSZXNwb25zZSkgPyBmYWxzZSA6IGNvbmZpZ3VyYXRpb24uZnVsbFJlc3BvbnNlO1xuICBvYmplY3Quc2V0RnVsbFJlc3BvbnNlID0gZnVuY3Rpb24gKGZ1bGwpIHtcbiAgICBjb25maWd1cmF0aW9uLmZ1bGxSZXNwb25zZSA9IGZ1bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cblxuICAvLyBJbnRlcm5hbCB2YWx1ZXMgYW5kIGZ1bmN0aW9uc1xuICBjb25maWd1cmF0aW9uLnVybENyZWF0b3JGYWN0b3J5ID0ge307XG5cbiAgLyoqXG4gICAqIEJhc2UgVVJMIENyZWF0b3IuIEJhc2UgcHJvdG90eXBlIGZvciBldmVyeXRoaW5nIHJlbGF0ZWQgdG8gaXRcbiAgICoqL1xuXG4gIGNvbnN0IEJhc2VDcmVhdG9yID0gZnVuY3Rpb24gKCkge1xuICB9O1xuXG4gIEJhc2VDcmVhdG9yLnByb3RvdHlwZS5zZXRDb25maWcgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQmFzZUNyZWF0b3IucHJvdG90eXBlLnBhcmVudHNBcnJheSA9IGZ1bmN0aW9uIChjdXJyZW50KSB7XG4gICAgY29uc3QgcGFyZW50cyA9IFtdO1xuICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICBwYXJlbnRzLnB1c2goY3VycmVudCk7XG4gICAgICBjdXJyZW50ID0gY3VycmVudFt0aGlzLmNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXJlbnRSZXNvdXJjZV07XG4gICAgfVxuICAgIHJldHVybiBwYXJlbnRzLnJldmVyc2UoKTtcbiAgfTtcblxuICBmdW5jdGlvbiBSZXN0YW5ndWxhclJlc291cmNlKGNvbmZpZywgJGh0dHAsIHVybCwgY29uZmlndXJlcikge1xuICAgIGNvbnN0IHJlc291cmNlID0ge307XG4gICAgZWFjaChrZXlzKGNvbmZpZ3VyZXIpLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNvbmZpZ3VyZXJba2V5XTtcblxuICAgICAgLy8gQWRkIGRlZmF1bHQgcGFyYW1ldGVyc1xuICAgICAgdmFsdWUucGFyYW1zID0gZXh0ZW5kKHt9LCB2YWx1ZS5wYXJhbXMsIGNvbmZpZy5kZWZhdWx0UmVxdWVzdFBhcmFtc1t2YWx1ZS5tZXRob2QudG9Mb3dlckNhc2UoKV0pO1xuICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0aGUgPyBpZiBubyBwYXJhbXMgYXJlIHRoZXJlXG4gICAgICBpZiAoaXNFbXB0eSh2YWx1ZS5wYXJhbXMpKSB7XG4gICAgICAgIGRlbGV0ZSB2YWx1ZS5wYXJhbXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25maWcuaXNTYWZlKHZhbHVlLm1ldGhvZCkpIHtcblxuICAgICAgICByZXNvdXJjZVtrZXldID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdENvbmZpZyA9IGV4dGVuZCh2YWx1ZSwge1xuICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gJGh0dHAuY3JlYXRlUmVxdWVzdChyZXN1bHRDb25maWcpO1xuICAgICAgICB9O1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHJlc291cmNlW2tleV0gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdENvbmZpZyA9IGV4dGVuZCh2YWx1ZSwge1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuICRodHRwLmNyZWF0ZVJlcXVlc3QocmVzdWx0Q29uZmlnKTtcbiAgICAgICAgfTtcblxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc291cmNlO1xuICB9XG5cbiAgQmFzZUNyZWF0b3IucHJvdG90eXBlLnJlc291cmNlID0gZnVuY3Rpb24gKGN1cnJlbnQsICRodHRwLCBsb2NhbEh0dHBDb25maWcsIGNhbGxIZWFkZXJzLCBjYWxsUGFyYW1zLCB3aGF0LCBldGFnLCBvcGVyYXRpb24pIHtcbiAgICBjb25zdCBwYXJhbXMgPSBkZWZhdWx0cyhjYWxsUGFyYW1zIHx8IHt9LCB0aGlzLmNvbmZpZy5kZWZhdWx0UmVxdWVzdFBhcmFtcy5jb21tb24pO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBkZWZhdWx0cyhjYWxsSGVhZGVycyB8fCB7fSwgdGhpcy5jb25maWcuZGVmYXVsdEhlYWRlcnMpO1xuXG4gICAgaWYgKGV0YWcpIHtcbiAgICAgIGlmICghY29uZmlndXJhdGlvbi5pc1NhZmUob3BlcmF0aW9uKSkge1xuICAgICAgICBoZWFkZXJzWydJZi1NYXRjaCddID0gZXRhZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhlYWRlcnNbJ0lmLU5vbmUtTWF0Y2gnXSA9IGV0YWc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHVybCA9IHRoaXMuYmFzZShjdXJyZW50KTtcblxuICAgIGlmICh3aGF0KSB7XG4gICAgICBsZXQgYWRkID0gJyc7XG4gICAgICBpZiAoIS9cXC8kLy50ZXN0KHVybCkpIHtcbiAgICAgICAgYWRkICs9ICcvJztcbiAgICAgIH1cbiAgICAgIGFkZCArPSB3aGF0O1xuICAgICAgdXJsICs9IGFkZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcuc3VmZml4ICYmXG4gICAgICB1cmwuaW5kZXhPZih0aGlzLmNvbmZpZy5zdWZmaXgsIHVybC5sZW5ndGggLSB0aGlzLmNvbmZpZy5zdWZmaXgubGVuZ3RoKSA9PT0gLTEgJiYgIXRoaXMuY29uZmlnLmdldFVybEZyb21FbGVtKGN1cnJlbnQpKSB7XG4gICAgICB1cmwgKz0gdGhpcy5jb25maWcuc3VmZml4O1xuICAgIH1cblxuICAgIGN1cnJlbnRbdGhpcy5jb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaHR0cENvbmZpZ10gPSB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gUmVzdGFuZ3VsYXJSZXNvdXJjZSh0aGlzLmNvbmZpZywgJGh0dHAsIHVybCwge1xuICAgICAgZ2V0TGlzdDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBnZXQ6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAganNvbnA6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ2pzb25wJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICBwdXQ6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgcG9zdDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgcmVtb3ZlOiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIGhlYWQ6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ0hFQUQnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgIHRyYWNlOiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRob2Q6ICdUUkFDRScsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgb3B0aW9uczogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLFxuICAgICAgICB7XG4gICAgICAgICAgbWV0aG9kOiAnT1BUSU9OUycsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgcGF0Y2g6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZyxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pXG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIFBhdGggVVJMIGNyZWF0b3IuIEl0IHVzZXMgUGF0aCB0byBzaG93IEhpZXJhcmNoeSBpbiB0aGUgUmVzdCBBUEkuXG4gICAqIFRoaXMgbWVhbnMgdGhhdCBpZiB5b3UgaGF2ZSBhbiBBY2NvdW50IHRoYXQgdGhlbiBoYXMgYSBzZXQgb2YgQnVpbGRpbmdzLCBhIFVSTCB0byBhIGJ1aWxkaW5nXG4gICAqIHdvdWxkIGJlIC9hY2NvdW50cy8xMjMvYnVpbGRpbmdzLzQ1NlxuICAgKiovXG4gIGNvbnN0IFBhdGggPSBmdW5jdGlvbiAoKSB7XG4gIH07XG5cbiAgUGF0aC5wcm90b3R5cGUgPSBuZXcgQmFzZUNyZWF0b3IoKTtcblxuICBQYXRoLnByb3RvdHlwZS5ub3JtYWxpemVVcmwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgY29uc3QgcGFydHMgPSAvKCg/Omh0dHBbc10/Oik/XFwvXFwvKT8oLiopPy8uZXhlYyh1cmwpO1xuICAgIHBhcnRzWzJdID0gcGFydHNbMl0ucmVwbGFjZSgvW1xcXFxcXC9dKy9nLCAnLycpO1xuICAgIHJldHVybiAodHlwZW9mIHBhcnRzWzFdICE9PSAndW5kZWZpbmVkJykgPyBwYXJ0c1sxXSArIHBhcnRzWzJdIDogcGFydHNbMl07XG4gIH07XG5cbiAgUGF0aC5wcm90b3R5cGUuYmFzZSA9IGZ1bmN0aW9uIChjdXJyZW50KSB7XG4gICAgY29uc3QgX190aGlzID0gdGhpcztcbiAgICByZXR1cm4gcmVkdWNlKHRoaXMucGFyZW50c0FycmF5KGN1cnJlbnQpLCBmdW5jdGlvbiAoYWN1bTogYW55LCBlbGVtOiBhbnkpIHtcbiAgICAgIGxldCBlbGVtVXJsO1xuICAgICAgY29uc3QgZWxlbVNlbGZMaW5rID0gX190aGlzLmNvbmZpZy5nZXRVcmxGcm9tRWxlbShlbGVtKTtcbiAgICAgIGlmIChlbGVtU2VsZkxpbmspIHtcbiAgICAgICAgaWYgKF9fdGhpcy5jb25maWcuaXNBYnNvbHV0ZVVybChlbGVtU2VsZkxpbmspKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1TZWxmTGluaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtVXJsID0gZWxlbVNlbGZMaW5rO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtVXJsID0gZWxlbVtfX3RoaXMuY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXTtcblxuICAgICAgICBpZiAoZWxlbVtfX3RoaXMuY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICBjb25zdCBpZHMgPSBlbGVtW19fdGhpcy5jb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaWRzXTtcbiAgICAgICAgICBpZiAoaWRzKSB7XG4gICAgICAgICAgICBlbGVtVXJsICs9ICcvJyArIGlkcy5qb2luKCcsJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBlbGVtSWQ6IGFueTtcbiAgICAgICAgICBpZiAoX190aGlzLmNvbmZpZy51c2VDYW5ub25pY2FsSWQpIHtcbiAgICAgICAgICAgIGVsZW1JZCA9IF9fdGhpcy5jb25maWcuZ2V0Q2Fubm9uaWNhbElkRnJvbUVsZW0oZWxlbSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1JZCA9IF9fdGhpcy5jb25maWcuZ2V0SWRGcm9tRWxlbShlbGVtKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29uZmlndXJhdGlvbi5pc1ZhbGlkSWQoZWxlbUlkKSAmJiAhZWxlbS5zaW5nbGVPbmUpIHtcbiAgICAgICAgICAgIGVsZW1VcmwgKz0gJy8nICsgKF9fdGhpcy5jb25maWcuZW5jb2RlSWRzID8gZW5jb2RlVVJJQ29tcG9uZW50KGVsZW1JZCkgOiBlbGVtSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWN1bSA9IGFjdW0ucmVwbGFjZSgvXFwvJC8sICcnKSArICcvJyArIGVsZW1Vcmw7XG4gICAgICByZXR1cm4gX190aGlzLm5vcm1hbGl6ZVVybChhY3VtKTtcblxuICAgIH0sIHRoaXMuY29uZmlnLmJhc2VVcmwpO1xuICB9O1xuXG5cbiAgUGF0aC5wcm90b3R5cGUuZmV0Y2hVcmwgPSBmdW5jdGlvbiAoY3VycmVudCwgd2hhdCkge1xuICAgIGxldCBiYXNlVXJsID0gdGhpcy5iYXNlKGN1cnJlbnQpO1xuICAgIGlmICh3aGF0KSB7XG4gICAgICBiYXNlVXJsICs9ICcvJyArIHdoYXQ7XG4gICAgfVxuICAgIHJldHVybiBiYXNlVXJsO1xuICB9O1xuXG4gIFBhdGgucHJvdG90eXBlLmZldGNoUmVxdWVzdGVkVXJsID0gZnVuY3Rpb24gKGN1cnJlbnQsIHdoYXQpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmZldGNoVXJsKGN1cnJlbnQsIHdoYXQpO1xuICAgIGNvbnN0IHBhcmFtcyA9IGN1cnJlbnRbY29uZmlndXJhdGlvbi5yZXN0YW5ndWxhckZpZWxkcy5yZXFQYXJhbXNdO1xuXG4gICAgLy8gRnJvbSBoZXJlIG9uIGFuZCB1bnRpbCB0aGUgZW5kIG9mIGZldGNoUmVxdWVzdGVkVXJsLFxuICAgIC8vIHRoZSBjb2RlIGhhcyBiZWVuIGtpbmRseSBib3Jyb3dlZCBmcm9tIGFuZ3VsYXIuanNcbiAgICAvLyBUaGUgcmVhc29uIGZvciBzdWNoIGNvZGUgYmxvYXRpbmcgaXMgY29oZXJlbmNlOlxuICAgIC8vICAgSWYgdGhlIHVzZXIgd2VyZSB0byB1c2UgdGhpcyBmb3IgY2FjaGUgbWFuYWdlbWVudCwgdGhlXG4gICAgLy8gICBzZXJpYWxpemF0aW9uIG9mIHBhcmFtZXRlcnMgd291bGQgbmVlZCB0byBiZSBpZGVudGljYWxcbiAgICAvLyAgIHRvIHRoZSBvbmUgZG9uZSBieSBhbmd1bGFyIGZvciBjYWNoZSBrZXlzIHRvIG1hdGNoLlxuICAgIGZ1bmN0aW9uIHNvcnRlZEtleXMob2JqKSB7XG4gICAgICBjb25zdCByZXN1bHRLZXlzID0gW107XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgcmVzdWx0S2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRLZXlzLnNvcnQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JFYWNoU29ydGVkKG9iaiwgaXRlcmF0b3I/LCBjb250ZXh0Pykge1xuICAgICAgY29uc3Qgc29ydGVkS2V5c0FycmF5ID0gc29ydGVkS2V5cyhvYmopO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0ZWRLZXlzQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbc29ydGVkS2V5c0FycmF5W2ldXSwgc29ydGVkS2V5c0FycmF5W2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzb3J0ZWRLZXlzQXJyYXk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5jb2RlVXJpUXVlcnkodmFsLCBwY3RFbmNvZGVTcGFjZXM/KSB7XG4gICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbClcbiAgICAgIC5yZXBsYWNlKC8lNDAvZ2ksICdAJylcbiAgICAgIC5yZXBsYWNlKC8lM0EvZ2ksICc6JylcbiAgICAgIC5yZXBsYWNlKC8lMjQvZywgJyQnKVxuICAgICAgLnJlcGxhY2UoLyUyQy9naSwgJywnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAocGN0RW5jb2RlU3BhY2VzID8gJyUyMCcgOiAnKycpKTtcbiAgICB9XG5cbiAgICBpZiAoIXBhcmFtcykge1xuICAgICAgcmV0dXJuIHVybCArICh0aGlzLmNvbmZpZy5zdWZmaXggfHwgJycpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnRzID0gW107XG4gICAgZm9yRWFjaFNvcnRlZChwYXJhbXMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgIH1cblxuICAgICAgZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgaWYgKGlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlVXJpUXVlcnkoa2V5KSArICc9JyArIGVuY29kZVVyaVF1ZXJ5KHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHVybCArICh0aGlzLmNvbmZpZy5zdWZmaXggfHwgJycpICsgKCh1cmwuaW5kZXhPZignPycpID09PSAtMSkgPyAnPycgOiAnJicpICsgcGFydHMuam9pbignJicpO1xuICB9O1xuXG4gIGNvbmZpZ3VyYXRpb24udXJsQ3JlYXRvckZhY3RvcnkucGF0aCA9IFBhdGg7XG59XG4iXX0=