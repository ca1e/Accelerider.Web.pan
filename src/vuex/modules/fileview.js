const state = {
  isLoading: false,
  filelist: [],
  m4sfilelist: []
}

const getters = {
  isLoading: state => state.isLoading,
  filelist: state => state.filelist,
  m4sfilelist: state => state.m4sfilelist
}

const mutations = {
  viewloading (state, loading) {
    state.isLoading = loading
  },
  filelist (state, msg) {
    state.filelist = msg.list
  },
  m4sfilelist (state, msg) {
    state.m4sfilelist = msg.list
  }
}

const actions = {
  filelist ({ commit, state, rootState }, obj) {
    let mutationname = 'filelist'
    if (obj.ism4s) mutationname = 'm4sfilelist'
    commit(mutationname, { 'list': obj.list })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
