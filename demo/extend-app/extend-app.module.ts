import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
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
    HttpClientModule,
    RouterModule,
  ],
  exports: [ExtendAppComponent]
})
export class ExtendAppModule {


}
