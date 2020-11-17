/* eslint-disable no-unused-vars */
import { toString, setDefaultValue } from '@/utils'
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
    const template = `${field.__vModel__.key}: ${toString(field.__vModel__.value) || ''},`
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
  const initMethods = function (field, list, formConf) {
    if (!formConf.__config__.formBtnGroup && !field.__methods__) return
    const config = field.__config__
    const methods = {
      form: {
        [methodsName.submitForm]: `
          ${methodsName.submitForm} (formName) {
            this.$refs[formName].validate((valid) => {
              if (!valid) return
              //TODO: 提交表单
            })
          }
        `,
        [methodsName.resetForm]: `
          ${methodsName.resetForm} (formName) {
            this.$refs[formName].resetFields()
          }
        `
      }
    }
    if (formConf.__config__.formBtnGroup) {
      Object.assign(list, Object.values(methods.form))
    }

    if (field.__methods__ && config.type) {
      Object.assign(list, Object.values(methods[config.type]))
    }

    // 特殊处理 upload 相关方法
    if (config.type === 'upload') {
      initUpload(field, list)
    }
  }
  const initOptions = function (field, list) {
    if (!field.options && !(field.__slot__ && field.__slot__.options)) return
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
    if (config.accept) {
      code += `
        const isType = /${config.accept}/.test(file.type)
        if (!isType) {
          this.$message.error('上传头像图片只能是 ${config.accept} 格式!')
        }
      `
      retList.push('isType')
    }
    if (config.fileSize && config.sizeUnit) {
      const name = `isLt${config.fileSize + config.sizeUnit}`
      code += `
        const ${name} = file.size / ${sizes[config.fileSize]} < ${config.fileSize}
        if (!${name}) {
          this.$message.error('上传头像图片大小不能超过 ${config.fileSize + config.sizeUnit}!')
        }
      `
      retList.push(name)
    }
    const methods = {
      [methodsName.beforeUpload]: setDefaultValue(
        retList.length,
        `
          ${methodsName.beforeUpload}(file) {
            ${code}
            return ${retList.join(' && ')}
          }
      `),
      [methodsName.submitUpload]: setDefaultValue(
        !field.autoUpload,
        `
          ${methodsName.submitUpload}() {
            this.$refs.${config.type}.submit()
          }
      `)
    }

    Object.assign(list, Object.values(methods))
  }
  const initState = function (field, options) {
    // 构建 formData 数据
    initData(field, (options.datas || (options.datas = [])))
    // 构建 props 当代码须精简时，可以将数据从template中移入data
    initProps(field, (options.props || (options.props = [])))
    // 构建方法
    initMethods(field, (options.methods || (options.methods = [])), formConf)
  }

  const genScriptTemplate = function (options) {
    console.log(options)
  }

  return (function () {
    const options = {}
    ;(fields || []).forEach(field => { initState(field, options) })

    genScriptTemplate(options)
  }())
}

export default genScript
