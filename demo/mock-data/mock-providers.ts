import {HttpClient, HttpHandler} from "@angular/common/http";
import {RestangularHttp} from "../../src/ngx-restangular-http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockBackendService } from "./mock-backend.service";

export const MockProviders = [
  MockBackendService,
  {
    provide: RestangularHttp,
    useFactory: (http: HttpClient) => {
      return new RestangularHttp(http);
    },
    deps: [HttpClient]
  },
  {
    provide: HttpClient,
    useFactory: (backendInstance: MockBackendService) => {
      return new HttpClient(backendInstance);
    },
    deps: [MockBackendService]
  },
];
