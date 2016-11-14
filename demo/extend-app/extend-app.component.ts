import {Component} from "@angular/core";
import {Restangular} from "./../../src";

import 'rxjs/Rx';
import {RequestShowService} from "../request-show-service/request-show.service";
import {Hero} from "../heroes-service/hero";


@Component({
  selector: 'extend-app',
  styleUrls: ['./extend-app/extend-app.style.css'],
  templateUrl: './extend-app/extend-app.template.html'
})
export class ExtendAppComponent {
  constructor(public restangular: Restangular, private requestShowService: RequestShowService) {
  }
}
