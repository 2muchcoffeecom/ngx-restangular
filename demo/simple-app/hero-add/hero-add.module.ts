import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HeroAddComponent} from "./hero-add.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [HeroAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [HeroAddComponent]
})
export class HeroAddModule {


}
