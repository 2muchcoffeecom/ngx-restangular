import {
  includes,
  isUndefined,
  isNull,
  isArray,
  isObject,
  isBoolean,
  defaults,
  each,
  extend,
  find,
  has,
  initial,
  last,
  clone,
  reduce,
  keys,
  isEmpty,
  forEach,
} from 'lodash';

export function RestangularConfigurer(object, configuration) {
  object.configuration = configuration;

  /**
   * Those are HTTP safe methods for which there is no need to pass any data with the request.
   */
  const safeMethods = ['get', 'head', 'options', 'trace', 'getlist'];
  configuration.isSafe = function (operation) {
    return includes(safeMethods, operation.toLowerCase());
  };

  const absolutePattern = /^https?:\/\//i;
  configuration.isAbsoluteUrl = function (string) {
    return isUndefined(configuration.absoluteUrl) || isNull(configuration.absoluteUrl) ?
      string && absolutePattern.test(string) :
      configuration.absoluteUrl;
  };

  configuration.absoluteUrl = isUndefined(configuration.absoluteUrl) ? true : configuration.absoluteUrl;
  object.setSelfLinkAbsoluteUrl = function (value) {
    configuration.absoluteUrl = value;
  };
  /**
   * This is the BaseURL to be used with Restangular
   */
  configuration.baseUrl = isUndefined(configuration.baseUrl) ? '' : configuration.baseUrl;
  object.setBaseUrl = function (newBaseUrl) {
    configuration.baseUrl = /\/$/.test(newBaseUrl) ?
      newBaseUrl.substring(0, newBaseUrl.length - 1) :
      newBaseUrl;
    return this;
  };

  /**
   * Sets the extra fields to keep from the parents
   */
  configuration.extraFields = configuration.extraFields || [];
  object.setExtraFields = function (newExtraFields) {
    configuration.extraFields = newExtraFields;
    return this;
  };

  /**
   * Some default $http parameter to be used in EVERY call
   **/
  configuration.defaultHttpFields = configuration.defaultHttpFields || {};
  object.setDefaultHttpFields = function (values) {
    configuration.defaultHttpFields = values;
    return this;
  };

  /**
   * Always return plain data, no restangularized object
   **/
  configuration.plainByDefault = configuration.plainByDefault || false;
  object.setPlainByDefault = function (value) {
    configuration.plainByDefault = value === true ? true : false;
    return this;
  };

  configuration.withHttpValues = function (httpLocalConfig, obj) {
    return defaults(obj, httpLocalConfig, configuration.defaultHttpFields);
  };

  configuration.encodeIds = isUndefined(configuration.encodeIds) ? true : configuration.encodeIds;
  object.setEncodeIds = function (encode) {
    configuration.encodeIds = encode;
  };

  configuration.defaultRequestParams = configuration.defaultRequestParams || {
    get: {},
    post: {},
    put: {},
    remove: {},
    common: {}
  };

  object.setDefaultRequestParams = function (param1, param2) {
    let methods = [];
    const params = param2 || param1;
    if (!isUndefined(param2)) {
      if (isArray(param1)) {
        methods = param1;
      } else {
        methods.push(param1);
      }
    } else {
      methods.push('common');
    }

    each(methods, function (method) {
      configuration.defaultRequestParams[method] = params;
    });
    return this;
  };

  object.requestParams = configuration.defaultRequestParams;

  configuration.defaultHeaders = configuration.defaultHeaders || {};
  object.setDefaultHeaders = function (headers) {
    configuration.defaultHeaders = headers;
    object.defaultHeaders = configuration.defaultHeaders;
    return this;
  };

  object.defaultHeaders = configuration.defaultHeaders;


  /**
   * Method overriders response Method
   **/
  configuration.defaultResponseMethod = configuration.defaultResponseMethod || 'promise';
  object.setDefaultResponseMethod = function (method) {
    configuration.defaultResponseMethod = method;
    object.defaultResponseMethod = configuration.defaultResponseMethod;
    return this;
  };
  object.defaultResponseMethod = configuration.defaultResponseMethod;

  /**
   * Method overriders will set which methods are sent via POST with an X-HTTP-Method-Override
   **/
  configuration.methodOverriders = configuration.methodOverriders || [];
  object.setMethodOverriders = function (values) {
    const overriders = extend([], values);
    if (configuration.isOverridenMethod('delete', overriders)) {
      overriders.push('remove');
    }
    configuration.methodOverriders = overriders;
    return this;
  };

  configuration.jsonp = isUndefined(configuration.jsonp) ? false : configuration.jsonp;
  object.setJsonp = function (active) {
    configuration.jsonp = active;
  };

  configuration.isOverridenMethod = function (method, values) {
    const search = values || configuration.methodOverriders;
    return !isUndefined(find(search, function (one: string) {
      return one.toLowerCase() === method.toLowerCase();
    }));
  };

  /**
   * Sets the URL creator type. For now, only Path is created. In the future we'll have queryParams
   **/
  configuration.urlCreator = configuration.urlCreator || 'path';
  object.setUrlCreator = function (name) {
    if (!has(configuration.urlCreatorFactory, name)) {
      throw new Error('URL Path selected isn\'t valid');
    }

    configuration.urlCreator = name;
    return this;
  };

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
  object.setRestangularFields = function (resFields) {
    configuration.restangularFields =
      extend({}, configuration.restangularFields, resFields);
    return this;
  };

  configuration.isRestangularized = function (obj) {
    return !!obj[configuration.restangularFields.restangularized];
  };

  configuration.setFieldToElem = function (field, elem, value) {
    const properties = field.split('.');
    let idValue = elem;
    each(initial(properties), function (prop: any) {
      idValue[prop] = {};
      idValue = idValue[prop];
    });
    const index: any = last(properties);
    idValue[index] = value;
    return this;
  };

  configuration.getFieldFromElem = function (field, elem) {
    const properties = field.split('.');
    let idValue: any = elem;
    each(properties, function (prop) {
      if (idValue) {
        idValue = idValue[prop];
      }
    });
    return clone(idValue);
  };

  configuration.setIdToElem = function (elem, id /*, route */) {
    configuration.setFieldToElem(configuration.restangularFields.id, elem, id);
    return this;
  };

  configuration.getIdFromElem = function (elem) {
    return configuration.getFieldFromElem(configuration.restangularFields.id, elem);
  };

  configuration.isValidId = function (elemId) {
    return '' !== elemId && !isUndefined(elemId) && !isNull(elemId);
  };

  configuration.setUrlToElem = function (elem, url /*, route */) {
    configuration.setFieldToElem(configuration.restangularFields.selfLink, elem, url);
    return this;
  };

  configuration.getUrlFromElem = function (elem) {
    return configuration.getFieldFromElem(configuration.restangularFields.selfLink, elem);
  };

  configuration.useCannonicalId = isUndefined(configuration.useCannonicalId) ? false : configuration.useCannonicalId;
  object.setUseCannonicalId = function (value) {
    configuration.useCannonicalId = value;
    return this;
  };

  configuration.getCannonicalIdFromElem = function (elem) {
    const cannonicalId = elem[configuration.restangularFields.cannonicalId];
    const actualId = configuration.isValidId(cannonicalId) ? cannonicalId : configuration.getIdFromElem(elem);
    return actualId;
  };

  /**
   * Sets the Response parser. This is used in case your response isn't directly the data.
   * For example if you have a response like {meta: {'meta'}, data: {name: 'Gonto'}}
   * you can extract this data which is the one that needs wrapping
   *
   * The ResponseExtractor is a function that receives the response and the method executed.
   */

  configuration.responseInterceptors = configuration.responseInterceptors ? [...configuration.responseInterceptors] : [];

  configuration.defaultResponseInterceptor = function (data /*, operation, what, url, response, subject */) {
    return data || {};
  };

  configuration.responseExtractor = function (data, operation, what, url, response, subject) {
    const interceptors = clone(configuration.responseInterceptors);
    interceptors.push(configuration.defaultResponseInterceptor);
    let theData = data;
    each(interceptors, function (interceptor: any) {
      theData = interceptor(theData, operation,
        what, url, response, subject);
    });
    return theData;
  };

  object.addResponseInterceptor = function (extractor) {
    configuration.responseInterceptors.push(extractor);
    return this;
  };

  configuration.errorInterceptors = configuration.errorInterceptors ? [...configuration.errorInterceptors] : [];
  object.addErrorInterceptor = function (interceptor) {
    configuration.errorInterceptors = [interceptor, ...configuration.errorInterceptors];
    return this;
  };

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

  configuration.defaultInterceptor = function (element, operation, path, url, headers, params, httpConfig) {
    return {
      element: element,
      headers: headers,
      params: params,
      httpConfig: httpConfig
    };
  };

  configuration.fullRequestInterceptor = function (element, operation, path, url, headers, params, httpConfig) {
    const interceptors = clone(configuration.requestInterceptors);
    const defaultRequest = configuration.defaultInterceptor(element, operation, path, url, headers, params, httpConfig);
    return reduce(interceptors, function (request: any, interceptor: any) {

      const returnInterceptor: any = interceptor(
        request.element,
        operation,
        path,
        url,
        request.headers,
        request.params,
        request.httpConfig
      );
      return extend(request, returnInterceptor);
    }, defaultRequest);
  };

  object.addRequestInterceptor = function (interceptor) {
    configuration.requestInterceptors.push(function (elem, operation, path, url, headers, params, httpConfig) {
      return {
        headers: headers,
        params: params,
        element: interceptor(elem, operation, path, url),
        httpConfig: httpConfig
      };
    });
    return this;
  };

  object.setRequestInterceptor = object.addRequestInterceptor;

  object.addFullRequestInterceptor = function (interceptor) {
    configuration.requestInterceptors.push(interceptor);
    return this;
  };

  object.setFullRequestInterceptor = object.addFullRequestInterceptor;

  configuration.onBeforeElemRestangularized = configuration.onBeforeElemRestangularized || function (elem) {
    return elem;
  };
  object.setOnBeforeElemRestangularized = function (post) {
    configuration.onBeforeElemRestangularized = post;
    return this;
  };

  object.setRestangularizePromiseInterceptor = function (interceptor) {
    configuration.restangularizePromiseInterceptor = interceptor;
    return this;
  };

  /**
   * This method is called after an element has been "Restangularized".
   *
   * It receives the element, a boolean indicating if it's an element or a collection
   * and the name of the model
   *
   */
  configuration.onElemRestangularized = configuration.onElemRestangularized || function (elem) {
    return elem;
  };
  object.setOnElemRestangularized = function (post) {
    configuration.onElemRestangularized = post;
    return this;
  };

  configuration.shouldSaveParent = configuration.shouldSaveParent || function () {
    return true;
  };
  object.setParentless = function (values) {
    if (isArray(values)) {
      configuration.shouldSaveParent = function (route) {
        return !includes(values, route);
      };
    } else if (isBoolean(values)) {
      configuration.shouldSaveParent = function () {
        return !values;
      };
    }
    return this;
  };

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
  object.setRequestSuffix = function (newSuffix) {
    configuration.suffix = newSuffix;
    return this;
  };

  /**
   * Add element transformers for certain routes.
   */
  configuration.transformers = configuration.transformers || {};
  object.addElementTransformer = function (type, secondArg, thirdArg) {
    let isCollection = null;
    let transformer = null;
    if (arguments.length === 2) {
      transformer = secondArg;
    } else {
      transformer = thirdArg;
      isCollection = secondArg;
    }

    let typeTransformers = configuration.transformers[type];
    if (!typeTransformers) {
      typeTransformers = configuration.transformers[type] = [];
    }

    typeTransformers.push(function (coll, elem) {
      if (isNull(isCollection) || (coll === isCollection)) {
        return transformer(elem);
      }
      return elem;
    });

    return object;
  };

  object.extendCollection = function (route, fn) {
    return object.addElementTransformer(route, true, fn);
  };

  object.extendModel = function (route, fn) {
    return object.addElementTransformer(route, false, fn);
  };

  configuration.transformElem = function (elem, isCollection, route, Restangular, force) {
    if (!force && !configuration.transformLocalElements && !elem[configuration.restangularFields.fromServer]) {
      return elem;
    }
    const typeTransformers = configuration.transformers[route];
    let changedElem = elem;
    if (typeTransformers) {
      each(typeTransformers, function (transformer: (isCollection: boolean, changedElem: any) => any) {
        changedElem = transformer(isCollection, changedElem);
      });
    }
    return configuration.onElemRestangularized(changedElem, isCollection, route, Restangular);
  };

  configuration.transformLocalElements = isUndefined(configuration.transformLocalElements) ?
    false :
    configuration.transformLocalElements;

  object.setTransformOnlyServerElements = function (active) {
    configuration.transformLocalElements = !active;
  };

  configuration.fullResponse = isUndefined(configuration.fullResponse) ? false : configuration.fullResponse;
  object.setFullResponse = function (full) {
    configuration.fullResponse = full;
    return this;
  };


  // Internal values and functions
  configuration.urlCreatorFactory = {};

  /**
   * Base URL Creator. Base prototype for everything related to it
   **/

  const BaseCreator = function () {
  };

  BaseCreator.prototype.setConfig = function (config) {
    this.config = config;
    return this;
  };

  BaseCreator.prototype.parentsArray = function (current) {
    const parents = [];
    while (current) {
      parents.push(current);
      current = current[this.config.restangularFields.parentResource];
    }
    return parents.reverse();
  };

  function RestangularResource(config, $http, url, configurer) {
    const resource = {};
    each(keys(configurer), function (key) {
      const value = configurer[key];

      // Add default parameters
      value.params = extend({}, value.params, config.defaultRequestParams[value.method.toLowerCase()]);
      // We don't want the ? if no params are there
      if (isEmpty(value.params)) {
        delete value.params;
      }

      if (config.isSafe(value.method)) {

        resource[key] = function () {
          const resultConfig = extend(value, {
            url: url
          });
          return $http.createRequest(resultConfig);
        };

      } else {

        resource[key] = function (data) {
          const resultConfig = extend(value, {
            url: url,
            data: data
          });
          return $http.createRequest(resultConfig);
        };

      }
    });

    return resource;
  }

  BaseCreator.prototype.resource = function (current, $http, localHttpConfig, callHeaders, callParams, what, etag, operation) {
    const params = defaults(callParams || {}, this.config.defaultRequestParams.common);
    const headers = defaults(callHeaders || {}, this.config.defaultHeaders);

    if (etag) {
      if (!configuration.isSafe(operation)) {
        headers['If-Match'] = etag;
      } else {
        headers['If-None-Match'] = etag;
      }
    }

    let url = this.base(current);

    if (what) {
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
      getList: this.config.withHttpValues(localHttpConfig,
        {
          method: 'GET',
          params: params,
          headers: headers
        }),

      get: this.config.withHttpValues(localHttpConfig,
        {
          method: 'GET',
          params: params,
          headers: headers
        }),

      jsonp: this.config.withHttpValues(localHttpConfig,
        {
          method: 'jsonp',
          params: params,
          headers: headers
        }),

      put: this.config.withHttpValues(localHttpConfig,
        {
          method: 'PUT',
          params: params,
          headers: headers
        }),

      post: this.config.withHttpValues(localHttpConfig,
        {
          method: 'POST',
          params: params,
          headers: headers
        }),

      remove: this.config.withHttpValues(localHttpConfig,
        {
          method: 'DELETE',
          params: params,
          headers: headers
        }),

      head: this.config.withHttpValues(localHttpConfig,
        {
          method: 'HEAD',
          params: params,
          headers: headers
        }),

      trace: this.config.withHttpValues(localHttpConfig,
        {
          method: 'TRACE',
          params: params,
          headers: headers
        }),

      options: this.config.withHttpValues(localHttpConfig,
        {
          method: 'OPTIONS',
          params: params,
          headers: headers
        }),

      patch: this.config.withHttpValues(localHttpConfig,
        {
          method: 'PATCH',
          params: params,
          headers: headers
        })
    });
  };

  /**
   * This is the Path URL creator. It uses Path to show Hierarchy in the Rest API.
   * This means that if you have an Account that then has a set of Buildings, a URL to a building
   * would be /accounts/123/buildings/456
   **/
  const Path = function () {
  };

  Path.prototype = new BaseCreator();

  Path.prototype.normalizeUrl = function (url) {
    const parts = /((?:http[s]?:)?\/\/)?(.*)?/.exec(url);
    parts[2] = parts[2].replace(/[\\\/]+/g, '/');
    return (typeof parts[1] !== 'undefined') ? parts[1] + parts[2] : parts[2];
  };

  Path.prototype.base = function (current) {
    const __this = this;
    return reduce(this.parentsArray(current), function (acum: any, elem: any) {
      let elemUrl;
      const elemSelfLink = __this.config.getUrlFromElem(elem);
      if (elemSelfLink) {
        if (__this.config.isAbsoluteUrl(elemSelfLink)) {
          return elemSelfLink;
        } else {
          elemUrl = elemSelfLink;
        }
      } else {
        elemUrl = elem[__this.config.restangularFields.route];

        if (elem[__this.config.restangularFields.restangularCollection]) {
          const ids = elem[__this.config.restangularFields.ids];
          if (ids) {
            elemUrl += '/' + ids.join(',');
          }
        } else {
          let elemId: any;
          if (__this.config.useCannonicalId) {
            elemId = __this.config.getCannonicalIdFromElem(elem);
          } else {
            elemId = __this.config.getIdFromElem(elem);
          }

          if (configuration.isValidId(elemId) && !elem.singleOne) {
            elemUrl += '/' + (__this.config.encodeIds ? encodeURIComponent(elemId) : elemId);
          }
        }
      }
      acum = acum.replace(/\/$/, '') + '/' + elemUrl;
      return __this.normalizeUrl(acum);

    }, this.config.baseUrl);
  };


  Path.prototype.fetchUrl = function (current, what) {
    let baseUrl = this.base(current);
    if (what) {
      baseUrl += '/' + what;
    }
    return baseUrl;
  };

  Path.prototype.fetchRequestedUrl = function (current, what) {
    const url = this.fetchUrl(current, what);
    const params = current[configuration.restangularFields.reqParams];

    // From here on and until the end of fetchRequestedUrl,
    // the code has been kindly borrowed from angular.js
    // The reason for such code bloating is coherence:
    //   If the user were to use this for cache management, the
    //   serialization of parameters would need to be identical
    //   to the one done by angular for cache keys to match.
    function sortedKeys(obj) {
      const resultKeys = [];
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          resultKeys.push(key);
        }
      }
      return resultKeys.sort();
    }

    function forEachSorted(obj, iterator?, context?) {
      const sortedKeysArray = sortedKeys(obj);
      for (let i = 0; i < sortedKeysArray.length; i++) {
        iterator.call(context, obj[sortedKeysArray[i]], sortedKeysArray[i]);
      }
      return sortedKeysArray;
    }

    function encodeUriQuery(val, pctEncodeSpaces?) {
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

    const parts = [];
    forEachSorted(params, function (value, key) {
      if (value === null || value === undefined) {
        return;
      }
      if (!isArray(value)) {
        value = [value];
      }

      forEach(value, function (v) {
        if (isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(v));
      });
    });

    return url + (this.config.suffix || '') + ((url.indexOf('?') === -1) ? '?' : '&') + parts.join('&');
  };

  configuration.urlCreatorFactory.path = Path;
}
