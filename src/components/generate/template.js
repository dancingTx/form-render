/* eslint-disable no-unused-vars */
const endOfLine = require('os').EOL // 对应操作系统下得换行符
const { typeOf, isPlainObject, listStoreAttrs, setDefaultValue } = require('@/utils')
const genTemplate = function (fields, formConf) {
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
  const genChildrenTemplate = function (type, slot, options) {
    if (!type || !slot) return ''
    return endOfLine + slots[`${type}Slot`](slot, options) + endOfLine
  }

  const genFieldTemplate = function (store, type, slot, options) {
    return `${endOfLine}<${listStoreAttrs(store)}>${setDefaultValue((slot && type), genChildrenTemplate(type, slot, options))}</${store.tag}>${endOfLine}`
  }

  const genSlotTemplate = function (name, content) {
    return `<template slot="${name}">${content}</template>`
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
    },
    textSlot (slot) {
      const children = []
      const processFix = function (fixSlot, key) {
        let template = ''
        if (isPlainObject(fixSlot)) {
          template = (
            `<i
              slot="${key}"
              class="${setDefaultValue(fixSlot.className, fixSlot.className + ' ')}el-input__icon"
              ${setDefaultValue(fixSlot.on?.click, "@click='" + fixSlot.on.click + "'")}
            />
            `
          )
        } else if (typeOf(fixSlot, 'string')) {
          if (fixSlot.indexOf('el-icon-') !== -1) {
            template = (
              `<i slot="${key}" class="${setDefaultValue(fixSlot)}" />`
            )
          } else {
            template = (`<span slot="${key}">${setDefaultValue(fixSlot)}</span>`)
          }
        }

        return template
      }

      if (slot.prefix) {
        children.push(processFix(slot.prefix, 'prefix'))
      }

      if (slot.suffix) {
        children.push(processFix(slot.suffix, 'suffix'))
      }

      if (slot.prepend) {
        children.push(genSlotTemplate('prepend', setDefaultValue(slot.prepend)))
      }

      if (slot.append) {
        children.push(genSlotTemplate('append', setDefaultValue(slot.append)))
      }

      return children.join(endOfLine)
    },
    selectSlot (slot, { isGroup }) {
      const children = []
      const genChildOption = function (options) {
        return options.map(option => {
          const store = {
            label: setDefaultValue(option.label, `label="${option.label}"`),
            value: setDefaultValue(option.value, `value="${option.value}"`),
            disabled: setDefaultValue(option.disabled)
          }
          return `<el-option ${listStoreAttrs(store)} />`
        }).join(endOfLine)
      }

      if (slot.prefix) {
        children.push(genSlotTemplate('prefix', setDefaultValue(slot.prefix)))
      }

      if (slot.empty) {
        children.push(genSlotTemplate('empty', setDefaultValue(slot.empty)))
      }

      if (slot.options) {
        let template = ''
        slot.options =
          typeOf(slot.options, 'array')
            ? slot.options
            : isPlainObject(slot.options)
              ? [slot.options]
              : []
        if (isGroup) {
          template = slot.options.map(group => (
            `<el-option-group
              ${setDefaultValue(group.label)}
              ${setDefaultValue(group.disabled)}
              >
              ${genChildOption(group.options)}
            </el-option-group>`
          )).join(endOfLine)
        } else {
          template = genChildOption(slot.options)
        }

        children.push(template)
      }

      return children.join(endOfLine)
    },
    radioSlot (slot, { isGroup, isBorder, isButton }) {
      const children = []
      const genChildOption = function (options, { isBorder, isButton }) {
        return options.map(option => {
          let template = ''
          const store = {
            label: setDefaultValue(option.value, `value="${option.value}"`),
            name: setDefaultValue(option.name, `name="${option.name}"`)
          }
          if (isButton) {
            template = `<el-radio-button ${listStoreAttrs(store)}>${setDefaultValue(option.label)}</el-radio-button>`
          } else {
            store.border = setDefaultValue(isBorder, 'border')
            template = `<el-radio ${listStoreAttrs(store)}>${setDefaultValue(option.label)}</el-radio>`
          }
          return template
        }).join(endOfLine)
      }
      if (slot.options) {
        slot.options = typeOf(slot.options, 'array')
          ? slot.options
          : isPlainObject(slot.options)
            ? [slot.options]
            : []
        const obj = { isBorder }
        if (isGroup) obj.isButton = isButton
        children.push(genChildOption(slot.options, obj))
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
      return genFieldTemplate(store, field.__config__.type, field.__slot__)
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

      return genFieldTemplate(store, field.__config__.type, field.__slot__)
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
    },
    'el-select' (field) {
      const isGroup = field.__config__.isGroup
      const { tag, vModel, style, clearable, disabled } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        name: setDefaultValue(field.name, `name="${field.name}"`),
        size: setDefaultValue(field.size, `size="${field.size}"`),
        placeholder: setDefaultValue(field.placeholder, `placeholder="${field.placeholder}"`),
        style,
        filterable: setDefaultValue(field.filterable, 'filterable'),
        allowCreate: setDefaultValue(field.allowCreate, 'allow-create'),
        clearable,
        disabled
      }

      return genFieldTemplate(store, field.__config__.type, field.__slot__, { isGroup })
    },
    'el-radio-group' (field) {
      const config = field.__config__
      const { isGroup, isButton, isBorder } = config
      const { tag, vModel, size, disabled } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        size,
        textColor: setDefaultValue(field.textColor, `text-color="${field.textColor}"`),
        fill: setDefaultValue(field.fill, `fill="${field.fill}"`),
        disabled
      }
      return genFieldTemplate(store, config.type, field.__slot__, { isGroup, isButton, isBorder })
    }
  }

  return (function () {
    let template = ''
    template = (fields || []).map(item => layouts[item.__config__.layout](item)).join(endOfLine)
    console.log(template)
  }())
}
export default genTemplate
