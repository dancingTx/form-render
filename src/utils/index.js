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
      if (typeOf(customOpts[item], 'object')) {
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
