import { mergeOptions } from '@/utils'
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
    { label: '是否显示标题', model: 'showLabel', type: 'switch' },
    { label: '表单栅格', model: 'span', type: 'slider' }
  ]
}

const button = {
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

export const buttonOptions = mergeOptions(button, basic)

export const input = {
  __vModel__: { label: '绑定值', model: '__vModel__', placeholder: '请输入绑定值', type: 'input' },
  __config__: [
    { label: '标题', model: 'label', placeholder: '请输入标题', type: 'input' },
    { label: '是否显示标题', model: 'showLabel', type: 'switch' },
    { label: '是否必填', model: 'required', type: 'switch' },
    { label: '表单栅格', model: 'span', type: 'slider' }
  ],
  __native__: [
    { label: '原生name', model: 'name', placeholder: '请输入原生name', type: 'input' },
    { label: '是否禁用', model: 'disabled', type: 'switch' }
  ]
}

const text = {
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

export const textOptions = mergeOptions(text, input)

const textarea = {
  __native__: [
    { label: '最大输入长度', model: 'maxLength', placeholder: '请输入最大长度', type: 'number' },
    { label: '最小输入长度', model: 'minLength', placeholder: '请输入最小长度', type: 'number' },
    { label: '输入框行数', model: 'rows', placeholder: '请输入textarea行数', type: 'number' },
    { label: '自适应高度', model: 'autosize', type: 'switch' },
    { label: '是否只读', model: 'readonly', type: 'switch' }
  ]
}

export const textareaOptions = mergeOptions(textarea, input)

const password = {
  __native__: [
    { label: '最大输入长度', model: 'maxLength', placeholder: '请输入最大长度', type: 'number' },
    { label: '最小输入长度', model: 'minLength', placeholder: '请输入最小长度', type: 'number' },
    { label: '显示密码图标', model: 'showPassword', type: 'switch' },
    { label: '是否显示清空', model: 'clearable', type: 'switch' },
    { label: '是否只读', model: 'readonly', type: 'switch' }
  ]
}

export const passwordOptions = mergeOptions(password, input)

const number = {
  __vModel__: { label: '绑定值', model: '__vModel__', placeholder: '请输入绑定值', type: 'number' },
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

export const numberOptions = mergeOptions(number, input)

export const select = {
  __config__: [
    { label: '标题', model: 'label', placeholder: '请输入标题', type: 'input' },
    { label: '是否显示标题', model: 'showLabel', type: 'switch' },
    { label: '是否必选', model: 'required', type: 'switch' },
    { label: '表单栅格', model: 'span', type: 'slider' }
  ],
  __native__: [
    { label: '原生name', model: 'name', placeholder: '请输入原生name', type: 'input' },
    { label: '是否禁用', model: 'disabled', type: 'switch' }
  ]
}

const singleSelect = {
  __vModel__: { label: '绑定值', model: '__vModel__', placeholder: '请输入绑定值', type: 'input' },
  __config__: [
    // TODO: 暂不支持分组
    // { label: '是否分组', model: 'isGroup', type: 'switch' }
  ],
  __slot__: [
    { label: '组件头部内容', model: 'prefix', type: 'input' }
  ],
  __options__: [
    { label: 'label', model: 'label', type: 'input' },
    { label: 'value', model: 'value', type: 'input' }
  ],
  __native__: [
    // TODO: 暂不支持多选
    // { label: '是否多选', model: 'multiple', type: 'switch' },
    // { label: '多选限制', model: 'multipleLimit', type: 'number' },
    { label: '是否清空选项', model: 'clearable', type: 'switch' },
    { label: '是否可搜索', model: 'filterable', type: 'switch' },
    { label: '允许创建条目', model: 'allowCreate', type: 'switch' },
    { label: '输入框尺寸', model: 'size', type: 'radio', options: ['medium', 'small', 'mini'] },
    { label: '输入框占位符', model: 'placeholder', type: 'input' }
  ]
}

export const selectOptions = mergeOptions(singleSelect, select)

const radio = {
  __vModel__: { label: '绑定值', model: '__vModel__', placeholder: '请输入绑定值', type: 'input' },
  __native__: [
    { label: '单选框尺寸', model: 'size', type: 'radio', options: ['medium', 'small', 'mini'] },
    { label: '文本颜色', model: 'textColor', type: 'color' },
    { label: '填充颜色', model: 'fill', type: 'color' }
  ],
  __options__: [
    { label: 'label', model: 'label', type: 'input' },
    { label: 'value', model: 'value', type: 'input' }
  ]
}

export const radioOptions = mergeOptions(radio, select)

const checkbox = {
  __native__: [
    { label: '单选框尺寸', model: 'size', type: 'radio', options: ['medium', 'small', 'mini'] },
    { label: '文本颜色', model: 'textColor', type: 'color' },
    { label: '填充颜色', model: 'fill', type: 'color' }
  ],
  __options__: [
    { label: 'label', model: 'label', type: 'input' },
    { label: 'value', model: 'value', type: 'input' }
  ]
}

export const checkboxOptions = mergeOptions(checkbox, select)

const cascader = {
  __native__: [
    { label: '选择器占位符', model: 'placeholder', type: 'input' },
    { label: '显示完整路径', model: 'showAllLevels', type: 'switch' },
    { label: '是否折叠Tag', model: 'collapseTags', type: 'switch' },
    { label: '是否可搜索', model: 'filterable', type: 'switch' },
    { label: '选项分割符', model: 'separator', type: 'input' }
  ],
  __attrs__: [
    { label: '菜单展开方式', model: 'props.expandTrigger', type: 'radio', options: ['click', 'hover'] },
    { label: '是否多选', model: 'props.multiple', type: 'switch' },
    { label: '任选层级', model: 'props.checkStrictly', type: 'switch' }
  ],
  __options__: { label: '静态数据', model: 'options', type: 'tree' }
}

export const cascaderOptions = mergeOptions(cascader, select)

const upload = {
  __config__: [
    { label: '按钮文字', model: 'btnText', type: 'input', placeholder: '请输入按钮文字' },
    { label: '按钮尺寸', model: 'btnSize', type: 'radio', options: ['medium', 'small', 'mini'] },
    { label: '按钮类型', model: 'btnType', type: 'select', options: ['default', 'primary', 'success', 'info', 'warning', 'danger'] },
    { label: '显示tip', model: 'showTips', type: 'switch' },
    { label: '文件大小', model: 'fileSize', type: 'append', placeholder: '请输入文件大小', children: { model: 'sizeUnit', type: 'select', options: ['KB', 'MB', 'GB'] } }
  ],
  __native__: [
    { label: '上传地址', model: 'action', type: 'input', placeholder: '请输入上传地址' },
    { label: '是否多选文件', model: 'multiple', type: 'switch' },
    { label: '是否携带Cookie', model: 'withCredentials', type: 'switch' },
    { label: '显示上传列表', model: 'showFileList', type: 'switch' },
    { label: '允许拖拽上传', model: 'drag', type: 'switch' },
    { label: '自动上传', model: 'autoUpload', type: 'switch' },
    { label: '文件列表类型', model: 'listType', type: 'radio', options: ['text', 'picture', 'picture-card'] },
    { label: '最大上传数', model: 'limit', type: 'number' },
    {
      label: '上传类型',
      model: 'accept',
      type: 'select',
      options: [
        { label: '图片', value: 'image/*' },
        { label: '视频', value: 'video/*' },
        { label: '音频', value: 'audio/*' },
        { label: 'word', value: '.doc,.docx' },
        { label: 'excel', value: '.xls,.xlsx' },
        { label: 'ppt', value: '.ppt,.pptx' },
        { label: 'pdf', value: '.pdf,.odf' }
      ]
    }
  ]
}

export const uploadOptions = mergeOptions(upload, select)

const switchs = {
  __vModel__: { label: '绑定值', model: '__vModel__', type: 'switch' },
  __native__: [
    { label: '开关尺寸', model: 'width', type: 'number' },
    { label: '打开图标', model: 'activeIconClass', type: 'input' },
    { label: '关闭图标', model: 'inactiveIconClass', type: 'input' },
    { label: '打开文字', model: 'activeText', type: 'input' },
    { label: '关闭文字', model: 'inactiveText', type: 'input' },
    { label: '打开背景', model: 'activeColor', type: 'color' },
    { label: '关闭背景', model: 'inactiveColor', type: 'color' }
  ]
}

export const switchOptions = mergeOptions(switchs, select)

const slider = {
  __vModel__: { label: '绑定值', model: '__vModel__', type: 'number' },
  __native__: [
    { label: '最大值', model: 'max', type: 'number' },
    { label: '最小值', model: 'min', type: 'number' },
    { label: '步长', model: 'step', type: 'number' },
    { label: '去抖延迟', model: 'debounce', type: 'number' },
    { label: '显示间断点', model: 'showStops', type: 'switch' },
    { label: '显示输入框', model: 'showInput', type: 'switch' },
    { label: '显示控制按钮', model: 'showInputControls', type: 'switch' },
    { label: '显示tooltip', model: 'showTooltip', type: 'switch' },
    { label: '范围选择', model: 'range', type: 'switch' },
    { label: '竖向显示', model: 'vertical', type: 'switch' }
  ]
}

export const sliderOptions = mergeOptions(slider, select)
