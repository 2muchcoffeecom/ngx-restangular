import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {RestangularModule} from "./../src";
import {Demo} from "./demo.component";

@NgModule({
  declarations: [Demo],
  imports: [
    BrowserModule,
    HttpModule,
    RestangularModule.forRoot((RestangularProvider) => {
      RestangularProvider.setBaseUrl('http://api.pacific-grid.2muchcoffee.com/v1');
      RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
    })
  ],
  bootstrap: [Demo]
})
export class DemoModule {
}