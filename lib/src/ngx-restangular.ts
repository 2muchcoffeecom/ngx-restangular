import { Injectable, Inject, Injector, Optional } from '@angular/core';
import { assign } from 'core-js/fn/object';
import {
  map,
  bind,
  union,
  values,
  pick,
  isEmpty,
  isFunction,
  isNumber,
  isUndefined,
  isArray,
  isObject,
  extend,
  each,
  every,
  omit,
  get,
  defaults,
  clone,
  includes
} from 'lodash';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

import { RESTANGULAR } from './ngx-restangular.config';
import { RestangularHttp } from './ngx-restangular-http';
import { RestangularConfigurer } from './ngx-restangular-config.factory';

@Injectable()
export class Restangular {
  provider: {
    setBaseUrl: any,
    setDefaultHeaders: any,
    configuration: any,
    setSelfLinkAbsoluteUrl: any,
    setExtraFields: any,
    setDefaultHttpFields: any,
    setPlainByDefault: any,
    setEncodeIds: any,
    setDefaultRequestParams: any,
    requestParams: any,
    defaultHeaders: any,
    setDefaultResponseMethod: any,
    defaultResponseMethod: any,
    setMethodOverriders: any,
    setJsonp: any,
    setUrlCreator: any,
    setRestangularFields: any,
    setUseCannonicalId: any,
    addResponseInterceptor: any,
    addErrorInterceptor: any,
    setResponseInterceptor: any,
    setResponseExtractor: any,
    setErrorInterceptor: any,
    addRequestInterceptor: any,
    setRequestInterceptor: any,
    setFullRequestInterceptor: any,
    addFullRequestInterceptor: any,
    setOnBeforeElemRestangularized: any,
    setRestangularizePromiseInterceptor: any,
    setOnElemRestangularized: any,
    setParentless: any,
    setRequestSuffix: any,
    addElementTransformer: any,
    extendCollection: any,
    extendModel: any,
    setTransformOnlyServerElements: any,
    setFullResponse: any,
    $get: any
  };
  addElementTransformer: any;
  extendCollection: any;
  extendModel: any;
  copy;
  configuration;
  service;
  id;
  route;
  parentResource;
  restangularCollection;
  cannonicalId;
  etag;
  selfLink;
  get;
  getList;
  put;
  post;
  remove;
  head;
  trace;
  options;
  patch;
  getRestangularUrl;
  getRequestedUrl;
  putElement;
  addRestangularMethod;
  getParentList;
  clone;
  ids;
  httpConfig;
  reqParams;
  one;
  all;
  several;
  oneUrl;
  allUrl;
  customPUT;
  customPATCH;
  customPOST;
  customDELETE;
  customGET;
  customGETLIST;
  customOperation;
  doPUT;
  doPATCH;
  doPOST;
  doDELETE;
  doGET;
  doGETLIST;
  fromServer;
  withConfig;
  withHttpConfig;
  singleOne;
  plain;
  save;
  restangularized;
  restangularizeElement;
  restangularizeCollection;

  constructor(
    @Optional() @Inject(RESTANGULAR) public configObj,
    private injector: Injector,
    private http: RestangularHttp
  ) {
    this.provider = new providerConfig(http);
    let element = this.provider.$get();
    assign(this, element);

    this.setDefaultConfig();
  }

  setDefaultConfig() {
    if (!this.configObj || !isFunction(this.configObj.fn)) {
      return;
    }

    let arrDI = map(this.configObj.arrServices, (services) => {
      return this.injector.get(services);
    });

    this.configObj.fn(...[this.provider, ...arrDI]);
  }
}

function providerConfig($http) {
  var globalConfiguration = {};

  RestangularConfigurer(this, globalConfiguration);

  this.$get = $get

  function $get() {

    function createServiceForConfiguration(config) {
      var service: any = {};

      var urlHandler = new config.urlCreatorFactory[config.urlCreator]();
      urlHandler.setConfig(config);

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
          var parentId = config.getIdFromElem(parent);
          var parentUrl = config.getUrlFromElem(parent);

          var restangularFieldsForParent = union(
            values(pick(config.restangularFields, ['route', 'singleOne', 'parentResource'])),
            config.extraFields
          );
          var parentResource = pick(parent, restangularFieldsForParent);

          if (config.isValidId(parentId)) {
            config.setIdToElem(parentResource, parentId, route);
          }
          if (config.isValidId(parentUrl)) {
            config.setUrlToElem(parentResource, parentUrl, route);
          }

          elem[config.restangularFields.parentResource] = parentResource;
        } else {
          elem[config.restangularFields.parentResource] = null;
        }
        return elem;
      }

      function one(parent, route, id, singleOne) {
        var error;
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
        var elem = {};
        config.setIdToElem(elem, id, route);
        config.setFieldToElem(config.restangularFields.singleOne, elem, singleOne);
        return restangularizeElem(parent, elem, route, false);
      }

      function all(parent, route) {
        return restangularizeCollection(parent, [], route, false);
      }

      function several(parent, route /*, ids */) {
        var collection = [];
        collection[config.restangularFields.ids] = Array.prototype.splice.call(arguments, 2);
        return restangularizeCollection(parent, collection, route, false);
      }

      function oneUrl(parent, route, url) {
        if (!route) {
          throw new Error('Route is mandatory when creating new Restangular objects.');
        }
        var elem = {};
        config.setUrlToElem(elem, url, route);
        return restangularizeElem(parent, elem, route, false);
      }

      function allUrl(parent, route, url) {
        if (!route) {
          throw new Error('Route is mandatory when creating new Restangular objects.');
        }
        var elem = {};
        config.setUrlToElem(elem, url, route);
        return restangularizeCollection(parent, elem, route, false);
      }

      // Promises
      function restangularizeResponse(subject, isCollection, valueToFill) {
        return subject.filter(res => res);
      }

      function resolvePromise(subject, response, data, filledValue) {
        extend(filledValue, data);

        // Trigger the full response interceptor.
        if (config.fullResponse) {
          subject.next(extend(response, {
            data: data
          }));
        } else {
          subject.next(data);
        }

        subject.complete();
      }

      // Elements
      function stripRestangular(elem) {
        if (isArray(elem)) {
          var array = [];
          each(elem, function (value) {
            array.push(config.isRestangularized(value) ? stripRestangular(value) : value);
          });
          return array;
        } else {
          return omit(elem, values(omit(config.restangularFields, 'id')));
        }
      }

      function addCustomOperation(elem) {
        elem[config.restangularFields.customOperation] = bind(customFunction, elem);
        var requestMethods = {get: customFunction, delete: customFunction};
        each(['put', 'patch', 'post'], function (name) {
          requestMethods[name] = function (operation, elem, path, params, headers) {
            return bind(customFunction, this)(operation, path, params, headers, elem);
          };
        });
        each(requestMethods, function (requestFunc, name) {
          var callOperation = name === 'delete' ? 'remove' : name;
          each(['do', 'custom'], function (alias) {
            elem[alias + name.toUpperCase()] = bind(requestFunc, elem, callOperation);
          });
        });
        elem[config.restangularFields.customGETLIST] = bind(fetchFunction, elem);
        elem[config.restangularFields.doGETLIST] = elem[config.restangularFields.customGETLIST];
      }

      function copyRestangularizedElement(fromElement, toElement = {}) {
        var copiedElement = assign(toElement, fromElement);
        return restangularizeElem(copiedElement[config.restangularFields.parentResource],
          copiedElement, copiedElement[config.restangularFields.route], true);
      }

      function restangularizeElem(parent, element, route, fromServer?, collection?, reqParams?) {
        var elem = config.onBeforeElemRestangularized(element, false, route);

        var localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);

        if (config.useCannonicalId) {
          localElem[config.restangularFields.cannonicalId] = config.getIdFromElem(localElem);
        }

        if (collection) {
          localElem[config.restangularFields.getParentList] = function () {
            return collection;
          };
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

      function restangularizeCollection(parent, element, route, fromServer?, reqParams?) {
        var elem = config.onBeforeElemRestangularized(element, true, route);

        var localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);
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

      function restangularizeCollectionAndElements(parent, element, route) {
        var collection = restangularizeCollection(parent, element, route, false);
        each(collection, function (elem) {
          if (elem) {
            restangularizeElem(parent, elem, route, false);
          }
        });
        return collection;
      }

      function getById(id, reqParams, headers) {
        return this.customGET(id.toString(), reqParams, headers);
      }

      function putElementFunction(idx, params, headers) {
        var __this = this;
        var elemToPut = this[idx];
        var subject = new BehaviorSubject(null);
        var filledArray = [];
        filledArray = config.transformElem(filledArray, true, elemToPut[config.restangularFields.route], service);

        elemToPut.put(params, headers)
        .subscribe(function (serverElem) {
          var newArray = copyRestangularizedElement(__this);
          newArray[idx] = serverElem;
          filledArray = newArray;
          subject.next(newArray);
        }, function (response) {
          subject.error(response);
        }, function () {
          subject.complete();
        });

        return restangularizeResponse(subject, true, filledArray);
      }

      function parseResponse(resData, operation, route, fetchUrl, response, subject) {
        var data = config.responseExtractor(resData, operation, route, fetchUrl, response, subject);
        var etag = response.headers.get('ETag');
        if (data && etag) {
          data[config.restangularFields.etag] = etag;
        }
        return data;
      }

      function fetchFunction(what, reqParams, headers) {
        var __this = this;
        var subject = new BehaviorSubject(null);
        var operation = 'getList';
        var url = urlHandler.fetchUrl(this, what);
        var whatFetched = what || __this[config.restangularFields.route];

        var request = config.fullRequestInterceptor(null, operation,
          whatFetched, url, headers || {}, reqParams || {}, this[config.restangularFields.httpConfig] || {});

        var filledArray = [];
        filledArray = config.transformElem(filledArray, true, whatFetched, service);

        var method = 'getList';

        if (config.jsonp) {
          method = 'jsonp';
        }

        var okCallback = function (response) {
          var resData = response.body;
          var fullParams = response.config.params;
          var data = parseResponse(resData, operation, whatFetched, url, response, subject);

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

          var processedData = map(data, function (elem) {
            if (!__this[config.restangularFields.restangularCollection]) {
              return restangularizeElem(__this, elem, what, true, data);
            } else {
              return restangularizeElem(__this[config.restangularFields.parentResource],
                elem, __this[config.restangularFields.route], true, data);
            }
          });

          processedData = extend(data, processedData);

          if (!__this[config.restangularFields.restangularCollection]) {
            resolvePromise(
              subject,
              response,
              restangularizeCollection(
                __this,
                processedData,
                what,
                true,
                fullParams
              ),
              filledArray
            );
          } else {
            resolvePromise(
              subject,
              response,
              restangularizeCollection(
                __this[config.restangularFields.parentResource],
                processedData,
                __this[config.restangularFields.route],
                true,
                fullParams
              ),
              filledArray
            );
          }
        };

        urlHandler.resource(this, $http, request.httpConfig, request.headers, request.params, what,
          this[config.restangularFields.etag], operation)[method]()
        .subscribe(okCallback, function error(response) {
          if (response.status === 304 && __this[config.restangularFields.restangularCollection]) {
            resolvePromise(subject, response, __this, filledArray);
          } else if (every(config.errorInterceptors, function (cb: any) {

              return cb(response, subject, okCallback) !== false;
            })) {
            // triggered if no callback returns false
            subject.error(response);
          }
        });

        return restangularizeResponse(subject, true, filledArray);
      }

      function withHttpConfig(httpConfig) {
        this[config.restangularFields.httpConfig] = httpConfig;
        return this;
      }

      function save(params, headers) {
        if (this[config.restangularFields.fromServer]) {
          return this[config.restangularFields.put](params, headers);
        } else {
          return bind(elemFunction, this)('post', undefined, params, undefined, headers);
        }
      }

      function elemFunction(operation, what, params, obj, headers) {
        var __this = this;
        var subject = new BehaviorSubject(null);
        var resParams = params || {};
        var route = what || this[config.restangularFields.route];
        var fetchUrl = urlHandler.fetchUrl(this, what);

        var callObj = obj || this;
        // fallback to etag on restangular object (since for custom methods we probably don't explicitly specify the etag field)
        var etag = callObj[config.restangularFields.etag] || (operation !== 'post' ? this[config.restangularFields.etag] : null);

        if (isObject(callObj) && config.isRestangularized(callObj)) {
          callObj = stripRestangular(callObj);
        }
        var request = config.fullRequestInterceptor(callObj, operation, route, fetchUrl,
          headers || {}, resParams || {}, this[config.restangularFields.httpConfig] || {});

        var filledObject = {};
        filledObject = config.transformElem(filledObject, false, route, service);

        var okCallback = function (response) {
          var resData = get(response, 'body');
          var fullParams = get(response, 'config.params');

          var elem = parseResponse(resData, operation, route, fetchUrl, response, subject);

          if (elem) {
            var data;
            if (true === config.plainByDefault) {
              return resolvePromise(subject, response, elem, filledObject);
            }

            if (operation === 'post' && !__this[config.restangularFields.restangularCollection]) {
              data = restangularizeElem(
                __this[config.restangularFields.parentResource],
                elem,
                route,
                true,
                null,
                fullParams
              );
              resolvePromise(subject, response, data, filledObject);
            } else {
              data = restangularizeElem(
                __this[config.restangularFields.parentResource],
                elem,
                __this[config.restangularFields.route],
                true,
                null,
                fullParams
              );

              data[config.restangularFields.singleOne] = __this[config.restangularFields.singleOne];
              resolvePromise(subject, response, data, filledObject);
            }

          } else {
            resolvePromise(subject, response, undefined, filledObject);
          }
        };

        var errorCallback = function (response) {
          if (response.status === 304 && config.isSafe(operation)) {
            resolvePromise(subject, response, __this, filledObject);
          } else if (every(config.errorInterceptors, function (cb: any) {
              return cb(response, subject, okCallback) !== false;
            })) {
            // triggered if no callback returns false
            subject.error(response);
          }
        };
        // Overriding HTTP Method
        var callOperation = operation;
        var callHeaders = extend({}, request.headers);
        var isOverrideOperation = config.isOverridenMethod(operation);
        if (isOverrideOperation) {
          callOperation = 'post';
          callHeaders = extend(callHeaders, {'X-HTTP-Method-Override': operation === 'remove' ? 'DELETE' : operation.toUpperCase()});
        } else if (config.jsonp && callOperation === 'get') {
          callOperation = 'jsonp';
        }

        if (config.isSafe(operation)) {
          if (isOverrideOperation) {
            urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params,
              what, etag, callOperation)[callOperation]({}).subscribe(okCallback, errorCallback);
          } else {
            urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params,
              what, etag, callOperation)[callOperation]().subscribe(okCallback, errorCallback);
          }
        } else {
          urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params,
            what, etag, callOperation)[callOperation](request.element).subscribe(okCallback, errorCallback);
        }

        return restangularizeResponse(subject, false, filledObject);
      }

      function getFunction(params, headers) {
        return bind(elemFunction, this)('get', undefined, params, undefined, headers);
      }

      function deleteFunction(params, headers) {
        return bind(elemFunction, this)('remove', undefined, params, undefined, headers);
      }

      function putFunction(params, headers) {
        return bind(elemFunction, this)('put', undefined, params, undefined, headers);
      }

      function postFunction(what, elem, params, headers) {
        return bind(elemFunction, this)('post', what, params, elem, headers);
      }

      function headFunction(params, headers) {
        return bind(elemFunction, this)('head', undefined, params, undefined, headers);
      }

      function traceFunction(params, headers) {
        return bind(elemFunction, this)('trace', undefined, params, undefined, headers);
      }

      function optionsFunction(params, headers) {
        return bind(elemFunction, this)('options', undefined, params, undefined, headers);
      }

      function patchFunction(elem, params, headers) {
        return bind(elemFunction, this)('patch', undefined, params, elem, headers);
      }

      function customFunction(operation, path, params, headers, elem) {
        return bind(elemFunction, this)(operation, path, params, elem, headers);
      }

      function addRestangularMethodFunction(name, operation, path, defaultParams, defaultHeaders, defaultElem) {
        var bindedFunction;
        if (operation === 'getList') {
          bindedFunction = bind(fetchFunction, this, path);
        } else {
          bindedFunction = bind(customFunction, this, operation, path);
        }

        var createdFunction = function (params, headers, elem) {
          var callParams = defaults({
            params: params,
            headers: headers,
            elem: elem
          }, {
            params: defaultParams,
            headers: defaultHeaders,
            elem: defaultElem
          });
          return bindedFunction(callParams.params, callParams.headers, callParams.elem);
        };

        if (config.isSafe(operation)) {
          this[name] = createdFunction;
        } else {
          this[name] = function (elem, params, headers) {
            return createdFunction(params, headers, elem);
          };
        }
      }

      function withConfigurationFunction(configurer) {
        var newConfig = clone(omit(config, 'configuration'));
        RestangularConfigurer(newConfig, newConfig);
        configurer(newConfig);
        return createServiceForConfiguration(newConfig);
      }

      function toService(route, parent) {
        var knownCollectionMethods = values(config.restangularFields);
        var serv: any = {};
        var collection = (parent || service).all(route);
        serv.one = bind(one, (parent || service), parent, route);
        serv.all = bind(collection.all, collection);
        serv.post = bind(collection.post, collection);
        serv.getList = bind(collection.getList, collection);
        serv.withHttpConfig = bind(collection.withHttpConfig, collection);
        serv.get = bind(collection.get, collection);

        for (var prop in collection) {
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
  };

}
