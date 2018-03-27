import { RestangularHandler } from '../handler';
import { RestangularBuilder } from '../builder';
import { Restangular } from '../restangular';

export class RestangularClient implements Restangular{

  constructor(
    private builder: RestangularBuilder,
    private handler: RestangularHandler,
    private parent?: RestangularClient,
  ) {
  }

  /**
   * Dublicates RestangualarBuidler interfaces
   */
  one(id: string | number): RestangularClient;
  one(route: string, id?: string | number): RestangularClient;
  one(routeOrId, id?): RestangularClient {
    const builder = this.builder.one(routeOrId, id);
    return new RestangularClient(builder, this.handler);
  }

  /**
   * Dublicates RestangualarBuidler interfaces
   */
  all(route: string): RestangularClient {
    const builder = this.builder.all(route);
    return new RestangularClient(builder, this.handler);
  }

  /**
   * Dublicates RestangualarHandler interfaces
   */
  withConfig(options: any) {
    const handler = this.handler.withConfig(options);
    return new RestangularClient(this.builder, handler);
  }

  /**
   * Dublicates RestangualarHandler interfaces
   */
  extendConfig(options: any) {
    const handler = this.handler.extendConfig(options);
    return new RestangularClient(this.builder, handler);
  }
}
