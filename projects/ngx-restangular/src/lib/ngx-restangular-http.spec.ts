import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { RestangularHttp, RestangularModule } from '../public_api';

describe('RestangularHttp', () => {
  let restHttp: RestangularHttp;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RestangularModule.forRoot()],
      providers: [provideHttpClientTesting()],
    });
    restHttp = TestBed.inject(RestangularHttp);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('builds a request from Restangular options and emits only the final response', () => {
    const events: any[] = [];
    restHttp.createRequest({
      method: 'get',
      url: '/accounts',
      params: {page: 1, tags: ['a', 'b']},
      headers: {'X-A': '1'},
      withCredentials: true,
    }).subscribe(event => events.push(event));

    const req = http.expectOne(r => r.url === '/accounts');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.getAll('tags')).toEqual(['a', 'b']);
    expect(req.request.headers.get('X-A')).toBe('1');
    expect(req.request.withCredentials).toBe(true);
    req.flush([{id: 1}]);

    expect(events.length).toBe(1);
    expect(events[0]).toBeInstanceOf(HttpResponse);
    expect(events[0].body).toEqual([{id: 1}]);
    expect(events[0].config.params).toBeInstanceOf(HttpRequest);
  });

  it('sends the body for methods that carry one', () => {
    restHttp.createRequest({method: 'post', url: '/accounts', data: {name: 'n'}, headers: {}}).subscribe();
    const req = http.expectOne('/accounts');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({name: 'n'});
    req.flush({});
  });

  it('decorates errors with request, data and repeatRequest()', () => {
    let error: any;
    const request = new HttpRequest('GET', '/accounts/1');
    restHttp.request(request).subscribe({error: err => error = err});
    http.expectOne('/accounts/1').flush({message: 'gone'}, {status: 410, statusText: 'Gone'});

    expect(error.status).toBe(410);
    expect(error.request).toBe(request);
    expect(error.data).toEqual({message: 'gone'});

    let retried: any;
    error.repeatRequest().subscribe((res: any) => retried = res);
    http.expectOne('/accounts/1').flush({id: 1});
    expect(retried.body).toEqual({id: 1});
  });
});
