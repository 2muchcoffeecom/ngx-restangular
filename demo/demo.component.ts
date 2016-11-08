import {Component} from "@angular/core";
import {Restangular} from "./../src";

@Component({
  selector: 'demo-app',
  styles: [``],
  template: `
    <div class="text-center">
      DEMO
    </div>
  `
})
export class Demo {
  constructor(public restangular: Restangular) {
    restangular.one('users', 2).get()
    .subscribe(res=>{
      
    });
  }
}
