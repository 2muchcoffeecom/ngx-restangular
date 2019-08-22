import { Injectable } from '@angular/core';
import { HttpBackend, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';

import { RestangularHelper } from './ngx-restangular-helper';
import { catchError, filter, map } from 'rxjs/operators';
import { HttpEvent } from '@angular/common/http';

@Injectable()
export class RestangularHttp {

  constructor(public http: HttpBackend) {
  }

  createRequest(options): Observable<HttpEvent<any>> {
    const request = RestangularHelper.createRequest(options);

    return this.request(request);
  }

  request(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.http.handle(request)
    .pipe(
      filter(event => event instanceof HttpResponse),
      map((response: any) => {
        if (!response.ok) {
          return throwError(new HttpErrorResponse(response));
        }
        return response;
      }),
      map(response => {
        response.config = {params: request};
        return response;
      }),
      catchError(err => {
        err.request = request;
        err.data = err.error;
        err.repeatRequest = (newRequest?) => {
          return this.request(newRequest || request);
        };

        return throwError(err);
      })
    );
  }
}

