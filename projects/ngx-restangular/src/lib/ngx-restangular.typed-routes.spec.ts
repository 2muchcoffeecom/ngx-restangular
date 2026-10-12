import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

import { Restangular, RestangularModule } from '../public_api';

// Typed routes are compile-time only. The assertions below are checked by the TypeScript compiler when the
// spec bundle builds; the runtime part shows typed calls send the same requests as untyped ones.

interface Account { id: number; name: string; plan: 'team' | 'starter'; }
interface Building { id: number; address: string; }
interface Tag { id: number; label: string; }

declare module './ngx-restangular.types' {
  interface RestangularRoutes {
    accounts: {
      model: Account;
      methods: { label(): string };
      collectionMethods: { total(): number };
      children: { buildings: { model: Building } };
    };
    tags: { model: Tag };
  }
}

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;
type Emits<O> = O extends Observable<infer V> ? V : never;

describe('typed routes', () => {
  let rest: Restangular;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RestangularModule.forRoot((provider: any) => provider.setBaseUrl('/api'))],
      providers: [provideHttpClientTesting()],
    });
    rest = TestBed.inject(Restangular);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('types registered elements, collections and children', () => {
    const account = rest.one('accounts', 1);
    type AccountChecks = [
      Expect<Equal<typeof account.name, string>>,
      Expect<Equal<typeof account.plan, 'team' | 'starter'>>,
      Expect<Equal<ReturnType<typeof account.label>, string>>,
      Expect<Equal<ReturnType<typeof account.plain>, Account>>,
      Expect<Equal<Emits<ReturnType<typeof account.get>>, typeof account>>,
    ];

    const buildings = account.all('buildings');
    type BuildingChecks = [
      Expect<Equal<typeof buildings[number]['address'], string>>,
      Expect<Equal<Emits<ReturnType<typeof buildings.getList>>, typeof buildings>>,
    ];

    const accounts = rest.all('accounts');
    type CollectionChecks = [
      Expect<Equal<ReturnType<typeof accounts.total>, number>>,
      Expect<Equal<typeof accounts[number]['name'], string>>,
      Expect<Equal<ReturnType<typeof accounts.plain>, Account[]>>,
    ];

    const stats = account.customGET<{ count: number }>('stats');
    type CustomChecks = [Expect<Equal<Emits<typeof stats>, { count: number }>>];

    expect(account.getRestangularUrl()).toBe('/api/accounts/1');
    http.expectOne('/api/accounts/1/stats').flush({count: 1});
  });

  it('rejects typos and invalid values on registered routes', () => {
    const account = rest.one('accounts', 1);
    // @ts-expect-error misspelled field
    account.nmae;
    // @ts-expect-error not a valid plan
    account.patch({plan: 'enterprise'});
    // @ts-expect-error misspelled field in a POST body
    rest.all('accounts').post({nmae: 'New'});
    // @ts-expect-error misspelled field in a child POST body
    account.post('buildings', {adress: 'Main St'});

    // The calls still run; the errors above are compile-time only.
    expect(http.expectOne('/api/accounts/1').request.method).toBe('PATCH');
    expect(http.expectOne('/api/accounts').request.method).toBe('POST');
    expect(http.expectOne('/api/accounts/1/buildings').request.method).toBe('POST');
  });

  it('leaves unregistered routes and unregistered children as any', () => {
    const user = rest.one('users', 1);
    const tagChild = rest.one('tags', 1).all('anything');
    const accountChild = rest.one('accounts', 1).one('invoices', 2);
    type AnyChecks = [
      Expect<Equal<typeof user, any>>,
      Expect<Equal<typeof tagChild, any>>,
      Expect<Equal<typeof accountChild, any>>,
    ];
    expect(user.getRestangularUrl()).toBe('/api/users/1');
  });

  it('types service(), withConfig() and copy()', () => {
    const accountsService = rest.service('accounts');
    const fromService = accountsService.one(5);
    const other = rest.withConfig((configurer: any) => configurer.setBaseUrl('/other'));
    const fromOther = other.one('accounts', 2);
    const copied = rest.copy(fromService);
    type ServiceChecks = [
      Expect<Equal<typeof fromService.name, string>>,
      Expect<Equal<typeof fromOther.name, string>>,
      Expect<Equal<typeof copied, typeof fromService>>,
    ];
    expect(fromService.getRestangularUrl()).toBe('/api/accounts/5');
    expect(fromOther.getRestangularUrl()).toBe('/other/accounts/2');
  });

  it('sends the same requests as untyped code', () => {
    let buildings: any;
    rest.one('accounts', 1).getList('buildings').subscribe(res => buildings = res);
    http.expectOne('/api/accounts/1/buildings').flush([{id: 7, address: 'Main St'}]);
    expect(buildings[0].address).toBe('Main St');
    expect(buildings[0].getRestangularUrl()).toBe('/api/accounts/1/buildings/7');

    let created: any;
    rest.all('accounts').post({name: 'New', plan: 'team'}).subscribe(res => created = res);
    const post = http.expectOne('/api/accounts');
    expect(post.request.body).toEqual({name: 'New', plan: 'team'});
    post.flush({id: 3, name: 'New', plan: 'team'});
    expect(created.getRestangularUrl()).toBe('/api/accounts/3');
  });
});
