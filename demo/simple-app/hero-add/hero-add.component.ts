import {Component} from "@angular/core";

import 'rxjs/Rx';
import {Restangular} from "../../../src/ng2-restangular";


@Component({
  selector: 'hero-dashboard',
  styleUrls: ['./simple-app/hero-add/hero-add.style.css'],
  templateUrl: './simple-app/hero-add/hero-add.template.html'
})
export class HeroAddComponent {

  constructor(public restangular: Restangular) {
  }

  ngOnInit() {
  }

  submitForm (form){
    this.restangular.all('heroes').post(form.value);
  }

}
