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

@NgModule({
  declarations: [Demo],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RequestCalcModule,
    RouterModule.forRoot(routes),
    RestangularModule.forRoot((RestangularProvider) => {
      RestangularProvider.setBaseUrl('http://api.2muchcoffee.com/v1');
      RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
    }),
  ],
  providers: [MockProviders,RequestShowService],
  bootstrap: [Demo]
})
export class DemoModule {

}