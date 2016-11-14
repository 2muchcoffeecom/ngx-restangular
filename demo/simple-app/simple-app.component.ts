import {Component} from "@angular/core";
import {Restangular} from "./../../src";

import 'rxjs/Rx';
import {RequestShowService} from "../request-show-service/request-show.service";
import {Observable, BehaviorSubject} from "rxjs";
import {Hero} from "../heroes-service/hero";


@Component({
  selector: 'simple-app',
  styleUrls: ['./simple-app/simple-app.style.css'],
  templateUrl: './simple-app/simple-app.template.html'
})
export class SimpleAppComponent {

  public heroList: Hero[];

  constructor(public restangular: Restangular, private requestShowService: RequestShowService) {
  }


}
