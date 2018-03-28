import { HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { addToHttpHeaders, addToHttpParams, toHttpHeaders, toHttpParams } from '../utils/request-utils';

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

  baseUrl: string;

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
      baseUrl?: string,
      headers?: HttpHeaders | string | { [key: string]: string | string[] },
      reportProgress?: boolean,
      withCredentials?: boolean,
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
      method?: string,
      params?: HttpParams | string | { [key: string]: string | string[] },
    },
  )
  constructor(
    method: 'POST' | 'PUT' | 'PATCH' | string,
    pointer: string[],
    body?: T | null,
    options?: {
      baseUrl?: string,
      headers?: HttpHeaders | string | { [key: string]: string | string[] },
      reportProgress?: boolean,
      withCredentials?: boolean,
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
      params?: HttpParams | string | { [key: string]: string | string[] },
    },
  )
  constructor(
    method: string,
    readonly pointer: string[],
    third?: T | {
      baseUrl?: string,
      body?: T | null,
      headers?: HttpHeaders | string | { [key: string]: string | string[] },
      reportProgress?: boolean,
      withCredentials?: boolean,
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
      params?: HttpParams | string | { [key: string]: string | string[] },
    },
    fourth?: {
      baseUrl?: string,
      body?: T | null,
      headers?: HttpHeaders | string | { [key: string]: string | string[] },
      reportProgress?: boolean,
      withCredentials?: boolean,
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
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

    if (options) {
      // Normalize reportProgress and withCredentials.
      this.reportProgress = !!options.reportProgress;
      this.withCredentials = !!options.withCredentials;

      // Override default response type of 'json' if one is provided.
      if (!!options.responseType) {
        this.responseType = options.responseType;
      }

      if (!!options.baseUrl) {
        this.baseUrl = options.baseUrl;
      }

      this.headers = toHttpHeaders(options.headers);

      this.params = toHttpParams(options.params);
    }
  }

  clone(update: {
    baseUrl?: string,
    body?: T | null,
    headers?: HttpHeaders | string | { [key: string]: string | string[] },
    setHeaders?: HttpHeaders | { [key: string]: string | string[] },
    reportProgress?: boolean,
    withCredentials?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    method?: string,
    params?: HttpParams | string | { [key: string]: string | string[] },
    setParams?: HttpParams | { [key: string]: string },
    pointer?: string[],
  }): RestangularRequest<T> {
    const method = update.method || this.method;
    const pointer = update.pointer || this.pointer;
    const responseType = update.responseType || this.responseType;
    const baseUrl = update.baseUrl || this.baseUrl;

    const body = (update.body !== undefined) ? update.body : this.body;

    const withCredentials =
      (update.withCredentials !== undefined) ? update.withCredentials : this.withCredentials;
    const reportProgress =
      (update.reportProgress !== undefined) ? update.reportProgress : this.reportProgress;

    let headers = (update.headers && toHttpHeaders(update.headers)) || this.headers;
    let params = (update.params && toHttpParams(update.params)) || this.params;

    if (update.setHeaders !== undefined) {
      // Set every requested header.
      headers = addToHttpHeaders.call(headers, update.setHeaders);
    }

    // Check whether the caller has asked to set params.
    if (update.setParams) {
      // Set every requested param.
      params = addToHttpParams.call(params, update.params);
    }

    return new RestangularRequest<T>(method, pointer, body, {
      responseType, withCredentials, reportProgress, headers, params, baseUrl
    });
  }

  toHttpRequest() {
    return new HttpRequest<T>(this.method as any, [this.baseUrl, ...this.pointer].join('/'), this.body, {
      headers: this.headers,
      reportProgress: this.reportProgress,
      params: this.params,
      responseType: this.responseType,
      withCredentials: this.withCredentials,
    });
  }
}
