import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'

import accountStore from './modules/acount'
import fileviewStore from './modules/fileview'

Vue.use(Vuex)

const state = {
  requesting: false,
  error: {}
}

const getters = {
  requesting: state => state.requesting,
  error: state => state.error
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  modules: {
    account: accountStore,
    filemgr: fileviewStore
  }
})
