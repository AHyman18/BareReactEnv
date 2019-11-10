const path = require('path');
const webpack = require('webpack');
const multi = require('multi-loader');

module.exports = {
  entry: './client/index.js',
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    //Rules for loaders to handle extensions
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules | bower_components)/,
        use: {
          loader: 'babel-loader'
        }
        // options: { presets: ['@babel/preset-env'] }
      },
      {
        test: /\.css$/,
        use: {
          loader: multi('style-loader', 'css-loader')
        }
      }
    ]
  },
  //Required to serve application + create instances of DOM in test environment using JSDOM
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    //HMR on the dev server
    hot: true,
    contentBase: path.resolve(__dirname, 'build/bundle.js'),
    publicPath: '/',
    //Cors
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};
