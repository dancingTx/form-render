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
      isButton: false
    },
    __slot__: {
      options: [
        { label: '备选项', name: 'radio1', value: '1', disabled: false, border: false },
        { label: '备选项', name: 'radio1', value: '2', disabled: false, border: false }
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
      isGroup: true,
      isButton: false
    },
    __slot__: {
      options: [
        { label: '选项一', name: 'checkbox1', value: 1, disabled: false, border: false, checked: false },
        { label: '选项二', name: 'checkbox1', value: 2, disabled: false, border: false, checked: false },
        { label: '选项三', name: 'checkbox1', value: 3, disabled: false, border: false, checked: false }
      ]
    },
    __vModel__: [1, 3],
    textColor: '#ffffff',
    fill: '#409EFF',
    min: null,
    max: null
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/cascader',
      label: '级联选择器',
      tag: 'el-cascader',
      tagIcon: 'cascader',
      isPanel: false // 是否展开为panel
    },
    __vModel__: [],
    __methods__: {},
    name: 'cascader',
    options: [{
      value: 'zhinan',
      label: '指南',
      children: [{
        value: 'shejiyuanze',
        label: '设计原则',
        children: [{
          value: 'yizhi',
          label: '一致'
        }, {
          value: 'fankui',
          label: '反馈'
        }, {
          value: 'xiaolv',
          label: '效率'
        }, {
          value: 'kekong',
          label: '可控'
        }]
      }, {
        value: 'daohang',
        label: '导航',
        children: [{
          value: 'cexiangdaohang',
          label: '侧向导航'
        }, {
          value: 'dingbudaohang',
          label: '顶部导航'
        }]
      }]
    }, {
      value: 'zujian',
      label: '组件',
      children: [{
        value: 'basic',
        label: 'Basic',
        children: [{
          value: 'layout',
          label: 'Layout 布局'
        }, {
          value: 'color',
          label: 'Color 色彩'
        }, {
          value: 'typography',
          label: 'Typography 字体'
        }, {
          value: 'icon',
          label: 'Icon 图标'
        }, {
          value: 'button',
          label: 'Button 按钮'
        }]
      }, {
        value: 'form',
        label: 'Form',
        children: [{
          value: 'radio',
          label: 'Radio 单选框'
        }, {
          value: 'checkbox',
          label: 'Checkbox 多选框'
        }, {
          value: 'input',
          label: 'Input 输入框'
        }, {
          value: 'input-number',
          label: 'InputNumber 计数器'
        }, {
          value: 'select',
          label: 'Select 选择器'
        }, {
          value: 'cascader',
          label: 'Cascader 级联选择器'
        }, {
          value: 'switch',
          label: 'Switch 开关'
        }, {
          value: 'slider',
          label: 'Slider 滑块'
        }, {
          value: 'time-picker',
          label: 'TimePicker 时间选择器'
        }, {
          value: 'date-picker',
          label: 'DatePicker 日期选择器'
        }, {
          value: 'datetime-picker',
          label: 'DateTimePicker 日期时间选择器'
        }, {
          value: 'upload',
          label: 'Upload 上传'
        }, {
          value: 'rate',
          label: 'Rate 评分'
        }, {
          value: 'form',
          label: 'Form 表单'
        }]
      }, {
        value: 'data',
        label: 'Data',
        children: [{
          value: 'table',
          label: 'Table 表格'
        }, {
          value: 'tag',
          label: 'Tag 标签'
        }, {
          value: 'progress',
          label: 'Progress 进度条'
        }, {
          value: 'tree',
          label: 'Tree 树形控件'
        }, {
          value: 'pagination',
          label: 'Pagination 分页'
        }, {
          value: 'badge',
          label: 'Badge 标记'
        }]
      }, {
        value: 'notice',
        label: 'Notice',
        children: [{
          value: 'alert',
          label: 'Alert 警告'
        }, {
          value: 'loading',
          label: 'Loading 加载'
        }, {
          value: 'message',
          label: 'Message 消息提示'
        }, {
          value: 'message-box',
          label: 'MessageBox 弹框'
        }, {
          value: 'notification',
          label: 'Notification 通知'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'menu',
          label: 'NavMenu 导航菜单'
        }, {
          value: 'tabs',
          label: 'Tabs 标签页'
        }, {
          value: 'breadcrumb',
          label: 'Breadcrumb 面包屑'
        }, {
          value: 'dropdown',
          label: 'Dropdown 下拉菜单'
        }, {
          value: 'steps',
          label: 'Steps 步骤条'
        }]
      }, {
        value: 'others',
        label: 'Others',
        children: [{
          value: 'dialog',
          label: 'Dialog 对话框'
        }, {
          value: 'tooltip',
          label: 'Tooltip 文字提示'
        }, {
          value: 'popover',
          label: 'Popover 弹出框'
        }, {
          value: 'card',
          label: 'Card 卡片'
        }, {
          value: 'carousel',
          label: 'Carousel 走马灯'
        }, {
          value: 'collapse',
          label: 'Collapse 折叠面板'
        }]
      }]
    }, {
      value: 'ziyuan',
      label: '资源',
      children: [{
        value: 'axure',
        label: 'Axure Components'
      }, {
        value: 'sketch',
        label: 'Sketch Templates'
      }, {
        value: 'jiaohu',
        label: '组件交互文档'
      }]
    }],
    placeholder: '请选择',
    showAllLevels: true,
    collapseTags: false,
    filterable: false,
    separator: '/',
    compProps: {
      expandTrigger: 'hover',
      multiple: false,
      value: 'value',
      label: 'label',
      children: 'children',
      disabled: 'disabled',
      leaf: 'leaf'
    }
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/upload',
      label: '上传',
      tag: 'el-upload',
      tagIcon: 'upload',
      buttonText: '点击上传',
      size: 'small',
      type: 'primary',
      fileSize: 2,
      sizeUnit: 'MB',
      showTips: true
    },
    __slot__: {
      listType: true,
      tip: '只能上传jpg/png文件，且不超过{fileSize}{sizeUnit}'
    },
    __vModel__: null,
    name: 'file',
    action: 'https://jsonplaceholder.typicode.com/posts/',
    headers: {},
    multiple: false,
    data: {},
    withCredentials: false,
    showFileList: true,
    drag: false,
    accept: null,
    listType: 'text',
    autoUpload: true,
    fileList: [],
    limit: null
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/switch',
      label: '开关',
      tag: 'el-switch',
      tagIcon: 'switch'
    },
    __vModel__: true,
    name: 'switch',
    width: 40,
    activeIconClass: '',
    inactiveIconClass: '',
    activeText: '',
    inactiveText: '',
    activeValue: true,
    inactiveValue: false,
    activeColor: '#409EFF',
    inactiveColor: '#C0CCDA'
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/slider',
      label: '滑块',
      tag: 'el-slider',
      tagIcon: 'slider'
    },
    __vModel__: 0,
    name: 'slider',
    min: 0,
    max: 100,
    step: 1,
    showInput: false,
    range: false
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/rate',
      label: '评分',
      tag: 'el-rate',
      tagIcon: 'rate'
    },
    __vModel__: 0,
    name: 'rate',
    max: 5,
    allowHalf: false,
    colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
    voidColor: '#C6D1DE',
    disabledVoidColor: '#EFF2F7',
    showText: false,
    showScore: false,
    textColor: '#1F2D3D',
    texts: ['极差', '失望', '一般', '满意', '惊喜']
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
