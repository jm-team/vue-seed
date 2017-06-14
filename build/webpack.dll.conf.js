const path = require('path')
const webpack = require('webpack')
const RemoveWebpackPlugin = require('remove-webpack-plugin')
const WebpackOnBuildPlugin = require('on-build-webpack')
const exec = require('child_process').exec

var vueLoaderConfig = require('./vue-loader.conf')
var config = require('../config')

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
    path: path.resolve(__dirname, '..', config.dll),
    filename: '[name].[hash:8].dll.js',
    library: '[name]_[hash:8]'
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
      name: '[name]_[hash:8]'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // remove vendor.***.dll.js
    new RemoveWebpackPlugin(config.dll),
    // 将新增的dll文件提交至git
    new WebpackOnBuildPlugin(function (stats) {
      // Do whatever you want...
      exec(`cd ${config.dll} && git add -A`)
    })
  ]
}