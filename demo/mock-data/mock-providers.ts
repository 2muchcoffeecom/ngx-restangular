import {BaseRequestOptions, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {RestangularHttp} from "../../src/ng2-restangular-http";

export const MockProviders = [
  BaseRequestOptions,
  MockBackend,
  {
    provide: RestangularHttp,
    useFactory: (http: Http) => {
      return new RestangularHttp(http);
    },
    deps: [Http]
  },
  {
    provide: Http,
    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backendInstance, defaultOptions);
    },
    deps: [MockBackend, BaseRequestOptions]
  },
];