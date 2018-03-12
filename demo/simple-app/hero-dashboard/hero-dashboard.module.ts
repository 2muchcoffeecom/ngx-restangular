import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HeroDashboardComponent} from "./hero-dashboard.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [HeroDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [HeroDashboardComponent]
})
export class HeroDashboardModule {


}
