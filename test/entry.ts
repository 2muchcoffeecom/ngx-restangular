/// <reference types="jasmine" />

import 'core-js';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/proxy';
import 'zone.js/dist/jasmine-patch';
import 'rxjs';
import {
  TestBed
} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import {use} from 'chai';
import * as sinonChai from 'sinon-chai';

use(sinonChai);

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

declare var require: any;
const testsContext: any = require.context('./', true, /\.spec/);
testsContext.keys().forEach(testsContext);
