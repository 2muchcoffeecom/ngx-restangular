import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {HeroListComponent} from "./hero-list.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [HeroListComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
  ],
  exports: [HeroListComponent]
})
export class HeroListModule {


}
