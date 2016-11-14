import {NgModule, Inject, Injectable} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Headers, Response, ResponseOptions, HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {OpaqueToken} from "@angular/core";


import {ExtendAppComponent} from "./extend-app.component";
// import {RandomUser, RestangularRandomUserFactory} from "./RestangularService/RestangularServiceWithConfig";
import {Restangular} from "../../src/ng2-restangular";
import {RestangularModule} from "../../src/ng2-restangular.module";


// export const RandomUser = new OpaqueToken('RandomUser');
// export function RestangularRandomUserFactory(restangular: Restangular) {
//   debugger;
//   return restangular.withConfig((RestangularConfigurer) => {
//     RestangularConfigurer.setBaseUrl('https://randomuser.me/api/');
//   });
// }
//
// export class Random {
//   public test = true;
// }







@NgModule({
  declarations: [
    ExtendAppComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
  ],
  providers: [
    // Logger
  //   {provide: RandomUser,  useClass: Random}
  ],
  exports: [ExtendAppComponent]
})
export class ExtendAppModule {


}
