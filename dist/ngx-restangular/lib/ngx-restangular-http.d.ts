import { HttpBackend, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class RestangularHttp {
    http: HttpBackend;
    constructor(http: HttpBackend);
    createRequest(options: any): Observable<HttpEvent<any>>;
    request(request: HttpRequest<any>): Observable<HttpEvent<any>>;
}
