<script>
import draggable from 'vuedraggable'
import { typeOf } from '@/utils'
import {
  basic, buttonOptions,
  input, textOptions, textareaOptions, passwordOptions, numberOptions,
  select, selectOptions, radioOptions
} from '@/components/generate/__attrs__'
const formItem = {
  select (h, item, key, currItem) {
    return (
      <el-select
        class="item"
        onInput={value => { key ? currItem[key][item.model] = value || '' : currItem[item.model] = value || '' }}
        value={key ? currItem[key][item.model] : currItem[item.model]}
        placeholder={item.placeholder || ''}
      >
        {item.options.map(i => (<el-option value={i} />))}
      </el-select>
    )
  },
  switch (h, item, key, currItem) {
    return (
      <el-switch
        onInput={value => { key ? currItem[key][item.model] = value || false : currItem[item.model] = value || false }}
        value={key ? currItem[key][item.model] : currItem[item.model]}
      />
    )
  },
  number (h, item, key, currItem) {
    return (
      <el-input-number
        class="item"
        placeholder={item.placeholder}
        onInput={value => { key ? currItem[key][item.model] = value || 0 : currItem[item.model] = value || 0 }}
        value={key ? currItem[key][item.model] : currItem[item.model]}
        min={0}
      />
    )
  },
  radio (h, item, key, currItem) {
    return (
      <el-radio-group
        onInput={value => { key ? currItem[key][item.model] = value || 0 : currItem[item.model] = value || 0 }}
        value={key ? currItem[key][item.model] : currItem[item.model]}
        size="mini"
      >
        {item.options.map(item => (<el-radio-button label={item}/>))}
      </el-radio-group>
    )
  },
  radioGroup (h, type, currItem, config) {
    return (
      <div>
        <el-divider>属性</el-divider>
        <el-form-item label='选项样式'>
          <el-radio-group
            onInput={value => { config.isButton = value }}
            value={config.isButton}
          >
            {
              [
                { label: '默认', value: false },
                { label: '按钮', value: true }
              ].map(item => (
                <el-radio-button label={item.value}>
                  {item.label}
                </el-radio-button>
              ))
            }
          </el-radio-group>
        </el-form-item>
        {
          !config.isButton && (
            <el-form-item label="是否显示边框">
              <el-switch
                onInput={value => { config.isBorder = value }}
                value={ config.isBorder }
              />
            </el-form-item>
          )
        }
        {
          type.__native__.map(item => {
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
            return config.isButton && (
              <el-form-item label={item.label}>
                {switchFormItemType.call(this, h, item, null, currItem)}
              </el-form-item>
            )
          })
        }
      </div>
    )
  },
  slider (h, item, key, currItem) {
    return (
      <el-slider
        class="item"
        onInput={value => { key ? currItem[key][item.model] = value || 0 : currItem[item.model] = value || 0 }}
        value={key ? currItem[key][item.model] : currItem[item.model]}
        min={0}
        max={24}
        marks={{ 12: '' }}
      />
    )
  },
  color (h, item, key, currItem) {
    return (
      <el-color-picker
        onInput={value => { key ? currItem[key][item.model] = value || 0 : currItem[item.model] = value || 0 }}
        value={key ? currItem[key][item.model] : currItem[item.model]}
      />
    )
  },
  options (h, type, currItem) {
    const addOption = function (target) {
      target.__slot__.options.push({
        label: '',
        value: ''
      })
    }
    const removeOption = function (target, index) {
      target.__slot__.options.splice(index, 1)
    }
    if (currItem.__config__.isGroup) {
      // TODO: 如果分组，需要定义组名

    }
    return (
      <div style={{ 'text-align': 'center' }}>
        <el-divider>选项</el-divider>
        <draggable
          class="drag__option"
          list={currItem.__slot__.options}
          handle=".drag__icon"
          animation={300}
        >
          {currItem.__slot__.options.map((opt, index) => (
            <div class="drag__item">
              <i class="el-icon-s-operation drag__icon" />
              {type.__options__.map(item => {
                return (
                  <el-input
                    onInput={value => { opt[item.model] = value }}
                    value={opt[item.model]}
                    placeholder={item.label}
                    style={{ width: '120px', margin: '5px' }}
                  />
                )
              })}
              <i
                class="el-icon-remove-outline drag__remove"
                onClick={() => removeOption(currItem, index)}
              />
            </div>
          ))}
        </draggable>
        <el-button
          icon="el-icon-circle-plus-outline"
          type="text"
          onClick={ () => addOption(currItem)}
        >
          添加选项
        </el-button>
      </div>
    )
  },
  input (h, item, key, currItem) {
    return (
      <el-input
        class="item"
        onInput={value => { key ? currItem[key][item.model] = value || '' : currItem[item.model] = value || '' }}
        value={key ? currItem[key][item.model] : currItem[item.model]}
        placeholder={item.placeholder || ''}
      />
    )
  }
}

const switchFormItemType = function (h, item, key, currItem) {
  return (formItem[item.type || 'input'] || formItem.input).call(this, h, item, key, currItem)
}
const genFormItem = function (h, currItem, type) {
  const attrs = []
  const config = currItem.__config__
  let temp = null
  Object.keys(type).forEach(key => {
    const attr = type[key]
    attrs.push(...attr.map(item => {
      if (key === '__options__') return
      if (key === '__native__') {
        if (typeOf(currItem[item.model], 'undefined')) return null
        if (config.type === 'radio') return

        return (
          <el-form-item label={item.label}>
            {switchFormItemType.call(this, h, item, null, currItem)}
          </el-form-item>
        )
      }

      if (typeOf(currItem[key][item.model], 'undefined')) return null
      return (
        <el-form-item label={item.label}>
          {switchFormItemType.call(this, h, item, key, currItem)}
        </el-form-item>
      )
    }))
  })

  if ('__options__' in type) {
    attrs.push(formItem.options.call(this, h, type, currItem))
  }

  switch (config.type) {
    case 'radio':
      temp = formItem.radioGroup.call(this, h, type, currItem, config)
      break
    default:
      temp = <div/>
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
      radioOptions
    }
    return returnFormItem.call(this, h, store, currItem, select)
  }
}

const layout = function (h, currItem) {
  const type = `${currItem.__config__.componentType || ''}Type`
  return (
    <el-form size='small' label-width="100px">
      {components[type].call(this, h, currItem)}
    </el-form>
  )
}
export default {
  name: 'componentAttrs',
  components: {
    draggable
  },
  props: {
    conf: Object,
    isEmpty: Boolean
  },
  render (h) {
    const hasData = Object.keys(this.conf).length
    return (!this.isEmpty && hasData) ? layout.call(this, h, this.conf) : <div/>
  }
}
</script>
