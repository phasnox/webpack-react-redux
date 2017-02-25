'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const appConfig = require('./appConfig')

module.exports = {

  devtool: 'eval-source-map',

  resolve: {
    alias: {
      // Allows `import example from 'components/example';`
      'components': path.join(__dirname, 'app/components'),
      'routes': path.join(__dirname, 'app/routes'),
      'store': path.join(__dirname, 'app/store'),

      // Allows sass importing: `@import '~styles/mixins/example';`
      'styles': path.join(__dirname, 'app/assets/styles'),

      // Allows importing images: `import logo from 'images/logo.png';`
      'images': path.join(__dirname, 'app/assets/images'),

      // Allows referencing of fonts in css `src: url('fonts/comic-sans.woff');`
      'fonts': path.join(__dirname, 'app/assets/fonts')
    }
  },

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
}
