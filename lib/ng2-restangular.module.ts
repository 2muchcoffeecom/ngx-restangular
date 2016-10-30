/* tslint:disable:member-ordering no-unused-variable */
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from "@angular/core";
import {RESTANGULAR, RestangularFactory} from "./ng2-restangular.config";
import {Restangular} from "./ng2-restangular";

@NgModule({
  providers: [Restangular]
})
export class RestangularModule {
  
  constructor(@Optional() @SkipSelf() parentModule: RestangularModule) {
    if (parentModule) {
      throw new Error(
        'RestangularModule is already loaded. Import it in the AppModule only');
    }
  }
  
  static forRoot(ConfigRestangularFunction: any): ModuleWithProviders {
    return {
      ngModule: RestangularModule,
      providers: [
        {provide: RESTANGULAR, useFactory: RestangularFactory(ConfigRestangularFunction)},
      ]
    };
  }
}