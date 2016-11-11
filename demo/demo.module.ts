import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule, Headers, Response, ResponseOptions} from "@angular/http";
import {RestangularModule} from "./../src";
import {Demo} from "./demo.component";
import {MockProviders} from "./mock-data/mock-providers";
import {MockBackend} from "@angular/http/testing";
import {FormsModule} from "@angular/forms";

import {RequestShowService} from "./request-show-service/request-show.service"
import {RouterModule, Router} from "@angular/router";
import {routes} from "./demo.routes";
import {RequestCalcModule} from "./request-calc";
import {SimpleAppModule} from "./simple-app";
import {HeroService} from "./heroes-service/hero.service";

@NgModule({
  declarations: [Demo],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RequestCalcModule,
    SimpleAppModule,
    RouterModule.forRoot(routes),
    RestangularModule.forRoot((RestangularProvider) => {
      RestangularProvider.setBaseUrl('http://api.2muchcoffee.com/v1');
      RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
    }),
  ],
  providers: [MockProviders, RequestShowService, HeroService],
  bootstrap: [Demo]
})
export class DemoModule {

  // This need only for Demo App
  // Its Fake Backend servise to return data
  constructor(backend: MockBackend, requestShowService: RequestShowService, heroService: HeroService) {
    backend.connections.subscribe(connection => {
      let resOptions = new ResponseOptions({
        body: JSON.stringify([{user: "first"}, {user: "second"}, {user: "third"}]),
        headers: new Headers({
          'header': 'server-header'
        }),
        status: 200
      });
      let response = new Response(resOptions);

      requestShowService.requestToShow.next(connection.request);
      console.log("Request Url on Backend: ", connection.request.url);

      // debugger;

      if(connection.request.url == "http://api.2muchcoffee.com/v1/heroes"){
        resOptions = resOptions.merge({body:JSON.stringify(heroService.getHeroes())});
        response = new Response(resOptions);
      }

      if(connection.request.url.indexOf("http://api.2muchcoffee.com/v1/heroes/")>=0){
        let id = connection.request.url.slice(connection.request.url.lastIndexOf("/")+1, connection.request.url.length);
        resOptions = resOptions.merge({body:JSON.stringify(heroService.getHero(id))});
        response = new Response(resOptions);
      }


      connection.mockRespond(response)
    })
  }

}