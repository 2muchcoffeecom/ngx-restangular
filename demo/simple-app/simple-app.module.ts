import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


import {SimpleAppComponent} from "./simple-app.component";
import {HeroDashboardModule} from "./hero-dashboard";
import {RouterModule} from "@angular/router";
import {HeroListModule} from "./hero-list/";
import {HeroDetailModule} from "./hero-detail/";
import {HeroAddModule} from "./hero-add/hero-add.module";

@NgModule({
  declarations: [
    SimpleAppComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HeroDetailModule,
    RouterModule,
    HeroListModule,
    HeroDashboardModule,
    HeroAddModule
  ],
  exports: [SimpleAppComponent]
})
export class SimpleAppModule {


}
