import { isPlainObject, setDefaultValue, endOfLine } from '@/utils'
const genStyle = function (fields) {
  const addClass = function (styleObj) {
    if (!isPlainObject(styleObj)) return ''
    return Object.keys(styleObj).map(key => `${key}: ${styleObj[key]};`).join(endOfLine)
  }
  const initStyle = function (field) {
    const config = field.__config__
    if (!field.style && !config.tag) return
    const template = setDefaultValue(
      addClass(field.style),
      `.${config.tag} {
          ${addClass(field.style)}
      }`)
    // 递归查找样式
    if (field.children) {
      (field.children || []).forEach(child => { initStyle(child) })
    }

    return template
  }
  return (function () {
    return (fields || []).map(initStyle).join(endOfLine)
  }())
}

export default genStyle
