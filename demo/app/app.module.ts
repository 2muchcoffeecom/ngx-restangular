import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RestangularModule } from 'ngx-restangular';

import { AppComponent } from './app.component';

// The demo reads static JSON from demo/public/api, so every request gets a .json suffix.
export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl('api');
  RestangularProvider.setRequestSuffix('.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [
    provideZonelessChangeDetection()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
