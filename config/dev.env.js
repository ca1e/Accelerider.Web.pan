var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  REST_BASE_URL: '"http://api.usmusic.cn/"',
  CLIENT_TYPE: '"test"'
})
