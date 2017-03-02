'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common.config')
const appConfig = require('./conf/appConfig')

const devConfig = Object.assign(commonConfig, {

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
})

devConfig.module.rules.push({
  test: /\.scss$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]' },
    { loader: 'sass-loader' }
  ]
})

module.exports = devConfig
