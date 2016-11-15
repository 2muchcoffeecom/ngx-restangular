import {Component, Inject} from "@angular/core";
import {Restangular} from "./../../src";

import 'rxjs/Rx';
import {RANDOM_USER} from "../random-user-restangular/random-user-restangular";


@Component({
  selector: 'extend-app',
  styleUrls: ['./extend-app/extend-app.style.css'],
  templateUrl: './extend-app/extend-app.template.html'
})
export class ExtendAppComponent {
  public response;

  public users;

  constructor(public restangular: Restangular,  @Inject(RANDOM_USER) public randomUser) {

  }

  getUsers() {
    this.randomUser.all("users").getList().subscribe(users => {
      this.users = users;
    });
  }

  errorInterceptor() {
    alert("Check Console Please");
    this.restangular.withConfig((RestangularConfigurer) => {
      RestangularConfigurer.setBaseUrl('http://api.2muchcoffee.com/v1');
    }).all("error").getList().subscribe(res => {
      console.log(res);
    },err => {
      console.log("Error from server:", err);
    });
  }
}
