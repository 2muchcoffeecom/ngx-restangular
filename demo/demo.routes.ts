import {Routes} from '@angular/router';
import {Demo} from "./demo.component";
import {RequestCalcComponent} from "./request-calc";


export const routes: Routes = [
  {path: '', component: Demo},
  {path: 'requestcalc', component: RequestCalcComponent}
];

