/**
 * 原生input 类型
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
 */

// 'textarea'
const nativeInputType = [
  'text', 'button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'time', 'url', 'week'
]
export const basic = {
  __config__: [
    { label: '标题', model: 'label', placeholder: '请输入标题', type: 'input' },
    { label: '是否显示标题', model: 'showLabel', type: 'switch' }
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
export const text = {
  __slot__: [
    { label: '头部内容', model: 'prefix', placeholder: '请输入input头部内容', type: 'input' },
    { label: '尾部内容', model: 'suffix', placeholder: '请输入input尾部内容', type: 'input' },
    { label: '前置内容', model: 'prepend', placeholder: '请输入input前置内容', type: 'input' },
    { label: '后置内容', model: 'append', placeholder: '请输入input后置内容', type: 'input' }
  ],
  __native__: [
    { label: '原生类型', model: 'type', placeholder: '请输入原生input类型', type: 'select', options: nativeInputType },
    { label: '头部图标', model: 'prefixIcon', placeholder: '请输入input头部图标', type: 'input' },
    { label: '尾部图标', model: 'suffixIcon', placeholder: '请输入input尾部图标', type: 'input' },
    { label: '最大输入长度', model: 'maxLength', placeholder: '请输入最大长度', type: 'number' },
    { label: '最小输入长度', model: 'minLength', placeholder: '请输入最小长度', type: 'number' },
    { label: '是否显示统计', model: 'showWordLimit', type: 'switch' },
    { label: '显示密码图标', model: 'showPassword', type: 'switch' },
    { label: '是否显示清空', model: 'clearable', type: 'switch' },
    { label: '是否只读', model: 'readonly', type: 'switch' }
  ]
}
export const textarea = {
  __native__: [
    { label: '最大输入长度', model: 'maxLength', placeholder: '请输入最大长度', type: 'number' },
    { label: '最小输入长度', model: 'minLength', placeholder: '请输入最小长度', type: 'number' },
    { label: '输入框行数', model: 'rows', placeholder: '请输入textarea行数', type: 'number' },
    { label: '自适应高度', model: 'autosize', type: 'switch' },
    { label: '是否只读', model: 'readonly', type: 'switch' }
  ]
}

export const password = {
  __native__: [
    { label: '最大输入长度', model: 'maxLength', placeholder: '请输入最大长度', type: 'number' },
    { label: '最小输入长度', model: 'minLength', placeholder: '请输入最小长度', type: 'number' },
    { label: '显示密码图标', model: 'showPassword', type: 'switch' },
    { label: '是否显示清空', model: 'clearable', type: 'switch' },
    { label: '是否只读', model: 'readonly', type: 'switch' }
  ]
}
export const number = {
  __native__: [
    { label: '计数器最小值', model: 'min', type: 'number' },
    { label: '计数器最大值', model: 'max', type: 'number' },
    { label: '计数器步长', model: 'step', type: 'number' },
    { label: '仅step倍数', model: 'stepStrictly', type: 'switch' },
    { label: '显示控制按钮', model: 'controls', type: 'switch' },
    { label: '控制按钮位置', model: 'controlsPosition', type: 'radio', options: ['left', 'right'] },
    { label: '数值精度', model: 'precision', type: 'number' },
    { label: '计数器尺寸', model: 'size', type: 'radio', options: ['large', 'medium', 'small'] }
  ]
}
export const input = {
  __config__: [
    { label: '标题', model: 'label', placeholder: '请输入标题', type: 'input' },
    { label: '是否显示标题', model: 'showLabel', type: 'switch' },
    { label: '是否必填', model: 'required', type: 'switch' }
  ],
  __native__: [
    { label: '原生name', model: 'name', placeholder: '请输入原生name', type: 'input' },
    { label: '是否禁用', model: 'disabled', type: 'switch' }
  ]
}
