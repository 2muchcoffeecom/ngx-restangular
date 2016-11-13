import {Component} from "@angular/core";
import {Restangular} from "./../src";

import 'rxjs/Rx';
import {RequestShowService} from "./request-show-service/request-show.service";
import {Observable, BehaviorSubject} from "rxjs";


@Component({
  selector: 'demo-app',
  styleUrls: ['./demo.style.css'],
  templateUrl: './demo.template.html',

})
export class Demo {
  constructor(restangular:Restangular){
    restangular.withConfig((RestangularConfigurer) => {
      RestangularConfigurer.setBaseUrl('http://www.bing.com');
    }).all('users').getList().subscribe(res=>{
      console.log(res);
      debugger;
    })
  }
}
