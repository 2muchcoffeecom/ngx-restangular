import { HttpHeaders, HttpParams } from '@angular/common/http';

export function toHttpHeaders(headers: HttpHeaders | string | { [name: string]: string | string[] }): HttpHeaders {
  if (headers instanceof HttpHeaders) {
    return headers;
  } else if (typeof headers === 'object' || typeof headers === 'string') {
    return new HttpHeaders(headers);
  } else {
    return new HttpHeaders();
  }
}

export function toHttpParams(params: HttpParams | string | { [name: string]: string | string[] }): HttpParams {
  if (params instanceof HttpParams) {
    return params;
  } else if (typeof params === 'object') {
    return new HttpParams({fromObject: params});
  } else if (typeof params === 'string') {
    return new HttpParams({fromString: params});
  } else {
    return new HttpParams();
  }
}

export function addToHttpHeaders(this: HttpHeaders, headers: HttpHeaders | { [name: string]: string | string[] }) {
  if (headers instanceof HttpHeaders) {
    return headers.keys().reduce((existing: HttpHeaders, key) => existing.set(key, headers.get(key)), this);
  } else if (typeof headers === 'object') {
    return Object.keys(headers).reduce((existing: HttpHeaders, key) => existing.set(key, headers[key]), this);
  } else {
    return this;
  }
}

export function addToHttpParams(this: HttpParams, params: HttpParams | { [name: string]: string  }) {
  if (params instanceof HttpParams) {
    return params.keys().reduce((existing: HttpParams, key) => existing.set(key, params.get(key)), this);
  } else if (typeof params === 'object') {
    return Object.keys(params).reduce((existing: HttpParams, key) => existing.set(key, params[key]), this);
  } else {
    return this;
  }
}
