import {Routes} from '@angular/router';
import {SimpleAppComponent} from "./simple-app.component";
import {HeroDashboardComponent} from "./hero-dashboard/";
import {HeroListComponent} from "./hero-list/";
import {HeroDetailComponent} from "./hero-detail/";


export const simpleAppRoutes: Routes = [
  {
    path: '',
    component: SimpleAppComponent,
    children: [
      {path: 'herolist', component: HeroListComponent},
      {path: 'herodashboard', component: HeroDashboardComponent},
      {path: 'herodetail/:id', component: HeroDetailComponent},
      {path: '', redirectTo: '/simpleapp/herolist'}
    ]
  },
];

