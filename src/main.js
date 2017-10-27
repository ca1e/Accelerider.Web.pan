// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex'
import 'normalize.css'
import App from './App'
import Routers from './router.js'
import {RestAPI, M4sAPI, SquareAPI, Aria2API, Utils} from './libs'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import UserInfo from '@/components/UserInfo'
import BindingForm from '@/components/BindingForm'
import DownloadDlg from '@/components/DownloadDlg'

Vue.component('user-info', UserInfo)
Vue.component('bind-form', BindingForm)
Vue.component('down-dialog', DownloadDlg)

Vue.config.productionTip = false
Vue.prototype.$restAPI = new RestAPI()
Vue.prototype.$m4sAPI = new M4sAPI()
Vue.prototype.$squareAPI = new SquareAPI()
Vue.prototype.$Aria2API = new Aria2API()
Vue.prototype.utils = new Utils()

Vue.use(VueRouter)
Vue.use(ElementUI, { size: 'small' })

const router = new VueRouter(Routers)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Vue.prototype.utils.check_login()) {
      next({path: '/login', query: {redirect: to.fullPath}})
    }
    if (!to.query.path) {
      next({query: {path: '/'}})
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App)
})
