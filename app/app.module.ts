import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppComponent }  from './app.component';
import { RestangularModule }  from 'lib:index';
import { restangularConfig } from "./restangular.config";
import { ROUTES } from "./app.routes";

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    RestangularModule.forRoot(restangularConfig),
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {  }
