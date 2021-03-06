import { endOfLine } from '@/utils'
import methodsName from './__methods__'
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
      name: setDefaultValue(field.name, `name="${field.name}"`),
      disabled: setDefaultValue(field.disabled, 'disabled'),
      clearable: setDefaultValue(field.clearable, 'clearable'),
      required: setDefaultValue(field.required, 'required'),
      readonly: setDefaultValue(field.readonly, 'readonly'),
      placeholder: setDefaultValue(field.placeholder, `placeholder="${field.placeholder}"`)
    }
    return store
  }
  const genFormTemplate = function (template, formConf) {
    const store = {
      model: setDefaultValue(formConf.__vModel__, `:model="${formConf.__vModel__}"`),
      formRef: setDefaultValue(formConf.__config__.formRef, `ref="${formConf.__config__.formRef}"`),
      labelPosition: setDefaultValue(assetDefaultValue(formConf.labelPosition, 'right'), `label-position="${formConf.labelPosition}"`),
      labelWidth: setDefaultValue(formConf.labelWidth, `label-width="${formConf.labelWidth}"`),
      labelSuffix: setDefaultValue(formConf.labelSuffix, `label-suffix="${formConf.labelSuffix}"`),
      size: setDefaultValue(assetDefaultValue(formConf.size, 'medium'), `size="${formConf.size}"`),
      hideRequiredAsterisk: setDefaultValue(formConf.hideRequiredAsterisk, 'hide-required-asterisk'),
      inline: setDefaultValue(formConf.inline, 'inline'),
      required: setDefaultValue(formConf.required, 'required'),
      disabled: setDefaultValue(formConf.disabled, 'disabled')
    }

    return (
      `<el-form ${listStoreAttrs(store)}>
      ${template + setDefaultValue(formConf.__config__.formBtnGroup, genFormBtns(formConf))}
      </el-form>`
    )
  }
  const genFormBtns = function () {
    const template = `
    <el-form-item>
      <el-button type="primary" @click="${methodsName.submitForm}">提交</el-button>
      <el-button @click="${methodsName.resetForm}">重置</el-button>
    </el-form-item>`

    return template
  }
  const genChildrenTemplate = function (type, slot, options) {
    if (!type || !slot) return ''
    return endOfLine + slots[`${type}Slot`](slot, options) + endOfLine
  }
  const genFieldTemplate = function (store, type, slot, options) {
    return `${endOfLine}<${listStoreAttrs(store)}>${genChildrenTemplate(type, slot, options)}</${store.tag}>${endOfLine}`
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
      const store = {
        type: setDefaultValue(assetDefaultValue(item.type, 'default'), `type="${item.type}"`),
        gutter: setDefaultValue(item.gutter, `:gutter="${item.gutter}"`),
        jsutify: setDefaultValue(assetDefaultValue(item.jsutify, 'start'), `jsutify="${item.jsutify}"`),
        align: setDefaultValue(assetDefaultValue(item.align, 'top'), `align="${item.align}"`)
      }
      const children = (item.__config__.children || []).map(child => layouts[child.__config__.layout || 'colFormItem'](child)).join(endOfLine)
      return `<el-row ${listStoreAttrs(store)}>${children}</el-row>`
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
            label: setDefaultValue(option.value, `label="${option.value}"`),
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
    uploadSlot (slot, { autoUpload, config }) {
      const children = []
      if (slot.listType === 'picture-card') {
        children.push(
          ('<i class="el-icon-plus"></i>')
        )
      } else {
        children.push(
          (`<el-button size="${config.btnSize || 'small'}" type="${config.btnType || 'primary'}" ${setDefaultValue(!autoUpload, `@click="${methodsName.submitUpload}"`)}>
          ${config.btnText || '点击上传'}
          </el-button>`)
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
      const { tag, disabled, size } = genFieldAttrs(field)
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
        nativeType: setDefaultValue(assetDefaultValue(field.nativeType, 'button'), `native-type="${field.nativeType}"`)
      }
      return genFieldTemplate(store, field.__config__.type, field.__slot__)
    },
    'el-input' (field) {
      const { tag, vModel, size, name, disabled, clearable, readonly, placeholder } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        type: setDefaultValue(field.type, `type="${field.type}"`),
        size,
        name,
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
        disabled
      }

      return genFieldTemplate(store, field.__config__.type, field.__slot__)
    },
    'el-input-number' (field) {
      const { tag, vModel, size, name, placeholder, disabled } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        type: setDefaultValue(field.type, `type="${field.type}"`),
        size,
        name,
        placeholder,
        max: setDefaultValue(assetDefaultValue(field.max, Infinity), `:max="${field.max}"`),
        min: setDefaultValue(assetDefaultValue(field.min, -Infinity), `:min="${field.min}"`),
        controls: setDefaultValue(field.controls, 'controls'),
        step: setDefaultValue(field.step, `:step="${field.step}"`),
        stepStrictly: setDefaultValue(field.stepStrictly, 'step-strictly'),
        precision: setDefaultValue(field.precision, `:precision="${field.precision}"`),
        disabled
      }

      return genFieldTemplate(store)
    },
    'el-select' (field) {
      const isGroup = field.__config__.isGroup
      const { tag, vModel, name, size, placeholder, clearable, disabled } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        name,
        size,
        placeholder,
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
      const { tag, vModel, placeholder, size, name, disabled, clearable } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        name,
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
        showFileList: setDefaultValue(assetDefaultValue(field.showFileList, true), ':show-file-list="false"'),
        drag: setDefaultValue(field.drag, 'drag'),
        autoUpload: setDefaultValue(assetDefaultValue(field.autoUpload, true), ':auto-upload="false"'),
        disabled,
        ref: `ref="${config.type}"`,
        handleBeforeUpload: `:before-upload="${methodsName.beforeUpload}"`
      }

      return genFieldTemplate(store, config.type, field.__slot__, { autoUpload: field.autoUpload, config })
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
      const { tag, vModel, size, name, readonly, disabled, placeholder, clearable } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        size,
        name,
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
    },
    'el-switch' (field) {
      const { tag, vModel, name, disabled } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        name,
        width: setDefaultValue(assetDefaultValue(field.width, 40), `:width="${field.width}"`),
        activeIconClass: setDefaultValue(field.activeIconClass, `active-icon-class="${field.activeIconClass}"`),
        inactiveIconClass: setDefaultValue(field.inactiveIconClass, `inactive-icon-class="${field.inactiveIconClass}"`),
        activeColor: setDefaultValue(assetDefaultValue(field.activeColor, '#409EFF'), `active-color="${field.activeColor}"`),
        inactiveColor: setDefaultValue(assetDefaultValue(field.inactiveColor, '#C0CCDA'), `inactive-color="${field.inactiveColor}"`),
        disabled
      }

      return genFieldTemplate(store)
    },
    'el-slider' (field) {
      const { tag, vModel, name, disabled } = genFieldAttrs(field)

      const store = {
        tag,
        vModel,
        name,
        min: setDefaultValue(field.min, `:min="${field.min}"`),
        max: setDefaultValue(assetDefaultValue(field.max, 100), `:max="${field.max}"`),
        step: setDefaultValue(assetDefaultValue(field.step, 1), `:step="${field.step}"`),
        debounce: setDefaultValue(assetDefaultValue(field.debounce, 300), `:debounce="${field.debounce}"`),
        inputSize: setDefaultValue(assetDefaultValue(field.inputSize, 'small'), `input-size="${field.inputSize}"`),
        showInputControls: setDefaultValue(assetDefaultValue(field.showInputControls, true), 'show-input-controls'),
        showTooltip: setDefaultValue(assetDefaultValue(field.showTooltip, true), 'show-tooltip'),
        showStops: setDefaultValue(field.showStops, 'show-stops'),
        range: setDefaultValue(field.range, 'range'),
        vertical: setDefaultValue(field.vertical, 'vertical'),
        disabled
      }

      return genFieldTemplate(store)
    },
    'el-rate' (field) {
      const { tag, vModel, name, disabled } = genFieldAttrs(field)

      const store = {
        tag,
        vModel,
        name,
        max: setDefaultValue(assetDefaultValue(field.max, 5), `:max="${field.max}"`),
        colors: setDefaultValue(assetDefaultValue(toString(field.colors), toString(['#F7BA2A', '#F7BA2A', '#F7BA2A'])), `:colors="${toString(field.colors)}"`),
        voidColor: setDefaultValue(assetDefaultValue(field.voidColor, '#C6D1DE'), `void-color="${field.voidColor}"`),
        disabledVoidColor: setDefaultValue(assetDefaultValue(field.disabledVoidColor, '#EFF2F7'), `disabled-void-color="${field.disabledVoidColor}"`),
        textColor: setDefaultValue(assetDefaultValue(field.textColor, '#1F2D3D'), `text-color="${field.textColor}"`),
        texts: setDefaultValue(assetDefaultValue(toString(field.texts), toString(['极差', '失望', '一般', '满意', '惊喜'])), `:texts="${toString(field.texts)}"`),
        allowHalf: setDefaultValue(field.allowHalf, 'allow-half'),
        showText: setDefaultValue(field.showText, 'show-text'),
        showScore: setDefaultValue(field.showScore, 'show-score'),
        disabled
      }

      return genFieldTemplate(store)
    },
    'el-color-picker' (field) {
      const { tag, vModel, size, disabled } = genFieldAttrs(field)
      const store = {
        tag,
        vModel,
        size,
        colorFormat: setDefaultValue(assetDefaultValue(field.colorFormat, 'hex'), `color-format="${field.colorFormat}"`),
        popperClass: setDefaultValue(field.popperClass, `popper-class="${field.popperClass}"`),
        showAlpha: setDefaultValue(field.showAlpha, 'show-alpha'),
        disabled
      }

      return genFieldTemplate(store)
    }
  }

  return (function () {
    let template = ''
    template = (fields || []).map(item => layouts[item.__config__.layout](item)).join(endOfLine)
    return genFormTemplate(template, formConf)
  }())
}
export default genTemplate
