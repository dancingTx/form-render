/* eslint-disable no-unused-vars */
import { toString, setDefaultValue, exportDefault, endOfLine } from '@/utils'
import methodsName from './__methods__'
/**
 * 用 field.__config__.type 标记 各个属性值
 * 存在多个相同组件时， 属性名会发生冲突，采用 field.__config__.renderKey 进行标识
 *
 * 当前方法下仅针对form表单得提交与重置做出了方法， 其他相关组件方法后续填入
 */

const genScript = function (fields, formConf) {
  const initData = function (field, list) {
    if (!field.__vModel__ || !field.__vModel__.key) return
    const template = `${field.__vModel__.key}: ${toString(field.__vModel__.value) || ''}`
    list.push(template)
  }
  const initProps = function (field, list) {
    if (!field.__attrs__ || !field.__attrs__.props) return
    const [key] = field.__config__.renderKey
    const template = `${(field.__config__.type || '') + key}Props: ${toString(field.__attrs__.props, null, ' ')}`
    list.push(template)
    // 处理 特殊组件中的options选项， 当代码精简时， 将数据从template中移入data
    initOptions(field, list)
  }
  const initMethods = function (field, list) {
    const config = field.__config__
    if (!field.__methods__ && config.type !== 'upload') return ''
    const methods = {
      // TODO: 待加入其他事件
    }

    if (field.__methods__ && config.type) {
      list.push(...Object.values(methods))
    }

    // 特殊处理 upload 相关方法
    if (config.type === 'upload') {
      initUpload(field, list)
    }
  }
  const initOptions = function (field, list) {
    if (!field.options && !(field.__slot__ && field.__slot__.options)) return ''
    const [key] = field.__config__.renderKey
    const options = field.options || field.__slot__.options
    const template = `${(field.__config__.type || '') + key}Options: ${toString(options, null, ' ')}`
    list.push(template)
  }
  const initUpload = function (field, list) {
    let code = ''
    const config = field.__config__
    const retList = []
    const sizes = {
      KB: '1024',
      MB: '1024 / 1024',
      GB: '1024 / 1024 / 1024'
    }
    if (field.accept) {
      code += `const isType = file.type === ${field.accept}
        if (!isType) {
          this.$message.error('上传头像图片只能是 ${field.accept} 格式!')
        }`
      retList.push('isType')
    }
    if (config.fileSize && config.sizeUnit) {
      const name = `isLt${config.fileSize + config.sizeUnit}`
      code += `const ${name} = file.size / ${sizes[config.sizeUnit]} < ${config.fileSize}
        if (!${name}) {
          this.$message.error('上传头像图片大小不能超过 ${config.fileSize + config.sizeUnit}!')
        }`
      retList.push(name)
    }
    const methods = {
      [methodsName.beforeUpload]: setDefaultValue(
        retList.length,
        `${methodsName.beforeUpload}(file) {
            ${code}
            return ${retList.join(' && ')}
          },`),
      [methodsName.submitUpload]: setDefaultValue(
        !field.autoUpload,
        `${methodsName.submitUpload}() {
            this.$refs.${config.type}.submit()
          }`)
    }
    list.push(...Object.values(methods))
  }
  const initChildren = function (field, options, formConf) {
    const config = field.__config__
    if (!config.children) return

    config.children.forEach(child => { initState(child, options, formConf) })
  }
  const initState = function (field, options, formConf) {
    // 构建 formData 数据
    initData(field, (options.datas || (options.datas = [])))
    // 构建 props 当代码须精简时，可以将数据从template中移入data
    initProps(field, (options.props || (options.props = [])))
    // 构建方法
    initMethods(field, (options.methods || (options.methods = [])), formConf)

    // 递归处理子组件
    initChildren(field, options, formConf)
  }

  const mixinMethods = function (list, formConf) {
    if (!formConf.__config__.formBtnGroup) return ''
    const methods = {
      [methodsName.submitForm]: `${methodsName.submitForm} () {
            this.$refs.${formConf.__config__.formRef}.validate((valid) => {
              if (!valid) return
              //TODO: 提交表单
            })
          },`,
      [methodsName.resetForm]: `${methodsName.resetForm} () {
            this.$refs.${formConf.__config__.formRef}.resetFields()
          }`
    }
    if (formConf.__config__.formBtnGroup) {
      list.push(...Object.values(methods))
    }
  }

  const genScriptTemplate = function (options, formConf) {
    mixinMethods(options.methods, formConf)
    const { datas, props, methods } = options
    const template = `${exportDefault} {
      name: 'formComp',
      data () {
        return {
          ${formConf.__vModel__}: {
            ${datas.join(',' + endOfLine)}
          }${setDefaultValue(!toString(props), ',' + endOfLine + props)}
        }
      },
      methods: {
        ${methods.join(endOfLine)}
      }
    }`

    return template
  }

  return (function () {
    const options = {}
    ;(fields || []).forEach(field => { initState(field, options, formConf) })
    return genScriptTemplate(options, formConf)
  }())
}

export default genScript
