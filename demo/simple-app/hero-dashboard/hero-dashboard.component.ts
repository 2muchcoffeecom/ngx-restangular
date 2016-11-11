import {Component} from "@angular/core";
// import {Restangular} from "./../../src";

import 'rxjs/Rx';
// import {RequestShowService} from "../request-show-service/request-show.service";
import {Observable, BehaviorSubject} from "rxjs";
// import {Hero} from "../heroes-service/hero";


@Component({
  selector: 'simple-app',
  styleUrls: ['./simple-app/hero-dashboard/hero-dashboard.style.css'],
  templateUrl: './simple-app/hero-dashboard/hero-dashboard.template.html'
})
export class HeroDashboardComponent {
  //
  // public heroList: Hero[];
  //
  // constructor(public restangular: Restangular, private requestShowService: RequestShowService) {
  // }
  //
  // ngOnInit() {
  //   this.restangular.all("heroes").getList().subscribe(heroes => {
  //     this.heroList = heroes;
  //   });
  // }

}
