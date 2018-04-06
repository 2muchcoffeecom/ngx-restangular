import { HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { addToHttpHeaders, addToHttpParams, toHttpHeaders, toHttpParams } from '../utils/request-utils';
import { RestangularBuilder } from '../builder';

function mightHaveBody(method: string): boolean {
  switch (method) {
    case 'DELETE':
    case 'GET':
    case 'HEAD':
    case 'OPTIONS':
    case 'JSONP':
      return false;
    default:
      return true;
  }
}

export interface RestangularRequestOptions {
  baseUrl?: string;
  headers?: HttpHeaders | string | { [key: string]: string | string[] };
  reportProgress?: boolean;
  withCredentials?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  params?: HttpParams | string | { [key: string]: string | string[] };
}

export class RestangularRequest<T> {

  readonly builder: RestangularBuilder;

  readonly method: string;

  readonly body: T | null = null;

  readonly headers: HttpHeaders;

  readonly params: HttpParams;

  constructor(
    {builder, method, body, headers, params}: {
      method: string,
      builder: RestangularBuilder,
      body?: T | null,
      headers?: HttpHeaders,
      params?: HttpParams,
    },
  ) {
    this.builder = builder;
    this.method = method;
    this.body = body || this.body;
    this.headers = headers;
    this.params = params;
  }
}
