import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Headers, Response, ResponseOptions, HttpModule} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {FormsModule} from "@angular/forms";
import {SimpleAppComponent} from "../simple-app.component";
import {HeroDashboardComponent} from "./hero-dashboard.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [HeroDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  exports: [HeroDashboardComponent]
})
export class HeroDashboardModule {


}
