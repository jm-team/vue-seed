var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
  ,extractCSS: true
  // 添加转换的标签属性
  ,transformToRequire:{img: ['src','errorimg'], image: 'xlink:href'}
  ,postcss: [
    require('autoprefixer')({
      browsers: ['last 2 versions']
    })
  ]
}
