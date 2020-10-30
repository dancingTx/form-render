import { deepCopy, typeOf, isPlainObject } from '@/utils'
// 导入__slot__文件 key: tag, value: fn
const slotFiles = require.context('./__slot__', false, /\.js$/)
const components = slotFiles.keys().reduce((store, curr) => {
  const tag = curr.replace(/\.\/(.+)\.js/, '$1')
  const module = slotFiles(curr).default
  store[tag] = module
  return store
}, {})
/**
 * https://cn.vuejs.org/v2/guide/render-function.html
 */
const genDataObj = function () {
  return {
    class: {},
    style: {},
    attrs: {},
    props: {},
    domProps: {},
    on: {},
    nativeOn: {},
    directives: [],
    scopedSlots: {},
    slot: '',
    key: '',
    ref: '',
    refInFor: true
  }
}

const vModel = function (target, defaultValue) {
  target.props.value = defaultValue
  target.on.input = value => {
    this.$emit('input', value)
  }
}

const slotFilesMixin = function (h, currItem, children) {
  const component = components[currItem.__config__.tag]
  component && Object.keys(component).forEach(slot => {
    if (currItem.__slot__ && slot in currItem.__slot__) {
      const fn = component[slot]
      children.push(fn && fn(h, currItem, slot))
    }
  })
}

const emitEventMixin = function (currItem) {
  ['on', 'nativeOn'].forEach(e => {
    if (currItem[e]) {
      const fns = currItem[e]
      Object.keys(fns).forEach(fnName => {
        const fnBody = fns[fnName]
        if (typeOf(fnBody, 'string')) {
          fns[fnName] = event => this.$emit(fnBody, event)
        }
      })
    }
  })
}

const mergeJson2DataMixin = function (clone, target) {
  Object.keys(clone).forEach(key => {
    const value = clone[key]
    if (key === '__vModel__') {
      vModel.call(this, target, value)
    } else {
      if (key in target) {
        if (['string', 'boolean', 'function'].some(type => typeOf(target[key], type))) {
          target[key] = value
        } else if (typeOf(target[key], 'array')) {
          target[key].concat(value)
        } else if (isPlainObject(target[key])) {
          Object.assign({}, target[key], value)
        }
      } else {
        target.attrs[key] = value
      }
    }
  })

  clearNoneAttrs.call(this, target)
}

const clearNoneAttrs = function (target) {
  ['__slot__', '__config__', '__methods__'].forEach(attr => {
    this.$delete(target.attrs, attr)
  })
}
export default {
  props: {
    currItem: {
      type: Object,
      default: () => { }
    }
  },
  render (h) {
    const data = genDataObj()
    const clone = deepCopy(this.currItem)
    const children = this.$slots.children || []
    // 挂载slot
    slotFilesMixin.call(this, h, clone, children)
    // 派发事件
    emitEventMixin.call(this, clone)
    // json 属性混入data中
    mergeJson2DataMixin.call(this, clone, data)
    return h(clone.__config__.tag, data, children)
  }
}
