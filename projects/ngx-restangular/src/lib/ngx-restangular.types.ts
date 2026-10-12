import type { Observable } from 'rxjs';

import type { Restangular } from './ngx-restangular';

/**
 * Typed routes (beta). Describe your API once with module augmentation:
 *
 * ```ts
 * declare module 'ngx-restangular' {
 *   interface RestangularRoutes {
 *     accounts: {
 *       model: Account;
 *       methods: { label(): string };              // added with extendModel('accounts', ...)
 *       children: { buildings: { model: Building } };
 *     };
 *   }
 * }
 * ```
 *
 * While this interface is empty, every Restangular member stays `any`, as in 7.0.
 * Routes you don't register stay `any` too, at the top level and under a registered route.
 */
// tslint:disable-next-line:no-empty-interface
export interface RestangularRoutes {}

/** The shape of one entry in {@link RestangularRoutes}. */
export interface RestangularRoute {
  /** The data the server returns for one element of this route. */
  model: unknown;
  /** Methods you add to elements with `extendModel` or `addElementTransformer`. */
  methods?: object;
  /** Methods you add to collections with `extendCollection`. */
  collectionMethods?: object;
  /** Routes nested under one element of this route, as in `one('accounts', 1).all('buildings')`. */
  children?: Record<string, RestangularRoute>;
}

export type RestangularId = string | number;
export type RestangularParams = Record<string, any>;
export type RestangularHeaders = Record<string, any>;

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Untyped = keyof RestangularRoutes extends never ? true : false;
type RouteKey = keyof RestangularRoutes & string;
type ModelOf<N> = N extends { model: infer M } ? M : any;
type MethodsOf<N> = N extends { methods: infer X } ? X : {};
type CollectionMethodsOf<N> = N extends { collectionMethods: infer X } ? X : {};
type ChildrenOf<N> = N extends { children: infer C } ? C : any;
type ChildKey<N> = keyof ChildrenOf<N> & string;
type Child<N, K> = K extends keyof ChildrenOf<N> ? ChildrenOf<N>[K] : any;

/** Members Restangular writes onto every element. Model fields with the same names are shadowed. */
export interface RestangularElementMembers<N> {
  route: string;
  fromServer: boolean;
  restangularized: boolean;
  restangularCollection: false;
  parentResource: any;
  reqParams: any;
  singleOne?: boolean;
  restangularEtag?: string;

  get(params?: RestangularParams, headers?: RestangularHeaders): Observable<RestElement<N>>;
  getList<K extends ChildKey<N>>(route: K, params?: RestangularParams, headers?: RestangularHeaders): Observable<RestCollection<Child<N, K>>>;
  getList(route?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<any>;
  put(params?: RestangularParams, headers?: RestangularHeaders): Observable<RestElement<N>>;
  post<K extends ChildKey<N>>(route: K, element: Partial<ModelOf<Child<N, K>>>, params?: RestangularParams,
                              headers?: RestangularHeaders): Observable<RestElement<Child<N, K>>>;
  // Registered children can't reach this overload, so a bad body for them is an error rather than `any`.
  post<R extends string>(route: R extends ChildKey<N> ? never : R, element: any, params?: RestangularParams,
                         headers?: RestangularHeaders): Observable<any>;
  patch(element: Partial<ModelOf<N>>, params?: RestangularParams, headers?: RestangularHeaders): Observable<RestElement<N>>;
  remove(params?: RestangularParams, headers?: RestangularHeaders): Observable<any>;
  head(params?: RestangularParams, headers?: RestangularHeaders): Observable<any>;
  options(params?: RestangularParams, headers?: RestangularHeaders): Observable<any>;
  trace(params?: RestangularParams, headers?: RestangularHeaders): Observable<any>;
  save(params?: RestangularParams, headers?: RestangularHeaders): Observable<RestElement<N>>;

  customGET<T = any>(path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  customGETLIST<T = any>(path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  customDELETE<T = any>(path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  customPOST<T = any>(element?: any, path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  customPUT<T = any>(element?: any, path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  customPATCH<T = any>(element?: any, path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  customOperation<T = any>(operation: string, path?: string, params?: RestangularParams, headers?: RestangularHeaders,
                           element?: any): Observable<T>;
  doGET<T = any>(path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  doGETLIST<T = any>(path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  doDELETE<T = any>(path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  doPOST<T = any>(element?: any, path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  doPUT<T = any>(element?: any, path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  doPATCH<T = any>(element?: any, path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;

  plain(): ModelOf<N>;
  /** As in 6.x, `clone()` without an argument returns an empty element. `Restangular.copy(element)` copies. */
  clone(source?: any): any;
  getRestangularUrl(): string;
  getRequestedUrl(): string;
  getParentList(): any;
  withHttpConfig(config: RestangularParams): this;
  addRestangularMethod(name: string, operation: string, path?: string, params?: RestangularParams,
                       headers?: RestangularHeaders, element?: any): void;

  one<K extends ChildKey<N>>(route: K, id?: RestangularId, singleOne?: boolean): RestElement<Child<N, K>>;
  one(route: string, id?: RestangularId, singleOne?: boolean): any;
  all<K extends ChildKey<N>>(route: K): RestCollection<Child<N, K>>;
  all(route: string): any;
  several<K extends ChildKey<N>>(route: K, ...ids: RestangularId[]): RestCollection<Child<N, K>>;
  several(route: string, ...ids: RestangularId[]): any;
  oneUrl<K extends ChildKey<N>>(route: K, url: string): RestElement<Child<N, K>>;
  oneUrl(route: string, url: string): any;
  allUrl<K extends ChildKey<N>>(route: K, url: string): RestCollection<Child<N, K>>;
  allUrl(route: string, url: string): any;
}

/** Members Restangular writes onto every collection (an array of elements). */
export interface RestangularCollectionMembers<N> {
  route: string;
  fromServer: boolean;
  restangularized: boolean;
  restangularCollection: true;
  parentResource: any;
  reqParams: any;

  getList(params?: RestangularParams, headers?: RestangularHeaders): Observable<RestCollection<N>>;
  get(id: RestangularId, params?: RestangularParams, headers?: RestangularHeaders): Observable<RestElement<N>>;
  post(element: Partial<ModelOf<N>>, params?: RestangularParams, headers?: RestangularHeaders): Observable<RestElement<N>>;
  patch(element: any, params?: RestangularParams, headers?: RestangularHeaders): Observable<any>;
  remove(params?: RestangularParams, headers?: RestangularHeaders): Observable<any>;
  head(params?: RestangularParams, headers?: RestangularHeaders): Observable<any>;
  options(params?: RestangularParams, headers?: RestangularHeaders): Observable<any>;
  trace(params?: RestangularParams, headers?: RestangularHeaders): Observable<any>;
  putElement(index: number, params?: RestangularParams, headers?: RestangularHeaders): Observable<any>;

  customGET<T = any>(path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  customGETLIST<T = any>(path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  customDELETE<T = any>(path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  customPOST<T = any>(element?: any, path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  customPUT<T = any>(element?: any, path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  customPATCH<T = any>(element?: any, path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  customOperation<T = any>(operation: string, path?: string, params?: RestangularParams, headers?: RestangularHeaders,
                           element?: any): Observable<T>;
  doGET<T = any>(path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  doGETLIST<T = any>(path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  doDELETE<T = any>(path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  doPOST<T = any>(element?: any, path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  doPUT<T = any>(element?: any, path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;
  doPATCH<T = any>(element?: any, path?: string, params?: RestangularParams, headers?: RestangularHeaders): Observable<T>;

  plain(): ModelOf<N>[];
  clone(source?: any): any;
  getRestangularUrl(): string;
  getRequestedUrl(): string;
  withHttpConfig(config: RestangularParams): this;
  addRestangularMethod(name: string, operation: string, path?: string, params?: RestangularParams,
                       headers?: RestangularHeaders, element?: any): void;
  one(route: string, id?: RestangularId, singleOne?: boolean): any;
  all(route: string): any;
  several(route: string, ...ids: RestangularId[]): any;
  oneUrl(route: string, url: string): any;
  allUrl(route: string, url: string): any;
}

/** One element of route `N`: the model's fields plus Restangular's members. `any` for routes nobody registered. */
export type RestElement<N> = IsAny<N> extends true ? any
  : Omit<ModelOf<N>, keyof RestangularElementMembers<N>> & RestangularElementMembers<N> & MethodsOf<N>;

/** A collection of route `N`: an array of elements plus Restangular's collection members. */
export type RestCollection<N> = IsAny<N> extends true ? any
  : RestElement<N>[] & RestangularCollectionMembers<N> & CollectionMethodsOf<N>;

/** What `restangular.service('route')` returns. */
export interface RestangularResourceService<N> {
  one(id?: RestangularId, singleOne?: boolean): RestElement<N>;
  all(route: string): any;
  get(id: RestangularId, params?: RestangularParams, headers?: RestangularHeaders): Observable<RestElement<N>>;
  getList(params?: RestangularParams, headers?: RestangularHeaders): Observable<RestCollection<N>>;
  post(element: Partial<ModelOf<N>>, params?: RestangularParams, headers?: RestangularHeaders): Observable<RestElement<N>>;
  withHttpConfig(config: RestangularParams): RestCollection<N>;
}

/** Typed signatures of the injected service, used once at least one route is registered. */
export interface RestangularTypedService {
  one<K extends RouteKey>(route: K, id?: RestangularId, singleOne?: boolean): RestElement<RestangularRoutes[K]>;
  one(route: string, id?: RestangularId, singleOne?: boolean): any;
  all<K extends RouteKey>(route: K): RestCollection<RestangularRoutes[K]>;
  all(route: string): any;
  several<K extends RouteKey>(route: K, ...ids: RestangularId[]): RestCollection<RestangularRoutes[K]>;
  several(route: string, ...ids: RestangularId[]): any;
  oneUrl<K extends RouteKey>(route: K, url: string): RestElement<RestangularRoutes[K]>;
  oneUrl(route: string, url: string): any;
  allUrl<K extends RouteKey>(route: K, url: string): RestCollection<RestangularRoutes[K]>;
  allUrl(route: string, url: string): any;
  service<K extends RouteKey>(route: K, parent?: any): RestangularResourceService<RestangularRoutes[K]>;
  service(route: string, parent?: any): any;
  restangularizeElement<K extends RouteKey>(parent: any, element: object, route: K, fromServer?: boolean,
                                            collection?: any, reqParams?: any): RestElement<RestangularRoutes[K]>;
  restangularizeElement(parent: any, element: any, route: string, fromServer?: boolean, collection?: any, reqParams?: any): any;
  restangularizeCollection<K extends RouteKey>(parent: any, elements: object[], route: K): RestCollection<RestangularRoutes[K]>;
  restangularizeCollection(parent: any, elements: any, route: string): any;
  copy<T>(element: T): T;
  withConfig(configurer: (configurer: any) => void): Restangular;
}

/** `any` until a route is registered, then the typed signature. */
export type RestangularMember<K extends keyof RestangularTypedService> = Untyped extends true ? any : RestangularTypedService[K];
