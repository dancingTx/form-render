import { mergeOptions } from '@/utils'
// 表单配置
export const formConf = {
  formRef: 'elForm',
  __vModel__: {},
  labelWidth: 'auto',
  labelPosition: 'right',
  inline: false,
  required: false,
  size: 'medium',
  disabled: false,
  span: 24,
  gutter: 0,
  formBtnGroup: true
}

// 组件配置
// 基础组件
const baseBasicConf = {
  __config__: {
    labelWidth: 'auto',
    required: true,
    showLabel: true,
    changeTag: true,
    layout: 'colFormItem',
    span: 24, // 栅格占据的列数
    offset: 0, // 栅格左侧的间隔格数
    push: 0, // 栅格向右移动的格数
    pull: 0 // 栅格向左移动的格数
  },
  disabled: false // 是否禁用
}

const basicComponents = [
  {
    __config__: {
      label: '按钮',
      tag: 'el-button',
      tagIcon: 'button',
      document: 'https://element.eleme.cn/#/zh-CN/component/button'
    },
    __slot__: {
      default: 'primary button'
    },
    type: 'primary', // ['primary', 'success', 'warning', 'danger', 'info', 'text'] default: primary
    plain: false,
    round: false,
    circle: false,
    autofocus: false,
    icon: '',
    nativeType: 'button'
  }
]
export const basicOptions = basicComponents.map(item => mergeOptions(item, baseBasicConf))
// 输入型组件
const baseInputConf = {
  __config__: {
    labelWidth: 'auto',
    required: true,
    showLabel: true,
    changeTag: true,
    defaultValue: undefined,
    layout: 'colFormItem',
    span: 24, // 栅格占据的列数
    offset: 0, // 栅格左侧的间隔格数
    push: 0, // 栅格向右移动的格数
    pull: 0, // 栅格向左移动的格数
    document: 'https://element.eleme.cn/#/zh-CN/component/input',
    // 表单校验规则
    rules: []
  },
  style: {
    width: '100%'
  },
  placeholder: '请输入', // 输入框占位文本
  maxLength: null, // 最大输入长度
  minLength: null, // 最小输入长度
  showWordLimit: false, // 是否显示字数统计
  clearable: false, // 是否显示清空
  disabled: false, // 是否禁用
  readonly: false // 是否只读
}
const inputComponents = [
  {
    __config__: {
      label: '单行文本',
      tag: 'el-input',
      tagIcon: 'input'
    },
    __slot__: {
      prefix: {
        className: 'el-icon-edit',
        on: {
          click: function () { }
        }
      }, // 输入框头部内容
      suffix: 'el-icon-edit', // 输入框尾部内容
      prepend: '', // 输入框前置内容
      append: '' // 输入框后置内容
    },
    __methods__: {},
    __vModel__: null, // 绑定值
    name: 'text',
    type: 'text', // 类型 default:text
    prefixIcon: '', // 输入框头部图标
    suffixIcon: '', // 输入框尾部图标
    nativeOn: {}
  },
  {
    __config__: {
      label: '多行文本',
      tag: 'el-input',
      tagIcon: 'textarea'
    },
    __vModel__: null, // 绑定值
    name: 'textarea',
    type: 'textarea', // 类型 default:text
    prefixIcon: '', // 输入框头部图标
    suffixIcon: '', // 输入框尾部图标
    autosize: {
      minRows: 2, // textarea 最小行数
      maxRows: 8 // textarea 最大行数
    },
    rows: 2 // textarea 默认行数
  },
  {
    __config__: {
      label: '密码',
      tag: 'el-input',
      tagIcon: 'password'
    },
    __slot__: {
      prefix: '', // 输入框头部内容
      suffix: '', // 输入框尾部内容
      prepend: '', // 输入框前置内容
      append: '' // 输入框后置内容
    },
    __vModel__: 'password',
    name: 'password',
    type: 'password',
    prefixIcon: '', // 输入框头部图标
    suffixIcon: '' // 输入框尾部图标
  },
  {
    __config__: {
      label: '计数器',
      tag: 'el-input-number',
      tagIcon: 'number'
    },
    __vModel__: 'number',
    name: 'number',
    controlsPosition: null, // 控制按钮位置
    step: 1, // 计数器步长
    stepStrictly: false, // 是否只能输入step步数
    precision: null, // 数值精度
    max: null, // 最大数字
    min: null // 最小数字
  }
]
export const inputOptions = inputComponents.map(item => mergeOptions(item, baseInputConf))
// 选择型组件
const baseSelectConf = {
  __config__: {
    labelWidth: 'auto',
    required: true,
    showLabel: true,
    changeTag: true,
    layout: 'colFormItem',
    span: 24, // 栅格占据的列数
    offset: 0, // 栅格左侧的间隔格数
    push: 0, // 栅格向右移动的格数
    pull: 0, // 栅格向左移动的格数
    // 表单校验规则
    rules: []
  },
  style: {
    width: '100%'
  },
  clearable: false, // 是否显示清空
  disabled: false // 是否禁用
}

const selectComponents = [
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/input',
      label: '下拉选择',
      tag: 'el-select',
      tagIcon: 'select',
      isGroup: true
    },
    __slot__: {
      prefix: '',
      empty: '',
      options: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        disabled: true,
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }]
    },
    __vModel__: null,
    name: 'select',
    multiple: false,
    multipleLimit: 0
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/radio',
      label: '单选框(组)',
      tag: 'el-radio-group',
      tagIcon: 'radio',
      isGroup: true,
      isButton: true
    },
    __slot__: {
      options: [
        { content: '备选项', label: '1', name: 'radio1', value: '1', disabled: false, border: true },
        { content: '备选项', label: '2', name: 'radio1', value: '1', disabled: false, border: false }
      ]
    },
    __vModel__: '1',
    textColor: '',
    fill: ''
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/checkbox',
      label: '多选框(组)',
      tag: 'el-checkbox-group',
      tagIcon: 'checkbox',
      isGroup: true
    },
    __slot__: {
      options: [
        { label: '选项一', name: 'checkbox1', value: 1, disabled: false, border: false, checked: false },
        { label: '选项二', name: 'checkbox2', value: 2, disabled: true, border: false, checked: false }
      ]
    },
    __vModel__: null,
    textColor: '#ffffff',
    fill: '#409EFF',
    min: null,
    max: null
  }
]

export const selectOptions = selectComponents.map(item => mergeOptions(item, baseSelectConf))

// 布局型组件
// const baseLayoutConf = {

// }

export const LayoutComponents = [
  {
    __config__: {
      label: '行容器',
      tag: 'el-row',
      tagIcon: 'row',
      layout: 'rowFormItem',
      document: 'https://element.eleme.cn/#/zh-CN/component/layout'
    },
    type: 'default',
    gutter: 0,
    jsutify: 'start',
    align: 'top',
    tag: 'div'
  }
]
