import {Component} from "@angular/core";

import 'rxjs/Rx';
import {Restangular} from "../../../src/ng2-restangular";
import {Hero} from "../../heroes-service/hero";


@Component({
  selector: 'hero-dashboard',
  styleUrls: ['./simple-app/hero-dashboard/hero-dashboard.style.css'],
  templateUrl: './simple-app/hero-dashboard/hero-dashboard.template.html'
})
export class HeroDashboardComponent {

  public heroList: Hero[];

  constructor(public restangular: Restangular) {
  }

  ngOnInit() {
    this.restangular.all("heroes").getList({number:4}).subscribe(heroes => {
      this.heroList = heroes;
    });
  }

}
