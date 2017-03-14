import {Injectable, Inject, Injector, Optional} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import * as _ from "lodash";
import {RESTANGULAR} from "./ng2-restangular.config";
import {RestangularHttp} from "./ng2-restangular-http";
import {RestangularConfigurer} from "./ng2-restangular-config.factory";


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
  extendCollection;
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
    Object.assign(this, element);
    
    this.setDefaultConfig();
  }
  
  setDefaultConfig() {
    if (!this.configObj || !_.isFunction(this.configObj.fn)) {
      return;
    }
    
    let arrDI = _.map(this.configObj.arrServices, (services)=> {
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
        elem[config.restangularFields.getRestangularUrl] = _.bind(urlHandler.fetchUrl, urlHandler, elem);
        elem[config.restangularFields.getRequestedUrl] = _.bind(urlHandler.fetchRequestedUrl, urlHandler, elem);
        elem[config.restangularFields.addRestangularMethod] = _.bind(addRestangularMethodFunction, elem);
        elem[config.restangularFields.clone] = _.bind(copyRestangularizedElement, elem);
        elem[config.restangularFields.reqParams] = _.isEmpty(reqParams) ? null : reqParams;
        elem[config.restangularFields.withHttpConfig] = _.bind(withHttpConfig, elem);
        elem[config.restangularFields.plain] = _.bind(stripRestangular, elem, elem);
        
        // Tag element as restangularized
        elem[config.restangularFields.restangularized] = true;
        
        // RequestLess connection
        elem[config.restangularFields.one] = _.bind(one, elem, elem);
        elem[config.restangularFields.all] = _.bind(all, elem, elem);
        elem[config.restangularFields.several] = _.bind(several, elem, elem);
        elem[config.restangularFields.oneUrl] = _.bind(oneUrl, elem, elem);
        elem[config.restangularFields.allUrl] = _.bind(allUrl, elem, elem);
        
        elem[config.restangularFields.fromServer] = !!fromServer;
        
        if (parent && config.shouldSaveParent(route)) {
          var parentId = config.getIdFromElem(parent);
          var parentUrl = config.getUrlFromElem(parent);
          
          var restangularFieldsForParent = _.union(
            _.values(_.pick(config.restangularFields, ['route', 'singleOne', 'parentResource'])),
            config.extraFields
          );
          var parentResource = _.pick(parent, restangularFieldsForParent);
          
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
        if (_.isNumber(route) || _.isNumber(parent)) {
          error = 'You\'re creating a Restangular entity with the number ';
          error += 'instead of the route or the parent. For example, you can\'t call .one(12).';
          throw new Error(error);
        }
        if (_.isUndefined(route)) {
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
        _.extend(filledValue, data);
        
        // Trigger the full response interceptor.
        if (config.fullResponse) {
          subject.next(_.extend(response, {
            data: data
          }));
        } else {
          subject.next(data);
        }
  
        subject.complete();
      }
      
      
      // Elements
      function stripRestangular(elem) {
        if (_.isArray(elem)) {
          var array = [];
          _.each(elem, function (value) {
            array.push(config.isRestangularized(value) ? stripRestangular(value) : value);
          });
          return array;
        } else {
          return _.omit(elem, _.values(_.omit(config.restangularFields, 'id')));
        }
      }
      
      function addCustomOperation(elem) {
        elem[config.restangularFields.customOperation] = _.bind(customFunction, elem);
        var requestMethods = {get: customFunction, delete: customFunction};
        _.each(['put', 'patch', 'post'], function (name) {
          requestMethods[name] = function (operation, elem, path, params, headers) {
            return _.bind(customFunction, this)(operation, path, params, headers, elem);
          };
        });
        _.each(requestMethods, function (requestFunc, name) {
          var callOperation = name === 'delete' ? 'remove' : name;
          _.each(['do', 'custom'], function (alias) {
            elem[alias + name.toUpperCase()] = _.bind(requestFunc, elem, callOperation);
          });
        });
        elem[config.restangularFields.customGETLIST] = _.bind(fetchFunction, elem);
        elem[config.restangularFields.doGETLIST] = elem[config.restangularFields.customGETLIST];
      }
      
      function copyRestangularizedElement(fromElement, toElement = {}) {
        var copiedElement = Object.assign(toElement, fromElement);
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
        localElem[config.restangularFields.get] = _.bind(getFunction, localElem);
        localElem[config.restangularFields.getList] = _.bind(fetchFunction, localElem);
        localElem[config.restangularFields.put] = _.bind(putFunction, localElem);
        localElem[config.restangularFields.post] = _.bind(postFunction, localElem);
        localElem[config.restangularFields.remove] = _.bind(deleteFunction, localElem);
        localElem[config.restangularFields.head] = _.bind(headFunction, localElem);
        localElem[config.restangularFields.trace] = _.bind(traceFunction, localElem);
        localElem[config.restangularFields.options] = _.bind(optionsFunction, localElem);
        localElem[config.restangularFields.patch] = _.bind(patchFunction, localElem);
        localElem[config.restangularFields.save] = _.bind(save, localElem);
        
        addCustomOperation(localElem);
        return config.transformElem(localElem, false, route, service, true);
      }
      
      function restangularizeCollection(parent, element, route, fromServer?, reqParams?) {
        var elem = config.onBeforeElemRestangularized(element, true, route);
        
        var localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);
        localElem[config.restangularFields.restangularCollection] = true;
        localElem[config.restangularFields.post] = _.bind(postFunction, localElem, null);
        localElem[config.restangularFields.remove] = _.bind(deleteFunction, localElem);
        localElem[config.restangularFields.head] = _.bind(headFunction, localElem);
        localElem[config.restangularFields.trace] = _.bind(traceFunction, localElem);
        localElem[config.restangularFields.putElement] = _.bind(putElementFunction, localElem);
        localElem[config.restangularFields.options] = _.bind(optionsFunction, localElem);
        localElem[config.restangularFields.patch] = _.bind(patchFunction, localElem);
        localElem[config.restangularFields.get] = _.bind(getById, localElem);
        localElem[config.restangularFields.getList] = _.bind(fetchFunction, localElem, null);
        
        addCustomOperation(localElem);
        return config.transformElem(localElem, true, route, service, true);
      }
      
      function restangularizeCollectionAndElements(parent, element, route) {
        var collection = restangularizeCollection(parent, element, route, false);
        _.each(collection, function (elem) {
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
          var resData = response.data;
          var fullParams = response.config.params;
          var data = parseResponse(resData, operation, whatFetched, url, response, subject);
          
          // support empty response for getList() calls (some APIs respond with 204 and empty body)
          if (_.isUndefined(data) || '' === data) {
            data = [];
          }
          if (!_.isArray(data)) {
            throw new Error('Response for getList SHOULD be an array and not an object or something else');
          }
          
          if (true === config.plainByDefault) {
            return resolvePromise(subject, response, data, filledArray);
          }
          
          var processedData = _.map(data, function (elem) {
            if (!__this[config.restangularFields.restangularCollection]) {
              return restangularizeElem(__this, elem, what, true, data);
            } else {
              return restangularizeElem(__this[config.restangularFields.parentResource],
                elem, __this[config.restangularFields.route], true, data);
            }
          });
          
          processedData = _.extend(data, processedData);
          
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
          } else if (_.every(config.errorInterceptors, function (cb: any) {
              
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
          return _.bind(elemFunction, this)('post', undefined, params, undefined, headers);
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
        
        if (_.isObject(callObj) && config.isRestangularized(callObj)) {
          callObj = stripRestangular(callObj);
        }
        var request = config.fullRequestInterceptor(callObj, operation, route, fetchUrl,
          headers || {}, resParams || {}, this[config.restangularFields.httpConfig] || {});
        
        var filledObject = {};
        filledObject = config.transformElem(filledObject, false, route, service);
        
        var okCallback = function (response) {
          var resData = _.get(response, 'data');
          var fullParams = _.get(response, 'config.params');
          
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
          } else if (_.every(config.errorInterceptors, function (cb: any) {
              return cb(response, subject, okCallback) !== false;
            })) {
            // triggered if no callback returns false
            subject.error(response);
          }
        };
        // Overriding HTTP Method
        var callOperation = operation;
        var callHeaders = _.extend({}, request.headers);
        var isOverrideOperation = config.isOverridenMethod(operation);
        if (isOverrideOperation) {
          callOperation = 'post';
          callHeaders = _.extend(callHeaders, {'X-HTTP-Method-Override': operation === 'remove' ? 'DELETE' : operation.toUpperCase()});
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
        return _.bind(elemFunction, this)('get', undefined, params, undefined, headers);
      }
      
      function deleteFunction(params, headers) {
        return _.bind(elemFunction, this)('remove', undefined, params, undefined, headers);
      }
      
      function putFunction(params, headers) {
        return _.bind(elemFunction, this)('put', undefined, params, undefined, headers);
      }
      
      function postFunction(what, elem, params, headers) {
        return _.bind(elemFunction, this)('post', what, params, elem, headers);
      }
      
      function headFunction(params, headers) {
        return _.bind(elemFunction, this)('head', undefined, params, undefined, headers);
      }
      
      function traceFunction(params, headers) {
        return _.bind(elemFunction, this)('trace', undefined, params, undefined, headers);
      }
      
      function optionsFunction(params, headers) {
        return _.bind(elemFunction, this)('options', undefined, params, undefined, headers);
      }
      
      function patchFunction(elem, params, headers) {
        return _.bind(elemFunction, this)('patch', undefined, params, elem, headers);
      }
      
      function customFunction(operation, path, params, headers, elem) {
        return _.bind(elemFunction, this)(operation, path, params, elem, headers);
      }
      
      function addRestangularMethodFunction(name, operation, path, defaultParams, defaultHeaders, defaultElem) {
        var bindedFunction;
        if (operation === 'getList') {
          bindedFunction = _.bind(fetchFunction, this, path);
        } else {
          bindedFunction = _.bind(customFunction, this, operation, path);
        }
        
        var createdFunction = function (params, headers, elem) {
          var callParams = _.defaults({
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
        var newConfig = _.clone(_.omit(config, 'configuration'));
        RestangularConfigurer(newConfig, newConfig);
        configurer(newConfig);
        return createServiceForConfiguration(newConfig);
      }
      
      function toService(route, parent) {
        var knownCollectionMethods = _.values(config.restangularFields);
        var serv: any = {};
        var collection = (parent || service).all(route);
        serv.one = _.bind(one, (parent || service), parent, route);
        serv.post = _.bind(collection.post, collection);
        serv.getList = _.bind(collection.getList, collection);
        
        for (var prop in collection) {
          if (collection.hasOwnProperty(prop) && _.isFunction(collection[prop]) && !_.includes(knownCollectionMethods, prop)) {
            serv[prop] = _.bind(collection[prop], collection);
          }
        }
        
        return serv;
      }
      
      
      RestangularConfigurer(service, config);
      
      service.copy = _.bind(copyRestangularizedElement, service);
      
      service.service = _.bind(toService, service);
      
      service.withConfig = _.bind(withConfigurationFunction, service);
      
      service.one = _.bind(one, service, null);
      
      service.all = _.bind(all, service, null);
      
      service.several = _.bind(several, service, null);
      
      service.oneUrl = _.bind(oneUrl, service, null);
      
      service.allUrl = _.bind(allUrl, service, null);
      
      service.stripRestangular = _.bind(stripRestangular, service);
      
      service.restangularizeElement = _.bind(restangularizeElem, service);
      
      service.restangularizeCollection = _.bind(restangularizeCollectionAndElements, service);
      
      return service;
    }
    
    return createServiceForConfiguration(globalConfiguration);
  };
  
}
