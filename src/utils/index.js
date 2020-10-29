import { typeOf, isObject } from './validate'
export * from './validate'
/**
 *
 * @param {object} customOpts
 * @param {object} baseOpts
 * @description 合并多组配置
 */
export const mergeOptions = function (customOpts, baseOpts) {
  const options = {}
  const keys = [...Object.keys(customOpts), ...Object.keys(baseOpts)]
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
  if (!resource || !isObject(resource)) {
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
 * @param {null | string | number} value
 * @description 返回对应 label宽度
 */
export const labelWidth = (value, isShow = true) => isShow ? typeOf(value, 'number') ? value + 'px' : value : '0'
