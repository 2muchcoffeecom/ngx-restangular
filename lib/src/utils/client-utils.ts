import { RestangularFieldsMap } from '../mapping';

export function extendClientWithId(object, properties: RestangularFieldsMap) {
  const getIdFromBuilder = function() {
    return this.builder.id;
  };
  const setIdToBuilder = function(value) {
    this.builder.id = value;
  };
  Object.defineProperty(object, 'id', {
    get: getIdFromBuilder.bind(object),
    set: setIdToBuilder.bind(object),
    enumerable: true,
  });
  return object;
}
