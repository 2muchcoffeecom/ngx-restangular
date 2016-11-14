import {Injectable, OpaqueToken} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Hero} from "./hero";
import {Restangular} from "../../src/ng2-restangular";




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

  getHeroes(number?) {
    if(arguments.length) {
      return this.heroes.slice(0,number)
    }
    return this.heroes;
  }

  getHero(id) {
    return this.heroes[id];
  }

  deleteHero(id) {
    this.heroes.splice(id,1);
    return this.heroes;
  }

  putHero(id, hero) {
    this.heroes[+id] = JSON.parse(hero);
    return this.heroes[+id];
  }


}