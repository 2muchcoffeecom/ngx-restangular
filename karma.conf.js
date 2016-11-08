'use strict';

const webpack = require('webpack');
const WATCH = process.argv.indexOf('--watch') > -1;

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('karma-jasmine-html-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-coverage'),
      require('karma-phantomjs-launcher')
    ],

    // list of files / patterns to load in the browser
    files: [
      'test/entry.ts'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/entry.ts': ['webpack', 'sourcemap']
    },

    webpack: {
      resolve: {
        extensions: ['', '.ts', '.js'],
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      },
      module: {
        preLoaders: [{
          test: /\.ts$/, loader: 'tslint', exclude: /node_modules/
        }],
        loaders: [{
          test: /\.ts$/, loader: 'ts', exclude: /node_modules/
        }, {
          test: /sinon.js$/, loader: 'imports?define=>false,require=>false'
        }],
        postLoaders: [{
          test: /src\/.+\.ts$/,
          exclude: /(test|node_modules)/,
          loader: 'sourcemap-istanbul-instrumenter?force-sourcemap=true'
        }]
      },
      tslint: {
        emitErrors: !WATCH,
        failOnHint: false
      },
      plugins: [
        new webpack.SourceMapDevToolPlugin({
          filename: null,
          test: /\.(ts|js)($|\?)/i
        })
      ].concat(!WATCH ? [new webpack.NoErrorsPlugin()] : [])
    },

    remapIstanbulReporter: {
      reports: {
        html: 'coverage/html',
        'text-summary': null
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'kjhtml'], //'karma-remap-istanbul',

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: WATCH,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // How many browsers Karma launches in parallel.
    concurrency: 1
  });
};
