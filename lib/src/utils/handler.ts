import { HttpHeaders, HttpParams } from '@angular/common/http';

export function combineHeaders(
  headers: HttpHeaders = new HttpHeaders(),
  headersToCombine: HttpHeaders = new HttpHeaders(),
  append?: boolean
) {
  return combineMaps(headers, headersToCombine, append);
}

export function combineParams(
  params: HttpParams = new HttpParams(),
  paramsToCombine: HttpParams = new HttpParams(),
  append?: boolean
) {
  return combineMaps(params, paramsToCombine, append);
}

function combineMaps(
  map: any,
  mapToCombine: any,
  append?: boolean
) {
  return mapToCombine.keys().reduce(
    (accHeaders, key) => {
      if (append) {
        return accHeaders.append(key, mapToCombine.get(key));
      }
      return accHeaders.set(key, mapToCombine.get(key));
    },
    map
  );
}

export function escapeSlash(url: string = '') {
  if (typeof url === 'string') {
    return url.replace(/\/$/, '');
  }
  throw new Error('Couldn\'t transform not string values');
}

export function normalizeUrl(url: string) {
  const result = /((?:http[s]?:)?\/\/)?(.*)?/.exec(url);
  const schemeWithSlash = result[1];
  const restPart = result[2].replace(/[\\\/]+/g, '/');
  return (typeof schemeWithSlash !== 'undefined') ? schemeWithSlash + restPart : restPart;
}

export function isHttpHeaders(headers) {
  return headers instanceof HttpHeaders;
}

export function isHttpParams(headers) {
  return headers instanceof HttpParams;
}
