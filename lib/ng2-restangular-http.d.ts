import { Http } from '@angular/http';
import { Observable } from 'rxjs';
export declare class RestangularHttp {
    http: Http;
    constructor(http: Http);
    createRequest(options: any): Observable<any>;
    request(request: any): Observable<any>;
}
