import { Component, OnInit, signal } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  accounts = signal<any[]>([]);
  account = signal<any>(null);
  error = signal('');

  constructor(private restangular: Restangular) {
  }

  ngOnInit() {
    // GET api/accounts.json
    this.restangular.all('accounts').getList().subscribe({
      next: accounts => this.accounts.set(accounts),
      error: err => this.error.set(`GET accounts failed with ${err.status}`)
    });

    // GET api/accounts/1.json
    this.restangular.one('accounts', 1).get().subscribe({
      next: account => this.account.set(account),
      error: err => this.error.set(`GET accounts/1 failed with ${err.status}`)
    });
  }
}
