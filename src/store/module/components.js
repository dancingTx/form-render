import { SET_COMP_INFO } from '../mutations-type'
import { basicOptions, inputOptions, selectOptions, LayoutComponents, formConf } from '@/components/generate/__config__'
const state = {
  components: [],
  formConf: {}
}

const mutations = {
  [SET_COMP_INFO] (state, { key, value, storage = false }) {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
      if (storage) {
        // add storage
      }
    }
  }
}
const actions = {
  getComponents ({ commit }) {
    const components = [
      { title: '基础组件', type: 'basic', list: basicOptions },
      { title: '输入型组件', type: 'input', list: inputOptions },
      { title: '选择型组件', type: 'select', list: selectOptions },
      { title: '布局型组件', type: 'layout', list: LayoutComponents }
    ]
    commit(SET_COMP_INFO, {
      key: 'components',
      value: components
    })
  },
  getFormConf ({ commit }) {
    commit(SET_COMP_INFO, {
      key: 'formConf',
      value: formConf
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
