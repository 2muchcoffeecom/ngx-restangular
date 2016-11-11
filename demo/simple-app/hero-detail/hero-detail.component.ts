import {Component} from "@angular/core";

import 'rxjs/Rx';
import {Observable, BehaviorSubject} from "rxjs";
import {Restangular} from "../../../src/ng2-restangular";
 import {Hero} from "../../heroes-service/hero";
import {RequestShowService} from "../../request-show-service/request-show.service";
import {ActivatedRoute, Params} from "@angular/router";
import {HeroService} from "../../heroes-service/hero.service";


@Component({
  selector: 'hero-detail',
  styleUrls: ['./simple-app/hero-detail/hero-detail.style.css'],
  templateUrl: './simple-app/hero-detail/hero-detail.template.html'
})
export class HeroDetailComponent {

  public hero: Hero;

  constructor(private route: ActivatedRoute, private heroService: HeroService){
  }

  ngOnInit() {
    debugger;
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      debugger;
      this.hero = this.heroService.getHero(id);
    });
  }

}
