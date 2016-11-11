import {Component} from "@angular/core";

import 'rxjs/Rx';
import {Observable, BehaviorSubject} from "rxjs";
import {Restangular} from "../../../src/ng2-restangular";
import {Hero} from "../../heroes-service/hero";
import {ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'hero-detail',
  styleUrls: ['./simple-app/hero-detail/hero-detail.style.css'],
  templateUrl: './simple-app/hero-detail/hero-detail.template.html'
})
export class HeroDetailComponent {

  public hero: Hero;

  constructor(private route: ActivatedRoute, private restangular: Restangular){
  }

  ngOnInit() {
    let id;
    this.route.params.forEach((params: Params) => {
      id = +params['id'];
    });
    this.restangular.one("heroes",id).get().subscribe(res => {
      this.hero = res;
    });

  }

}
