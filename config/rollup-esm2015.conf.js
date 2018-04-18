import external from "./externals";

export default {
  input: 'tmp/esm2015/ngx-restangular.js',
  output: {
    file: 'dist/esm2015/ngx-restangular.js',
    format: 'es',
    sourcemap: true
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
