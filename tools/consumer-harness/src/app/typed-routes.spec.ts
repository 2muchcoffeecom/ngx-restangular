import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { Restangular, RestangularModule } from 'ngx-restangular';
import { restangularConfig } from './app.config';

// Typed routes (beta) through the installed package, compiled by this Angular version's own TypeScript.
interface Account { id: number; name: string; }
interface Building { id: number; address: string; }

declare module 'ngx-restangular' {
  interface RestangularRoutes {
    accounts: { model: Account; children: { buildings: { model: Building } } };
  }
}

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;

describe('typed routes from the packed tarball', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [importProvidersFrom(RestangularModule.forRoot(restangularConfig)), provideHttpClientTesting()],
    });
  });

  it('types a registered route and sends the same request as untyped code', () => {
    const rest = TestBed.inject(Restangular);
    const http = TestBed.inject(HttpTestingController);

    const account = rest.one('accounts', 1);
    const unregistered = rest.one('users', 1);
    type Checks = [
      Expect<Equal<typeof account.name, string>>,
      Expect<Equal<typeof unregistered, any>>,
    ];
    // @ts-expect-error misspelled field on a registered route
    account.nmae;

    let address = '';
    account.all('buildings').getList().subscribe(buildings => address = buildings[0].address);
    http.expectOne('/api/accounts/1/buildings.json').flush([{id: 7, address: 'Main St'}]);
    expect(address).toBe('Main St');
    http.verify();
  });
});
