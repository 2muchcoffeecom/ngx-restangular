import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RestangularModule } from 'ngx-restangular';

export function restangularConfig(provider: any) {
  provider.setBaseUrl('/api');
  provider.setRequestSuffix('.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(RestangularModule.forRoot(restangularConfig)),
  ]
};
