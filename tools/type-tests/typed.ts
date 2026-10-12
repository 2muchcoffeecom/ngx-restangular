// An app that registers routes, compiled with --strict against the built package (dist/ngx-restangular).
import { Restangular, RestCollection, RestElement, RestangularRoutes } from 'ngx-restangular';
import { Observable } from 'rxjs';

interface Account { id: number; name: string; plan: 'team' | 'starter'; }
interface Building { id: number; address: string; }

declare module 'ngx-restangular' {
  interface RestangularRoutes {
    accounts: {
      model: Account;
      methods: { label(): string };
      collectionMethods: { total(): number };
      children: { buildings: { model: Building } };
    };
  }
}

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;
type Emits<O> = O extends Observable<infer V> ? V : never;

declare const rest: Restangular;
const account = rest.one('accounts', 1);
const accounts = rest.all('accounts');
const buildings = account.all('buildings');
const unregistered = rest.one('users', 1);

export type Checks = [
  Expect<Equal<typeof account, RestElement<RestangularRoutes['accounts']>>>,
  Expect<Equal<typeof accounts, RestCollection<RestangularRoutes['accounts']>>>,
  Expect<Equal<typeof account.name, string>>,
  Expect<Equal<ReturnType<typeof account.label>, string>>,
  Expect<Equal<ReturnType<typeof account.plain>, Account>>,
  Expect<Equal<Emits<ReturnType<typeof account.put>>, typeof account>>,
  Expect<Equal<ReturnType<typeof accounts.total>, number>>,
  Expect<Equal<typeof buildings[number]['address'], string>>,
  Expect<Equal<typeof unregistered, any>>,
];

// @ts-expect-error misspelled field
account.nmae;
// @ts-expect-error misspelled field in the body for a registered child route
account.post('buildings', {adress: 'Main St'});
// @ts-expect-error not a valid plan
account.patch({plan: 'enterprise'});
// @ts-expect-error misspelled field in a POST body
accounts.post({nmae: 'New'});
