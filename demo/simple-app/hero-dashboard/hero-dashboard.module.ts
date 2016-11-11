import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Headers, Response, ResponseOptions, HttpModule} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {FormsModule} from "@angular/forms";
import {SimpleAppComponent} from "../simple-app.component";
import {HeroDashboardComponent} from "./hero-dashboard.component";



@NgModule({
  declarations: [HeroDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  exports: [HeroDashboardComponent]
})
export class HeroDashboardModule {


}
