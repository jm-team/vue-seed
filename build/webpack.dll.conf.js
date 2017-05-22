const path = require('path')
const webpack = require('webpack')
var vueLoaderConfig = require('./vue-loader.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    vendor: [
      'element-ui/lib/index.js',
      'vue/dist/vue.common.js',
      'vue-router',
      'axios',
      'vuex'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../src'),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      }
    ]
  },
  plugins: [
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      libraryTarget: 'commonjs2',
      name: '[name]_[hash]'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}