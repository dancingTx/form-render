import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import getters from './getters'
Vue.use(Vuex)

const { state, mutations, actions } = store

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
