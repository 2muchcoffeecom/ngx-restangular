## Developing

### Setup

```
npm ci
```

`package-lock.json` was generated with npm 11. npm 10.9.2 installs from it fine, but crashes with `Cannot read properties of null (reading 'edgesOut')` when it has to resolve the Vitest peer set again, for example after deleting the lockfile or upgrading Vitest; run that kind of change with `npx npm@11 install`.

### Testing

```
npm test
```

Runs the library specs once with Vitest.

### Building

```
npm run build
```

Builds the library in partial-Ivy format into `dist/ngx-restangular` and copies README.md and LICENSE next to it. That folder is what gets published.

### Checking an Angular version

```
npm run build
tools/check-consumer.sh 22.2.2
```

Creates a fresh app with that Angular version outside the repository, installs the packed library, runs a production build and the tests in `tools/consumer-harness`. Use it before widening the Angular range in `projects/ngx-restangular/package.json`.

### Start Demo

```
npm run build
npm start
```

## Submitting Pull Requests

**Please follow these basic steps to simplify pull request reviews.**

* Please rebase your branch against the current master
* Run ```npm ci``` to make sure your development dependencies are up-to-date
* Run ```npm test``` and ```npm run build```
* Make reference to possible [issues](https://github.com/2muchcoffeecom/ngx-restangular/issues) on PR comment

## Submitting bug reports

* Please detail the affected browser(s) and operating system(s)
* Please be sure to state which version of node **and** npm you're using
