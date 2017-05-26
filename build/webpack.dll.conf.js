const path = require('path')
const webpack = require('webpack')
var vueLoaderConfig = require('./vue-loader.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const RemoveWebpackPlugin = require('remove-webpack-plugin')

console.log('=======================================')
console.log('   请确保将新增的dll文件提交至git/svn   ')
console.log('=======================================')

function resolve(dir) {
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
    path: path.resolve(__dirname, '../src/dlljs'),
    filename: '[name]_[hash].dll.js',
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
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      libraryTarget: 'commonjs2',
      name: '[name]_[hash]'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // remove vendor.***.dll.js
    new RemoveWebpackPlugin('src/dlljs')
  ]
}