// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex'
import 'normalize.css'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'
import RestAPI from './libs/restAPI'
import M4sAPI from './libs/m4sAPI'
import SquareAPI from './libs/squareAPI'
import Aria2API from './libs/aria2c'
import Utils from './libs/utils'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$restAPI = new RestAPI()
Vue.prototype.$m4sAPI = new M4sAPI()
Vue.prototype.$squareAPI = new SquareAPI()
Vue.prototype.$Aria2API = new Aria2API()
Vue.prototype.utils = new Utils()

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App)
})
