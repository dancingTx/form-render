<script>
import { typeOf } from '@/utils'
import {
  basic, buttonOptions,
  input, textOptions, textareaOptions, passwordOptions, numberOptions,
  select, selectOptions
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
        size="small"
      >
        {item.options.map(item => (<el-radio-button label={item}/>))}
      </el-radio-group>
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
        <el-divider>options选项</el-divider>
        {currItem.__slot__.options.map((opt, index) => (
          <div>
            <i class="el-icon-s-operation" />
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
              class="el-icon-remove-outline"
              style={{ color: '#f00' }}
              onClick={() => removeOption(currItem, index)}
            />
          </div>
        ))}
        <el-button
          icon="el-icon-circle-plus-outline"
          type="text"
          onClick={ () => addOption(currItem)}
        >
          添加选项
        </el-button>
        <el-divider/>
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
  Object.keys(type).forEach(key => {
    const attr = type[key]
    attrs.push(...attr.map(item => {
      if (key === '__options__') return
      if (key === '__native__') {
        if (typeOf(currItem[item.model], 'undefined')) return null
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
      selectOptions
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
