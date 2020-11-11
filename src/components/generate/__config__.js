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
    componentType: 'basic',
    labelWidth: 'auto',
    required: false,
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
      type: 'button',
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
    loading: false,
    autofocus: false,
    icon: '',
    nativeType: 'button'
  }
]
export const basicOptions = basicComponents.map(item => mergeOptions(item, baseBasicConf))
// 输入型组件
const baseInputConf = {
  __config__: {
    componentType: 'input',
    labelWidth: 'auto',
    required: true,
    showLabel: true,
    changeTag: true,
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
  maxLength: Infinity, // 最大输入长度
  minLength: 0, // 最小输入长度
  showWordLimit: false, // 是否显示字数统计
  clearable: false, // 是否显示清空
  disabled: false, // 是否禁用
  readonly: false, // 是否只读
  showPassword: false
}
const inputComponents = [
  {
    __config__: {
      label: '单行文本',
      tag: 'el-input',
      tagIcon: 'input',
      type: 'text'
    },
    __slot__: {
      prefix: '', // 输入框头部内容
      suffix: '', // 输入框尾部内容
      prepend: '', // 输入框前置内容
      append: '' // 输入框后置内容
    },
    __methods__: {},
    __vModel__: '', // 绑定值
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
      tagIcon: 'textarea',
      type: 'textarea'
    },
    __vModel__: '', // 绑定值
    name: 'textarea',
    type: 'textarea', // 类型 default:text
    autosize: false,
    rows: 2 // textarea 默认行数
  },
  {
    __config__: {
      label: '密码',
      tag: 'el-input',
      tagIcon: 'password',
      type: 'password'
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
      tagIcon: 'number',
      type: 'number',
      document: 'https://element.eleme.cn/#/zh-CN/component/input-number'
    },
    __vModel__: 0,
    name: 'number',
    type: 'number',
    controls: true,
    controlsPosition: 'left', // 控制按钮位置
    step: 1, // 计数器步长
    stepStrictly: false, // 是否只能输入step步数
    precision: 0, // 数值精度
    max: Infinity, // 最大数字
    min: -Infinity, // 最小数字
    size: 'medium'
  }
]
export const inputOptions = inputComponents.map(item => mergeOptions(item, baseInputConf))
// 选择型组件
const baseSelectConf = {
  __config__: {
    componentType: 'select',
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
      type: 'select',
      isGroup: false
    },
    __slot__: {
      prefix: '',
      empty: null,
      options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        }
      ]
      // options: [{
      //   label: '热门城市',
      //   options: [{
      //     value: 'Shanghai',
      //     label: '上海'
      //   }, {
      //     value: 'Beijing',
      //     label: '北京'
      //   }]
      // }, {
      //   label: '城市名',
      //   disabled: true,
      //   options: [{
      //     value: 'Chengdu',
      //     label: '成都'
      //   }, {
      //     value: 'Shenzhen',
      //     label: '深圳'
      //   }, {
      //     value: 'Guangzhou',
      //     label: '广州'
      //   }, {
      //     value: 'Dalian',
      //     label: '大连'
      //   }]
      // }]
    },
    __vModel__: 1,
    name: 'select',
    // multiple: false,
    // multipleLimit: 0,
    size: 'medium',
    placeholder: '请选择',
    filterable: false,
    allowCreate: false
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/radio',
      label: '单选框(组)',
      tag: 'el-radio-group',
      tagIcon: 'radio',
      type: 'radio',
      isGroup: true,
      isButton: false,
      isBorder: false
    },
    __slot__: {
      options: [
        { label: '备选项', value: '1' },
        { label: '备选项', value: '2' }
      ]
    },
    __vModel__: '1',
    textColor: '#ffffff',
    fill: '#409EFF',
    size: 'medium'
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/checkbox',
      label: '多选框(组)',
      tag: 'el-checkbox-group',
      tagIcon: 'checkbox',
      type: 'checkbox',
      isGroup: true,
      isButton: false,
      isBorder: false
    },
    __slot__: {
      options: [
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 }
      ]
    },
    __vModel__: [1, 3],
    textColor: '#ffffff',
    fill: '#409EFF',
    size: 'medium',
    min: -Infinity,
    max: Infinity
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/cascader',
      label: '级联选择器',
      tag: 'el-cascader',
      tagIcon: 'cascader',
      type: 'cascader',
      isPanel: false // 是否展开为panel
    },
    __vModel__: [],
    __methods__: {},
    __attrs__: {
      props: {
        expandTrigger: 'hover',
        multiple: false,
        checkStrictly: false,
        value: 'value',
        label: 'label',
        children: 'children',
        disabled: 'disabled',
        leaf: 'leaf'
      }
    },
    name: 'cascader',
    options: [
      {
        id: 1,
        label: '选项1',
        value: 1,
        children: [
          {
            id: 3,
            label: '选项1-1',
            value: 3
          }
        ]
      },
      {
        id: 2,
        label: '选项2',
        value: 2
      }
    ],
    placeholder: '请选择',
    showAllLevels: true,
    collapseTags: false,
    filterable: false,
    separator: '/'
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/upload',
      label: '上传',
      tag: 'el-upload',
      tagIcon: 'upload',
      type: 'upload',
      btnSize: 'medium',
      btnType: 'primary',
      btnText: '点击上传',
      fileSize: 2,
      sizeUnit: 'MB',
      showTips: true
    },
    __slot__: {
      listType: 'text',
      tip: '只能上传jpg/png文件，且不超过{fileSize}{sizeUnit}'
    },
    name: 'file',
    action: 'https://jsonplaceholder.typicode.com/posts/',
    headers: {},
    multiple: false,
    data: {},
    withCredentials: false,
    showFileList: true,
    drag: false,
    accept: 'image/*',
    listType: 'text',
    autoUpload: true,
    fileList: [],
    limit: null
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/transfer',
      label: '穿梭框',
      tag: 'el-transfer',
      tagIcon: 'transfer'
    },
    __vModel__: [],
    __slot__: {},
    __attrs__: {
      data () {
        const data = []
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index],
            disabled: index % 4 === 0
          })
        })
        return data
      }
    },
    filterable: false,
    filterPlaceholder: '请输入搜索内容',
    titles: ['列表一', '列表二'],
    buttonTexts: [],
    props: null,
    leftDefaultChecked: [],
    rightDefaultChecked: []
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/time-picker',
      label: '时间选择器',
      tag: 'el-time-picker',
      tagIcon: 'time',
      type: 'time'
    },
    __vModel__: '',
    __slot__: {},
    __attrs__: {}
  },
  // bug: switch vmodel
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/switch',
      label: '开关',
      tag: 'el-switch',
      tagIcon: 'switch',
      type: 'switch'
    },
    __vModel__: false,
    name: 'switch',
    width: 40,
    activeIconClass: '',
    inactiveIconClass: '',
    activeText: '',
    inactiveText: '',
    activeColor: '#409EFF',
    inactiveColor: '#C0CCDA'
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/slider',
      label: '滑块',
      tag: 'el-slider',
      tagIcon: 'slider',
      type: 'slider'
    },
    __vModel__: 0,
    name: 'slider',
    min: 0,
    max: 100,
    step: 1,
    debounce: 300,
    showStops: false,
    showInput: false,
    showInputControls: true,
    showTooltip: true,
    range: false,
    vertical: false
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/rate',
      label: '评分',
      tag: 'el-rate',
      tagIcon: 'rate',
      type: 'rate'
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
  },
  {
    __config__: {
      document: 'https://element.eleme.cn/#/zh-CN/component/color-picker',
      label: '颜色选择器',
      tag: 'el-color-picker',
      tagIcon: 'color',
      type: 'color'
    },
    __vModel__: '#409EFF',
    showAlpha: false,
    colorFormat: 'hex',
    poperClass: ''
  }
]

export const selectOptions = selectComponents.map(item => mergeOptions(item, baseSelectConf))

// 布局型组件
const baseLayoutConf = {
  __config__: {
    componentType: 'layout',
    span: 24, // 栅格占据的列数
    offset: 0, // 栅格左侧的间隔格数
    push: 0, // 栅格向右移动的格数
    pull: 0 // 栅格向左移动的格数
  }
}

const LayoutComponents = [
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

export const layoutOptions = LayoutComponents.map(item => mergeOptions(item, baseLayoutConf))
