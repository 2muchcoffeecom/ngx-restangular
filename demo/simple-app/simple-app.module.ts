import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Headers, Response, ResponseOptions, HttpModule} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {FormsModule} from "@angular/forms";


import {SimpleAppComponent} from "./simple-app.component";
import {RequestShowService} from "../request-show-service/request-show.service";
import {RestangularModule} from "../../src/ng2-restangular.module";
import {HeroDashboardModule} from "./hero-dashboard";
import {HeroDashboardComponent} from "./hero-dashboard";
import {RouterModule} from "@angular/router";
import {HeroListModule} from "./hero-list/";
import {HeroDetailModule} from "./hero-detail/";

@NgModule({
  declarations: [
    SimpleAppComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HeroDetailModule,
    RouterModule,
    HeroListModule,
    HeroDashboardModule
  ],
  exports: [SimpleAppComponent]
})
export class SimpleAppModule {


}
