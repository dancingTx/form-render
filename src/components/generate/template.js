/* eslint-disable no-unused-vars */
const render = require('json-templater/string')
const endOfLine = require('os').EOL // 对应操作系统下得换行符
const { typeOf, isPlainObject, listStoreAttrs } = require('@/utils')
const genTemplate = function (fields, formConf) {
  const layouts = {
    colFormItem (item) {
      const config = item.__config__
      const store = {}
      // process label and label-width
      store.label = config.label ? `label="${config.label}"` : ''
      store.labelWidth = config.labelWidth ? `label-width="${config.labelWidth}"` : ''

      if (
        config.labelWidth &&
        config.labelWidth !== formConf.labelWidth &&
        typeOf(config.label, 'number')
      ) {
        store.labelWidth = `label-width=${config.labelWidth}px`
      }

      if (!config.showLabel) {
        store.labelWidth = "label-width='0'"
        store.label = ''
      }

      // process required
      store.required = config.required ? 'required' : ''

      // process vmodel
      store.prop = (item.name && formConf.__vModel__)
        ? `prop="${formConf.__vModel__}.${item.name}"`
        : ''

      // process children
      const children = tags[config.tag] ? tags[config.tag](item) : ''

      return `<el-form-item ${listStoreAttrs(store)}>${children}</el-form-item>`
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
    const readonly = field.readonly ? 'readonly' : ''
    const placeholder = field.placeholder ? `placeholder="${field.placeholder}"` : ''
    const style =
      field.style && isPlainObject(field.style)
        ? `:style="{
          ${Object.keys(field.style).map(key => key + ':' + field.style[key]).join(';')}
        }"`
        : ''
    return {
      tag, vModel, size, readonly, disabled, clearable, required, style, placeholder
    }
  }
  const tags = {
    'el-button' (field) {
      const { tag, disabled, size } = genFieldAttrs(field)
      const store = {
        tag,
        type: field.type ? `type="${field.type}"` : '',
        icon: field.icon ? `icon="${field.icon}"` : '',
        size,
        disabled,
        plain: field.plain ? 'plain' : '',
        round: field.round ? 'round' : '',
        circle: field.circle ? 'circle' : '',
        autofocus: field.autofocus ? 'autofocus' : '',
        nativeType: field.nativeType ? `native-type="${field.nativeType}"` : ''
      }
      return `<${listStoreAttrs(store)}>1</${store.tag}>`
    },
    'el-input' (field) {
      const { tag, size, disabled, clearable, readonly } = genFieldAttrs(field)
      const store = {
        tag,
        type: field.type ? `type=${field.type}` : ''
      }
    }
  }

  return (function () {
    let template = ''
    template = (fields || []).map(item => layouts[item.__config__.layout](item)).join(endOfLine)
    console.log(template)
  }())
}
export default genTemplate
