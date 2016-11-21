import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {HeroAddComponent} from "./hero-add.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [HeroAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  exports: [HeroAddComponent]
})
export class HeroAddModule {


}
