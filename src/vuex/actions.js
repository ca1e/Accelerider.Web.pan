import * as types from './mutations-types'

export const showMsg = ({ commit }, content, type = 'error') => {
  commit(types.SHOW_MSG, { content: content, type: type })
}
