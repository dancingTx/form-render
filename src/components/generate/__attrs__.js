export const basic = {
  __config__: [
    { label: '标题', model: 'label', placeholder: '请输入标题', type: 'input' }
  ],
  __slot__: [
    { label: '按钮文字', model: 'default', placeholder: '请输入按钮文字', type: 'input' }
  ],
  __native__: [
    { label: '按钮类型', model: 'type', placeholder: '请选择按钮类型', type: 'select', options: ['default', 'primary', 'success', 'info', 'warning', 'danger'] },
    { label: '是否朴素按钮', model: 'plain', type: 'switch' },
    { label: '是否圆角按钮', model: 'round', type: 'switch' },
    { label: '是否圆形按钮', model: 'circle', type: 'switch' },
    { label: '是否加载状态', model: 'loading', type: 'switch' },
    { label: '是否禁用状态', model: 'disabled', type: 'switch' },
    { label: '图标类名', model: 'icon', placeholder: '请输入图标类名', type: 'input' },
    { label: '是否默认聚焦', model: 'autofocus', type: 'switch' },
    { label: '原生type属性', model: 'nativeType', placeholder: '请选择原生属性', type: 'select', options: ['button', 'submit', 'reset'] }
  ]
}
