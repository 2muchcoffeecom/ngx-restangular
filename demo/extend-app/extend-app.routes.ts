import {Routes} from '@angular/router';
import {ExtendAppComponent} from "./extend-app.component";
// import {HeroDashboardComponent} from "./hero-dashboard/";
// import {HeroListComponent} from "./hero-list/";
// import {HeroDetailComponent} from "./hero-detail/";


export const exampleAppRoutes: Routes = [
  {
    path: '',
    component: ExtendAppComponent,
    // children: [
    //   {path: 'herolist', component: HeroListComponent},
    //   {path: 'herodashboard', component: HeroDashboardComponent},
    //   {path: 'herodetail/:id', component: HeroDetailComponent},
    //   {path: '', redirectTo: '/simpleapp/herolist'}
    // ]
  },
];

