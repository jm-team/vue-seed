var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 获取带hash值的dll文件名称
var glob = require('glob')
var dllJsFilePath,
  dllJsFileName
dllJsFilePath = glob.sync(path.join(__dirname, '../src/dlljs/vendor_*.dll.js'))[0]
if (dllJsFilePath) {
  dllJsFileName = path.basename(dllJsFilePath)
}

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: './src/assets/img/favicon.ico',
      template: 'index.html',
      dllJsFileName: dllJsFileName,
      inject: true
    }),

    // 拷贝mock数据文件到构建目录
    new CopyWebpackPlugin([
      { from: 'src/mock', to: 'mock' }
    ], {
        // 忽略选项
        ignore: [
          // Doesn't copy any files with a txt extension
          '*.txt'
        ],
        // By default, we only copy modified files during
        // a watch or webpack-dev-server build. Setting this
        // to `true` copies all files.
        copyUnmodified: true
      }),
    new FriendlyErrorsPlugin()
  ]
})
