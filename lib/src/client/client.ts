import { RestangularHandler } from '../handler';
import { RestangularBuilder } from '../builder';

export class RestangularClient {

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
}
