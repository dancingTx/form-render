/**
 *
 * @param {string} path
 * @description 验证是否为外链
 */
export const isExternal = path => /^(https? | tel | mailto | ):/.test(path)

/**
 *
 * @param {object} el
 * @param {string} type
 * @description 判断数据类型
 */
export const typeOf = (el, type) => Object.prototype.toString.call(el).replace(/\[object (\w+)\]/, '$1').toLowerCase() === type

export const isObject = target => typeof target === 'object'
