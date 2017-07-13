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
    // 合并雪碧图插件
    require('postcss-sprites')({
      stylesheetPath: './src/views', // TODO: 支持所有CSS依赖的图片合成雪碧图
      spritePath: './tmp',

      // 添加雪碧图规则 只有在sprite文件夹下的图片才进行合并
      filterBy: function (image) {
        if (!/\/sprite\//.test(image.url)) {
          // console.log(image.url);
          return Promise.reject();
        }

        return Promise.resolve();
      },

      // 添加雪碧图规则 在sprite文件夹下，如果包含子文件夹则该文件夹包含的图片单独进行合并
      groupBy: function (image) {
        var regex = /\/sprite\/([^/]+)\//g;
        var m = regex.exec(image.url);
        if (!m) {
          return Promise.reject();
        }
        return Promise.resolve(m[1]); // 'sprite.' + icon + '.png'
      },

      // 图片之间的距离
      spritesmith: {
        padding: 20
      }
    }),
    require('autoprefixer')({
      browsers: ['last 2 versions']
    })
  ]
}
