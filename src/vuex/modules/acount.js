const state = {
  logining: false,
  autologin: false,
  token: '',
  uk: '',
  info: {}
}

const getters = {
  logining: state => state.logining,
  autologin: state => state.autologin,
  token: state => state.token,
  uk: state => state.uk,
  userInfo: state => state.info
}

const mutations = {
  logining (state, logining) {
    state.logining = logining
  },
  loginsuccess (state, msg) {
    localStorage.setItem('accessToken', msg.token)
    state.token = msg.token
  },
  loginfailed (state, msg) {
  },
  BDuser (state, msg) {
    localStorage.setItem('accessUk', msg.uk)
    state.uk = msg.uk
  },
  BDuserInfo (state, msg) {
    state.info = msg.info
  }
}

const actions = {
  autologin ({ commit, state, rootState }, obj) {
    localStorage.setItem('autologin', JSON.stringify(obj))
  },
  BDuser ({ commit, state, rootState }, uk) {
    commit('BDuser', { 'uk': uk })
  },
  BDuserInfo ({ commit, state, rootState }, userInfo) {
    commit('BDuserInfo', { 'info': userInfo })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
