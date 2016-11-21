import {Component} from "@angular/core";

import 'rxjs/Rx';
import {Restangular} from "../../../src/ng2-restangular";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'hero-detail',
  styleUrls: ['./simple-app/hero-detail/hero-detail.style.css'],
  templateUrl: './simple-app/hero-detail/hero-detail.template.html'
})
export class HeroDetailComponent {

  private heroes;
  private id: number;

  public hero: Restangular;
  public editable: boolean;

  constructor(private route: ActivatedRoute, private restangular: Restangular, private router: Router) {
    this.heroes = restangular.all("heroes");
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.id = +params['id'];
    });
    this.restangular.one("heroes", this.id).get().subscribe(res => {
      this.hero = res;
    });

  }

  deleteHero() {
    debugger;
    this.hero.remove(null,{"id":this.id}).subscribe(heroes => {
      this.router.navigate(["/simpleapp/herolist"]);
    })
  }

  editHero() {
    if (this.editable) {
      this.hero.put(null,{"id":this.id});
      this.editable = false;
    }
    else this.editable = true;
  }

}
