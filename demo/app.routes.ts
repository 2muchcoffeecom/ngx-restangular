import {Routes} from '@angular/router';
import {RequestCalcComponent} from "./request-calc";
import {simpleAppRoutes} from "./simple-app/simple-app.routes";
import {LandingComponent} from "./landing/landing.component";
import {extendAppRoutes} from "./extend-app/extend-app.routes";


export const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'requestcalc', component: RequestCalcComponent},
  {path: 'simpleapp', children: simpleAppRoutes},
  {path: 'extendapp', children: extendAppRoutes},
];

