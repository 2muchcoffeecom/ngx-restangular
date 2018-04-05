import { RestangularClient } from './client';

export abstract class Restangular {

  abstract one(id: string | number): RestangularClient;
  abstract one(route: string, id?: string | number): RestangularClient;

  abstract all(route: string): RestangularClient;

  abstract extendConfig(options: any): RestangularClient;

  abstract withConfig(options: any): RestangularClient;
}
