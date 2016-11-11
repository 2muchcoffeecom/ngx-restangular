import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";


import {RequestCalcComponent} from "./request-calc.component";

@NgModule({
  declarations: [RequestCalcComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  exports: [RequestCalcComponent]
})
export class RequestCalcModule {

}
