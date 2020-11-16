/* eslint-disable no-unused-vars */
const endOfLine = require('os').EOL // 对应操作系统下得换行符
const {
  typeOf,
  isPlainObject,
  listStoreAttrs,
  setDefaultValue,
  assetDefaultValue,
  toString,
  replaceEle
} = require('@/utils')
const genTemplate = function (fields, formConf) {
  const genFieldAttrs = function (field) {
    const store = {
      tag: setDefaultValue(field.__config__.tag, field.__config__.tag, 'div'),
      vModel: setDefaultValue((formConf.__vModel__ && field.__vModel__ && field.__vModel__.key), `v-model="${formConf.__vModel__}.${field.__vModel__ && field.__vModel__.key}"`),
      size: setDefaultValue(field.size, `size="${field.size}"`),
      disabled: setDefaultValue(field.disabled, 'disabled'),
      clearable: setDefaultValue(field.clearable, 'clearable'),
      required: setDefaultValue(field.required, 'required'),
      readonly: setDefaultValue(field.readonly, 'readonly'),
      placeholder: setDefaultValue(field.placeholder, `placeholder="${field.placeholder}"`),
      style: setDefaultValue(
        field.style && isPlainObject(field.style),
        `:style="{${Object.keys(field.style).map(key => key + ':' + field.style[key]).join(',')}}"`
      )
    }
    return store
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

  const stitchProps = function (prop, key, asset) {
    const condition = (prop, asset) => asset ? assetDefaultValue(prop, asset) : prop
    const value = typeOf(prop, 'boolean') ? prop : `"${prop}"`
    return setDefaultValue(condition(prop, asset), `${key}: ${value}, `)
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
      store.prop = setDefaultValue((item.__vModel__ && item.__vModel__.key), `prop="${item.__vModel__ && item.__vModel__.key}"`)

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
    radioAndCheckboxSlot (slot, { isGroup, isBorder, isButton, key = 'radio' }) {
      const children = []
      const genChildOption = function (options, { isBorder, isButton }) {
        return options.map(option => {
          let template = ''
          const store = {
            label: setDefaultValue(option.value, `value="${option.value}"`),
            name: setDefaultValue(option.name, `name="${option.name}"`)
          }
          if (isButton) {
            template = `<el-${key}-button ${listStoreAttrs(store)}>${setDefaultValue(option.label)}</el-${key}-button>`
          } else {
            store.border = setDefaultValue(isBorder, 'border')
            template = `<el-${key} ${listStoreAttrs(store)}>${setDefaultValue(option.label)}</el-${key}>`
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
    },
    uploadSlot (slot, { config }) {
      const children = []
      if (slot.listType === 'picture-card') {
        children.push(
          ('<i class="el-icon-plus"></i>')
        )
      } else {
        children.push(
          (`<el-button size="${config.btnSize || 'small'}" type="${config.btnType || 'primary'}">${config.btnText || '点击上传'}</el-button>`)
        )
      }

      if (slot.tip && config.showTips) {
        children.push(
          (`<div slot="tip" class="el-upload__tip">${replaceEle(slot.tip, config)}</div>`)
        )
      }

      return children.join(endOfLine)
    },
    transferSlot (slot) {
      const children = []
      if (slot.leftFooter) {
        children.push(
          genSlotTemplate('left-footer', typeOf(slot.leftFooter, 'function') ? toString(slot.leftFooter()) : slot.leftFooter)
        )
      }

      if (slot.rightFooter) {
        children.push(
          genSlotTemplate('right-footer', typeOf(slot.rightFooter, 'function') ? toString(slot.rightFooter()) : slot.rightFooter)
        )
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
        maxLength: setDefaultValue(assetDefaultValue(field.maxLength, Infinity), `maxLength="${field.maxLength}"`),
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
        max: setDefaultValue(assetDefaultValue(field.max, Infinity), `:max="${field.max}"`),
        min: setDefaultValue(assetDefaultValue(field.min, -Infinity), `:min="${field.min}"`),
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
      return genFieldTemplate(
        store,
        'radioAndCheckbox',
        field.__slot__,
        { isGroup, isButton, isBorder, key: 'radio' }
      )
    },
    'el-checkbox-group' (field) {
      const config = field.__config__
      const { isGroup, isButton, isBorder } = config
      const { tag, vModel, size, disabled } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        size,
        min: setDefaultValue(assetDefaultValue(field.min, -Infinity), `:min="${field.min}"`),
        max: setDefaultValue(assetDefaultValue(field.max, Infinity), `:max="${field.max}"`),
        textColor: setDefaultValue(field.textColor, `textColor="${field.textColor}"`),
        fill: setDefaultValue(field.fill, `fill="${field.fill}"`),
        disabled
      }
      return genFieldTemplate(
        store,
        'radioAndCheckbox',
        field.__slot__,
        { isGroup, isButton, isBorder, key: 'checkbox' }
      )
    },
    'el-cascader' (field) {
      const processProps = function (props) {
        return (
          ':props={ ' +
            stitchProps(props.expandTrigger, 'expandTrigger', 'click') +
            stitchProps(props.multiple, 'multiple') +
            stitchProps(props.checkStrictly, 'checkStrictly') +
            stitchProps(props.value, 'value', 'value') +
            stitchProps(props.label, 'label', 'label') +
            stitchProps(props.children, 'children', 'children') +
            stitchProps(props.disabled, 'disabled', 'disabled') +
            stitchProps(props.leaf, 'leaf', 'leaf') +
          ' }'
        )
      }
      const { tag, vModel, placeholder, size, disabled, clearable } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        name: setDefaultValue(field.name, `name="${field.name}"`),
        size,
        props: processProps(field.__attrs__.props),
        options: setDefaultValue(field.options, `:options='${toString(field.options, null, ' ')}'`),
        placeholder,
        separator: setDefaultValue(assetDefaultValue(field.separator, '/'), `separator="${field.separator}"`),
        clearable,
        disabled
      }

      return genFieldTemplate(store)
    },
    'el-upload' (field) {
      const config = field.__config__
      const { tag, disabled } = genFieldAttrs(field)
      const store = {
        tag,
        action: setDefaultValue(field.action, `action="${field.action}"`),
        headers: setDefaultValue(assetDefaultValue(toString(field.headers), toString({})), `:headers="${toString(field.headers, null, ' ')}"`),
        multiple: setDefaultValue(field.multiple, 'multiple'),
        data: setDefaultValue(assetDefaultValue(toString(field.data), toString({})), `:data="${toString(field.data, null, ' ')}"`),
        accept: setDefaultValue(field.accept, `accept="${field.accept}"`),
        listType: setDefaultValue(assetDefaultValue(field.listType, 'text'), `list-type="${field.listType}"`),
        fileList: setDefaultValue(assetDefaultValue(toString(field.fileList), toString([])), `:file-list="${toString(field.fileList, null, ' ')}"`),
        limit: setDefaultValue(field.limit, `:limit="${field.limit}"`),
        withCredentials: setDefaultValue(field.withCredentials, 'with-credentials'),
        showFileList: setDefaultValue(assetDefaultValue(field.showFileList, true), 'show-file-list'),
        drag: setDefaultValue(field.drag, 'drag'),
        autoUpload: setDefaultValue(assetDefaultValue(field.autoUpload, true), 'auto-upload'),
        disabled
      }

      return genFieldTemplate(store, config.type, field.__slot__, { config })
    },
    'el-transfer' (field) {
      const processData = function (data) {
        data = typeOf(data, 'function') ? data() : data
        data = typeOf(data, 'array') ? data : [data]
        return setDefaultValue(data, `:data="${data}"`)
      }
      const { tag, vModel } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        data: processData(field.__attrs__.data),
        filterable: setDefaultValue(field.filterable, 'filterable'),
        filterablePlaceholder: setDefaultValue(field.filterablePlaceholder, `filter-placeholder="${field.filterablePlaceholder}"`),
        titles: setDefaultValue(assetDefaultValue(toString(field.titles), toString(['列表一', '列表二'])), `:titles="${field.titles}"`),
        buttonTexts: setDefaultValue(assetDefaultValue(toString(field.buttonTexts, toString([]))), `:button-texts="${field.buttonTexts}"`),
        targetOrder: setDefaultValue(assetDefaultValue(field.targetOrder, 'original'), `target-order="${field.targetOrder}"`)
      }

      return genFieldTemplate(store, field.__config__.type, field.__slot__)
    },
    'el-time' (field, pickerOptions) {
      const { tag, vModel, size, readonly, disabled, placeholder, clearable } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        name: setDefaultValue(field.name, `name="${field.name}"`),
        size,
        placeholder,
        startPlaceholder: setDefaultValue(field.startPlaceholder, `start-placeholder="${field.startPlaceholder}"`),
        endPlaceholder: setDefaultValue(field.endPlaceholder, `end-placeholder="${field.endPlaceholder}"`),
        align: setDefaultValue(assetDefaultValue(field.align, 'left'), `align="${field.align}"`),
        rangeSeparator: setDefaultValue(assetDefaultValue(field.rangeSeparator, '-'), `range-separator="${field.rangeSeparator}"`),
        prefixIcon: setDefaultValue(assetDefaultValue(field.prefixIcon, 'el-icon-time'), `prefix-icon="${field.prefixIcon}"`),
        clearIcon: setDefaultValue(assetDefaultValue(field.clearIcon, 'el-icon-circle-close'), `clear-icon="${field.clearIcon}"`),
        popperClass: setDefaultValue(field.popperClass, `popper-class="${field.popperClass}"`),
        isRange: setDefaultValue(field.isRange, 'is-range'),
        arrowControl: setDefaultValue(field.arrowControl, 'arrow-control'),
        pickerOptions: setDefaultValue(assetDefaultValue(pickerOptions, ':picker-options={  }'), pickerOptions),
        readonly,
        disabled,
        editable: setDefaultValue(field.editable, 'editable'),
        clearable
      }

      return store
    },
    'el-time-picker' (field) {
      const processPickerOptions = function (options) {
        return (
          ':picker-options={ ' +
            stitchProps(options.selectableRange, 'selectableRange') +
            stitchProps(options.format, 'format', 'HH:mm:ss') +
          ' }'
        )
      }

      const store = tags['el-time'](field, processPickerOptions(field.pickerOptions))

      return genFieldTemplate(store)
    },
    'el-time-select' (field) {
      const processPickerOptions = function (options) {
        return (
          ':picker-options={ ' +
            stitchProps(options.start, 'start', '08:00') +
            stitchProps(options.end, 'end', '18:00') +
            stitchProps(options.step, 'step', '00:30') +
            stitchProps(options.minTime, 'minTime', '00:00') +
            stitchProps(options.maxTime, 'maxTime', '23:59') +
          ' }'
        )
      }
      const store = tags['el-time'](field, processPickerOptions(field.pickerOptions))

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
