import {Component} from "@angular/core";

import 'rxjs/Rx';
import {RequestShowService} from "./request-show-service/request-show.service";

@Component({
  selector: 'app',
  styleUrls: ['./app.style.css'],
  templateUrl: './app.template.html',
})
export class App {
  public request;

  constructor(public requestShowService: RequestShowService) {
    this.request = requestShowService.requestToShow;
  }
}
