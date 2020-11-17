import { typeOf, isPlainObject } from './validate'
export * from './validate'

/**
 *
 * @param {object} customOpts
 * @param {object} baseOpts
 * @description 合并多组配置
 */
export const mergeOptions = function (customOpts, baseOpts) {
  const options = {}
  const keys = Object.keys(baseOpts).concat(Object.keys(customOpts))
  keys.forEach(item => {
    if (item in customOpts && item in baseOpts) {
      if (typeOf(customOpts[item], 'array') && typeOf(baseOpts[item], 'array')) {
        //  both array to merge
        options[item] = baseOpts[item].concat(customOpts[item])
      } else if (isPlainObject(customOpts[item])) {
        // recursive
        options[item] = mergeOptions(customOpts[item], baseOpts[item])
      } else {
        options[item] = customOpts[item]
      }
    } else if (item in customOpts) {
      options[item] = customOpts[item]
    } else if (item in baseOpts) {
      options[item] = baseOpts[item]
    }
  })
  return options
}

/**
 *
 * @param {object} resource
 * @description 深拷贝
 */
export const deepCopy = function (resource) {
  // primtive
  if (!resource || !isPlainObject(resource)) {
    return resource
  }
  // dom node
  if (resource.nodeType && 'cloneNode' in resource) {
    return resource.cloneNode(true)
  }

  // 正则表达是
  if (typeOf(resource, 'regexp')) {
    const { source, flags } = resource
    return new RegExp(source, flags)
  }

  if (typeOf(resource, 'date')) {
    return new Date(resource.getTime())
  }

  const clone = typeOf(resource, 'array') ? [] : resource.constructor ? new resource.constructor() : {}

  for (const key in resource) {
    clone[key] = deepCopy(resource[key])
  }

  return clone
}

/**
 *
 * @param {string}} str
 * @description 首字母大写
 */
export const firstUpperCase = str => str.slice(0, 1).toUpperCase() + str.slice(1)

/**
 *
 * @param {string} str
 * @description 小驼峰转中划线
 */
export const caseCamel = str => str.replace(/([A-Z])/g, '-$1').toLowerCase()

/**
 *
 * @param {null | string | number} value
 * @description 返回对应 label宽度
 */
export const labelWidth = (value, isShow = true) => isShow ? typeOf(value, 'number') ? value + 'px' : value : '0'

/**
 *
 * @param {number} length
 * @description 随机字符串
 */
export const randomStr = (length = 16) => {
  let crypto = ''
  const count = 256
  while (length--) {
    crypto += String.fromCharCode(~~(Math.random() * count))
  }
  return crypto
}

/**
 *
 * @param {function} func
 * @param {number} delay
 * @description 节流
 */
export const throttle = (func, delay) => {
  let timer = null
  let result = null
  let context = null
  let args = null
  let previous = 0
  const later = function () {
    previous = Date.now()
    func.apply(context, args)
    clearTimeout(timer)
    timer = null
  }
  const throttled = function () {
    const now = Date.now()
    const remaining = delay - (now - previous)
    context = this
    args = arguments

    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      result = func.apply(context, args)
      previous = now
    } else if (!timer) {
      timer = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function () {
    clearTimeout(timer)
    timer = null
    previous = 0
  }

  return throttled
}

/**
 *
 * @param {object} target
 * @param {string} keyStr
 * @description 多节点属性递归查找对应值
 */
export const searchMultiData = (target, keyStr, value) => {
  if (!typeOf(keyStr, 'string')) return ''
  const arr = keyStr.split('.')
  const prop = arr[arr.length - 1]
  let res = target[arr[0]]
  if (arr.length > 1) {
    for (let i = 1; i < arr.length - 1; i++) {
      res = searchMultiData(res, arr[i])
    }
    !typeOf(value, 'undefined') && (res[prop] = value)
    return res[prop]
  }
  !typeOf(value, 'undefined') && (target[prop] = value)
  return res
}

/**
 *
 * @param {string} template
 * @param {object} replaceObj
 * @description 替换指定模板中得值
 * eg.
 * template: my name is {name}, i am {age} years old.
 * replaceObj:{name: 'liming', age: 10}
 * output -> my name is liming, i am 10 years old.
 */

export const replaceEle = (template, replaceObj) => {
  if (!template || !typeOf(template, 'string')) return
  const regObj = /{\s*?(\w+)\s*?}/g
  return template.replace(regObj, (_, value) => replaceObj[value] || '')
}

/**
 *
 * @param {object} store
 * @description 将store中得属性按顺序排列
 */
export const listStoreAttrs = function (store) {
  return Object.keys(store).filter(key => store[key] !== '').map(key => store[key]).join(' ')
}

/**
 *
 * @param {string} key
 * @param {string} value
 * @param {string} defaultValue
 * @description 返回 默认值
 */
export const setDefaultValue = (key, value, defaultValue = '') => key ? (value || key) : defaultValue

/**
 *
 * @param {object} target
 * @param {function} replacer
 * @param {string} space
 */
export const toString = (target, replacer, space) => {
  const types = [null, undefined, NaN, Infinity, -Infinity]
  // types 中的类型，转化成 字符串
  if (types.includes(target)) {
    return (target + '').toLowerCase()
  }
  // symbol 类型 转换成 symbol 字符串
  if (typeOf(target, 'symbol')) {
    return target.toString().toLowerCase()
  }
  // 如果是函数，执行后序列化， 若为嵌套， 则递归执行
  if (typeOf(target, 'function')) {
    return toString(target())
  }
  return JSON.stringify(target, replacer, space)
}

/**
 * 对应系统下得换行符
 */
export const endOfLine = require('os').EOL
/**
 * 符号
 */
export const symbol = Symbol('')
