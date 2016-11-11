import {Routes} from '@angular/router';
import {Demo} from "./demo.component";
import {RequestCalcComponent} from "./request-calc";
import {simpleAppRoutes} from "./simple-app/simple-app.routes";
import {LandingComponent} from "./landing/landing.component";


export const routes: Routes = [
  {path: '', component: Demo, children: [
    {path: '', component: LandingComponent},
    {path: 'requestcalc', component: RequestCalcComponent},
    {path: 'simpleapp', children: simpleAppRoutes}
  ] },

];

