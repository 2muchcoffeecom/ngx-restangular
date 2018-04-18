import external from "./externals";

export default {
  input: 'tmp/esm5/ngx-restangular.js',
  output: {
    file: 'dist/bundles/ngx-restangular.umd.js',
    format: 'umd',
    name: 'ngxRestangular',
    globals: {
      // Angular dependencies
      '@angular/core': 'ng.core',
      '@angular/common/http': 'ng.common.http',
      'rxjs/Observable': 'Rx.Observable',
      'rxjs/operators/filter': 'Rx.operators.filter',
    },
  },
  onwarn: function (warning) {
    // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
    // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.error(warning.message);
  },
  external,
};
