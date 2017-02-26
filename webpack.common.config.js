'use strict'

const path = require('path')

module.exports = {
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
