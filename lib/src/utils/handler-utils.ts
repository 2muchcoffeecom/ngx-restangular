import { HttpHeaders } from '@angular/common/http';

export function appendHeaders(
  headers: HttpHeaders = new HttpHeaders(),
  headersToAppend: HttpHeaders = new HttpHeaders(),
  append?: boolean
) {
  return headersToAppend.keys().reduce(
    (accHeaders, key) => {
      if (append) {
        return accHeaders.append(key, headersToAppend.get(key));
      }
      return accHeaders.set(key, headersToAppend.get(key));
    },
    headers
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
  return headers instanceof HttpHeaders;
}
