import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Restangular, RestangularModule } from '../public_api';

const BASE = 'http://api.test/v1';

function setup(config?: (provider: any) => void) {
  TestBed.configureTestingModule({
    imports: [
      RestangularModule.forRoot((provider: any) => {
        provider.setBaseUrl(BASE + '/');
        if (config) {
          config(provider);
        }
      }),
    ],
    providers: [provideHttpClientTesting()],
  });
  return {
    rest: TestBed.inject(Restangular) as any,
    http: TestBed.inject(HttpTestingController),
  };
}

function fetchAccount(rest: any, http: HttpTestingController, body: any = {id: 1, name: 'Acme'}, headers?: any) {
  let account: any;
  rest.one('accounts', body.id).get().subscribe((res: any) => account = res);
  http.expectOne(`${BASE}/accounts/${body.id}`).flush(body, {headers});
  return account;
}

function fetchAccounts(rest: any, http: HttpTestingController, body: any[] = [{id: 1, name: 'a'}, {id: 2, name: 'b'}]) {
  let accounts: any;
  rest.all('accounts').getList().subscribe((res: any) => accounts = res);
  http.expectOne(`${BASE}/accounts`).flush(body);
  return accounts;
}

describe('Restangular', () => {
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  describe('URL building', () => {
    it('strips the trailing slash from the base URL', () => {
      const {rest} = setup();
      expect(rest.configuration.baseUrl).toBe(BASE);
    });

    it('builds element URLs with one()', () => {
      const {rest, http} = setup();
      rest.one('accounts', 123).get().subscribe();
      const req = http.expectOne(`${BASE}/accounts/123`);
      expect(req.request.method).toBe('GET');
      req.flush({id: 123});
    });

    it('builds collection URLs with all()', () => {
      const {rest, http} = setup();
      rest.all('accounts').getList().subscribe();
      http.expectOne(`${BASE}/accounts`).flush([]);
    });

    it('nests one() and all()', () => {
      const {rest, http} = setup();
      rest.one('accounts', 1).all('buildings').getList().subscribe();
      http.expectOne(`${BASE}/accounts/1/buildings`).flush([]);
      rest.one('accounts', 1).one('buildings', 2).get().subscribe();
      http.expectOne(`${BASE}/accounts/1/buildings/2`).flush({id: 2});
    });

    it('joins ids with several()', () => {
      const {rest, http} = setup();
      rest.several('accounts', 1, 2, 3).getList().subscribe();
      http.expectOne(`${BASE}/accounts/1,2,3`).flush([]);
    });

    it('appends the suffix from setRequestSuffix()', () => {
      const {rest, http} = setup(p => p.setRequestSuffix('.json'));
      rest.one('accounts', 1).get().subscribe();
      http.expectOne(`${BASE}/accounts/1.json`).flush({id: 1});
      rest.all('accounts').getList().subscribe();
      http.expectOne(`${BASE}/accounts.json`).flush([]);
    });

    it('uses an absolute self link from oneUrl() and allUrl()', () => {
      const {rest, http} = setup();
      rest.oneUrl('googlers', 'http://other.test/googlers/1').get().subscribe();
      http.expectOne('http://other.test/googlers/1').flush({id: 1});
      rest.allUrl('search', 'http://other.test/search').getList().subscribe();
      http.expectOne('http://other.test/search').flush([]);
    });

    it('encodes ids unless setEncodeIds(false)', () => {
      const {rest, http} = setup();
      rest.one('files', 'a b/c').get().subscribe();
      http.expectOne(`${BASE}/files/a%20b%2Fc`).flush({});
      rest.setEncodeIds(false);
      rest.one('files', 'a b').get().subscribe();
      http.expectOne(`${BASE}/files/a b`).flush({});
    });

    it('drops the parent for routes passed to setParentless()', () => {
      const {rest, http} = setup(p => p.setParentless(['buildings']));
      rest.one('accounts', 1).one('buildings', 2).get().subscribe();
      http.expectOne(`${BASE}/buildings/2`).flush({id: 2});
    });

    it('omits the id of a singleOne element', () => {
      const {rest, http} = setup();
      rest.one('accounts', 1).one('profile', 99, true).get().subscribe();
      http.expectOne(`${BASE}/accounts/1/profile`).flush({});
    });

    it('reads ids from a custom id field', () => {
      const {rest, http} = setup(p => p.setRestangularFields({id: '_id'}));
      rest.one('accounts', 'abc').get().subscribe();
      http.expectOne(`${BASE}/accounts/abc`).flush({_id: 'abc'});

      let accounts: any;
      rest.all('accounts').getList().subscribe((res: any) => accounts = res);
      http.expectOne(`${BASE}/accounts`).flush([{_id: 'x1'}]);
      expect(accounts[0].getRestangularUrl()).toBe(`${BASE}/accounts/x1`);
    });

    it('reads ids from a nested id field', () => {
      const {rest, http} = setup(p => p.setRestangularFields({id: 'meta.id'}));
      rest.one('accounts', 5).get().subscribe();
      http.expectOne(`${BASE}/accounts/5`).flush({meta: {id: 5}});
    });

    it('keeps using the original id with setUseCannonicalId(true)', () => {
      const {rest, http} = setup(p => p.setUseCannonicalId(true));
      const account = fetchAccount(rest, http);
      account.id = 2;
      account.put().subscribe();
      const req = http.expectOne(`${BASE}/accounts/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body.id).toBe(2);
      req.flush({id: 2});
    });

    it('returns element URLs synchronously', () => {
      const {rest} = setup();
      expect(rest.one('accounts', 1).getRestangularUrl()).toBe(`${BASE}/accounts/1`);
      expect(rest.one('accounts', 1).all('buildings').getRestangularUrl()).toBe(`${BASE}/accounts/1/buildings`);
      expect(rest.one('accounts', 1).getRequestedUrl()).toBe(`${BASE}/accounts/1`);
    });
  });

  describe('elements returned from the server', () => {
    it('restangularizes a fetched element', () => {
      const {rest, http} = setup();
      const account = fetchAccount(rest, http);
      expect(account.id).toBe(1);
      expect(account.name).toBe('Acme');
      expect(account.route).toBe('accounts');
      expect(account.fromServer).toBe(true);
      expect(typeof account.get).toBe('function');
      expect(account.getRestangularUrl()).toBe(`${BASE}/accounts/1`);
    });

    it('restangularizes a fetched collection and its elements', () => {
      const {rest, http} = setup();
      const accounts = fetchAccounts(rest, http);
      expect(Array.isArray(accounts)).toBe(true);
      expect(accounts.length).toBe(2);
      expect(accounts.route).toBe('accounts');
      expect(typeof accounts.getList).toBe('function');
      expect(accounts[1].getRestangularUrl()).toBe(`${BASE}/accounts/2`);
      expect(accounts[0].getParentList()).toEqual(accounts[0].getParentList());
      expect(accounts[0].getParentList().length).toBe(2);
    });

    it('keeps the parent chain on nested collection elements', () => {
      const {rest, http} = setup();
      let buildings: any;
      rest.one('accounts', 1).all('buildings').getList().subscribe((res: any) => buildings = res);
      http.expectOne(`${BASE}/accounts/1/buildings`).flush([{id: 7}]);
      expect(buildings[0].getRestangularUrl()).toBe(`${BASE}/accounts/1/buildings/7`);

      buildings[0].all('floors').getList().subscribe();
      http.expectOne(`${BASE}/accounts/1/buildings/7/floors`).flush([]);
    });

    it('strips Restangular fields with plain() and stripRestangular()', () => {
      const {rest, http} = setup();
      const accounts = fetchAccounts(rest, http);
      expect(accounts[0].plain()).toEqual({id: 1, name: 'a'});
      expect(rest.stripRestangular(accounts)).toEqual([{id: 1, name: 'a'}, {id: 2, name: 'b'}]);
    });

    it('restangularizes plain data with restangularizeElement() and restangularizeCollection()', () => {
      const {rest} = setup();
      const element = rest.restangularizeElement(null, {id: 4, name: 'x'}, 'accounts');
      expect(element.getRestangularUrl()).toBe(`${BASE}/accounts/4`);
      expect(element.fromServer).toBe(false);

      const collection = rest.restangularizeCollection(null, [{id: 5}], 'accounts');
      expect(collection.getRestangularUrl()).toBe(`${BASE}/accounts`);
      expect(collection[0].getRestangularUrl()).toBe(`${BASE}/accounts/5`);
    });

    it('copies elements with copy()', () => {
      const {rest, http} = setup();
      const account = fetchAccount(rest, http);
      const copied = rest.copy(account);
      expect(copied).not.toBe(account);
      expect(copied.name).toBe('Acme');
      expect(copied.getRestangularUrl()).toBe(`${BASE}/accounts/1`);
    });

    // Known 6.x bug, kept as-is in 7.0: clone() is bound without the element as its argument,
    // so it copies nothing. AngularJS Restangular bound it as bind(copy, elem, elem).
    it('returns an empty element from clone() called without arguments (6.x behavior)', () => {
      const {rest, http} = setup();
      const account = fetchAccount(rest, http);
      const cloned = account.clone();
      expect(cloned).not.toBe(account);
      expect(cloned.name).toBeUndefined();
      expect(account.clone(account).name).toBe('Acme');
    });
  });

  describe('HTTP methods', () => {
    it('sends the request without waiting for a subscriber', () => {
      const {rest, http} = setup();
      rest.one('accounts', 1).get();
      http.expectOne(`${BASE}/accounts/1`).flush({id: 1});
    });

    it('posts to a collection and restangularizes the created element', () => {
      const {rest, http} = setup();
      let created: any;
      rest.all('accounts').post({name: 'new'}).subscribe((res: any) => created = res);
      const req = http.expectOne(`${BASE}/accounts`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({name: 'new'});
      req.flush({id: 9, name: 'new'});
      expect(created.getRestangularUrl()).toBe(`${BASE}/accounts/9`);
    });

    it('puts the element without its Restangular fields', () => {
      const {rest, http} = setup();
      const account = fetchAccount(rest, http);
      account.name = 'Renamed';
      account.put().subscribe();
      const req = http.expectOne(`${BASE}/accounts/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({id: 1, name: 'Renamed'});
      req.flush({id: 1, name: 'Renamed'});
    });

    it('removes, patches and sends HEAD, OPTIONS and TRACE', () => {
      const {rest, http} = setup();
      const account = fetchAccount(rest, http);

      account.remove().subscribe();
      expect(http.expectOne(`${BASE}/accounts/1`).request.method).toBe('DELETE');

      account.patch({name: 'B'}).subscribe();
      const patch = http.expectOne(`${BASE}/accounts/1`);
      expect(patch.request.method).toBe('PATCH');
      expect(patch.request.body).toEqual({name: 'B'});

      account.head().subscribe();
      expect(http.expectOne(`${BASE}/accounts/1`).request.method).toBe('HEAD');
      account.options().subscribe();
      expect(http.expectOne(`${BASE}/accounts/1`).request.method).toBe('OPTIONS');
      account.trace().subscribe();
      expect(http.expectOne(`${BASE}/accounts/1`).request.method).toBe('TRACE');
    });

    it('gets a collection member by id with get()', () => {
      const {rest, http} = setup();
      rest.all('accounts').get(5).subscribe();
      http.expectOne(`${BASE}/accounts/5`).flush({id: 5});
    });

    it('sends custom requests with custom* and do*', () => {
      const {rest, http} = setup();
      const account = rest.one('accounts', 1);

      account.customGET('stats', {range: 'week'}).subscribe();
      const get = http.expectOne(r => r.url === `${BASE}/accounts/1/stats`);
      expect(get.request.method).toBe('GET');
      expect(get.request.params.get('range')).toBe('week');
      get.flush({});

      account.customPOST({a: 1}, 'activate', {force: true}, {'X-Req': 'y'}).subscribe();
      const post = http.expectOne(r => r.url === `${BASE}/accounts/1/activate`);
      expect(post.request.method).toBe('POST');
      expect(post.request.body).toEqual({a: 1});
      expect(String(post.request.params.get('force'))).toBe('true');
      expect(post.request.headers.get('X-Req')).toBe('y');
      post.flush({});

      account.customPUT({b: 2}, 'settings').subscribe();
      const put = http.expectOne(`${BASE}/accounts/1/settings`);
      expect(put.request.method).toBe('PUT');
      expect(put.request.body).toEqual({b: 2});
      put.flush({});

      account.customPATCH({c: 3}, 'settings').subscribe();
      expect(http.expectOne(`${BASE}/accounts/1/settings`).request.method).toBe('PATCH');

      account.customDELETE('sessions').subscribe();
      expect(http.expectOne(`${BASE}/accounts/1/sessions`).request.method).toBe('DELETE');

      account.doGET('raw').subscribe();
      expect(http.expectOne(`${BASE}/accounts/1/raw`).request.method).toBe('GET');
    });

    it('fetches nested lists with customGETLIST()', () => {
      const {rest, http} = setup();
      let buildings: any;
      rest.one('accounts', 1).customGETLIST('buildings').subscribe((res: any) => buildings = res);
      http.expectOne(`${BASE}/accounts/1/buildings`).flush([{id: 5}]);
      expect(buildings[0].getRestangularUrl()).toBe(`${BASE}/accounts/1/buildings/5`);
    });

    it('posts new elements and puts fetched ones with save()', () => {
      const {rest, http} = setup();
      const draft = rest.restangularizeElement(null, {name: 'N'}, 'accounts');
      let saved: any;
      draft.save().subscribe((res: any) => saved = res);
      const post = http.expectOne(`${BASE}/accounts`);
      expect(post.request.method).toBe('POST');
      expect(post.request.body).toEqual({name: 'N'});
      post.flush({id: 3, name: 'N'});

      expect(saved.fromServer).toBe(true);
      saved.save().subscribe();
      expect(http.expectOne(`${BASE}/accounts/3`).request.method).toBe('PUT');
    });

    it('puts a collection member with putElement()', () => {
      const {rest, http} = setup();
      const accounts = fetchAccounts(rest, http);
      let result: any;
      accounts.putElement(1).subscribe((res: any) => result = res);
      const req = http.expectOne(`${BASE}/accounts/2`);
      expect(req.request.method).toBe('PUT');
      req.flush({id: 2, name: 'b2'});
      expect(result[1].name).toBe('b2');
    });

    it('adds methods with addRestangularMethod()', () => {
      const {rest, http} = setup();
      const accounts = rest.all('accounts');
      accounts.addRestangularMethod('search', 'get', 'search');
      accounts.addRestangularMethod('archived', 'getList', 'archived');
      accounts.addRestangularMethod('merge', 'post', 'merge');

      accounts.search({q: 'x'}).subscribe();
      const search = http.expectOne(r => r.url === `${BASE}/accounts/search`);
      expect(search.request.params.get('q')).toBe('x');
      search.flush({});

      let archived: any;
      accounts.archived().subscribe((res: any) => archived = res);
      http.expectOne(`${BASE}/accounts/archived`).flush([{id: 8}]);
      expect(archived.length).toBe(1);

      accounts.merge({ids: [1, 2]}).subscribe();
      const merge = http.expectOne(`${BASE}/accounts/merge`);
      expect(merge.request.method).toBe('POST');
      expect(merge.request.body).toEqual({ids: [1, 2]});
      merge.flush({});
    });

    it('tunnels overridden methods through POST', () => {
      const {rest, http} = setup(p => p.setMethodOverriders(['put', 'delete']));
      const account = rest.one('accounts', 1);

      account.put().subscribe();
      const put = http.expectOne(`${BASE}/accounts/1`);
      expect(put.request.method).toBe('POST');
      expect(put.request.headers.get('X-HTTP-Method-Override')).toBe('PUT');
      put.flush({id: 1});

      account.remove().subscribe();
      const remove = http.expectOne(`${BASE}/accounts/1`);
      expect(remove.request.method).toBe('POST');
      expect(remove.request.headers.get('X-HTTP-Method-Override')).toBe('DELETE');
    });

    it('sends JSONP requests after setJsonp(true)', () => {
      const {rest, http} = setup(p => p.setJsonp(true));
      rest.one('accounts', 1).get().subscribe();
      expect(http.expectOne(`${BASE}/accounts/1`).request.method).toBe('JSONP');
      rest.all('accounts').getList().subscribe();
      expect(http.expectOne(`${BASE}/accounts`).request.method).toBe('JSONP');
    });
  });

  describe('query params and headers', () => {
    it('serializes arrays as repeated params and objects as JSON', () => {
      const {rest, http} = setup();
      rest.all('accounts').getList({page: 2, tags: ['a', 'b'], filter: {x: 1}}).subscribe();
      const req = http.expectOne(r => r.url === `${BASE}/accounts`);
      expect(String(req.request.params.get('page'))).toBe('2');
      expect(req.request.params.getAll('tags')).toEqual(['a', 'b']);
      expect(req.request.params.get('filter')).toBe('{"x":1}');
      req.flush([]);
    });

    it('drops headers whose value is undefined', () => {
      const {rest, http} = setup();
      rest.all('accounts').getList(undefined, {'X-A': '1', 'X-B': undefined}).subscribe();
      const req = http.expectOne(`${BASE}/accounts`);
      expect(req.request.headers.get('X-A')).toBe('1');
      expect(req.request.headers.has('X-B')).toBe(false);
      req.flush([]);
    });

    it('applies default headers, with per-call headers taking precedence', () => {
      const {rest, http} = setup(p => p.setDefaultHeaders({Authorization: 'Bearer t', 'X-App': 'demo'}));
      rest.one('accounts', 1).get().subscribe();
      const first = http.expectOne(`${BASE}/accounts/1`);
      expect(first.request.headers.get('Authorization')).toBe('Bearer t');
      expect(first.request.headers.get('X-App')).toBe('demo');
      first.flush({id: 1});

      rest.one('accounts', 1).get(undefined, {Authorization: 'Bearer other'}).subscribe();
      const second = http.expectOne(`${BASE}/accounts/1`);
      expect(second.request.headers.get('Authorization')).toBe('Bearer other');
      second.flush({id: 1});
    });

    it('lets the injected service change default headers at runtime', () => {
      const {rest, http} = setup();
      rest.setDefaultHeaders({Authorization: 'Bearer after-login'});
      rest.all('accounts').getList().subscribe();
      const req = http.expectOne(`${BASE}/accounts`);
      expect(req.request.headers.get('Authorization')).toBe('Bearer after-login');
      req.flush([]);
    });

    it('applies common and per-method default request params', () => {
      const {rest, http} = setup(p => {
        p.setDefaultRequestParams({apiKey: 'k'});
        p.setDefaultRequestParams('get', {cache: 'no'});
      });
      rest.all('accounts').getList().subscribe();
      const get = http.expectOne(r => r.url === `${BASE}/accounts` && r.method === 'GET');
      expect(get.request.params.get('apiKey')).toBe('k');
      expect(get.request.params.get('cache')).toBe('no');
      get.flush([]);

      rest.all('accounts').post({}).subscribe();
      const post = http.expectOne(r => r.url === `${BASE}/accounts` && r.method === 'POST');
      expect(post.request.params.get('apiKey')).toBe('k');
      expect(post.request.params.has('cache')).toBe(false);
      post.flush({id: 1});
    });

    it('applies default and per-request HTTP fields', () => {
      const {rest, http} = setup(p => p.setDefaultHttpFields({withCredentials: true}));
      rest.one('accounts', 1).get().subscribe();
      expect(http.expectOne(`${BASE}/accounts/1`).request.withCredentials).toBe(true);
    });

    it('applies withHttpConfig() to the next request only', () => {
      const {rest, http} = setup();
      const account = rest.one('accounts', 1);
      account.withHttpConfig({withCredentials: true}).get().subscribe();
      expect(http.expectOne(`${BASE}/accounts/1`).request.withCredentials).toBe(true);
      account.get().subscribe();
      expect(http.expectOne(`${BASE}/accounts/1`).request.withCredentials).toBe(false);
    });
  });

  describe('responses', () => {
    it('returns plain data after setPlainByDefault(true)', () => {
      const {rest, http} = setup(p => p.setPlainByDefault(true));
      const accounts = fetchAccounts(rest, http);
      expect(accounts).toEqual([{id: 1, name: 'a'}, {id: 2, name: 'b'}]);
      expect(accounts[0].get).toBeUndefined();
    });

    it('returns the full response after setFullResponse(true)', () => {
      const {rest, http} = setup(p => p.setFullResponse(true));
      let response: any;
      rest.one('accounts', 1).get().subscribe((res: any) => response = res);
      http.expectOne(`${BASE}/accounts/1`).flush({id: 1}, {headers: {'X-Total': '1'}});
      expect(response.status).toBe(200);
      expect(response.headers.get('X-Total')).toBe('1');
      expect(response.data.id).toBe(1);
      expect(typeof response.data.get).toBe('function');
    });

    it('runs response interceptors in the order they were added', () => {
      const calls: any[] = [];
      const {rest, http} = setup(p => {
        p.addResponseInterceptor((data: any, operation: string, what: string, url: string, response: any) => {
          calls.push([operation, what, url, response.status]);
          return operation === 'getList' ? data.items : data;
        });
        p.addResponseInterceptor((data: any) => data.map((item: any) => ({...item, seen: true})));
      });
      let accounts: any;
      rest.all('accounts').getList().subscribe((res: any) => accounts = res);
      http.expectOne(`${BASE}/accounts`).flush({items: [{id: 1}], total: 1});
      expect(calls).toEqual([['getList', 'accounts', `${BASE}/accounts`, 200]]);
      expect(accounts.length).toBe(1);
      expect(accounts[0].seen).toBe(true);
    });

    it('stores the ETag and sends it back as If-None-Match and If-Match', () => {
      const {rest, http} = setup();
      const account = fetchAccount(rest, http, {id: 1}, {ETag: '"v1"'});
      expect(account.restangularEtag).toBe('"v1"');

      account.get().subscribe();
      const get = http.expectOne(`${BASE}/accounts/1`);
      expect(get.request.headers.get('If-None-Match')).toBe('"v1"');
      get.flush({id: 1});

      account.put().subscribe();
      const put = http.expectOne(`${BASE}/accounts/1`);
      expect(put.request.headers.get('If-Match')).toBe('"v1"');
      put.flush({id: 1});
    });

    it('resolves a 304 on a collection with the collection itself', () => {
      const {rest, http} = setup();
      const accounts = rest.all('accounts');
      let result: any;
      accounts.getList().subscribe((res: any) => result = res);
      http.expectOne(`${BASE}/accounts`).flush(null, {status: 304, statusText: 'Not Modified'});
      expect(result).toBe(accounts);
    });

    it('resolves a 304 on a safe element request with the element itself', () => {
      const {rest, http} = setup();
      const account = rest.one('accounts', 1);
      let result: any;
      account.get().subscribe((res: any) => result = res);
      http.expectOne(`${BASE}/accounts/1`).flush(null, {status: 304, statusText: 'Not Modified'});
      expect(result).toBe(account);
    });
  });

  describe('errors', () => {
    it('errors with the response, its request, data and repeatRequest()', () => {
      const {rest, http} = setup();
      let error: any;
      rest.one('accounts', 1).get().subscribe({error: (err: any) => error = err});
      http.expectOne(`${BASE}/accounts/1`).flush({message: 'nope'}, {status: 404, statusText: 'Not Found'});
      expect(error.status).toBe(404);
      expect(error.data).toEqual({message: 'nope'});
      expect(error.request.url).toBe(`${BASE}/accounts/1`);
      expect(typeof error.repeatRequest).toBe('function');
    });

    it('calls the most recently added error interceptor first and stops at false', () => {
      const order: string[] = [];
      const {rest, http} = setup(p => {
        p.addErrorInterceptor(() => {
          order.push('first-added');
          return true;
        });
        p.addErrorInterceptor(() => {
          order.push('second-added');
          return false;
        });
      });
      const next = vi.fn();
      const error = vi.fn();
      rest.one('accounts', 1).get().subscribe({next, error});
      http.expectOne(`${BASE}/accounts/1`).flush(null, {status: 500, statusText: 'Server Error'});
      expect(order).toEqual(['second-added']);
      expect(next).not.toHaveBeenCalled();
      expect(error).not.toHaveBeenCalled();
    });

    it('retries through repeatRequest() and resolves through the response handler', () => {
      const {rest, http} = setup(p => {
        p.addErrorInterceptor((response: any, subject: any, responseHandler: any) => {
          if (response.status === 401) {
            response.repeatRequest(response.request.clone({setHeaders: {Authorization: 'Bearer fresh'}}))
              .subscribe((res: any) => responseHandler(res), (err: any) => subject.error(err));
            return false;
          }
          return true;
        });
      });
      let account: any;
      rest.one('accounts', 1).get().subscribe((res: any) => account = res);
      http.expectOne(`${BASE}/accounts/1`).flush(null, {status: 401, statusText: 'Unauthorized'});

      const retry = http.expectOne(`${BASE}/accounts/1`);
      expect(retry.request.headers.get('Authorization')).toBe('Bearer fresh');
      retry.flush({id: 1, name: 'Acme'});
      expect(account.name).toBe('Acme');
      expect(typeof account.put).toBe('function');
    });
  });

  describe('request interceptors', () => {
    it('lets addRequestInterceptor() replace the element', () => {
      const {rest, http} = setup(p => p.addRequestInterceptor((element: any, operation: string) => {
        return operation === 'post' ? {...element, stamped: true} : element;
      }));
      rest.all('accounts').post({name: 'n'}).subscribe();
      const req = http.expectOne(`${BASE}/accounts`);
      expect(req.request.body).toEqual({name: 'n', stamped: true});
      req.flush({id: 1});
    });

    it('lets addFullRequestInterceptor() change headers and params', () => {
      const {rest, http} = setup(p => p.addFullRequestInterceptor(
        (element: any, operation: string, path: string, url: string, headers: any, params: any) => ({
          headers: {...headers, 'X-Op': operation},
          params: {...params, ts: '1'},
          element,
        })));
      rest.all('accounts').getList().subscribe();
      const req = http.expectOne(r => r.url === `${BASE}/accounts`);
      expect(req.request.headers.get('X-Op')).toBe('getList');
      expect(req.request.params.get('ts')).toBe('1');
      req.flush([]);
    });
  });

  describe('configuration', () => {
    it('creates an independent service with withConfig()', () => {
      const {rest, http} = setup(p => p.setDefaultHeaders({'X-App': 'demo'}));
      const other = rest.withConfig((c: any) => c.setBaseUrl('http://other.test'));

      other.all('things').getList().subscribe();
      const otherReq = http.expectOne('http://other.test/things');
      expect(otherReq.request.headers.get('X-App')).toBe('demo');
      otherReq.flush([]);

      rest.all('things').getList().subscribe();
      http.expectOne(`${BASE}/things`).flush([]);
    });

    it('creates a resource service with service()', () => {
      const {rest, http} = setup();
      const accounts = rest.service('accounts');

      accounts.getList().subscribe();
      http.expectOne(`${BASE}/accounts`).flush([]);
      accounts.one(5).get().subscribe();
      http.expectOne(`${BASE}/accounts/5`).flush({id: 5});
      accounts.post({name: 'n'}).subscribe();
      expect(http.expectOne(`${BASE}/accounts`).request.method).toBe('POST');
    });

    it('extends models and collections', () => {
      const {rest, http} = setup(p => {
        p.extendModel('accounts', (model: any) => {
          model.label = () => 'Account ' + model.id;
          return model;
        });
        p.extendCollection('accounts', (collection: any) => {
          collection.total = () => collection.length;
          return collection;
        });
      });
      expect(rest.one('accounts', 3).label()).toBe('Account 3');
      const accounts = fetchAccounts(rest, http);
      expect(accounts.total()).toBe(2);
      expect(accounts[1].label()).toBe('Account 2');
    });

    it('calls setOnBeforeElemRestangularized() and setOnElemRestangularized() hooks', () => {
      const before: any[] = [];
      const {rest} = setup(p => {
        p.setOnBeforeElemRestangularized((elem: any, isCollection: boolean, route: string) => {
          before.push([isCollection, route]);
          return elem;
        });
        p.setOnElemRestangularized((elem: any, isCollection: boolean, route: string) => {
          elem.tag = route + (isCollection ? '[]' : '');
          return elem;
        });
      });
      expect(rest.one('accounts', 1).tag).toBe('accounts');
      expect(rest.all('accounts').tag).toBe('accounts[]');
      expect(before).toEqual([[false, 'accounts'], [true, 'accounts']]);
    });

    it('exposes the configuration and provider on the injected service', () => {
      const {rest} = setup(p => p.setRequestSuffix('.json'));
      expect(rest.configuration.suffix).toBe('.json');
      expect(typeof rest.provider.setBaseUrl).toBe('function');
    });
  });
});
