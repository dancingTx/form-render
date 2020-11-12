/* eslint-disable no-unused-vars */
const endOfLine = require('os').EOL // 对应操作系统下得换行符
const { typeOf, isPlainObject, listStoreAttrs, setDefaultValue } = require('@/utils')
const genTemplate = function (fields, formConf) {
  const genFieldTemplate = function (store, slot) {
    return `<${listStoreAttrs(store)}>${setDefaultValue(slot, slot)}</${store.tag}>`
  }
  const genFieldAttrs = function (field) {
    const tag = setDefaultValue(field.__config__.tag, field.__config__.tag, 'div')
    const vModel = setDefaultValue((field.name && formConf.__vModel__), `v-model="${formConf.__vModel__}.${field.name}"`)
    const size = setDefaultValue(field.size, `size="${field.size}"`)
    const disabled = setDefaultValue(field.disabled, 'disabled')
    const clearable = setDefaultValue(field.clearable, 'clearable')
    const required = setDefaultValue(field.required, 'required')
    const readonly = setDefaultValue(field.readonly, 'readonly')
    const placeholder = setDefaultValue(field.placeholder, `placeholder="${field.placeholder}"`)
    const style = setDefaultValue(
      field.style && isPlainObject(field.style),
      `:style="{${Object.keys(field.style).map(key => key + ':' + field.style[key]).join(',')}}"`
    )
    return {
      tag, vModel, size, readonly, disabled, clearable, required, style, placeholder
    }
  }

  const layouts = {
    colFormItem (item) {
      const config = item.__config__
      const store = {}
      // process label and label-width
      store.label = setDefaultValue(config.label, `label="${config.label}"`)
      store.labelWidth = setDefaultValue(config.labelWidth, `label-width="${config.labelWidth}"`)

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
      store.required = setDefaultValue(config.required, 'required')

      // process vmodel
      store.prop = setDefaultValue(item.name, `prop="${item.name}"`)

      // process children
      const children = setDefaultValue(tags[config.tag], tags[config.tag](item))

      return `<el-form-item ${listStoreAttrs(store)}>${children}</el-form-item>`
    },
    rowFormItem (item) {

    }
  }

  const slots = {
    buttonSlot (slot) {
      const children = []
      if (slot.default) {
        children.push(slot.default)
      }
      return children.join(endOfLine)
    }
  }

  const tags = {
    'el-button' (field) {
      const { tag, disabled, size, style } = genFieldAttrs(field)
      const store = {
        tag,
        type: setDefaultValue(field.type, `type="${field.type}"`),
        icon: setDefaultValue(field.icon, `icon="${field.icon}"`),
        size,
        disabled,
        plain: setDefaultValue(field.plain, 'plain'),
        round: setDefaultValue(field.round, 'round'),
        circle: setDefaultValue(field.circle, 'circle'),
        autofocus: setDefaultValue(field.autofocus, 'autofocus'),
        nativeType: setDefaultValue(field.nativeType, `native-type="${field.nativeType}"`),
        style
      }
      let children = ''
      if (field.__config__.type && field.__slot__) {
        children = slots[`${field.__config__.type}Slot`](field.__slot__)
      }
      return genFieldTemplate(store, children)
    },
    'el-input' (field) {
      const { tag, vModel, size, disabled, clearable, readonly, placeholder, style } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        type: setDefaultValue(field.type, `type="${field.type}"`),
        size,
        name: setDefaultValue(field.name, `name="${field.name}"`),
        placeholder,
        minLength: setDefaultValue(field.minLength, `minLength="${field.minLength}"`),
        maxLength: setDefaultValue((field.maxLength && field.maxLength !== Infinity), `maxLength="${field.maxLength}"`),
        prefixIcon: setDefaultValue(field.prefixIcon, `prefix-icon="${field.prefixIcon}"`),
        suffixIcon: setDefaultValue(field.suffixIcon, `suffix-icon="${field.suffixIcon}"`),
        showWordLimit: setDefaultValue(field.showWordLimit, 'show-word-limit'),
        showPassword: setDefaultValue(field.showPassword, 'show-password'),
        rows: setDefaultValue(field.rows, `:rows="${field.rows}"`),
        autosize: setDefaultValue(field.autosize, 'autosize'),
        clearable,
        readonly,
        disabled,
        style
      }

      return genFieldTemplate(store, '....')
    },
    'el-input-number' (field) {
      const { tag, vModel, size, placeholder, disabled, style } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        type: setDefaultValue(field.type, `type="${field.type}"`),
        size,
        name: setDefaultValue(field.name, `name="${field.name}"`),
        placeholder,
        max: setDefaultValue((field.max && field.max !== Infinity), `:max="${field.max}"`),
        min: setDefaultValue((field.min && field.min !== -Infinity), `:min="${field.min}"`),
        controls: setDefaultValue(field.controls, 'controls'),
        step: setDefaultValue(field.step, `:step="${field.step}"`),
        stepStrictly: setDefaultValue(field.stepStrictly, 'step-strictly'),
        precision: setDefaultValue(field.precision, `:precision="${field.precision}"`),
        disabled,
        style
      }

      return genFieldTemplate(store)
    }
  }

  return (function () {
    let template = ''
    template = (fields || []).map(item => layouts[item.__config__.layout](item)).join(endOfLine)
    console.log(template)
  }())
}
export default genTemplate
