import {Component} from "@angular/core";

import 'rxjs/Rx';
import {Observable, BehaviorSubject} from "rxjs";
import {Restangular} from "../../../src/ng2-restangular";
 import {Hero} from "../../heroes-service/hero";
import {RequestShowService} from "../../request-show-service/request-show.service";


@Component({
  selector: 'hero-list',
  styleUrls: ['./simple-app/hero-list/hero-list.style.css'],
  templateUrl: './simple-app/hero-list/hero-list.template.html'
})
export class HeroListComponent {

  private heroes;

  public heroList: Hero[];

  constructor(public restangular: Restangular, private requestShowService: RequestShowService) {
    this.heroes = restangular.all("heroes");
  }

  ngOnInit() {
    this.heroes.getList().subscribe(heroes => {
      this.heroList = heroes;
    });
  }

}
