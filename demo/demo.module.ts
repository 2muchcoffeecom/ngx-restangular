import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule, Headers, Response, ResponseOptions} from "@angular/http";
import {RestangularModule} from "./../src";
import {Demo} from "./demo.component";
import {MockProviders} from "./mock-data/mock-providers";
import {MockBackend} from "@angular/http/testing";
import {FormsModule} from "@angular/forms";

import {RequestShowService} from "./request-show-service/request-show.service"

@NgModule({
  declarations: [Demo],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RestangularModule.forRoot((RestangularProvider) => {
      RestangularProvider.setBaseUrl('http://api.2muchcoffee.com/v1');
      RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
    }),
  ],
  providers: [MockProviders,RequestShowService],
  bootstrap: [Demo]
})
export class DemoModule {
  // This need only for Demo App
  // Its Fake Backend servise to return data
  constructor(backend: MockBackend, requestShowService: RequestShowService) {
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

      connection.mockRespond(response)
    })
  }
}