export class RestangularFieldsMap {
  readonly route: string = 'route';
  readonly id: string = 'id';
  readonly isCollection: string = 'isCollection';

  constructor({
    route,
    id,
    isCollection,
  }: {
    route?: string,
    id?: string,
    isCollection?: string,
  }) {
    this.route = route || this.route;
    this.id = id || this.id;
    this.isCollection = isCollection || this.isCollection;
  }
}

export const defaultRestangularFields: RestangularFieldsMap = {
  route: 'route',
  id: 'id',
  isCollection: 'isCollection',
};
