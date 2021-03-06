'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
//  线上  https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6a0d56eb1c12553b&redirect_uri=http://m.cr.uat.xuantong.cn&response_type=code&scope=snsapi_userinfo&state=Pay#wechat_redirect
//  线下 https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6a0d56eb1c12553b&redirect_uri=http://m.cr.sit.xuantong.cn&response_type=code&scope=snsapi_userinfo&state=Bang#wechat_redirect
const path = require('path')
let  proxyConfig = require('./proxyConfig.js')
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable:proxyConfig.proxy,
    // Various Dev Server settings
    // host: '10.112.86.246', // can be overwritten by process.env.HOST  10.112.109.153  172.20.10.4
    host: 'localhost', //localhost  10.112.116.197 can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist_wap/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist_wap'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/wx/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
