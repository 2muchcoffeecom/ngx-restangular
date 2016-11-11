import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Hero} from "./hero";

@Injectable()
export class HeroService {
  private heroes: Hero[] = [
    {name:"Hero1"},
    {name:"Hero2"},
    {name:"Hero3"},
    {name:"Hero4"},
    {name:"Hero5"},
    {name:"Hero6"},
    {name:"Hero7"},
    {name:"Hero8"}
  ];

  getHeroes() {
    return this.heroes;
  }

  getHero(id) {
    return this.heroes[id]
  }

}