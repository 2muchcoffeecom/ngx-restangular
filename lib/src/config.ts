import { HttpHeaders, HttpParams } from '@angular/common/http';

export abstract class RestangularConfig {
  /**
   * String that be appended in every url.
   */
  baseUrl?: string;

  /**
   * flag that response for set or append default headers
   */
  appendHeaders?: boolean;

  /**
   * Headers that would be appended or set for every request.
   */
  defaultHeaders?: HttpHeaders;

  /**
   * flag that response for set or append default params
   */
  appendParams?: boolean;

  /**
   * Params that would be appended or set for every request.
   */
  defaultParams?: HttpParams;
}

export const DefaultRestangularConfig: RestangularConfig = {};
