import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'home',
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor() {
  }

  ngOnInit() {
    console.log('hello `Home` component');
  }
}
