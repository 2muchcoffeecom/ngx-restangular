// An app that registers no routes, compiled with --strict against the built package (dist/ngx-restangular).
// Every typed-routes member must stay exactly `any`, as in 7.0, so existing code compiles unchanged.
import { Restangular } from 'ngx-restangular';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Expect<T extends true> = T;

export type Checks = [
  Expect<IsAny<Restangular['one']>>,
  Expect<IsAny<Restangular['all']>>,
  Expect<IsAny<Restangular['several']>>,
  Expect<IsAny<Restangular['oneUrl']>>,
  Expect<IsAny<Restangular['allUrl']>>,
  Expect<IsAny<Restangular['service']>>,
  Expect<IsAny<Restangular['withConfig']>>,
  Expect<IsAny<Restangular['copy']>>,
  Expect<IsAny<Restangular['restangularizeElement']>>,
  Expect<IsAny<Restangular['restangularizeCollection']>>,
];

interface Account { id: number; name: string; }

export class AccountsComponent {
  account?: Account;
  accounts: Account[] = [];

  constructor(private restangular: Restangular) {
  }

  load() {
    this.restangular.one('accounts', 1).get().subscribe((account: Account) => this.account = account);
    this.restangular.all('accounts').getList({page: 1}).subscribe((accounts: Account[]) => this.accounts = accounts);
    this.restangular.one('accounts', 1, true).customPOST({}, 'activate', {}, {}).subscribe();
    this.restangular.several('accounts', 1, 2, 3).getList();
    this.restangular.withConfig((configurer: any) => configurer.setBaseUrl('/v2')).one('anything').whatever();
    const anything: number = this.restangular.one('x').whatever;
    return anything;
  }
}
