import { HttpBackend } from "@angular/common/http";
import {RestangularHttp} from "../../src/ngx-restangular-http";
import { MockBackendService } from "./mock-backend.service";

export const MockProviders = [
  MockBackendService,
  {
    provide: RestangularHttp,
    useFactory: (http: HttpBackend) => {
      return new RestangularHttp(http);
    },
    deps: [MockBackendService]
  }
];
