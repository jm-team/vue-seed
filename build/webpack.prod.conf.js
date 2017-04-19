var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var PrerenderSpaPlugin = require('prerender-spa-plugin')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      assetsPublicPath: config.build.assetsPublicPath,
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new PrerenderSpaPlugin(
        path.join(__dirname, '../dist'),
        ['/home'],
        // (OPTIONAL) Options
        {
            // NOTE: Unless you are relying on asynchronously rendered content,
            // such as after an Ajax request, none of these options should be
            // necessary. All synchronous scripts are already executed before
            // capturing the page content.

            // Wait until a specific event is fired on the document.
            captureAfterDocumentEvent: 'custom-post-render-event',
            // This is how you would trigger this example event:
            // document.dispatchEvent(new Event('custom-post-render-event'))

            // Wait until a specific element is detected with
            // document.querySelector.
            captureAfterElementExists: '#content',

            // Wait until a number of milliseconds has passed after scripts
            // have been executed. It's important to note that this may
            // produce unreliable results when relying on network
            // communication or other operations with highly variable timing.
            captureAfterTime: 5000,

            // NOTE: You can even combine strategies if you like. For example,
            // if you only _sometimes_ want to wait for an event to fire, you
            // can create a timeout by combining captureAfterTime with
            // captureAfterDocumentEvent. When combining strategies, page
            // content will be captured after the first triggered strategy.

            // Instead of loudly failing on JS errors (the default), ignore them.
            ignoreJSErrors: true,

            // Because PhantomJS occasionally runs into an intermittent issue,
            // we will retry a page capture up to 10 times by default. You may
            // raise or lower this limit if you wish.
            maxAttempts: 10,

            // Prevent PhantomJS from navigating away from the URL passed to it
            // and prevent loading embedded iframes (e.g. Disqus and Soundcloud
            // embeds), which are not ideal for SEO and may introduce JS errors.
            navigationLocked: true,

            // The options below expose configuration options for PhantomJS,
            // for the rare case that you need special settings for specific
            // systems or applications.

            // http://phantomjs.org/api/command-line.html#command-line-options
            phantomOptions: '--disk-cache=true',

            // http://phantomjs.org/api/webpage/property/settings.html
            phantomPageSettings: {
                loadImages: true
            }
        }
    )
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
