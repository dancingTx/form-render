<script>

const components = {
  basicType (h, currItem) {
    const basic = [
      { label: '标题', model: currItem.__config__.label, placeholder: '请输入标题', type: 'input' },
      { label: '按钮文字', model: currItem.__slot__.default, placeholder: '请输入按钮文字', type: 'input' },
      { label: '按钮类型', model: currItem.type, placeholder: '请选择按钮类型', type: 'select', options: ['', 'primary', 'success', 'info', 'warning', 'danger'] },
      { label: '是否朴素按钮', model: currItem.plain, type: 'switch' },
      { label: '是否圆角按钮', model: currItem.round, type: 'switch' },
      { label: '是否圆形按钮', model: currItem.circle, type: 'switch' },
      { label: '是否加载中状态', model: currItem.loading, type: 'switch' },
      { label: '是否禁用状态', model: currItem.disabled, type: 'switch' },
      { label: '图标类名', model: currItem.icon, placeholder: '请输入图标类名', type: 'input' },
      { label: '是否默认聚焦', model: currItem.autofocus, type: 'switch' },
      { label: '原生type属性', model: currItem.nativeType, placeholder: '请选择原生属性', type: 'select', options: ['button', 'submit', 'reset'] }
    ]
    const switchFormType = function (h, item) {
      let template = ''
      switch (item.type) {
        case 'select':
          template = (
            <el-select value={item.model} placeholder={item.placeholder || ''} style={{ width: '240px' }}>
              {item.options.map(item => (<el-option label={item} value={item} />))}
            </el-select>
          )
          break
        case 'switch':
          template = (<el-switch value={item.model} style={{ width: '240px' }}/>)
          break
        default:
          template = (<el-input value={item.model} placeholder={item.placeholder || ''} style={{ width: '240px' }}/>)
          break
      }
      return template
    }
    return basic.map(item => {
      if (!item.model) return null
      return (
        <el-form-item label={item.label}>
          {switchFormType.call(this, h, item)}
        </el-form-item>
      )
    })
  }
}

// eslint-disable-next-line no-unused-vars
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
    conf: Object
  },
  render (h) {
    return layout.call(this, h, this.conf)
  }
}
</script>
