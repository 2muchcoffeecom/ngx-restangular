/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-restangular.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, Injector, Optional } from '@angular/core';
import { assign, map, bind, union, values, pick, isEmpty, isFunction, isNumber, isUndefined, isArray, isObject, extend, each, every, omit, get, defaults, clone, includes } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RESTANGULAR } from './ngx-restangular.config';
import { RestangularHttp } from './ngx-restangular-http';
import { RestangularConfigurer } from './ngx-restangular-config.factory';
export class Restangular {
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
        const arrDI = map(this.configObj.arrServices, (/**
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
                    let processedData = map(data, (/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJlc3Rhbmd1bGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LXJlc3Rhbmd1bGFyL3NyYy9saWIvbmd4LXJlc3Rhbmd1bGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQ0wsTUFBTSxFQUNOLEdBQUcsRUFDSCxJQUFJLEVBQ0osS0FBSyxFQUNMLE1BQU0sRUFDTixJQUFJLEVBQ0osT0FBTyxFQUNQLFVBQVUsRUFDVixRQUFRLEVBQ1IsV0FBVyxFQUNYLE9BQU8sRUFDUCxRQUFRLEVBQ1IsTUFBTSxFQUNOLElBQUksRUFDSixLQUFLLEVBQ0wsSUFBSSxFQUNKLEdBQUcsRUFDSCxRQUFRLEVBQ1IsS0FBSyxFQUNMLFFBQVEsRUFDVCxNQUFNLFFBQVEsQ0FBQztBQUVoQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBR3pFLE1BQU0sT0FBTyxXQUFXOzs7Ozs7SUFvR3RCLFlBQzBDLFNBQVMsRUFDekMsUUFBa0IsRUFDbEIsSUFBcUI7UUFGVyxjQUFTLEdBQVQsU0FBUyxDQUFBO1FBQ3pDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsU0FBSSxHQUFKLElBQUksQ0FBaUI7UUFFN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Y0FDbkMsT0FBTyxHQUFHLElB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QUFDLENBQUM7WUFFM0MsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMseUJBQXlCLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFOUQsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUV2QyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXZDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFL0MsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUU3QyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTdDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFM0QsT0FBTyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUVsRSxPQUFPLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLG1DQUFtQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRXRGLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxPQUFPLDZCQUE2QixDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDNUQsQ0FBQztBQUVILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdG9yLCBPcHRpb25hbCwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgYXNzaWduLFxuICBtYXAsXG4gIGJpbmQsXG4gIHVuaW9uLFxuICB2YWx1ZXMsXG4gIHBpY2ssXG4gIGlzRW1wdHksXG4gIGlzRnVuY3Rpb24sXG4gIGlzTnVtYmVyLFxuICBpc1VuZGVmaW5lZCxcbiAgaXNBcnJheSxcbiAgaXNPYmplY3QsXG4gIGV4dGVuZCxcbiAgZWFjaCxcbiAgZXZlcnksXG4gIG9taXQsXG4gIGdldCxcbiAgZGVmYXVsdHMsXG4gIGNsb25lLFxuICBpbmNsdWRlc1xufSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgUkVTVEFOR1VMQVIgfSBmcm9tICcuL25neC1yZXN0YW5ndWxhci5jb25maWcnO1xuaW1wb3J0IHsgUmVzdGFuZ3VsYXJIdHRwIH0gZnJvbSAnLi9uZ3gtcmVzdGFuZ3VsYXItaHR0cCc7XG5pbXBvcnQgeyBSZXN0YW5ndWxhckNvbmZpZ3VyZXIgfSBmcm9tICcuL25neC1yZXN0YW5ndWxhci1jb25maWcuZmFjdG9yeSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXN0YW5ndWxhciB7XG4gIHByb3ZpZGVyOiB7XG4gICAgc2V0QmFzZVVybDogYW55LFxuICAgIHNldERlZmF1bHRIZWFkZXJzOiBhbnksXG4gICAgY29uZmlndXJhdGlvbjogYW55LFxuICAgIHNldFNlbGZMaW5rQWJzb2x1dGVVcmw6IGFueSxcbiAgICBzZXRFeHRyYUZpZWxkczogYW55LFxuICAgIHNldERlZmF1bHRIdHRwRmllbGRzOiBhbnksXG4gICAgc2V0UGxhaW5CeURlZmF1bHQ6IGFueSxcbiAgICBzZXRFbmNvZGVJZHM6IGFueSxcbiAgICBzZXREZWZhdWx0UmVxdWVzdFBhcmFtczogYW55LFxuICAgIHJlcXVlc3RQYXJhbXM6IGFueSxcbiAgICBkZWZhdWx0SGVhZGVyczogYW55LFxuICAgIHNldERlZmF1bHRSZXNwb25zZU1ldGhvZDogYW55LFxuICAgIGRlZmF1bHRSZXNwb25zZU1ldGhvZDogYW55LFxuICAgIHNldE1ldGhvZE92ZXJyaWRlcnM6IGFueSxcbiAgICBzZXRKc29ucDogYW55LFxuICAgIHNldFVybENyZWF0b3I6IGFueSxcbiAgICBzZXRSZXN0YW5ndWxhckZpZWxkczogYW55LFxuICAgIHNldFVzZUNhbm5vbmljYWxJZDogYW55LFxuICAgIGFkZFJlc3BvbnNlSW50ZXJjZXB0b3I6IGFueSxcbiAgICBhZGRFcnJvckludGVyY2VwdG9yOiBhbnksXG4gICAgc2V0UmVzcG9uc2VJbnRlcmNlcHRvcjogYW55LFxuICAgIHNldFJlc3BvbnNlRXh0cmFjdG9yOiBhbnksXG4gICAgc2V0RXJyb3JJbnRlcmNlcHRvcjogYW55LFxuICAgIGFkZFJlcXVlc3RJbnRlcmNlcHRvcjogYW55LFxuICAgIHNldFJlcXVlc3RJbnRlcmNlcHRvcjogYW55LFxuICAgIHNldEZ1bGxSZXF1ZXN0SW50ZXJjZXB0b3I6IGFueSxcbiAgICBhZGRGdWxsUmVxdWVzdEludGVyY2VwdG9yOiBhbnksXG4gICAgc2V0T25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkOiBhbnksXG4gICAgc2V0UmVzdGFuZ3VsYXJpemVQcm9taXNlSW50ZXJjZXB0b3I6IGFueSxcbiAgICBzZXRPbkVsZW1SZXN0YW5ndWxhcml6ZWQ6IGFueSxcbiAgICBzZXRQYXJlbnRsZXNzOiBhbnksXG4gICAgc2V0UmVxdWVzdFN1ZmZpeDogYW55LFxuICAgIGFkZEVsZW1lbnRUcmFuc2Zvcm1lcjogYW55LFxuICAgIGV4dGVuZENvbGxlY3Rpb246IGFueSxcbiAgICBleHRlbmRNb2RlbDogYW55LFxuICAgIHNldFRyYW5zZm9ybU9ubHlTZXJ2ZXJFbGVtZW50czogYW55LFxuICAgIHNldEZ1bGxSZXNwb25zZTogYW55LFxuICAgICRnZXQ6IGFueVxuICB9O1xuICBhZGRFbGVtZW50VHJhbnNmb3JtZXI6IGFueTtcbiAgZXh0ZW5kQ29sbGVjdGlvbjogYW55O1xuICBleHRlbmRNb2RlbDogYW55O1xuICBjb3B5O1xuICBjb25maWd1cmF0aW9uO1xuICBzZXJ2aWNlO1xuICBpZDtcbiAgcm91dGU7XG4gIHBhcmVudFJlc291cmNlO1xuICByZXN0YW5ndWxhckNvbGxlY3Rpb247XG4gIGNhbm5vbmljYWxJZDtcbiAgZXRhZztcbiAgc2VsZkxpbms7XG4gIGdldDtcbiAgZ2V0TGlzdDtcbiAgcHV0O1xuICBwb3N0O1xuICByZW1vdmU7XG4gIGhlYWQ7XG4gIHRyYWNlO1xuICBvcHRpb25zO1xuICBwYXRjaDtcbiAgZ2V0UmVzdGFuZ3VsYXJVcmw7XG4gIGdldFJlcXVlc3RlZFVybDtcbiAgcHV0RWxlbWVudDtcbiAgYWRkUmVzdGFuZ3VsYXJNZXRob2Q7XG4gIGdldFBhcmVudExpc3Q7XG4gIGNsb25lO1xuICBpZHM7XG4gIGh0dHBDb25maWc7XG4gIHJlcVBhcmFtcztcbiAgb25lO1xuICBhbGw7XG4gIHNldmVyYWw7XG4gIG9uZVVybDtcbiAgYWxsVXJsO1xuICBjdXN0b21QVVQ7XG4gIGN1c3RvbVBBVENIO1xuICBjdXN0b21QT1NUO1xuICBjdXN0b21ERUxFVEU7XG4gIGN1c3RvbUdFVDtcbiAgY3VzdG9tR0VUTElTVDtcbiAgY3VzdG9tT3BlcmF0aW9uO1xuICBkb1BVVDtcbiAgZG9QQVRDSDtcbiAgZG9QT1NUO1xuICBkb0RFTEVURTtcbiAgZG9HRVQ7XG4gIGRvR0VUTElTVDtcbiAgZnJvbVNlcnZlcjtcbiAgd2l0aENvbmZpZztcbiAgd2l0aEh0dHBDb25maWc7XG4gIHNpbmdsZU9uZTtcbiAgcGxhaW47XG4gIHNhdmU7XG4gIHJlc3Rhbmd1bGFyaXplZDtcbiAgcmVzdGFuZ3VsYXJpemVFbGVtZW50O1xuICByZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChSRVNUQU5HVUxBUikgcHVibGljIGNvbmZpZ09iaixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGh0dHA6IFJlc3Rhbmd1bGFySHR0cFxuICApIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gbmV3IHByb3ZpZGVyQ29uZmlnKGh0dHApO1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnByb3ZpZGVyLiRnZXQoKTtcbiAgICBhc3NpZ24odGhpcywgZWxlbWVudCk7XG5cbiAgICB0aGlzLnNldERlZmF1bHRDb25maWcoKTtcbiAgfVxuXG4gIHNldERlZmF1bHRDb25maWcoKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZ09iaiB8fCAhaXNGdW5jdGlvbih0aGlzLmNvbmZpZ09iai5mbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhcnJESSA9IG1hcCh0aGlzLmNvbmZpZ09iai5hcnJTZXJ2aWNlcywgKHNlcnZpY2VzOiBUeXBlPGFueT4pID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdG9yLmdldChzZXJ2aWNlcyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbmZpZ09iai5mbiguLi5bdGhpcy5wcm92aWRlciwgLi4uYXJyREldKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcm92aWRlckNvbmZpZygkaHR0cCkge1xuICBjb25zdCBnbG9iYWxDb25maWd1cmF0aW9uID0ge307XG5cbiAgUmVzdGFuZ3VsYXJDb25maWd1cmVyKHRoaXMsIGdsb2JhbENvbmZpZ3VyYXRpb24pO1xuXG4gIHRoaXMuJGdldCA9ICRnZXQ7XG5cbiAgZnVuY3Rpb24gJGdldCgpIHtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNlcnZpY2VGb3JDb25maWd1cmF0aW9uKGNvbmZpZykge1xuICAgICAgY29uc3Qgc2VydmljZTogYW55ID0ge307XG5cbiAgICAgIGNvbnN0IHVybEhhbmRsZXIgPSBuZXcgY29uZmlnLnVybENyZWF0b3JGYWN0b3J5W2NvbmZpZy51cmxDcmVhdG9yXSgpO1xuICAgICAgdXJsSGFuZGxlci5zZXRDb25maWcoY29uZmlnKTtcblxuICAgICAgZnVuY3Rpb24gcmVzdGFuZ3VsYXJpemVCYXNlKHBhcmVudCwgZWxlbSwgcm91dGUsIHJlcVBhcmFtcywgZnJvbVNlcnZlcikge1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV0gPSByb3V0ZTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0UmVzdGFuZ3VsYXJVcmxdID0gYmluZCh1cmxIYW5kbGVyLmZldGNoVXJsLCB1cmxIYW5kbGVyLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0UmVxdWVzdGVkVXJsXSA9IGJpbmQodXJsSGFuZGxlci5mZXRjaFJlcXVlc3RlZFVybCwgdXJsSGFuZGxlciwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmFkZFJlc3Rhbmd1bGFyTWV0aG9kXSA9IGJpbmQoYWRkUmVzdGFuZ3VsYXJNZXRob2RGdW5jdGlvbiwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmNsb25lXSA9IGJpbmQoY29weVJlc3Rhbmd1bGFyaXplZEVsZW1lbnQsIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXFQYXJhbXNdID0gaXNFbXB0eShyZXFQYXJhbXMpID8gbnVsbCA6IHJlcVBhcmFtcztcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMud2l0aEh0dHBDb25maWddID0gYmluZCh3aXRoSHR0cENvbmZpZywgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBsYWluXSA9IGJpbmQoc3RyaXBSZXN0YW5ndWxhciwgZWxlbSwgZWxlbSk7XG5cbiAgICAgICAgLy8gVGFnIGVsZW1lbnQgYXMgcmVzdGFuZ3VsYXJpemVkXG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyaXplZF0gPSB0cnVlO1xuXG4gICAgICAgIC8vIFJlcXVlc3RMZXNzIGNvbm5lY3Rpb25cbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMub25lXSA9IGJpbmQob25lLCBlbGVtLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuYWxsXSA9IGJpbmQoYWxsLCBlbGVtLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2V2ZXJhbF0gPSBiaW5kKHNldmVyYWwsIGVsZW0sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5vbmVVcmxdID0gYmluZChvbmVVcmwsIGVsZW0sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5hbGxVcmxdID0gYmluZChhbGxVcmwsIGVsZW0sIGVsZW0pO1xuXG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmZyb21TZXJ2ZXJdID0gISFmcm9tU2VydmVyO1xuXG4gICAgICAgIGlmIChwYXJlbnQgJiYgY29uZmlnLnNob3VsZFNhdmVQYXJlbnQocm91dGUpKSB7XG4gICAgICAgICAgY29uc3QgcGFyZW50SWQgPSBjb25maWcuZ2V0SWRGcm9tRWxlbShwYXJlbnQpO1xuICAgICAgICAgIGNvbnN0IHBhcmVudFVybCA9IGNvbmZpZy5nZXRVcmxGcm9tRWxlbShwYXJlbnQpO1xuXG4gICAgICAgICAgY29uc3QgcmVzdGFuZ3VsYXJGaWVsZHNGb3JQYXJlbnQgPSB1bmlvbihcbiAgICAgICAgICAgIHZhbHVlcyhwaWNrKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcywgWydyb3V0ZScsICdzaW5nbGVPbmUnLCAncGFyZW50UmVzb3VyY2UnXSkpLFxuICAgICAgICAgICAgY29uZmlnLmV4dHJhRmllbGRzXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBwYXJlbnRSZXNvdXJjZSA9IHBpY2socGFyZW50LCByZXN0YW5ndWxhckZpZWxkc0ZvclBhcmVudCk7XG5cbiAgICAgICAgICBpZiAoY29uZmlnLmlzVmFsaWRJZChwYXJlbnRJZCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5zZXRJZFRvRWxlbShwYXJlbnRSZXNvdXJjZSwgcGFyZW50SWQsIHJvdXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvbmZpZy5pc1ZhbGlkSWQocGFyZW50VXJsKSkge1xuICAgICAgICAgICAgY29uZmlnLnNldFVybFRvRWxlbShwYXJlbnRSZXNvdXJjZSwgcGFyZW50VXJsLCByb3V0ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGFyZW50UmVzb3VyY2VdID0gcGFyZW50UmVzb3VyY2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGFyZW50UmVzb3VyY2VdID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25lKHBhcmVudCwgcm91dGUsIGlkLCBzaW5nbGVPbmUpIHtcbiAgICAgICAgbGV0IGVycm9yO1xuICAgICAgICBpZiAoaXNOdW1iZXIocm91dGUpIHx8IGlzTnVtYmVyKHBhcmVudCkpIHtcbiAgICAgICAgICBlcnJvciA9ICdZb3VcXCdyZSBjcmVhdGluZyBhIFJlc3Rhbmd1bGFyIGVudGl0eSB3aXRoIHRoZSBudW1iZXIgJztcbiAgICAgICAgICBlcnJvciArPSAnaW5zdGVhZCBvZiB0aGUgcm91dGUgb3IgdGhlIHBhcmVudC4gRm9yIGV4YW1wbGUsIHlvdSBjYW5cXCd0IGNhbGwgLm9uZSgxMikuJztcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1VuZGVmaW5lZChyb3V0ZSkpIHtcbiAgICAgICAgICBlcnJvciA9ICdZb3VcXCdyZSBjcmVhdGluZyBhIFJlc3Rhbmd1bGFyIGVudGl0eSBlaXRoZXIgd2l0aG91dCB0aGUgcGF0aC4gJztcbiAgICAgICAgICBlcnJvciArPSAnRm9yIGV4YW1wbGUgeW91IGNhblxcJ3QgY2FsbCAub25lKCkuIFBsZWFzZSBjaGVjayBpZiB5b3VyIGFyZ3VtZW50cyBhcmUgdmFsaWQuJztcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsZW0gPSB7fTtcbiAgICAgICAgY29uZmlnLnNldElkVG9FbGVtKGVsZW0sIGlkLCByb3V0ZSk7XG4gICAgICAgIGNvbmZpZy5zZXRGaWVsZFRvRWxlbShjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2luZ2xlT25lLCBlbGVtLCBzaW5nbGVPbmUpO1xuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVFbGVtKHBhcmVudCwgZWxlbSwgcm91dGUsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWxsKHBhcmVudCwgcm91dGUpIHtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIFtdLCByb3V0ZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXZlcmFsKHBhcmVudCwgcm91dGUgLyosIGlkcyAqLykge1xuICAgICAgICBjb25zdCBjb2xsZWN0aW9uID0gW107XG4gICAgICAgIGNvbGxlY3Rpb25bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmlkc10gPSBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGNvbGxlY3Rpb24sIHJvdXRlLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uZVVybChwYXJlbnQsIHJvdXRlLCB1cmwpIHtcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUm91dGUgaXMgbWFuZGF0b3J5IHdoZW4gY3JlYXRpbmcgbmV3IFJlc3Rhbmd1bGFyIG9iamVjdHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxlbSA9IHt9O1xuICAgICAgICBjb25maWcuc2V0VXJsVG9FbGVtKGVsZW0sIHVybCwgcm91dGUpO1xuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVFbGVtKHBhcmVudCwgZWxlbSwgcm91dGUsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWxsVXJsKHBhcmVudCwgcm91dGUsIHVybCkge1xuICAgICAgICBpZiAoIXJvdXRlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSb3V0ZSBpcyBtYW5kYXRvcnkgd2hlbiBjcmVhdGluZyBuZXcgUmVzdGFuZ3VsYXIgb2JqZWN0cy4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbGVtID0ge307XG4gICAgICAgIGNvbmZpZy5zZXRVcmxUb0VsZW0oZWxlbSwgdXJsLCByb3V0ZSk7XG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb24ocGFyZW50LCBlbGVtLCByb3V0ZSwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcm9taXNlc1xuICAgICAgZnVuY3Rpb24gcmVzdGFuZ3VsYXJpemVSZXNwb25zZShzdWJqZWN0LCBpc0NvbGxlY3Rpb24sIHZhbHVlVG9GaWxsKSB7XG4gICAgICAgIHJldHVybiBzdWJqZWN0LnBpcGUoZmlsdGVyKHJlcyA9PiAhIXJlcykpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXNvbHZlUHJvbWlzZShzdWJqZWN0LCByZXNwb25zZSwgZGF0YSwgZmlsbGVkVmFsdWUpIHtcbiAgICAgICAgZXh0ZW5kKGZpbGxlZFZhbHVlLCBkYXRhKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIHRoZSBmdWxsIHJlc3BvbnNlIGludGVyY2VwdG9yLlxuICAgICAgICBpZiAoY29uZmlnLmZ1bGxSZXNwb25zZSkge1xuICAgICAgICAgIHN1YmplY3QubmV4dChleHRlbmQocmVzcG9uc2UsIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3ViamVjdC5uZXh0KGRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbGVtZW50c1xuICAgICAgZnVuY3Rpb24gc3RyaXBSZXN0YW5ndWxhcihlbGVtKSB7XG4gICAgICAgIGlmIChpc0FycmF5KGVsZW0pKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICAgICAgICBlYWNoKGVsZW0sIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgYXJyYXkucHVzaChjb25maWcuaXNSZXN0YW5ndWxhcml6ZWQodmFsdWUpID8gc3RyaXBSZXN0YW5ndWxhcih2YWx1ZSkgOiB2YWx1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvbWl0KGVsZW0sIHZhbHVlcyhvbWl0KGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcywgJ2lkJykpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRDdXN0b21PcGVyYXRpb24oZWxlbSkge1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jdXN0b21PcGVyYXRpb25dID0gYmluZChjdXN0b21GdW5jdGlvbiwgZWxlbSk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RNZXRob2RzID0ge2dldDogY3VzdG9tRnVuY3Rpb24sIGRlbGV0ZTogY3VzdG9tRnVuY3Rpb259O1xuICAgICAgICBlYWNoKFsncHV0JywgJ3BhdGNoJywgJ3Bvc3QnXSwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICByZXF1ZXN0TWV0aG9kc1tuYW1lXSA9IGZ1bmN0aW9uIChvcGVyYXRpb24sIGVsZW1lbnQsIHBhdGgsIHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICAgICAgcmV0dXJuIGJpbmQoY3VzdG9tRnVuY3Rpb24sIHRoaXMpKG9wZXJhdGlvbiwgcGF0aCwgcGFyYW1zLCBoZWFkZXJzLCBlbGVtZW50KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgZWFjaChyZXF1ZXN0TWV0aG9kcywgZnVuY3Rpb24gKHJlcXVlc3RGdW5jLCBuYW1lKSB7XG4gICAgICAgICAgY29uc3QgY2FsbE9wZXJhdGlvbiA9IG5hbWUgPT09ICdkZWxldGUnID8gJ3JlbW92ZScgOiBuYW1lO1xuICAgICAgICAgIGVhY2goWydkbycsICdjdXN0b20nXSwgZnVuY3Rpb24gKGFsaWFzKSB7XG4gICAgICAgICAgICBlbGVtW2FsaWFzICsgbmFtZS50b1VwcGVyQ2FzZSgpXSA9IGJpbmQocmVxdWVzdEZ1bmMsIGVsZW0sIGNhbGxPcGVyYXRpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuY3VzdG9tR0VUTElTVF0gPSBiaW5kKGZldGNoRnVuY3Rpb24sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5kb0dFVExJU1RdID0gZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuY3VzdG9tR0VUTElTVF07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGNvcHlSZXN0YW5ndWxhcml6ZWRFbGVtZW50KGZyb21FbGVtZW50LCB0b0VsZW1lbnQgPSB7fSkge1xuICAgICAgICBjb25zdCBjb3BpZWRFbGVtZW50ID0gYXNzaWduKHRvRWxlbWVudCwgZnJvbUVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVFbGVtKGNvcGllZEVsZW1lbnRbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSxcbiAgICAgICAgICBjb3BpZWRFbGVtZW50LCBjb3BpZWRFbGVtZW50W2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV0sIHRydWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXN0YW5ndWxhcml6ZUVsZW0ocGFyZW50LCBlbGVtZW50LCByb3V0ZSwgZnJvbVNlcnZlcj8sIGNvbGxlY3Rpb24/LCByZXFQYXJhbXM/KSB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBjb25maWcub25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkKGVsZW1lbnQsIGZhbHNlLCByb3V0ZSk7XG5cbiAgICAgICAgY29uc3QgbG9jYWxFbGVtID0gcmVzdGFuZ3VsYXJpemVCYXNlKHBhcmVudCwgZWxlbSwgcm91dGUsIHJlcVBhcmFtcywgZnJvbVNlcnZlcik7XG5cbiAgICAgICAgaWYgKGNvbmZpZy51c2VDYW5ub25pY2FsSWQpIHtcbiAgICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmNhbm5vbmljYWxJZF0gPSBjb25maWcuZ2V0SWRGcm9tRWxlbShsb2NhbEVsZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldFBhcmVudExpc3RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSA9IGZhbHNlO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldF0gPSBiaW5kKGdldEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldExpc3RdID0gYmluZChmZXRjaEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnB1dF0gPSBiaW5kKHB1dEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBvc3RdID0gYmluZChwb3N0RnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVtb3ZlXSA9IGJpbmQoZGVsZXRlRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaGVhZF0gPSBiaW5kKGhlYWRGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy50cmFjZV0gPSBiaW5kKHRyYWNlRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMub3B0aW9uc10gPSBiaW5kKG9wdGlvbnNGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXRjaF0gPSBiaW5kKHBhdGNoRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2F2ZV0gPSBiaW5kKHNhdmUsIGxvY2FsRWxlbSk7XG5cbiAgICAgICAgYWRkQ3VzdG9tT3BlcmF0aW9uKGxvY2FsRWxlbSk7XG4gICAgICAgIHJldHVybiBjb25maWcudHJhbnNmb3JtRWxlbShsb2NhbEVsZW0sIGZhbHNlLCByb3V0ZSwgc2VydmljZSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGVsZW1lbnQsIHJvdXRlLCBmcm9tU2VydmVyPywgcmVxUGFyYW1zPykge1xuICAgICAgICBjb25zdCBlbGVtID0gY29uZmlnLm9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZChlbGVtZW50LCB0cnVlLCByb3V0ZSk7XG5cbiAgICAgICAgY29uc3QgbG9jYWxFbGVtID0gcmVzdGFuZ3VsYXJpemVCYXNlKHBhcmVudCwgZWxlbSwgcm91dGUsIHJlcVBhcmFtcywgZnJvbVNlcnZlcik7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSA9IHRydWU7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucG9zdF0gPSBiaW5kKHBvc3RGdW5jdGlvbiwgbG9jYWxFbGVtLCBudWxsKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZW1vdmVdID0gYmluZChkZWxldGVGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5oZWFkXSA9IGJpbmQoaGVhZEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnRyYWNlXSA9IGJpbmQodHJhY2VGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wdXRFbGVtZW50XSA9IGJpbmQocHV0RWxlbWVudEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLm9wdGlvbnNdID0gYmluZChvcHRpb25zRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGF0Y2hdID0gYmluZChwYXRjaEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldF0gPSBiaW5kKGdldEJ5SWQsIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0TGlzdF0gPSBiaW5kKGZldGNoRnVuY3Rpb24sIGxvY2FsRWxlbSwgbnVsbCk7XG5cbiAgICAgICAgYWRkQ3VzdG9tT3BlcmF0aW9uKGxvY2FsRWxlbSk7XG4gICAgICAgIHJldHVybiBjb25maWcudHJhbnNmb3JtRWxlbShsb2NhbEVsZW0sIHRydWUsIHJvdXRlLCBzZXJ2aWNlLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uQW5kRWxlbWVudHMocGFyZW50LCBlbGVtZW50LCByb3V0ZSkge1xuICAgICAgICBjb25zdCBjb2xsZWN0aW9uID0gcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uKHBhcmVudCwgZWxlbWVudCwgcm91dGUsIGZhbHNlKTtcbiAgICAgICAgZWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgICAgICByZXN0YW5ndWxhcml6ZUVsZW0ocGFyZW50LCBlbGVtLCByb3V0ZSwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRCeUlkKGlkLCByZXFQYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tR0VUKGlkLnRvU3RyaW5nKCksIHJlcVBhcmFtcywgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHB1dEVsZW1lbnRGdW5jdGlvbihpZHgsIHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICBjb25zdCBfX3RoaXMgPSB0aGlzO1xuICAgICAgICBjb25zdCBlbGVtVG9QdXQgPSB0aGlzW2lkeF07XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgICAgICBsZXQgZmlsbGVkQXJyYXkgPSBbXTtcbiAgICAgICAgZmlsbGVkQXJyYXkgPSBjb25maWcudHJhbnNmb3JtRWxlbShmaWxsZWRBcnJheSwgdHJ1ZSwgZWxlbVRvUHV0W2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV0sIHNlcnZpY2UpO1xuXG4gICAgICAgIGVsZW1Ub1B1dC5wdXQocGFyYW1zLCBoZWFkZXJzKVxuICAgICAgICAuc3Vic2NyaWJlKGZ1bmN0aW9uIChzZXJ2ZXJFbGVtKSB7XG4gICAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBjb3B5UmVzdGFuZ3VsYXJpemVkRWxlbWVudChfX3RoaXMpO1xuICAgICAgICAgIG5ld0FycmF5W2lkeF0gPSBzZXJ2ZXJFbGVtO1xuICAgICAgICAgIGZpbGxlZEFycmF5ID0gbmV3QXJyYXk7XG4gICAgICAgICAgc3ViamVjdC5uZXh0KG5ld0FycmF5KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgc3ViamVjdC5lcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZVJlc3BvbnNlKHN1YmplY3QsIHRydWUsIGZpbGxlZEFycmF5KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcGFyc2VSZXNwb25zZShyZXNEYXRhLCBvcGVyYXRpb24sIHJvdXRlLCBmZXRjaFVybCwgcmVzcG9uc2UsIHN1YmplY3QpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGNvbmZpZy5yZXNwb25zZUV4dHJhY3RvcihyZXNEYXRhLCBvcGVyYXRpb24sIHJvdXRlLCBmZXRjaFVybCwgcmVzcG9uc2UsIHN1YmplY3QpO1xuICAgICAgICBjb25zdCBldGFnID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0VUYWcnKTtcbiAgICAgICAgaWYgKGRhdGEgJiYgZXRhZykge1xuICAgICAgICAgIGRhdGFbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmV0YWddID0gZXRhZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZmV0Y2hGdW5jdGlvbih3aGF0LCByZXFQYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgY29uc3QgX190aGlzID0gdGhpcztcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gICAgICAgIGNvbnN0IG9wZXJhdGlvbiA9ICdnZXRMaXN0JztcbiAgICAgICAgY29uc3QgdXJsID0gdXJsSGFuZGxlci5mZXRjaFVybCh0aGlzLCB3aGF0KTtcbiAgICAgICAgY29uc3Qgd2hhdEZldGNoZWQgPSB3aGF0IHx8IF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdO1xuXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBjb25maWcuZnVsbFJlcXVlc3RJbnRlcmNlcHRvcihudWxsLCBvcGVyYXRpb24sXG4gICAgICAgICAgd2hhdEZldGNoZWQsIHVybCwgaGVhZGVycyB8fCB7fSwgcmVxUGFyYW1zIHx8IHt9LCB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5odHRwQ29uZmlnXSB8fCB7fSk7XG5cbiAgICAgICAgbGV0IGZpbGxlZEFycmF5ID0gW107XG4gICAgICAgIGZpbGxlZEFycmF5ID0gY29uZmlnLnRyYW5zZm9ybUVsZW0oZmlsbGVkQXJyYXksIHRydWUsIHdoYXRGZXRjaGVkLCBzZXJ2aWNlKTtcblxuICAgICAgICBsZXQgbWV0aG9kID0gJ2dldExpc3QnO1xuXG4gICAgICAgIGlmIChjb25maWcuanNvbnApIHtcbiAgICAgICAgICBtZXRob2QgPSAnanNvbnAnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2tDYWxsYmFjayA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIGNvbnN0IHJlc0RhdGEgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgIGNvbnN0IGZ1bGxQYXJhbXMgPSByZXNwb25zZS5jb25maWcucGFyYW1zO1xuICAgICAgICAgIGxldCBkYXRhID0gcGFyc2VSZXNwb25zZShyZXNEYXRhLCBvcGVyYXRpb24sIHdoYXRGZXRjaGVkLCB1cmwsIHJlc3BvbnNlLCBzdWJqZWN0KTtcblxuICAgICAgICAgIC8vIHN1cHBvcnQgZW1wdHkgcmVzcG9uc2UgZm9yIGdldExpc3QoKSBjYWxscyAoc29tZSBBUElzIHJlc3BvbmQgd2l0aCAyMDQgYW5kIGVtcHR5IGJvZHkpXG4gICAgICAgICAgaWYgKGlzVW5kZWZpbmVkKGRhdGEpIHx8ICcnID09PSBkYXRhKSB7XG4gICAgICAgICAgICBkYXRhID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXNwb25zZSBmb3IgZ2V0TGlzdCBTSE9VTEQgYmUgYW4gYXJyYXkgYW5kIG5vdCBhbiBvYmplY3Qgb3Igc29tZXRoaW5nIGVsc2UnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHJ1ZSA9PT0gY29uZmlnLnBsYWluQnlEZWZhdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZVByb21pc2Uoc3ViamVjdCwgcmVzcG9uc2UsIGRhdGEsIGZpbGxlZEFycmF5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgcHJvY2Vzc2VkRGF0YSA9IG1hcChkYXRhLCBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICAgICAgaWYgKCFfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShfX3RoaXMsIGVsZW0sIHdoYXQsIHRydWUsIGRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSxcbiAgICAgICAgICAgICAgICBlbGVtLCBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXSwgdHJ1ZSwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwcm9jZXNzZWREYXRhID0gZXh0ZW5kKGRhdGEsIHByb2Nlc3NlZERhdGEpO1xuXG4gICAgICAgICAgaWYgKCFfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKFxuICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgICAgcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uKFxuICAgICAgICAgICAgICAgIF9fdGhpcyxcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWREYXRhLFxuICAgICAgICAgICAgICAgIHdoYXQsXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICBmdWxsUGFyYW1zXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGZpbGxlZEFycmF5XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlUHJvbWlzZShcbiAgICAgICAgICAgICAgc3ViamVjdCxcbiAgICAgICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgICAgIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihcbiAgICAgICAgICAgICAgICBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSxcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWREYXRhLFxuICAgICAgICAgICAgICAgIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdLFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgZnVsbFBhcmFtc1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBmaWxsZWRBcnJheVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdXJsSGFuZGxlci5yZXNvdXJjZSh0aGlzLCAkaHR0cCwgcmVxdWVzdC5odHRwQ29uZmlnLCByZXF1ZXN0LmhlYWRlcnMsIHJlcXVlc3QucGFyYW1zLCB3aGF0LFxuICAgICAgICAgIHRoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmV0YWddLCBvcGVyYXRpb24pW21ldGhvZF0oKVxuICAgICAgICAuc3Vic2NyaWJlKG9rQ2FsbGJhY2ssIGZ1bmN0aW9uIGVycm9yKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMzA0ICYmIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSkge1xuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2Uoc3ViamVjdCwgcmVzcG9uc2UsIF9fdGhpcywgZmlsbGVkQXJyYXkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlcnkoY29uZmlnLmVycm9ySW50ZXJjZXB0b3JzLCBmdW5jdGlvbiAoY2I6IGFueSkge1xuXG4gICAgICAgICAgICByZXR1cm4gY2IocmVzcG9uc2UsIHN1YmplY3QsIG9rQ2FsbGJhY2spICE9PSBmYWxzZTtcbiAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgLy8gdHJpZ2dlcmVkIGlmIG5vIGNhbGxiYWNrIHJldHVybnMgZmFsc2VcbiAgICAgICAgICAgIHN1YmplY3QuZXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplUmVzcG9uc2Uoc3ViamVjdCwgdHJ1ZSwgZmlsbGVkQXJyYXkpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB3aXRoSHR0cENvbmZpZyhodHRwQ29uZmlnKSB7XG4gICAgICAgIHRoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmh0dHBDb25maWddID0gaHR0cENvbmZpZztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNhdmUocGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIGlmICh0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5mcm9tU2VydmVyXSkge1xuICAgICAgICAgIHJldHVybiB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wdXRdKHBhcmFtcywgaGVhZGVycyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgncG9zdCcsIHVuZGVmaW5lZCwgcGFyYW1zLCB1bmRlZmluZWQsIGhlYWRlcnMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGVsZW1GdW5jdGlvbihvcGVyYXRpb24sIHdoYXQsIHBhcmFtcywgb2JqLCBoZWFkZXJzKSB7XG4gICAgICAgIGNvbnN0IF9fdGhpcyA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgICAgICBjb25zdCByZXNQYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgICAgIGNvbnN0IHJvdXRlID0gd2hhdCB8fCB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV07XG4gICAgICAgIGNvbnN0IGZldGNoVXJsID0gdXJsSGFuZGxlci5mZXRjaFVybCh0aGlzLCB3aGF0KTtcblxuICAgICAgICBsZXQgY2FsbE9iaiA9IG9iaiB8fCB0aGlzO1xuICAgICAgICAvLyBmYWxsYmFjayB0byBldGFnIG9uIHJlc3Rhbmd1bGFyIG9iamVjdCAoc2luY2UgZm9yIGN1c3RvbSBtZXRob2RzIHdlIHByb2JhYmx5IGRvbid0IGV4cGxpY2l0bHkgc3BlY2lmeSB0aGUgZXRhZyBmaWVsZClcbiAgICAgICAgY29uc3QgZXRhZyA9IGNhbGxPYmpbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmV0YWddIHx8IChvcGVyYXRpb24gIT09ICdwb3N0JyA/IHRoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmV0YWddIDogbnVsbCk7XG5cbiAgICAgICAgaWYgKGlzT2JqZWN0KGNhbGxPYmopICYmIGNvbmZpZy5pc1Jlc3Rhbmd1bGFyaXplZChjYWxsT2JqKSkge1xuICAgICAgICAgIGNhbGxPYmogPSBzdHJpcFJlc3Rhbmd1bGFyKGNhbGxPYmopO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBjb25maWcuZnVsbFJlcXVlc3RJbnRlcmNlcHRvcihcbiAgICAgICAgICBjYWxsT2JqLFxuICAgICAgICAgIG9wZXJhdGlvbixcbiAgICAgICAgICByb3V0ZSxcbiAgICAgICAgICBmZXRjaFVybCxcbiAgICAgICAgICBoZWFkZXJzIHx8IHt9LFxuICAgICAgICAgIHJlc1BhcmFtcyB8fCB7fSxcbiAgICAgICAgICB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5odHRwQ29uZmlnXSB8fCB7fVxuICAgICAgICApO1xuXG4gICAgICAgIGxldCBmaWxsZWRPYmplY3QgPSB7fTtcbiAgICAgICAgZmlsbGVkT2JqZWN0ID0gY29uZmlnLnRyYW5zZm9ybUVsZW0oZmlsbGVkT2JqZWN0LCBmYWxzZSwgcm91dGUsIHNlcnZpY2UpO1xuXG4gICAgICAgIGNvbnN0IG9rQ2FsbGJhY2sgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICBjb25zdCByZXNEYXRhID0gZ2V0KHJlc3BvbnNlLCAnYm9keScpO1xuICAgICAgICAgIGNvbnN0IGZ1bGxQYXJhbXMgPSBnZXQocmVzcG9uc2UsICdjb25maWcucGFyYW1zJyk7XG5cbiAgICAgICAgICBjb25zdCBlbGVtID0gcGFyc2VSZXNwb25zZShyZXNEYXRhLCBvcGVyYXRpb24sIHJvdXRlLCBmZXRjaFVybCwgcmVzcG9uc2UsIHN1YmplY3QpO1xuXG4gICAgICAgICAgaWYgKGVsZW0pIHtcbiAgICAgICAgICAgIGxldCBkYXRhO1xuICAgICAgICAgICAgaWYgKHRydWUgPT09IGNvbmZpZy5wbGFpbkJ5RGVmYXVsdCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZVByb21pc2Uoc3ViamVjdCwgcmVzcG9uc2UsIGVsZW0sIGZpbGxlZE9iamVjdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvcGVyYXRpb24gPT09ICdwb3N0JyAmJiAhX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXN0YW5ndWxhckNvbGxlY3Rpb25dKSB7XG4gICAgICAgICAgICAgIGRhdGEgPSByZXN0YW5ndWxhcml6ZUVsZW0oXG4gICAgICAgICAgICAgICAgX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXJlbnRSZXNvdXJjZV0sXG4gICAgICAgICAgICAgICAgZWxlbSxcbiAgICAgICAgICAgICAgICByb3V0ZSxcbiAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgZnVsbFBhcmFtc1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXNvbHZlUHJvbWlzZShzdWJqZWN0LCByZXNwb25zZSwgZGF0YSwgZmlsbGVkT2JqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRhdGEgPSByZXN0YW5ndWxhcml6ZUVsZW0oXG4gICAgICAgICAgICAgICAgX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXJlbnRSZXNvdXJjZV0sXG4gICAgICAgICAgICAgICAgZWxlbSxcbiAgICAgICAgICAgICAgICBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXSxcbiAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgZnVsbFBhcmFtc1xuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIGRhdGFbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnNpbmdsZU9uZV0gPSBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnNpbmdsZU9uZV07XG4gICAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKHN1YmplY3QsIHJlc3BvbnNlLCBkYXRhLCBmaWxsZWRPYmplY3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKHN1YmplY3QsIHJlc3BvbnNlLCB1bmRlZmluZWQsIGZpbGxlZE9iamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGVycm9yQ2FsbGJhY2sgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAzMDQgJiYgY29uZmlnLmlzU2FmZShvcGVyYXRpb24pKSB7XG4gICAgICAgICAgICByZXNvbHZlUHJvbWlzZShzdWJqZWN0LCByZXNwb25zZSwgX190aGlzLCBmaWxsZWRPYmplY3QpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlcnkoY29uZmlnLmVycm9ySW50ZXJjZXB0b3JzLCBmdW5jdGlvbiAoY2I6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIGNiKHJlc3BvbnNlLCBzdWJqZWN0LCBva0NhbGxiYWNrKSAhPT0gZmFsc2U7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIC8vIHRyaWdnZXJlZCBpZiBubyBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gICAgICAgICAgICBzdWJqZWN0LmVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIE92ZXJyaWRpbmcgSFRUUCBNZXRob2RcbiAgICAgICAgbGV0IGNhbGxPcGVyYXRpb24gPSBvcGVyYXRpb247XG4gICAgICAgIGxldCBjYWxsSGVhZGVycyA9IGV4dGVuZCh7fSwgcmVxdWVzdC5oZWFkZXJzKTtcbiAgICAgICAgY29uc3QgaXNPdmVycmlkZU9wZXJhdGlvbiA9IGNvbmZpZy5pc092ZXJyaWRlbk1ldGhvZChvcGVyYXRpb24pO1xuICAgICAgICBpZiAoaXNPdmVycmlkZU9wZXJhdGlvbikge1xuICAgICAgICAgIGNhbGxPcGVyYXRpb24gPSAncG9zdCc7XG4gICAgICAgICAgY2FsbEhlYWRlcnMgPSBleHRlbmQoY2FsbEhlYWRlcnMsIHsnWC1IVFRQLU1ldGhvZC1PdmVycmlkZSc6IG9wZXJhdGlvbiA9PT0gJ3JlbW92ZScgPyAnREVMRVRFJyA6IG9wZXJhdGlvbi50b1VwcGVyQ2FzZSgpfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmpzb25wICYmIGNhbGxPcGVyYXRpb24gPT09ICdnZXQnKSB7XG4gICAgICAgICAgY2FsbE9wZXJhdGlvbiA9ICdqc29ucCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLmlzU2FmZShvcGVyYXRpb24pKSB7XG4gICAgICAgICAgaWYgKGlzT3ZlcnJpZGVPcGVyYXRpb24pIHtcbiAgICAgICAgICAgIHVybEhhbmRsZXIucmVzb3VyY2UodGhpcywgJGh0dHAsIHJlcXVlc3QuaHR0cENvbmZpZywgY2FsbEhlYWRlcnMsIHJlcXVlc3QucGFyYW1zLFxuICAgICAgICAgICAgICB3aGF0LCBldGFnLCBjYWxsT3BlcmF0aW9uKVtjYWxsT3BlcmF0aW9uXSh7fSkuc3Vic2NyaWJlKG9rQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmxIYW5kbGVyLnJlc291cmNlKHRoaXMsICRodHRwLCByZXF1ZXN0Lmh0dHBDb25maWcsIGNhbGxIZWFkZXJzLCByZXF1ZXN0LnBhcmFtcyxcbiAgICAgICAgICAgICAgd2hhdCwgZXRhZywgY2FsbE9wZXJhdGlvbilbY2FsbE9wZXJhdGlvbl0oKS5zdWJzY3JpYmUob2tDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybEhhbmRsZXIucmVzb3VyY2UodGhpcywgJGh0dHAsIHJlcXVlc3QuaHR0cENvbmZpZywgY2FsbEhlYWRlcnMsIHJlcXVlc3QucGFyYW1zLFxuICAgICAgICAgICAgd2hhdCwgZXRhZywgY2FsbE9wZXJhdGlvbilbY2FsbE9wZXJhdGlvbl0ocmVxdWVzdC5lbGVtZW50KS5zdWJzY3JpYmUob2tDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVSZXNwb25zZShzdWJqZWN0LCBmYWxzZSwgZmlsbGVkT2JqZWN0KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0RnVuY3Rpb24ocGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ2dldCcsIHVuZGVmaW5lZCwgcGFyYW1zLCB1bmRlZmluZWQsIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBkZWxldGVGdW5jdGlvbihwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgncmVtb3ZlJywgdW5kZWZpbmVkLCBwYXJhbXMsIHVuZGVmaW5lZCwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHB1dEZ1bmN0aW9uKHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCdwdXQnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcG9zdEZ1bmN0aW9uKHdoYXQsIGVsZW0sIHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCdwb3N0Jywgd2hhdCwgcGFyYW1zLCBlbGVtLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gaGVhZEZ1bmN0aW9uKHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCdoZWFkJywgdW5kZWZpbmVkLCBwYXJhbXMsIHVuZGVmaW5lZCwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHRyYWNlRnVuY3Rpb24ocGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBiaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ3RyYWNlJywgdW5kZWZpbmVkLCBwYXJhbXMsIHVuZGVmaW5lZCwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9wdGlvbnNGdW5jdGlvbihwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgnb3B0aW9ucycsIHVuZGVmaW5lZCwgcGFyYW1zLCB1bmRlZmluZWQsIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBwYXRjaEZ1bmN0aW9uKGVsZW0sIHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCdwYXRjaCcsIHVuZGVmaW5lZCwgcGFyYW1zLCBlbGVtLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY3VzdG9tRnVuY3Rpb24ob3BlcmF0aW9uLCBwYXRoLCBwYXJhbXMsIGhlYWRlcnMsIGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIGJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKShvcGVyYXRpb24sIHBhdGgsIHBhcmFtcywgZWxlbSwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZFJlc3Rhbmd1bGFyTWV0aG9kRnVuY3Rpb24obmFtZSwgb3BlcmF0aW9uLCBwYXRoLCBkZWZhdWx0UGFyYW1zLCBkZWZhdWx0SGVhZGVycywgZGVmYXVsdEVsZW0pIHtcbiAgICAgICAgbGV0IGJpbmRlZEZ1bmN0aW9uO1xuICAgICAgICBpZiAob3BlcmF0aW9uID09PSAnZ2V0TGlzdCcpIHtcbiAgICAgICAgICBiaW5kZWRGdW5jdGlvbiA9IGJpbmQoZmV0Y2hGdW5jdGlvbiwgdGhpcywgcGF0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmluZGVkRnVuY3Rpb24gPSBiaW5kKGN1c3RvbUZ1bmN0aW9uLCB0aGlzLCBvcGVyYXRpb24sIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3JlYXRlZEZ1bmN0aW9uID0gZnVuY3Rpb24gKHBhcmFtcywgaGVhZGVycywgZWxlbSkge1xuICAgICAgICAgIGNvbnN0IGNhbGxQYXJhbXMgPSBkZWZhdWx0cyh7XG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICBlbGVtOiBlbGVtXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgcGFyYW1zOiBkZWZhdWx0UGFyYW1zLFxuICAgICAgICAgICAgaGVhZGVyczogZGVmYXVsdEhlYWRlcnMsXG4gICAgICAgICAgICBlbGVtOiBkZWZhdWx0RWxlbVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBiaW5kZWRGdW5jdGlvbihjYWxsUGFyYW1zLnBhcmFtcywgY2FsbFBhcmFtcy5oZWFkZXJzLCBjYWxsUGFyYW1zLmVsZW0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjb25maWcuaXNTYWZlKG9wZXJhdGlvbikpIHtcbiAgICAgICAgICB0aGlzW25hbWVdID0gY3JlYXRlZEZ1bmN0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXNbbmFtZV0gPSBmdW5jdGlvbiAoZWxlbSwgcGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlZEZ1bmN0aW9uKHBhcmFtcywgaGVhZGVycywgZWxlbSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB3aXRoQ29uZmlndXJhdGlvbkZ1bmN0aW9uKGNvbmZpZ3VyZXIpIHtcbiAgICAgICAgY29uc3QgbmV3Q29uZmlnID0gY2xvbmUob21pdChjb25maWcsICdjb25maWd1cmF0aW9uJykpO1xuICAgICAgICBSZXN0YW5ndWxhckNvbmZpZ3VyZXIobmV3Q29uZmlnLCBuZXdDb25maWcpO1xuICAgICAgICBjb25maWd1cmVyKG5ld0NvbmZpZyk7XG4gICAgICAgIHJldHVybiBjcmVhdGVTZXJ2aWNlRm9yQ29uZmlndXJhdGlvbihuZXdDb25maWcpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0b1NlcnZpY2Uocm91dGUsIHBhcmVudCkge1xuICAgICAgICBjb25zdCBrbm93bkNvbGxlY3Rpb25NZXRob2RzID0gdmFsdWVzKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcyk7XG4gICAgICAgIGNvbnN0IHNlcnY6IGFueSA9IHt9O1xuICAgICAgICBjb25zdCBjb2xsZWN0aW9uID0gKHBhcmVudCB8fCBzZXJ2aWNlKS5hbGwocm91dGUpO1xuICAgICAgICBzZXJ2Lm9uZSA9IGJpbmQob25lLCAocGFyZW50IHx8IHNlcnZpY2UpLCBwYXJlbnQsIHJvdXRlKTtcbiAgICAgICAgc2Vydi5hbGwgPSBiaW5kKGNvbGxlY3Rpb24uYWxsLCBjb2xsZWN0aW9uKTtcbiAgICAgICAgc2Vydi5wb3N0ID0gYmluZChjb2xsZWN0aW9uLnBvc3QsIGNvbGxlY3Rpb24pO1xuICAgICAgICBzZXJ2LmdldExpc3QgPSBiaW5kKGNvbGxlY3Rpb24uZ2V0TGlzdCwgY29sbGVjdGlvbik7XG4gICAgICAgIHNlcnYud2l0aEh0dHBDb25maWcgPSBiaW5kKGNvbGxlY3Rpb24ud2l0aEh0dHBDb25maWcsIGNvbGxlY3Rpb24pO1xuICAgICAgICBzZXJ2LmdldCA9IGJpbmQoY29sbGVjdGlvbi5nZXQsIGNvbGxlY3Rpb24pO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgaWYgKGNvbGxlY3Rpb24uaGFzT3duUHJvcGVydHkocHJvcCkgJiYgaXNGdW5jdGlvbihjb2xsZWN0aW9uW3Byb3BdKSAmJiAhaW5jbHVkZXMoa25vd25Db2xsZWN0aW9uTWV0aG9kcywgcHJvcCkpIHtcbiAgICAgICAgICAgIHNlcnZbcHJvcF0gPSBiaW5kKGNvbGxlY3Rpb25bcHJvcF0sIGNvbGxlY3Rpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZXJ2O1xuICAgICAgfVxuXG4gICAgICBSZXN0YW5ndWxhckNvbmZpZ3VyZXIoc2VydmljZSwgY29uZmlnKTtcblxuICAgICAgc2VydmljZS5jb3B5ID0gYmluZChjb3B5UmVzdGFuZ3VsYXJpemVkRWxlbWVudCwgc2VydmljZSk7XG5cbiAgICAgIHNlcnZpY2Uuc2VydmljZSA9IGJpbmQodG9TZXJ2aWNlLCBzZXJ2aWNlKTtcblxuICAgICAgc2VydmljZS53aXRoQ29uZmlnID0gYmluZCh3aXRoQ29uZmlndXJhdGlvbkZ1bmN0aW9uLCBzZXJ2aWNlKTtcblxuICAgICAgc2VydmljZS5vbmUgPSBiaW5kKG9uZSwgc2VydmljZSwgbnVsbCk7XG5cbiAgICAgIHNlcnZpY2UuYWxsID0gYmluZChhbGwsIHNlcnZpY2UsIG51bGwpO1xuXG4gICAgICBzZXJ2aWNlLnNldmVyYWwgPSBiaW5kKHNldmVyYWwsIHNlcnZpY2UsIG51bGwpO1xuXG4gICAgICBzZXJ2aWNlLm9uZVVybCA9IGJpbmQob25lVXJsLCBzZXJ2aWNlLCBudWxsKTtcblxuICAgICAgc2VydmljZS5hbGxVcmwgPSBiaW5kKGFsbFVybCwgc2VydmljZSwgbnVsbCk7XG5cbiAgICAgIHNlcnZpY2Uuc3RyaXBSZXN0YW5ndWxhciA9IGJpbmQoc3RyaXBSZXN0YW5ndWxhciwgc2VydmljZSk7XG5cbiAgICAgIHNlcnZpY2UucmVzdGFuZ3VsYXJpemVFbGVtZW50ID0gYmluZChyZXN0YW5ndWxhcml6ZUVsZW0sIHNlcnZpY2UpO1xuXG4gICAgICBzZXJ2aWNlLnJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbiA9IGJpbmQocmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uQW5kRWxlbWVudHMsIHNlcnZpY2UpO1xuXG4gICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlU2VydmljZUZvckNvbmZpZ3VyYXRpb24oZ2xvYmFsQ29uZmlndXJhdGlvbik7XG4gIH1cblxufVxuIl19