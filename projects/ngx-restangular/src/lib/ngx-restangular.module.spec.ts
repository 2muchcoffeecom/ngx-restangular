import { createEnvironmentInjector, EnvironmentInjector, importProvidersFrom, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandlerFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import * as publicApi from '../public_api';
import { Restangular, RestangularHttp, RestangularModule } from '../public_api';

@Injectable({providedIn: 'root'})
class SessionService {
  token = 'session-token';
}

describe('RestangularModule', () => {
  beforeEach(() => TestBed.resetTestingModule());

  afterEach(() => {
    // Only tests that configured the testing module have a controller to verify.
    if (TestBed.inject(HttpTestingController, null)) {
      TestBed.inject(HttpTestingController).verify();
    }
  });

  it('exports the same public API surface as 6.x', () => {
    TestBed.configureTestingModule({providers: [provideHttpClientTesting()]});
    expect(Object.keys(publicApi).sort()).toEqual(['Restangular', 'RestangularHttp', 'RestangularModule']);
  });

  it('works when imported without forRoot', () => {
    TestBed.configureTestingModule({
      imports: [RestangularModule],
      providers: [provideHttpClientTesting()],
    });
    const rest = TestBed.inject(Restangular);
    const http = TestBed.inject(HttpTestingController);

    rest.all('accounts').getList().subscribe();
    http.expectOne('/accounts').flush([]);
  });

  it('works with forRoot() and no arguments', () => {
    TestBed.configureTestingModule({
      imports: [RestangularModule.forRoot()],
      providers: [provideHttpClientTesting()],
    });
    const rest = TestBed.inject(Restangular);
    const http = TestBed.inject(HttpTestingController);

    rest.one('accounts', 1).get().subscribe();
    http.expectOne('/accounts/1').flush({id: 1});
  });

  it('calls the forRoot config function with the provider', () => {
    const config = vi.fn((provider: any) => {
      provider.setBaseUrl('http://api.test/v1/');
    });
    TestBed.configureTestingModule({
      imports: [RestangularModule.forRoot(config)],
      providers: [provideHttpClientTesting()],
    });
    const rest = TestBed.inject(Restangular);
    const http = TestBed.inject(HttpTestingController);

    expect(config).toHaveBeenCalledTimes(1);
    expect(typeof config.mock.calls[0][0].setDefaultHeaders).toBe('function');
    expect(rest.configuration.baseUrl).toBe('http://api.test/v1');

    rest.all('accounts').getList().subscribe();
    http.expectOne('http://api.test/v1/accounts').flush([]);
  });

  it('injects the services listed in forRoot([...], fn) into the config function', () => {
    TestBed.configureTestingModule({
      imports: [
        RestangularModule.forRoot([SessionService], (provider: any, session: SessionService) => {
          provider.setDefaultHeaders({Authorization: 'Bearer ' + session.token});
        }),
      ],
      providers: [provideHttpClientTesting()],
    });
    const rest = TestBed.inject(Restangular);
    const http = TestBed.inject(HttpTestingController);

    rest.one('accounts', 1).get().subscribe();
    const req = http.expectOne('/accounts/1');
    expect(req.request.headers.get('Authorization')).toBe('Bearer session-token');
    req.flush({id: 1});
  });

  it('works in a standalone app through importProvidersFrom(RestangularModule.forRoot(...))', () => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom(RestangularModule.forRoot((provider: any) => provider.setBaseUrl('/api'))),
        provideHttpClientTesting(),
      ],
    });
    const rest = TestBed.inject(Restangular);
    const http = TestBed.inject(HttpTestingController);

    rest.all('accounts').getList().subscribe();
    http.expectOne('/api/accounts').flush([]);
  });

  it('sends requests through HttpBackend, so HttpClient interceptors do not see them', () => {
    const seen: string[] = [];
    const recordingInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
      seen.push(req.url);
      return next(req);
    };
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([recordingInterceptor])),
        importProvidersFrom(RestangularModule.forRoot()),
        provideHttpClientTesting(),
      ],
    });
    const rest = TestBed.inject(Restangular);
    const http = TestBed.inject(HttpTestingController);

    rest.all('accounts').getList().subscribe();
    http.expectOne('/accounts').flush([]);
    expect(seen).toEqual([]);
  });

  it('throws when RestangularModule is imported again below the root', () => {
    TestBed.configureTestingModule({
      imports: [RestangularModule.forRoot()],
      providers: [provideHttpClientTesting()],
    });
    const parent = TestBed.inject(EnvironmentInjector);

    expect(() => createEnvironmentInjector([importProvidersFrom(RestangularModule)], parent))
      .toThrow(/RestangularModule is already loaded/);
  });

  it('provides RestangularHttp', () => {
    TestBed.configureTestingModule({
      imports: [RestangularModule.forRoot()],
      providers: [provideHttpClientTesting()],
    });
    expect(TestBed.inject(RestangularHttp)).toBeInstanceOf(RestangularHttp);
  });
});
