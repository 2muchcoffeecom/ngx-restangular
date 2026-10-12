# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 7.1.0-beta.0 (unreleased)

Typed routes, as a beta on the `next` tag. Types only: the published JavaScript is identical to 7.0.0.

### Features

- Register routes once in the `RestangularRoutes` interface with `declare module 'ngx-restangular'`, and `one`, `all`, `several`, `oneUrl`, `allUrl`, `service`, `withConfig`, `copy`, `restangularizeElement`, `restangularizeCollection` and the members of returned elements and collections become typed. With no routes registered, every one of them stays `any`, as in 7.0.0.
- Unregistered routes and unlisted children stay `any`, so routes can be registered one at a time.
- `customGET`, `customPOST` and the other custom methods take an optional response type, `customGET<T>()`.
- New exported types: `RestangularRoutes`, `RestangularRoute`, `RestElement`, `RestCollection`, `RestangularElementMembers`, `RestangularCollectionMembers`, `RestangularResourceService`, `RestangularTypedService`, `RestangularMember`, `RestangularId`, `RestangularParams`, `RestangularHeaders`.

### Development

- `npm run test:types` builds the package and compiles two apps against it with `--strict`: one with no routes registered, where every typed member must be `any`, and one with routes registered.
- The library suite gains a typed-routes spec (79 tests), and `tools/consumer-harness` gains one, so `tools/check-consumer.sh` checks the types under each Angular version's own TypeScript.

## 7.0.0 (unreleased)

Angular 16 to 22. The public API is unchanged; the package format and its dependencies changed.

### Breaking changes

- Peer dependencies are `@angular/core` and `@angular/common` `^16.0.0` through `^22.0.0`, and `rxjs` `^7.4.0`. `@angular/platform-browser` and `core-js` are no longer peer dependencies.
- The package is built with Angular 21 in partial-Ivy format and ships FESM2022 only. The UMD bundles, the ES2015 builds and `ngx-restangular.metadata.json` from 6.x are gone.
- lodash comes in as `lodash-es`, a regular dependency. 6.x imported `lodash` without declaring it. `@types/lodash` is no longer installed with the package.

### Fixes

- Ivy apps link the package directly. 6.0.0 was a View Engine build, which caused `Type RestangularModule does not have 'ɵmod' property` (#221, #232) and can't load on Angular 16 or later, where ngcc no longer exists.
- No deep import into `core-js/features/object` (#179).
- The lodash dependency is declared (#183).
- The npm package includes README.md and LICENSE.

### Development

- The workspace runs on Angular 21, TypeScript 5.9 and RxJS 7.8, with Vitest for tests. 74 tests describe the 6.x behavior; they pass on the 6.x source and on 7.0.0.
- `tools/check-consumer.sh <angular-version>` installs the packed library into a fresh app of that version, builds it and runs requests through it.
- The demo app uses the library.

### Known issues carried over from 6.x

- `element.clone()` without an argument returns an empty element. `Restangular.copy(element)` works.
- Requests go through `HttpBackend`, so `HttpClient` interceptors don't see them (#185).
- A response body of `false`, `0` or `""` comes back as an empty object (#229).
- `getList()` on a 204 response with an empty body throws `Response for getList SHOULD be an array` as an uncaught error, and the observable never emits (#159).
- Unsubscribing doesn't cancel a request that is already in flight.
- The headers object passed to a request method gets the default headers merged into it, and its keys set to `undefined` are deleted.
- `getRequestedUrl()` on a collection returned by `getList(params)` includes the serialized request object in its query string instead of the params.


<a name="0.1.7"></a>
## [0.1.7](https://github.com/2muchcoffeecom/ng2-restangular/compare/v0.1.6...v0.1.7) (2016-11-08)



<a name="0.1.6"></a>
## [0.1.6](https://github.com/2muchcoffeecom/ng2-restangular/compare/v0.1.5...v0.1.6) (2016-11-08)



<a name="0.1.5"></a>
## 0.1.5 (2016-11-08)
