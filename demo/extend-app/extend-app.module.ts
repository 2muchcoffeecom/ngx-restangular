import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {ExtendAppComponent} from "./extend-app.component";

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
  exports: [ExtendAppComponent]
})
export class ExtendAppModule {


}
