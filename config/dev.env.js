'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API:'"http://148.70.55.201:8088/zuelNews"',
  // BASE_API:'"http://192.168.2.107:8080/zuelNews"',
  // BASE_API:'"http://192.168.2.131:8080/medicalWebImpl"',
  COL_LOG:'"0"'
})
