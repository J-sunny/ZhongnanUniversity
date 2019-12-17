'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_API:'"http://148.70.55.201:8088/zuelNews"',
  // BASE_API:'"http://192.168.2.107:8080/zuelNews"',
  COL_LOG:'"0"'
})
