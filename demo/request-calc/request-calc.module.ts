import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Headers, Response, ResponseOptions, HttpModule} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {FormsModule} from "@angular/forms";


import {RequestCalcComponent} from "./request-calc.component";
import {RequestShowService} from "../request-show-service/request-show.service";
import {RestangularModule} from "../../src/ng2-restangular.module";

@NgModule({
  declarations: [RequestCalcComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: [RequestCalcComponent]
})
export class RequestCalcModule {

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
