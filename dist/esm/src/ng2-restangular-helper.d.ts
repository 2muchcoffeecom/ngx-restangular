import { URLSearchParams, Headers, RequestOptions } from '@angular/http';
export declare class RestangularHelper {
    static createRequestOptions(options: any): RequestOptions;
    static createRequestQueryParams(queryParams: any): URLSearchParams;
    static createRequestHeaders(headers: any): Headers;
}
