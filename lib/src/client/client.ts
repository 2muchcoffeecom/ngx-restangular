import { HttpHeaders, HttpParams } from '@angular/common/http';

import { RestangularHandler } from '../handler';
import { RestangularBuilder } from '../builder';
import { Restangular } from '../restangular';
import { RestangularRequest } from '../backend';

export class RestangularClient implements Restangular {

  constructor(
    private builder: RestangularBuilder,
    private handler: RestangularHandler,
    private parent?: RestangularClient,
  ) {
  }

  /**
   * Dublicates RestangualarBuidler interfaces
   */
  one(id: string | number): RestangularClient;
  one(route: string, id?: string | number): RestangularClient;
  one(routeOrId, id?): RestangularClient {
    const builder = this.builder.one(routeOrId, id);
    return new RestangularClient(builder, this.handler);
  }

  /**
   * Dublicates RestangualarBuidler interfaces
   */
  all(route: string): RestangularClient {
    const builder = this.builder.all(route);
    return new RestangularClient(builder, this.handler);
  }

  /**
   * Method to make GET request to pointer
   */
  get(
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ) {
    const req = new RestangularRequest('GET', this.builder.pointer, {params, headers});
    return this.handler.handle(req);
  }

  /**
   * Method to make POST request to pointer
   */
  post<T>(
    body,
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ) {
    const req = new RestangularRequest('POST', this.builder.pointer, body, {params, headers});
    return this.handler.handle(req);
  }

  /**
   * Method to make PUT request to pointer
   */
  put<T>(
    body,
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ) {
    const req = new RestangularRequest('PUT', this.builder.pointer, body, {params, headers});
    return this.handler.handle(req);
  }

  /**
   * Method to make PATCH request to pointer
   */
  patch<T>(
    body,
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ) {
    const req = new RestangularRequest('PATCH', this.builder.pointer, body, {params, headers});
    return this.handler.handle(req);
  }

  /**
   * Method to make DELETE request to pointer
   */
  delete<T>(
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ) {
    const req = new RestangularRequest('DELETE', this.builder.pointer, {params, headers});
    return this.handler.handle(req);
  }

  /**
   * Dublicates RestangualarHandler interfaces
   */
  withConfig(options: any) {
    const handler = this.handler.withConfig(options);
    return new RestangularClient(this.builder, handler);
  }

  /**
   * Dublicates RestangualarHandler interfaces
   */
  extendConfig(options: any) {
    const handler = this.handler.extendConfig(options);
    return new RestangularClient(this.builder, handler);
  }
}
