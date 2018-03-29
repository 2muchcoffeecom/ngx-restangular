import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { RestangularBuilder } from './builder';
import { RestangularClient } from './client';
import { RestangularHandler } from './handler';

export abstract class Restangular {

  abstract one(id: string | number): RestangularEntity;
  abstract one(route: string, id?: string | number): RestangularEntity;

  abstract all(route: string): RestangularCollection;

  abstract extendConfig(options: any): Restangular;

  abstract withConfig(options: any): Restangular;
}

export abstract class RestangularEntity extends Restangular {
  abstract getList<T>(
    route: string,
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ): Observable<T & RestangularCollection>;

  abstract get<T>(
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ): Observable<T & RestangularEntity>;

  abstract put<T>(
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ): Observable<T & RestangularEntity>;

  abstract post<T>(
    route: string,
    body: T,
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ): Observable<T & RestangularEntity>;
}

export abstract class RestangularCollection extends Restangular {
  abstract getList<T>(
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ): Observable<RestangularCollectionFromServer<T>>;

  abstract get(
    id: string | number,
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ): any;

  abstract post<T>(
    body: T,
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ): any;
}

export abstract class RestangularCollectionFromServer<V> extends RestangularCollection {
  [key: number]: (V & RestangularEntity);

  abstract put<T>(
    index: number,
    params?: HttpParams | string | { [name: string]: string | string[] },
    headers?: HttpHeaders | string | { [name: string]: string | string[] },
  ): Observable<T & RestangularEntity>;
}
