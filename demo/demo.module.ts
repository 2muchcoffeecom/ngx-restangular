import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule, Headers, Response, ResponseOptions} from "@angular/http";
import {RestangularModule} from "./../src";
import {Demo} from "./demo.component";
import {MockProviders} from "./mock-data/mock-providers";
import {MockBackend} from "@angular/http/testing";

@NgModule({
  declarations: [Demo],
  imports: [
    BrowserModule,
    HttpModule,
    RestangularModule.forRoot((RestangularProvider) => {
      RestangularProvider.setBaseUrl('http://api.2muchcoffee.com/v1');
      RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
    }),
  ],
  providers: MockProviders,
  bootstrap: [Demo]
})
export class DemoModule {
  // This need only for Demo App
  // Its Fake Backend servise to return data
  constructor(backend: MockBackend) {
    backend.connections.subscribe(connection => {
      let resOptions = new ResponseOptions({
        body: JSON.stringify([{user: "first"}, {user: "second"}, {user: "third"}]),
        headers: new Headers({
          'header': 'server-header'
        }),
        status: 200
      });
      let response = new Response(resOptions);

      console.log("Request Url on Backend: ",connection.request.url);

      connection.mockRespond(response)
    })
  }
}