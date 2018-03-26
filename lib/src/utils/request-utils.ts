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
