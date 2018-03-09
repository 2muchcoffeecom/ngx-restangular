import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule, HttpResponse, HttpHeaders} from "@angular/common/http";
import {RestangularModule} from "./../src";
import {App} from "./app.component";
import {MockProviders} from "./mock-data/mock-providers";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {Observable} from "rxjs";

import {RequestShowService} from "./request-show-service/request-show.service"
import {routes} from "./app.routes";
import {RequestCalcModule} from "./request-calc";
import {SimpleAppModule} from "./simple-app";
import {HeroService} from "./heroes-service/hero.service";
import {LandingComponent} from "./landing/landing.component";
import {ExtendAppModule} from "./extend-app/extend-app.module";
import {Restangular} from "../src/ngx-restangular";
import {RANDOM_USER,RestangularRandomUserFactory} from "./random-user-restangular/random-user-restangular"

@NgModule({
  declarations: [App, LandingComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RequestCalcModule,
    SimpleAppModule,
    ExtendAppModule,
    RouterModule.forRoot(routes),
    RestangularModule.forRoot((RestangularProvider) => {
      RestangularProvider.setBaseUrl('http://api.2muchcoffee.com/v1');
      RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
      RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
        if (response.status === 403) {
          Observable.of(true)
            .switchMap(refreshAccesstokenResponse => {
              console.log("Error Interceptor:", response.request);
              return response.repeatRequest(response.request);
            })
            .subscribe(
              res => responseHandler(res),
              err => subject.error(err)
            );

          return false; // error handled
        }
        return true; // error not handled
      });
    }),
  ],
  providers: [RequestShowService, HeroService, MockProviders,
    { provide: RANDOM_USER, useFactory:  RestangularRandomUserFactory, deps: [Restangular] }
  ],
  bootstrap: [App]
})
export class AppModule {

}
