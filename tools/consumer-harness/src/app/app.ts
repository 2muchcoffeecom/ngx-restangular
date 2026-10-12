import { Component, inject, OnInit, signal } from '@angular/core';
import { Restangular } from 'ngx-restangular';

// No control flow blocks and no version-specific providers, so the same file runs on Angular 16 through 22.
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>ngx-restangular consumer</h1>
    <p id="status">{{ status() }}</p>
    <p id="list">{{ list() }}</p>
    <p id="one">{{ one() }}</p>
  `,
})
export class App implements OnInit {
  private readonly restangular = inject(Restangular);
  protected readonly list = signal('');
  protected readonly one = signal('');
  protected readonly status = signal('loading');

  ngOnInit() {
    this.restangular.all('accounts').getList().subscribe({
      next: (accounts: any[]) => {
        this.list.set(accounts.map(a => a.name + ' at ' + a.getRestangularUrl()).join(', '));
        this.status.set('loaded ' + accounts.length);
        accounts[0].get().subscribe((account: any) => this.one.set('fetched ' + account.name + ' via ' + account.route));
      },
      error: (err: any) => this.status.set('error ' + err.status),
    });
  }
}
