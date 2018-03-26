import { HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { toHttpHeaders, toHttpParams } from '../utils/request-utils';

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
  headers?: HttpHeaders | string | { [key: string]: string | string[] };
  params?: HttpParams | string | { [key: string]: string | string[] };
}

export class RestangularRequest<T> {

  readonly body: T | null = null;

  readonly headers: HttpHeaders;

  readonly reportProgress: boolean = false;

  readonly withCredentials: boolean = false;

  readonly responseType: 'arraybuffer' | 'blob' | 'json' | 'text' = 'json';

  readonly method: string;

  readonly params: HttpParams;

  constructor(
    method: 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS',
    pointer: string[],
    options?: {
      headers?: HttpHeaders | string | { [key: string]: string | string[] },
      params?: HttpParams | string | { [key: string]: string | string[] },
    },
  )
  constructor(
    method: 'POST' | 'PUT' | 'PATCH' | string,
    pointer: string[],
    body?: T | null,
    options?: {
      headers?: HttpHeaders | string | { [key: string]: string | string[] },
      params?: HttpParams | string | { [key: string]: string | string[] },
    },
  )
  constructor(
    method: string,
    readonly pointer: string[],
    third?: T | {
      headers?: HttpHeaders | string | { [key: string]: string | string[] },
      params?: HttpParams | string | { [key: string]: string | string[] },

    },
    fourth?: {
      headers?: HttpHeaders | string | { [key: string]: string | string[] },
      params?: HttpParams | string | { [key: string]: string | string[] },
    },
  ) {
    this.method = method.toUpperCase();

    let options: RestangularRequestOptions | undefined;

    if (mightHaveBody(this.method) || !!fourth) {
      this.body = (third !== undefined) ? third as T : null;
      options = fourth;
    } else {
      options = third as RestangularRequestOptions;
    }

    this.headers = toHttpHeaders(options.headers);

    this.params = toHttpParams(options.params);
  }

  toHttpRequest() {
    return new HttpRequest<T>(this.method as any, this.pointer.join('/'), this.body, {
      headers: this.headers,
      reportProgress: this.reportProgress,
      params: this.params,
      responseType: this.responseType,
      withCredentials: this.withCredentials,
    });
  }
}
