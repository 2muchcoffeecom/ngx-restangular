import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HeroListComponent} from "./hero-list.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [HeroListComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [HeroListComponent]
})
export class HeroListModule {


}
