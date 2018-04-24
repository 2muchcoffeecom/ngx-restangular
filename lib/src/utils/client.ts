import { RestangularFieldsMap } from '../mapping';

export function extendClientWithId(object, properties: RestangularFieldsMap) {
  const getIdFromBuilder = function() {
    return this.builder.id;
  };
  const setIdToBuilder = function(value) {
    this.builder.id = value;
  };
  Object.defineProperty(object, properties.id, {
    get: getIdFromBuilder.bind(object),
    set: setIdToBuilder.bind(object),
    enumerable: true,
  });
  return object;
}

export function extendWithFields(objectToExtend, objectExtendWith = {}) {
  if (!objectExtendWith) {
    return objectToExtend;
  }
  const keys = Object.keys(objectExtendWith);
  keys.forEach((key) => objectToExtend[key] = objectExtendWith[key]);
  return objectToExtend;
}
