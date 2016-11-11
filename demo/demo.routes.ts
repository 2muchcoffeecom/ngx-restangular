import {Routes} from '@angular/router';
import {Demo} from "./demo.component";
import {RequestCalcComponent} from "./request-calc";
import {simpleAppRoutes} from "./simple-app/simple-app.routes";


export const routes: Routes = [
  {path: '', component: RequestCalcComponent},
  {path: 'requestcalc', component: RequestCalcComponent},
  {path: 'simpleapp', children: simpleAppRoutes}
];

