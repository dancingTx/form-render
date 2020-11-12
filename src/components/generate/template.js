/* eslint-disable no-unused-vars */
const render = require('json-templater/string')
const endOfLine = require('os').EOL // 对应操作系统下得换行符
const { deepCopy, typeOf, isPlainObject } = require('@/utils')
const genTemplate = function (fields, formConf) {
  const layouts = {
    colFormItem (item) {
      const field = deepCopy(item)
      const config = field.__config__
      // process label and label-width
      config.label = config.label ? `label="${config.label}"` : ''
      config.labelWidth = config.labelWidth ? `label-width="${config.labelWidth}"` : ''

      if (
        config.labelWidth &&
        config.labelWidth !== formConf.labelWidth &&
        typeOf(config.label, 'number')
      ) {
        config.labelWidth = `label-width=${config.labelWidth}px`
      }

      if (!config.showLabel) {
        config.labelWidth = "label-width='0'"
        config.label = ''
      }

      // process required
      config.required = config.required ? 'required' : ''

      // process vmodel
      config.prop = (field.name && formConf.__vModel__)
        ? `prop="${formConf.__vModel__}.${field.name}"`
        : ''

      // process children
      const children = tags[config.tag] ? tags[config.tag](field) : ''

      const template = `
        <el-form-item {{config.label}} {{config.labelWidth}} {{config.required}} {{config.prop}}>
          ${children}
        </el-form-item>
      `
      return render(template, { config })
    },
    rowFormItem (item) {

    }
  }
  const genFieldAttrs = function (field) {
    const tag = field.__config__.tag || 'div'
    const vModel = (field.name && formConf.__vModel__) ? `v-model="${formConf.__vModel__}.${field.name}"` : ''
    const size = field.size ? `size="${field.size}"` : ''
    const disabled = field.disabled ? 'disabled' : ''
    const clearable = field.clearable ? 'clearable' : ''
    const required = field.required ? 'required' : ''
    const placeholder = field.placeholder ? `placeholder="${field.placeholder}"` : ''
    const style =
      field.style && isPlainObject(field.style)
        ? `:style="{
          ${Object.keys(field.style).map(key => key + ':' + field.style[key]).join(';')}
        }"`
        : ''
    return {
      tag, vModel, size, disabled, clearable, required, style, placeholder
    }
  }
  const tags = {
    'el-button' (field) {
      const { tag, disabled } = genFieldAttrs(field)
      const store = {
        tag,
        type: field.type ? `type="${field.type}"` : '',
        icon: field.icon ? `icon="${field.icon}"` : '',
        disabled,
        plain: field.plain ? 'plain' : '',
        round: field.round ? 'round' : '',
        circle: field.circle ? 'circle' : '',
        autofocus: field.autofocus ? 'autofocus' : '',
        nativeType: field.nativeType ? `native-type="${field.nativeType}"` : ''
      }
      return `<${Object.keys(store).filter(key => store[key] !== '').map(key => store[key]).join(' ')}`
    },
    'el-input' () {

    }
  }

  return (function () {
    let template = ''
    template = (fields || []).map(item => layouts[item.__config__.layout](item)).join(endOfLine)
    console.log(template)
  }())
}
export default genTemplate
