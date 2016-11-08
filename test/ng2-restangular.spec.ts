import {
  fakeAsync,
  inject,
  tick,
  TestBed, async,

} from '@angular/core/testing';

import {BrowserModule} from "@angular/platform-browser";
import {Component, OpaqueToken,} from '@angular/core';
import {BaseRequestOptions, ConnectionBackend, HttpModule, ResponseOptions, Response, Jsonp} from '@angular/http';
import {By} from '@angular/platform-browser/src/dom/debug/by';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {Injectable, Injector} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Http, Headers, RequestOptions, URLSearchParams, Request, RequestMethod} from "@angular/http";

// let _ = require('lodash');
// let $q = require('q');


import {RestangularModule, Restangular, RestangularHttp} from "../src";

function SharedSetup() {

  beforeEach(() => {

      return TestBed.configureTestingModule({
        imports: [HttpModule, RestangularModule, BrowserModule],
        providers: [
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
        ],
      })
    }
  );
}


// export const RESTANGULAR_BING = new OpaqueToken('RestangularBing');
// export function RestangularBingFactory(restangular: Restangular) {
//   return restangular.withConfig((RestangularConfigurer) => {
//     RestangularConfigurer.setBaseUrl('http://www.bing.com');
//   });
// }
//
// describe("testFunc", ()=> {
//
//   let queryParams;
//   let headers;
//   let search;
//   let options;
//   let request;
//   let elementToPost;
//   let endpoint;
//   let id;
//   let resOptions;
//   let response;
//
//
//
//   beforeEach(() => {
//
//     search = new URLSearchParams();
//     queryParams = {"testParam": "test"};
//     headers = {"testHeader": "test"};
//     elementToPost = {"ElementToPost": "test"};
//     endpoint = "endpoint";
//     id = 111;
//
//     for (let key in queryParams) {
//       //if (!usedPathParams[key]) {
//       let value: any = queryParams[key];
//       if (typeof value === 'object') {
//         // if (value instanceof Object) {
//         value = JSON.stringify(value);
//       }
//       search.append(key, value);
//       //}
//     }
//
//     options = new RequestOptions({
//       url: "/" + endpoint + "/" + id,
//       headers: new Headers(headers),
//       search: search,
//       body: elementToPost
//     });
//     request = new Request(options);
//
//     resOptions = new ResponseOptions({
//       body: JSON.stringify([{test: true}]),
//       headers: new Headers({
//         'testHeader': 'testBack'
//       }),
//       status: 403
//     });
//     response = new Response(resOptions);
//
//     return TestBed.configureTestingModule({
//       imports: [HttpModule, BrowserModule,
//         RestangularModule.forRoot((RestangularProvider) => {
//             RestangularProvider.setParentless(true);
//           }
//         )
//       ],
//       providers: [
//         BaseRequestOptions,
//         MockBackend,
//         ConnectionBackend,
//         Jsonp,
//         {
//           provide: RestangularHttp,
//           useFactory: (http: Http) => {
//             return new RestangularHttp(http);
//           },
//           deps: [Http]
//         },
//         {
//           provide: Http,
//           useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
//             return new Http(backendInstance, defaultOptions);
//           },
//           deps: [MockBackend, BaseRequestOptions]
//         },
//         { provide: RESTANGULAR_BING, useFactory:  RestangularBingFactory, deps: [Restangular] }
//       ],
//     })
//
//   });
//
//   it("test()", async(inject([MockBackend, RestangularHttp, Injector, RESTANGULAR_BING], (backend, http, injector, resfr) => {
//     let service = new Restangular(null,injector,http);
//
//     // service.provider.setFullResponse(true);
//     let refreshAccesstoken = function () {
//       // Refresh access-token logic
//       return Observable.of(true)
//     };
//
//     service.provider.addErrorInterceptor((response, subject, responseHandler) => {
//       if (response.status === 403) {
//
//         refreshAccesstoken()
//           .switchMap(refreshAccesstokenResponse => {
//             debugger;
//             response.request.url = "test";
//             return response.repeatRequest(response.request);
//           })
//           .subscribe(
//             res => responseHandler(res),
//             err => subject.error(err)
//           );
//
//         return false; // error handled
//       }
//       return true; // error not handled
//     });
//
//     backend.connections.subscribe((connection: MockConnection) => {
//
//       debugger;
//       connection.mockError(response);
//     });
//
//     let t = service.all('users').getList().subscribe(res=>{
//       debugger;
//     },err => {
//       debugger;
//     })
//
//   })));
//
// });

describe('Restangular | ', () => {

  SharedSetup();

  let queryParams;
  let headers;
  let search;
  let options;
  let request;
  let elementToPost;
  let endpoint;
  let id;
  let resOptions;
  let response;

  beforeEach(() => {

    search = new URLSearchParams();
    queryParams = {"testParam": "test"};
    headers = {"testHeader": "test"};
    elementToPost = {"ElementToPost": "test"};
    endpoint = "endpoint";
    id = 111;

    for (let key in queryParams) {
      //if (!usedPathParams[key]) {
      let value: any = queryParams[key];
      if (typeof value === 'object') {
        // if (value instanceof Object) {
        value = JSON.stringify(value);
      }
      search.append(key, value);
      //}
    }

    options = new RequestOptions({
      url: "/" + endpoint + "/" + id,
      headers: new Headers(headers),
      search: search,
      body: elementToPost
    });
    request = new Request(options);

    resOptions = new ResponseOptions({
      body: JSON.stringify({test: true}),
      headers: new Headers({
        'testHeader': 'testBack'
      }),
      status: 200
    });
    response = new Response(resOptions);

  });




  describe("Resangularize ", ()=> {

    it("Elem(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      let parent = service.one(endpoint, id);
      let elem = service.restangularizeElement(parent, {testData: true}, endpoint, queryParams);

      expect(elem.testData).toBeTruthy();
      expect(elem.route).toBe(endpoint);
    })));

    it("Collection(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      let parent = service.one(endpoint, id);
      let collection = service.restangularizeCollection(parent, [{testData: true}], endpoint, queryParams);

      expect(collection[0].testData).toBeTruthy();
      expect(collection[0].route).toBe(endpoint);
    })));

  });

  describe("One |", ()=> {
    it("Get(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
      let service = new Restangular(null,injector,http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).get(queryParams, headers).subscribe(res => {
        debugger;
        expect(res.data.test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("Put(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
      let service = new Restangular(null,injector,http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).put(queryParams, headers).subscribe(res => {
        expect(res.data.test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("Remove(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
      let service = new Restangular(null,injector,http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).remove(queryParams, headers).subscribe(res => {
        expect(res.data.test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("Head(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
      let service = new Restangular(null,injector,http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).head(queryParams, headers).subscribe(res => {
        expect(res.data.test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("Trace(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
      let service = new Restangular(null,injector,http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).trace(queryParams, headers).subscribe(res => {
        expect(res.data.test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("Options(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
      let service = new Restangular(null,injector,http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).options(queryParams, headers).subscribe(res => {
        expect(res.data.test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("Patch(object,params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
      let service = new Restangular(null,injector,http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();
        expect(connection.request.getBody()).toBe(request.getBody());

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).patch(elementToPost,queryParams, headers).subscribe(res => {
        expect(res.data.test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("Clone()", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });

      service.one(endpoint, id).get(queryParams, headers).subscribe(res => {
        expect(res.clone()).toBeDefined();
      });

    })));

    describe("",()=>{
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint + "/" + id,
          headers: new Headers(headers),
          // search: search,
          body: elementToPost
        });
        request = new Request(options);
      });

      it("GetRequestedUrl(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
        let service = new Restangular(null,injector,http);

        expect(service.one(endpoint, id).getRequestedUrl()).toBe(request.url);
      })));
    });

    describe("",()=>{
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint + "/" + id,
          headers: new Headers(headers),
          body: elementToPost
        });
        request = new Request(options);
      });

      it("GetRestangularUrl(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
        let service = new Restangular(null,injector,http);

        expect(service.one(endpoint, id).getRestangularUrl()).toBe(request.url);
      })));
    });

    describe("",()=>{
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint + "/" + id + "/" + endpoint,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);

        resOptions = new ResponseOptions({
          body: JSON.stringify([{test: true},{test: true}]),
          headers: new Headers({
            'testHeader': 'testBack'
          }),
          status: 200
        });
        response = new Response(resOptions);
      });

      it("GetParentList()", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
        let service = new Restangular(null,injector,http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();

          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.one(endpoint,id).getList(endpoint,queryParams,headers).subscribe(res => {
          expect(res.data).toBe(res.data[0].getParentList());
        });
      })));
    });

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint + "/" + id + "/" + endpoint,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);

        resOptions = new ResponseOptions({
          body: JSON.stringify([{test: true},{test: true}]),
          headers: new Headers({
            'testHeader': 'testBack'
          }),
          status: 200
        });
        response = new Response(resOptions);
      });

      it("all(endpoint).getList()", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
        let service = new Restangular(null,injector,http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();


          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.one(endpoint,id).all(endpoint).getList(queryParams,headers).subscribe(res => {
          expect(res.data.map(res =>res.test).join("/")).toBe("true/true");
        });
      })));
    });

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint + "/" + id + "/" + endpoint + "/" + id + "/" + endpoint,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);

        resOptions = new ResponseOptions({
          body: JSON.stringify([{test: true},{test: true}]),
          headers: new Headers({
            'testHeader': 'testBack'
          }),
          status: 200
        });
        response = new Response(resOptions);
      });

      it("one(endpoint, id).getList()", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
        let service = new Restangular(null,injector,http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();


          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.one(endpoint,id).one(endpoint,id).getList(endpoint,queryParams,headers).subscribe(res => {
          expect(res.data.map(res =>res.test).join("/")).toBe("true/true");
        });
      })));
    });


    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: endpoint,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);
      });

      it("OneUrl(endpoint,url).get()", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
        let service = new Restangular(null,injector,http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();

          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.one(endpoint,id).oneUrl(endpoint, endpoint).get(queryParams,headers).subscribe(res => {
          expect(res.data.test).toBeTruthy();
          expect(res.headers.has("testHeader")).toBeTruthy();
        });
      })));
    });

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: endpoint,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);

        resOptions = new ResponseOptions({
          body: JSON.stringify([{test: true},{test: true}]),
          headers: new Headers({
            'testHeader': 'testBack'
          }),
          status: 200
        });
        response = new Response(resOptions);
      });

      it("allUrl(endpoint, id).getList()", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
        let service = new Restangular(null,injector,http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();

          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.one(endpoint,id).allUrl(endpoint,endpoint).getList(queryParams,headers).subscribe(res => {
          expect(res.data.map(res =>res.test).join("/")).toBe("true/true");
        });
      })));
    });

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint + "/" + id + "/" + endpoint + "/" + id + "," + id,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);

        resOptions = new ResponseOptions({
          body: JSON.stringify([{test: true},{test: true}]),
          headers: new Headers({
            'testHeader': 'testBack'
          }),
          status: 200
        });
        response = new Response(resOptions);
      });

      it("several(endpoint, id).getList()", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
        let service = new Restangular(null,injector,http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();

          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.one(endpoint,id).several(endpoint,id,id).getList(queryParams,headers).subscribe(res => {
          expect(res.data.map(res =>res.test).join("/")).toBe("true/true");
        });
      })));
    });

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint + "/" + id + "/" + endpoint,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);

        resOptions = new ResponseOptions({
          body: JSON.stringify([{test: true},{test: true}]),
          headers: new Headers({
            'testHeader': 'testBack'
          }),
          status: 200
        });
        response = new Response(resOptions);
      });

      it("GetList(subelem, elemtopost, params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
        let service = new Restangular(null,injector,http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();


          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.one(endpoint,id).getList(endpoint,queryParams,headers).subscribe(res => {
          expect(res.data.map(res =>res.test).join("/")).toBe("true/true");
        });
      })));
    });

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint + "/" + id + "/" + endpoint,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);

        resOptions = new ResponseOptions({
          body: JSON.stringify({test: true}),
          headers: new Headers({
            'testHeader': 'testBack'
          }),
          status: 200
        });
        response = new Response(resOptions);
      });

      it("Post(subelem, elemtopost, params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend,http,injector) => {
        let service = new Restangular(null,injector,http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();
          expect(connection.request.getBody()).toBe(request.getBody());

          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.one(endpoint,id).post(endpoint,elementToPost,queryParams,headers).subscribe(res => {
          expect(res.data.test).toBeTruthy();
          expect(res.headers.has("testHeader")).toBeTruthy();
        });
      })));
    });

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint + "/" + id,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);
      });

      describe("", () => {
        beforeEach(() => {
          resOptions = new ResponseOptions({
            body: JSON.stringify([{test: true}]),
            headers: new Headers({
              'testHeader': 'testBack'
            }),
            status: 200
          });
          response = new Response(resOptions);

        });

        it("Clone()", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
          let service = new Restangular(null, injector, http);

          backend.connections.subscribe((connection: MockConnection) => {

            expect(connection.request.url).toBe(request.url);
            expect(connection.request.headers.has("testHeader")).toBeTruthy();

            connection.mockRespond(response);
          });

          service.one(endpoint, id).getList("", queryParams, headers).subscribe(res => {
            expect(res[0].clone()).toBeDefined();
          });
        })));

        it("Save()", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
          let service = new Restangular(null, injector, http);

          backend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(response);
          });

          service.one(endpoint, id).get(queryParams, headers).flatMap(res => res.save()).subscribe(item => {
            expect(item).toBeDefined();
          })
        })));
      });


      it("Plain()", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
        let service = new Restangular(null, injector, http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();

          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.one(endpoint, id).get(queryParams, headers).subscribe(res => {
          expect(res.data.plain().test).toBeTruthy();
          expect(res.data.test).toBeTruthy();
          expect(res.headers.has("testHeader")).toBeTruthy();
        });
      })));
    });

  });

  describe("All |", ()=> {
    beforeEach(() => {
      options = new RequestOptions({
        url: "/" + endpoint,
        headers: new Headers(headers),
        search: search,
        body: elementToPost
      });
      request = new Request(options);

      resOptions = new ResponseOptions({
        body: JSON.stringify([{test: true}]),
        headers: new Headers({
          'testHeader': 'testBack'
        }),
        status: 200
      });
      response = new Response(resOptions);
    });

    it("Clone()", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });

      service.all(endpoint).getList(queryParams, headers).subscribe(res => {
        expect(res[0].clone()).toBeDefined();
      });

    })));


    it("Remove(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.all(endpoint).remove(queryParams, headers).subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("Head(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.all(endpoint).head(queryParams, headers).subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("Trace(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.all(endpoint).trace(queryParams, headers).subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("Options(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.all(endpoint).options(queryParams, headers).subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("Patch(object,params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();
        expect(connection.request.getBody()).toBe(request.getBody());

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.all(endpoint).patch(elementToPost, queryParams, headers).subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);

        resOptions = new ResponseOptions({
          body: JSON.stringify([{test: true}, {test: true}]),
          headers: new Headers({
            'testHeader': 'testBack'
          }),
          status: 200
        });
        response = new Response(resOptions);
      });

      it("GetList(subelem, elemtopost, params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
        let service = new Restangular(null, injector, http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();

          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.all(endpoint).getList(queryParams, headers).subscribe(res => {
          expect(res.data.map(res =>res.test).join("/")).toBe("true/true");
        });
      })));
    });

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint + "/" + endpoint,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);

        resOptions = new ResponseOptions({
          body: JSON.stringify([{test: true}, {test: true}]),
          headers: new Headers({
            'testHeader': 'testBack'
          }),
          status: 200
        });
        response = new Response(resOptions);
      });

      it("all(e).getlist()", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
        let service = new Restangular(null, injector, http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();

          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.all(endpoint).all(endpoint).getList(queryParams, headers).subscribe(res => {
          expect(res.data.map(res =>res.test).join("/")).toBe("true/true");
        });
      })));
    });

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint + "/" + endpoint + "/" + id,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);
      });

      it("One(endpoint,id).get()", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
        let service = new Restangular(null, injector, http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();

          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.all(endpoint).one(endpoint, id).get(queryParams, headers).subscribe(res => {
          expect(res.data[0].test).toBeTruthy();
          expect(res.headers.has("testHeader")).toBeTruthy();
        });
      })));
    });

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint + "/" + id,
          headers: new Headers(headers),
          body: elementToPost
        });
        request = new Request(options);
      });

      it("Get(id)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
        let service = new Restangular(null, injector, http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);

          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.all(endpoint).get(id).subscribe(res => {
          expect(res.data[0].test).toBeTruthy();
          expect(res.headers.has("testHeader")).toBeTruthy();
        });
      })));
    });

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);

        resOptions = new ResponseOptions({
          body: JSON.stringify([{test: true}]),
          headers: new Headers({
            'testHeader': 'testBack'
          }),
          status: 200
        });
        response = new Response(resOptions);
      });

      it("PutElement(elemtopost, params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
        let service = new Restangular(null, injector, http);

        backend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(response);
        });

        service.all(endpoint).getList(queryParams, headers).flatMap(users => users.putElement(0, queryParams)).subscribe(res => {
          expect(response).toBeDefined();
        });
      })));
    });

    describe("", () => {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint,
          headers: new Headers(headers),
          search: search,
          body: elementToPost
        });
        request = new Request(options);
      });

      it("Post(elemtopost, params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
        let service = new Restangular(null, injector, http);

        backend.connections.subscribe((connection: MockConnection) => {

          expect(connection.request.url).toBe(request.url);
          expect(connection.request.headers.has("testHeader")).toBeTruthy();
          expect(connection.request.getBody()).toBe(request.getBody());

          connection.mockRespond(response);
        });
        service.provider.setFullResponse(true);

        service.all(endpoint).post(elementToPost, queryParams, headers).subscribe(res => {
          expect(res.data[0].test).toBeTruthy();
          expect(res.headers.has("testHeader")).toBeTruthy();
        });
      })));
    });

    describe("", ()=> {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint,
          headers: new Headers(headers),
          // search: search,
          body: elementToPost
        });
        request = new Request(options);
      });

      it("GetRequestedUrl(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
        let service = new Restangular(null, injector, http);

        expect(service.all(endpoint).getRequestedUrl()).toBe(request.url);
      })));
    });

    describe("", ()=> {
      beforeEach(() => {
        options = new RequestOptions({
          url: "/" + endpoint,
          headers: new Headers(headers),
          body: elementToPost
        });
        request = new Request(options);
      });

      it("GetRestangularUrl(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
        let service = new Restangular(null, injector, http);

        expect(service.all(endpoint).getRestangularUrl()).toBe(request.url);
      })));
    });

  });

  describe("Custom", ()=> {
    beforeEach(() => {
      options = new RequestOptions({
        url: "/" + endpoint + "/" + id + "/" + endpoint,
        headers: new Headers(headers),
        search: search,
        body: elementToPost
      });
      request = new Request(options);

      resOptions = new ResponseOptions({
        body: JSON.stringify([{test: true}]),
        headers: new Headers({
          'testHeader': 'testBack'
        }),
        status: 200
      });
      response = new Response(resOptions);
    });

    it("CustomGet(path,params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).customGET(endpoint, queryParams, headers).subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));


    it("CustomDelete(path,params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).customDELETE(endpoint, queryParams, headers).subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("CustomPut(path,params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).customPUT(elementToPost, endpoint, queryParams, headers).subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("CustomPatch(path,params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).customPATCH(elementToPost, endpoint, queryParams, headers).subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("CustomPost(path,params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();
        expect(connection.request.getBody()).toBe(request.getBody());

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).customPOST(elementToPost, endpoint, queryParams, headers).subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("CustomGetList(path,params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).customGETLIST(endpoint, queryParams, headers).subscribe(res => {
        expect(res.data.map(res =>res.test)).toBeTruthy();
      });
    })));

  });

  describe("", ()=> {
    beforeEach(() => {
      options = new RequestOptions({
        url: endpoint,
        headers: new Headers(headers),
        search: search,
        body: elementToPost
      });
      request = new Request(options);

      resOptions = new ResponseOptions({
        body: JSON.stringify([{test: true}]),
        headers: new Headers({
          'testHeader': 'testBack'
        }),
        status: 200
      });
      response = new Response(resOptions);
    });

    it("oneUrl(params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.oneUrl(endpoint, endpoint).get(queryParams, headers).subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("allUrl(path,params, headers)", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.allUrl(endpoint, endpoint).getList(queryParams, headers).subscribe(res => {
        expect(res.data.map(res =>res.test)).toBeTruthy();
      });
    })));

  });

  describe("", ()=> {
    beforeEach(() => {
      options = new RequestOptions({
        url: "/" + endpoint + "/" + id + "/" + endpoint,
        headers: new Headers(headers),
        search: search,
        body: elementToPost
      });
      request = new Request(options);

      resOptions = new ResponseOptions({
        body: JSON.stringify([{test: true}]),
        headers: new Headers({
          'testHeader': 'testBack'
        }),
        status: 200
      });
      response = new Response(resOptions);
    });

    it("customOperation()", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      service.one(endpoint, id).customOperation("get", "endpoint", queryParams, headers).subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));

    it("addRestangularMethod()", async(inject([MockBackend, RestangularHttp, Injector], (backend, http, injector) => {
      let service = new Restangular(null, injector, http);

      backend.connections.subscribe((connection: MockConnection) => {

        expect(connection.request.url).toBe(request.url);
        expect(connection.request.headers.has("testHeader")).toBeTruthy();

        connection.mockRespond(response);
      });
      service.provider.setFullResponse(true);

      let MyService = service.one(endpoint, id)
      MyService.addRestangularMethod("testMethod", "get", "endpoint", queryParams, headers);

      MyService.testMethod().subscribe(res => {
        expect(res.data[0].test).toBeTruthy();
        expect(res.headers.has("testHeader")).toBeTruthy();
      });
    })));
  });

});