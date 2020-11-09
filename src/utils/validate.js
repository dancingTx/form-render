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
 * @returns {boolean}
 * @description 判断数据类型
 */
export const typeOf = (el, type) => Object.prototype.toString.call(el).replace(/\[object (\w+)\]/, '$1').toLowerCase() === type

/**
 *
 * @param {object} target
 * @returns {boolean}
 * @description 判断是否为对象
 */
export const isPlainObject = target => typeof target === 'object' && typeOf(target, 'object')
