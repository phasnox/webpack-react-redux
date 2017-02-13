'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var appConfig = require('./appConfig');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    `webpack-dev-server/client?http://${appConfig.HOST}:${appConfig.PORT}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{loader: 'eslint-loader', options: {rules: {semi: 0}}}],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader'}]
      },
      {
        test: /\.json?$/,
        use: [{loader: 'json-loader'}]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]' },
          { loader: 'sass-loader' }
        ]
      },
      { 
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/, 
        use: [{loader: 
          'url-loader?limit=10000&mimetype=application/font-woff' 
        }]
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, 
        use: [{loader: 'file-loader'}]
      }
    ]
  }
};
