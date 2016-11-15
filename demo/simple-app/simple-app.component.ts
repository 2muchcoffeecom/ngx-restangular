import {Component} from "@angular/core";

import 'rxjs/Rx';
import {Hero} from "../heroes-service/hero";


@Component({
  selector: 'simple-app',
  styleUrls: ['./simple-app/simple-app.style.css'],
  templateUrl: './simple-app/simple-app.template.html'
})
export class SimpleAppComponent {

  public heroList: Hero[];

}
