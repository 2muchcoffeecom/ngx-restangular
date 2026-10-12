import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { Restangular, RestangularModule } from 'ngx-restangular';
import { App } from './app';
import { restangularConfig } from './app.config';

describe('ngx-restangular from the packed tarball', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [importProvidersFrom(RestangularModule.forRoot(restangularConfig)), provideHttpClientTesting()],
    });
  });

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('renders data fetched through Restangular', async () => {
    const fixture = TestBed.createComponent(App);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    http.expectOne('/api/accounts.json').flush([{id: 1, name: 'Acme'}, {id: 2, name: 'Globex'}]);
    http.expectOne('/api/accounts/1.json').flush({id: 1, name: 'Acme'});
    await fixture.whenStable();
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('loaded 2');
    // getRestangularUrl() leaves the request suffix off
    expect(text).toContain('Globex at /api/accounts/2');
    expect(text).toContain('fetched Acme via accounts');
  });

  it('posts, puts and removes through the linked package', () => {
    const rest: any = TestBed.inject(Restangular);
    const http = TestBed.inject(HttpTestingController);

    let created: any;
    rest.all('accounts').post({name: 'New'}).subscribe((res: any) => created = res);
    const post = http.expectOne('/api/accounts.json');
    expect(post.request.method).toBe('POST');
    post.flush({id: 3, name: 'New'});

    created.name = 'Renamed';
    created.put().subscribe();
    const put = http.expectOne('/api/accounts/3.json');
    expect(put.request.body).toEqual({id: 3, name: 'Renamed'});
    put.flush({id: 3, name: 'Renamed'});

    created.remove().subscribe();
    expect(http.expectOne('/api/accounts/3.json').request.method).toBe('DELETE');
  });
});
