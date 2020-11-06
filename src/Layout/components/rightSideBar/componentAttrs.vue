<script>
import { typeOf, mergeOptions } from '@/utils'
import { basic, input, inputSlot } from '@/components/generate/__attrs__'
const formItem = {
  select (h, item, key, currItem) {
    return (
      <el-select
        onInput={value => { key ? currItem[key][item.model] = value : currItem[item.model] = value }}
        value={key ? currItem[key][item.model] : currItem[item.model]}
        placeholder={item.placeholder || ''}
        style={{ width: '200px' }}
      >
        {item.options.map(i => (
          <el-option
            value={i}
          />))}
      </el-select>
    )
  },
  switch (h, item, key, currItem) {
    return (
      <el-switch
        onInput={value => { key ? currItem[key][item.model] = value : currItem[item.model] = value }}
        value={key ? currItem[key][item.model] : currItem[item.model]}
        style={{ width: '200px' }}
      />
    )
  },
  // number (h, item, key, currItem) {

  // },
  input (h, item, key, currItem) {
    return (
      <el-input
        onInput={value => { key ? currItem[key][item.model] = value : currItem[item.model] = value }}
        value={key ? currItem[key][item.model] : currItem[item.model]}
        placeholder={item.placeholder || ''}
        style={{ width: '200px' }}
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
  return attrs
}

const components = {
  basicType (h, currItem) {
    return genFormItem.call(this, h, currItem, basic)
  },
  inputType (h, currItem) {
    const type = currItem.type
    if (type === 'text') {
      return genFormItem.call(this, h, currItem, mergeOptions(inputSlot, input))
    }
    return genFormItem.call(this, h, currItem, input)
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
