export default {
  input: 'tmp/esm5/ngx-restangular.js',
  output: {
    file: 'dist/bundles/ngx-restangular.umd.js',
    format: 'umd',
    name: 'ngxRestangular'
  },
  globals: {
    // Angular dependencies
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/common/http': 'ng.common.http',
  }
};
