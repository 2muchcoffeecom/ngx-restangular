import { HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/from';

import { RestangularHandler } from './handler';
import { RestangularBuilder } from './builder';
import { RestangularRequest } from './request';
import { extendClientWithId, extendWithFields } from './utils/client';
import { RestangularFieldsMap } from './mapping';


export class RestangularClient {

  private _fromServer: boolean;

  constructor(
    private builder: RestangularBuilder,
    private handler: RestangularHandler,
    private parent?: RestangularClient,
  ) {
    extendClientWithId(this, this.restangularFieldsMap);
  }

  get restangularFieldsMap(): RestangularFieldsMap {
    return this.handler.restangularFields;
  }

  get isCollection() {
    return this.builder.isCollection;
  }

  get route() {
    return this.builder.route;
  }

  get fromServer() {
    return this._fromServer;
  }

  private get restangularId() {
    return this.builder.id;
  }

  one(id: string): RestangularClient;
  one(route: string, id: string): RestangularClient;
  one(routeOrId, id?) {
    const builder = this.builder.one(routeOrId, id);
    return new RestangularClient(builder, this.handler, this);
  }

  all(route: string): RestangularClient {
    const builder = this.builder.all(route);
    return new RestangularClient(builder, this.handler, this);
  }

  get<T>(params?: HttpParams, headers?: HttpHeaders): Observable<RestangularClient & T>;
  get<T>(id: string, params?: HttpParams, headers?: HttpHeaders): Observable<RestangularClient & T>;
  get(
    paramsOrId?,
    paramsOrHeaders?,
    headers?,
  ) {
    let id: string;
    let params: HttpParams;
    if (this.isCollection) {
      id = paramsOrId as string;
      params = paramsOrHeaders as HttpParams;
      return this.one(id).get(params, headers);
    }
    params = paramsOrId as HttpParams;
    headers = paramsOrHeaders as HttpHeaders;

    const method = 'GET';
    const builder = this.builder;
    const req = new RestangularRequest({method, builder, params, headers});
    const responseClient = this.clone();
    return this.handler.handle(req).pipe(
      this.restangularize(responseClient),
    );
  }


  getList<T>(params?: HttpParams, headers?: HttpHeaders): Observable<RestangularClient & T>;
  getList<T>(route: string, params?: HttpParams, headers?: HttpHeaders): Observable<RestangularClient & T>;
  getList(
    routeOrParams?,
    paramsOrHeaders?,
    headers?,
  ) {
    let route: string;
    let params: HttpParams;
    if (!this.isCollection && typeof routeOrParams === 'string') {
      route = routeOrParams;
      params = paramsOrHeaders as HttpParams;
      return this.all(route).getList(params, headers);
    }
    params = routeOrParams as HttpParams;
    headers = paramsOrHeaders as HttpHeaders;

    const method = 'GET';
    const builder = this.builder;
    const req = new RestangularRequest({method, builder, params, headers});
    const responseClient = this.clone();
    return this.handler.handle(req).pipe(
      this.restangularizeCollection(responseClient)
    );
  }

  post<T>(body: T, params?: HttpParams, headers?: HttpHeaders): Observable<RestangularClient & T>;
  post<T>(subElement: string, body: T, params?: HttpParams, headers?: HttpHeaders): Observable<RestangularClient & T>;
  post(
    subElementOrBody,
    bodyOrParams,
    paramsOrHeaders?,
    headers?,
  ) {
    let subElement: string;
    let body: any;
    let params: HttpParams;
    if (!this.isCollection) {
      subElement = subElementOrBody as string;
      body = bodyOrParams as HttpParams;
      params = bodyOrParams as HttpParams;
      return this.all(subElement).post(body, params, headers);
    }
    body = subElementOrBody;
    params = bodyOrParams as HttpParams;
    headers = paramsOrHeaders as HttpParams;

    const method = 'POST';
    const builder = this.builder;
    const req = new RestangularRequest({method, builder, body, params, headers});
    return this.handler.handle(req);
  }

  put<T>(params?: HttpParams, headers?: HttpHeaders): Observable<RestangularClient & T>;
  put<T>(index: number, params?: HttpParams, headers?: HttpHeaders): Observable<RestangularClient & T>;
  put<T>(
    indexOrParams?,
    paramsOrHeaders?,
    headers?,
  ) {
    let params: HttpParams;
    let index: number;
    switch (true) {
      case this.isCollection && this.fromServer: {
        index = indexOrParams as number;
        params = paramsOrHeaders as HttpParams;
        return (this[index] as RestangularClient).put(params, headers);
      }
      case !this.isCollection && typeof this.restangularId !== 'undefined':
      case this.isCollection && !this.fromServer: {
        throw new Error('Could not perform PUT request on collection. Should be Entity pointer');
      }
      default: {
        params = indexOrParams as HttpParams;
        headers = paramsOrHeaders as HttpHeaders;


        const method = 'PUT';
        const builder = this.builder;
        const req = new RestangularRequest({method, builder, body: {}, params, headers});
        return this.handler.handle(req);
      }
    }
  }

  patch<T>(
    object: any,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<HttpEvent<T>> {
    const method = 'PATCH';
    const builder = this.builder;
    const req = new RestangularRequest<T>({method, builder, params, headers});
    return this.handler.handle<T>(req);
  }

  delete<T>(
    params?: HttpParams,
    headers?: HttpHeaders,
  ) {

    const method = 'DELETE';
    const builder = this.builder;
    const req = new RestangularRequest({method, builder, params, headers});
    return this.handler.handle(req);
  }

  withConfig(options: any) {
    const handler = this.handler.withConfig(options);
    return new RestangularClient(this.builder, handler);
  }

  extendConfig(options: any) {
    const handler = this.handler.extendConfig(options);
    return new RestangularClient(this.builder, handler);
  }

  clone() {
    const clonedEntity = new RestangularClient(this.builder, this.handler, this.parent);
    return clonedEntity;
  }

  private restangularizeCollection(restangularClient: RestangularClient) {
    return (observable: Observable<any>) => observable.pipe(
      map((response: HttpResponse<any>) => {
        const collection = response.body;
        if (!Array.isArray(collection)) {
          throw new Error('response from collection pointer should be an Array');
        }
        const restangularizedCollection = collection.map((element) => {
          const clonedClient = restangularClient.one(element.id);
          return extendWithFields(clonedClient, element);
        });
        return extendWithFields(restangularClient.clone(), restangularizedCollection);
      })
    );
  }

  private restangularize(restangularClient: RestangularClient) {
    const clonedClient = restangularClient.clone();
    return (observable: Observable<any>) => observable.pipe(
      map((response: HttpResponse<any>) => {
        const object = response.body;
        return extendWithFields(clonedClient, object);
      })
    );
  }
}
