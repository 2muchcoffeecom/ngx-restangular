import { HttpHeaders } from '@angular/common/http';

import { RestangularHandler } from '../handler';
import { RestangularBuilder } from '../builder';
import { RestangularRequest } from '../backend';
import { RestangularHeaders, RestangularParams } from '../interfaces';

export class RestangularClient {

  constructor(
    private builder: RestangularBuilder,
    private handler: RestangularHandler,
    private parent?: RestangularClient,
  ) {
  }

  one(routeOrId, id?): RestangularClient {
    const builder = this.builder.one(routeOrId, id);
    return new RestangularClient(builder, this.handler);
  }

  all(route): RestangularClient {
    const builder = this.builder.all(route);
    return new RestangularClient(builder, this.handler);
  }

  get(
    paramsOrId?: RestangularParams | string | number,
    paramsOrHeaders?: RestangularParams | RestangularHeaders,
    headers?: RestangularHeaders,
  ) {
    let id: string | number;
    let params: RestangularParams;
    if (this.builder.isCollection) {
      id = paramsOrId as string | number;
      params = paramsOrHeaders as RestangularParams;
      return this.one(id).get(params, headers);
    }
    params = paramsOrId as RestangularParams;
    headers = paramsOrHeaders as RestangularHeaders;
    const req = new RestangularRequest('GET', this.builder.pointer, {params, headers});
    return this.handler.handle(req);
  }


  getList(
    routeOrParams?: string | RestangularParams,
    paramsOrHeaders?: RestangularParams | RestangularHeaders,
    headers?: RestangularHeaders,
  ) {
    let route: string;
    let params: RestangularParams;
    if (!this.builder.isCollection && typeof routeOrParams === 'string') {
      route = routeOrParams;
      params = paramsOrHeaders as RestangularParams;
      return this.all(route).getList(params, headers);
    }
    params = routeOrParams;
    headers = paramsOrHeaders as HttpHeaders;
    const req = new RestangularRequest('GET', this.builder.pointer, {params, headers});
    return this.handler.handle(req);
  }

  post<T>(
    body: T,
    params?: RestangularParams,
    headers?: RestangularHeaders,
  ) {
    const req = new RestangularRequest('POST', this.builder.pointer, body, {params, headers});
    return this.handler.handle(req);
  }

  put<T>(
    body,
    params?,
    headers?,
  ) {
    const req = new RestangularRequest('PUT', this.builder.pointer, body, {params, headers});
    return this.handler.handle(req);
  }

  patch<T>(
    body,
    params?,
    headers?,
  ) {
    const req = new RestangularRequest('PATCH', this.builder.pointer, body, {params, headers});
    return this.handler.handle(req);
  }

  delete<T>(
    params?,
    headers?,
  ) {
    const req = new RestangularRequest('DELETE', this.builder.pointer, {params, headers});
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
}
