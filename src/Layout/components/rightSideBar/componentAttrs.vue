<script>
import { typeOf } from '@/utils'
import { basic } from '@/components/generate/__attrs__'
const components = {
  basicType (h, currItem) {
    const attrs = []
    const switchFormType = function (h, item, key, currItem) {
      let template = ''
      switch (item.type) {
        case 'select':
          template = (
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
          break
        case 'switch':
          template = (
            <el-switch
              onInput={value => { key ? currItem[key][item.model] = value : currItem[item.model] = value }}
              value={key ? currItem[key][item.model] : currItem[item.model]}
              style={{ width: '200px' }}
            />)
          break
        default:
          template = (
            <el-input
              onInput={value => { key ? currItem[key][item.model] = value : currItem[item.model] = value }}
              value={key ? currItem[key][item.model] : currItem[item.model]}
              placeholder={item.placeholder || ''}
              style={{ width: '200px' }}
            />)
          break
      }
      return template
    }
    Object.keys(basic).forEach(key => {
      const attr = basic[key]
      attrs.push(...attr.map(item => {
        if (key === '__native__') {
          if (typeOf(currItem[item.model], 'undefined')) return null
          return (
            <el-form-item label={item.label}>
              {switchFormType.call(this, h, item, null, currItem)}
            </el-form-item>
          )
        }
        if (typeOf(currItem[key][item.model], 'undefined')) return null
        return (
          <el-form-item label={item.label}>
            {switchFormType.call(this, h, item, key, currItem)}
          </el-form-item>
        )
      }))
    })
    return attrs
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
