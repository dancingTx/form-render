import { SET_DRAWER_INFO } from '../mutations-type'
const state = {
  resize: ''
}

const mutations = {
  [SET_DRAWER_INFO] (state, { key, value, storage = false }) {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
      if (storage) {
        // add storage
      }
    }
  }
}

const actions = {
  processResizeHandler ({ commit }, payload) {
    commit(SET_DRAWER_INFO, payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
