import { HttpHeaders, HttpParams } from '@angular/common/http';

export abstract class RestangularConfig {
  /**
   * String that be appended in every url.
   */
  baseUrl?: string;

  /**
   * Headers that would be appended for every request.
   */
  defaultHeaders?: HttpHeaders | {[name: string]: string | string[]};

  /**
   * Params that would be appended for every request.
   */
  defaultParams?: HttpParams | {[name: string]: string | string[]};
}

export const DefaultRestangularConfig: RestangularConfig = {};
