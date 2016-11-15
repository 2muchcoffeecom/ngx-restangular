import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
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
