// 表单配置
export const formConf = {

}

// 组件配置

export const inputComponents = [
  {
    __config__: {
      label: '单行文本',
      labelWidth: 'auto',
      required: true,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      document: 'https://element.eleme.cn/#/zh-CN/component/input',
      // 校验规则
      regList: []
    },
    __slot__: {
      prefix: '', // 输入框头部内容
      suffix: '', // 输入框尾部内容
      prepend: '', // 输入框前置内容
      append: '' // 输入框后置内容
    }
  }
]
