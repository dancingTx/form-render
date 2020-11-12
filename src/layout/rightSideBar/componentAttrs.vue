<script>
import draggable from 'vuedraggable'
import processCascader from './module/processCascader'
import processIcons from './module/processIcons'
import { typeOf, isPlainObject, searchMultiData } from '@/utils'
import {
  basic,
  buttonOptions,
  input,
  textOptions,
  textareaOptions,
  passwordOptions,
  numberOptions,
  select,
  selectOptions,
  radioOptions,
  checkboxOptions,
  cascaderOptions,
  uploadOptions,
  switchOptions,
  sliderOptions,
  rateOptions,
  colorOptions,
  timePickerOptions,
  timeSelectOptions,
  layouts,
  rowOptions
} from '@/components/generate/__attrs__'
import { template } from '../../components/Preview/testTemplate'
const formItem = {
  select (h, item, key, currItem) {
    const target = key ? currItem[key] : currItem
    return (
      <el-select
        class="item"
        onInput={value => { searchMultiData(target, item.model, value || '') }}
        value={searchMultiData(target, item.model)}
        placeholder={item.placeholder || ''}
      >
        {item.options.map(i => {
          if (isPlainObject(i)) {
            return <el-option label={i.label || ''} value={i.value || ''} />
          }
          return <el-option label={i} value={i} />
        })}
      </el-select>
    )
  },
  switch (h, item, key, currItem) {
    const target = key ? currItem[key] : currItem
    return (
      <el-switch
        onInput={value => { searchMultiData(target, item.model, value || false) }}
        value={searchMultiData(target, item.model)}
      />
    )
  },
  number (h, item, key, currItem) {
    const target = key ? currItem[key] : currItem
    return (
      <el-input-number
        class="item"
        placeholder={item.placeholder}
        onInput={value => { searchMultiData(target, item.model, value || 0) }}
        value={searchMultiData(target, item.model)}
        min={0}
      />
    )
  },
  radio (h, item, key, currItem) {
    const target = key ? currItem[key] : currItem
    return (
      <el-radio-group
        onInput={value => { searchMultiData(target, item.model, value || 0) }}
        value={searchMultiData(target, item.model) }
        size="mini"
      >
        {item.options.map(item => (
          <el-radio-button label={item} />
        ))}
      </el-radio-group>
    )
  },
  radioAndCheckboxGroup (h, type, currItem, config) {
    return (
      <div>
        <el-divider>属性</el-divider>
        <el-form-item label="选项样式">
          <el-radio-group
            onInput={value => {
              config.isButton = value
            }}
            value={config.isButton}
          >
            {[
              { label: '默认', value: false },
              { label: '按钮', value: true }
            ].map(item => (
              <el-radio-button label={item.value}>{item.label}</el-radio-button>
            ))}
          </el-radio-group>
        </el-form-item>
        {!config.isButton && (
          <el-form-item label="是否显示边框">
            <el-switch
              onInput={value => {
                config.isBorder = value
              }}
              value={config.isBorder}
            />
          </el-form-item>
        )}
        {type.__native__.map(item => {
          if (
            select.__native__.includes(item) ||
            (item.model === 'size' && config.isBorder)
          ) {
            return (
              <el-form-item label={item.label}>
                {switchFormItemType.call(this, h, item, null, currItem)}
              </el-form-item>
            )
          }
          return (
            config.isButton && (
              <el-form-item label={item.label}>
                {switchFormItemType.call(this, h, item, null, currItem)}
              </el-form-item>
            )
          )
        })}
      </div>
    )
  },
  slider (h, item, key, currItem) {
    const target = key ? currItem[key] : currItem
    return (
      <el-slider
        class="item"
        onInput={value => { searchMultiData(target, item.model, value || 0) }}
        value={searchMultiData(target, item.model)}
        min={0}
        max={24}
        marks={{ 12: '' }}
      />
    )
  },
  color (h, item, key, currItem) {
    const target = key ? currItem[key] : currItem
    if (typeOf(target[item.model], 'array')) {
      return target[item.model].map((value, i) => {
        return (
          <el-color-picker
            onInput={value => { this.$set(target[item.model], i, value) }}
            value={value}
            style={{ marginRight: '20px' }}
          />
        )
      })
    }
    return (
      <el-color-picker
        onInput={value => { searchMultiData(target, item.model, value || '#ffffff') }}
        value={searchMultiData(target, item.model)}
      />
    )
  },
  options (h, type, currItem) {
    const addOption = function (target, type) {
      target.push({
        label: '',
        value: ''
      })
    }
    const removeOption = function (target, index) {
      if (target.length) {
        target.splice(index, 1)
      }
    }
    if (currItem.__config__.isGroup) {
      // TODO: 如果分组，需要定义组名
    }
    const opts = currItem.__slot__?.options
    if (opts && typeOf(opts, 'array')) {
      // radio group, checkbox group
      return (
        <div style={{ 'text-align': 'center' }}>
          <el-divider>选项</el-divider>
          <draggable
            class="drag__option"
            list={opts}
            handle=".drag__icon"
            animation={300}
          >
            {opts.map((opt, index) => (
              <div class="drag__item">
                <i class="el-icon-s-operation drag__icon" />
                {type.map(item => {
                  return (
                    <el-input
                      onInput={value => { searchMultiData(opt, item.model, value || '') }}
                      value={searchMultiData(opt, item.model)}
                      placeholder={item.label}
                      style={{ width: '120px', margin: '5px' }}
                    />
                  )
                })}
                <i
                  class="el-icon-remove-outline drag__remove"
                  onClick={() => removeOption(opts, index)}
                />
              </div>
            ))}
          </draggable>
          <el-button
            icon="el-icon-circle-plus-outline"
            type="text"
            onClick={() => addOption(opts)}
          >
            添加选项
          </el-button>
        </div>
      )
    } else {
      // cascader
      return (
        <process-cascader
          conf={currItem}
          type={type}
        />
      )
    }
  },
  append (h, item, key, currItem) {
    const target = key ? currItem[key] : currItem
    const { children } = item
    if (children) {
      return (
        <el-input
          class="append"
          onInput={value => searchMultiData(target, item.model, value || '')}
          value={searchMultiData(target, item.model)}
          placeholder={item.placeholder}
          type="number"
          min={0}
        >
          <template slot="append">
            {formItem.select.call(this, h, children, key, currItem)}
          </template>
        </el-input>
      )
    }
    return <process-icons conf={target} option={item} />
  },
  input (h, item, key, currItem) {
    const target = key ? currItem[key] : currItem
    if (typeOf(target[item.model], 'array')) {
      return target[item.model].map((value, i) => (
        <el-input
          class="item"
          onInput={value => { this.$set(target[item.model], i, value) }}
          value={value}
          placeholder='请输入'
          style={{ width: '100px', margin: '10px' }}
        />
      ))
    }
    return (
      <el-input
        class="item"
        onInput={value => { searchMultiData(target, item.model, value) }}
        value={searchMultiData(target, item.model)}
        placeholder={item.placeholder || ''}
      />
    )
  }
}

const switchFormItemType = function (h, item, key, currItem) {
  if (isPlainObject(key)) {
    currItem = key
    key = null
  }
  return (formItem[item.type || 'input'] || formItem.input).call(
    this,
    h,
    item,
    key,
    currItem
  )
}
const genFormItem = function (h, currItem, type) {
  const attrs = []
  const config = currItem.__config__
  const group = ['radio', 'checkbox']
  let temp = null
  Object.keys(type).forEach(key => {
    const attr = type[key]
    // 对于options类型数据进行特殊处理
    if (key === '__options__') return
    // vmodel 类型为对象类型，无需循环，直接传入即可
    if (key === '__vModel__') {
      attrs.push(
        (
          <el-form-item label={attr.label}>
            {switchFormItemType.call(this, h, attr, currItem)}
          </el-form-item>
        )
      )
      return
    }
    attrs.push(
      ...attr.map(item => {
        if (key === '__native__') {
          if (typeOf(searchMultiData(currItem, item.model), 'undefined')) return null
          if (group.includes(config.type)) return
          return (
            <el-form-item label={item.label}>
              {switchFormItemType.call(this, h, item, currItem)}
            </el-form-item>
          )
        }
        if (typeOf(searchMultiData(currItem[key], item.model), 'undefined')) return null
        return (
          <el-form-item label={item.label}>
            {switchFormItemType.call(this, h, item, key, currItem)}
          </el-form-item>
        )
      })
    )
  })

  if ('__options__' in type) {
    attrs.push(formItem.options.call(this, h, type.__options__, currItem))
  }

  switch (config.type) {
    case 'radio':
    case 'checkbox':
      temp = formItem.radioAndCheckboxGroup.call(this, h, type, currItem, config)
      break
    default:
      temp = <div />
      break
  }

  attrs.push(temp)

  return attrs
}
const returnFormItem = function (h, store, currItem, defaultOpts) {
  const type = currItem.__config__.type
  return type && store[`${type}Options`]
    ? genFormItem.call(this, h, currItem, store[`${type}Options`])
    : genFormItem.call(this, h, currItem, defaultOpts)
}

const components = {
  basicType (h, currItem) {
    const store = {
      buttonOptions
    }
    return returnFormItem.call(this, h, store, currItem, basic)
  },
  inputType (h, currItem) {
    const store = {
      textOptions,
      textareaOptions,
      passwordOptions,
      numberOptions
    }
    return returnFormItem.call(this, h, store, currItem, input)
  },
  selectType (h, currItem) {
    const store = {
      selectOptions,
      radioOptions,
      checkboxOptions,
      cascaderOptions,
      uploadOptions,
      switchOptions,
      sliderOptions,
      rateOptions,
      colorOptions,
      timePickerOptions,
      timeSelectOptions
    }
    return returnFormItem.call(this, h, store, currItem, select)
  },
  layoutType (h, currItem) {
    const store = {
      layouts,
      rowOptions
    }
    return returnFormItem.call(this, h, store, currItem, layouts)
  },
  formType (h, currItem) {
    const store = {
      formOptions: this.formOptions
    }
    return returnFormItem.call(this, h, store, currItem, store.formOptions)
  }
}

const layout = function (h, currItem) {
  const type = `${currItem.__config__.componentType || ''}Type`
  return (
    <div>
      <el-form size="small" label-width="100px">
        {components[type].call(this, h, currItem)}
      </el-form>
    </div>
  )
}
export default {
  name: 'componentAttrs',
  components: {
    draggable,
    processCascader,
    processIcons
  },
  props: {
    conf: Object,
    isEmpty: Boolean,
    formOptions: Object
  },
  render (h) {
    const hasData = Object.keys(this.conf).length
    return !this.isEmpty && hasData
      ? layout.call(this, h, this.conf)
      : <div />
  }
}
</script>
