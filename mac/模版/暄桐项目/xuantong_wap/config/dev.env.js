'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const config = require('../config/index.js')
module.exports = merge(prodEnv, { 
  NODE_ENV: '"development"',
  // API:`"http://${config.dev.host}:8081/api/"`  10.112.124.114  118.190.202.65
  // API:`"http://10.112.124.114:8086/"`
  // API:`"https://cr-api.xuantong.cn"`  //生产
  API:`"https://cr-api-uat.xuantong.cn"`  //uat
  // API:`"https://cr-api-dev.xuantong.cn"`  //压力测试
  // API:`"https://cr-api:6782.xuantong.cn"`
  
})
