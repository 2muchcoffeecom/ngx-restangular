export interface RestangularBuilderOptions {
  id?: string | number;
  route?: string;
  isCollection: boolean;
  parent?: RestangularBuilder;
}

export class RestangularBuilder {
  /**
   * If both id and route presented it is a pointer to the resource entity
   *
   *
   * Id of current Entity, if present this is pointer to entity.
   */
  protected id: string | number;
  /**
   * Resource of current Entity, if present this is pointer to resource.
   */
  protected route: string;

  /**
   * Parent builder used to form complete pointer.
   * Could be not present if it is first pointer at the chain.
   */
  protected parent: RestangularBuilder;

  /**
   * Private identifier that used to check is it resource pointer or entity.
   */
  private isCollection: boolean;

  constructor({id, route, isCollection, parent}: RestangularBuilderOptions) {
    if (!(id || route)) {
      throw new Error('Route or Id must be provided');
    }
    this.id = id;
    this.route = route;
    this.isCollection = isCollection;
    this.parent = parent;
  }

  protected get builderArray() {
    if (!this.parent) {
      return [this];
    }
    return [this, ...this.parent.builderArray];
  }

  get pointer() {
    return this.builderArray
    .reduceRight((acc, builder) => [...acc, builder.route, builder.id], [])
    .filter((route) => !!route);
  }

  /**
   * Generates new Builder that is pointer to one entity with parent as this one.
   * Used to build pointer to resources.
   */
  one(id: string | number): RestangularBuilder;
  /**
   * Generates new Builder that is pointer to resource entity with parent as this one.
   */
  one(route: string, id?: string | number): RestangularBuilder;
  one(routeOrId, id?): RestangularBuilder {
    let route = routeOrId;
    if (typeof id === 'undefined') {
      id = routeOrId;
      route = undefined;
    }
    return new RestangularBuilder({id, route, isCollection: false, parent: this});
  }

  /**
   * Generates new Builder that is pointer to resource with parent as this one.
   */
  all(route: string): RestangularBuilder {
    return new RestangularBuilder({route, isCollection: true, parent: this});
  }
}
