module.exports = {
  entry: './src/index.ts',
  output: {
    path: __dirname + '/dist/umd',
    filename: './ng2-restangular.js',
    libraryTarget: 'umd',
    library: 'ng2-restangular'
  },
  externals: {
    '@angular/core': {
      root: ['ng', 'core'],
      commonjs: '@angular/core',
      commonjs2: '@angular/core',
      amd: '@angular/core'
    },
    '@angular/common': {
      root: ['ng', 'common'],
      commonjs: '@angular/common',
      commonjs2: '@angular/common',
      amd: '@angular/common'
    },
    'rxjs/Subject': {
      root: ['rx', 'Subject'],
      commonjs: 'rxjs/Subject',
      commonjs2: 'rxjs/Subject',
      amd: 'rxjs/Subject'
    },
    'rxjs/Observable': {
      root: ['rx', 'Observable'],
      commonjs: 'rxjs/Observable',
      commonjs2: 'rxjs/Observable',
      amd: 'rxjs/Observable'
    },
    'rxjs/observable/merge': {
      root: ['rx', 'Observable', 'merge'],
      commonjs: 'rxjs/observable/merge',
      commonjs2: 'rxjs/observable/merge',
      amd: 'rxjs/observable/merge'
    },
    'rxjs/add/operator/map': {
      root: ['rx', 'Observable'],
      commonjs: 'rxjs/add/operator/map',
      commonjs2: 'rxjs/add/operator/map',
      amd: 'rxjs/add/operator/map'
    },
    'rxjs/add/operator/mergeMap': {
      root: ['rx', 'Observable'],
      commonjs: 'rxjs/add/operator/mergeMap',
      commonjs2: 'rxjs/add/operator/mergeMap',
      amd: 'rxjs/add/operator/mergeMap'
    },
    'rxjs/add/operator/takeUntil': {
      root: ['rx', 'Observable'],
      commonjs: 'rxjs/add/operator/takeUntil',
      commonjs2: 'rxjs/add/operator/takeUntil',
      amd: 'rxjs/add/operator/takeUntil'
    },
    'rxjs/add/operator/filter': {
      root: ['rx', 'Observable'],
      commonjs: 'rxjs/add/operator/filter',
      commonjs2: 'rxjs/add/operator/filter',
      amd: 'rxjs/add/operator/filter'
    },
    'rxjs/add/operator/pairwise': {
      root: ['rx', 'Observable'],
      commonjs: 'rxjs/add/operator/pairwise',
      commonjs2: 'rxjs/add/operator/pairwise',
      amd: 'rxjs/add/operator/pairwise'
    },
    'rxjs/add/operator/take': {
      root: ['rx', 'Observable'],
      commonjs: 'rxjs/add/operator/take',
      commonjs2: 'rxjs/add/operator/take',
      amd: 'rxjs/add/operator/take'
    }
  },
  devtool: 'source-map',
  module: {
    preLoaders: [{
      test: /\.ts$/, loader: 'tslint-loader?emitErrors=true&failOnHint=true', exclude: /node_modules/
    }],
    loaders: [{
      test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  }
};
