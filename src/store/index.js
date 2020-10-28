import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
const moduleFiles = require.context('./module', false, /\.js$/)

const modules = moduleFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/\.\/(\w+)\.js/, '$1')
  const moduleFile = moduleFiles(modulePath)
  modules[moduleName] = moduleFile.default
  return modules
}, {})
Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  getters
})
