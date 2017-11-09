import {Component} from "@angular/core";

import {Restangular} from "../../../src/ngx-restangular";
import {Router} from "@angular/router";


@Component({
  selector: 'hero-dashboard',
  styleUrls: ['./simple-app/hero-add/hero-add.style.css'],
  templateUrl: './simple-app/hero-add/hero-add.template.html'
})
export class HeroAddComponent {

  constructor(public restangular: Restangular, private router: Router) {
  }

  ngOnInit() {
  }

  submitForm (form){
    this.restangular.all('heroes').post(form.value);
    this.router.navigate(["/simpleapp/herolist"]);
  }

}
