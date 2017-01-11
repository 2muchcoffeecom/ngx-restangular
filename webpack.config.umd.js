'use strict';

const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: __dirname + '/dist/umd',
    filename: './ng2-restangular.js',
    libraryTarget: 'umd',
    library: 'ng2-restangular'
  },
  externals: [nodeExternals()],
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
