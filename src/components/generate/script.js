/* eslint-disable no-unused-vars */
import { toString } from '@/utils'
import { endOfLine } from './template'
/**
 * 用 field.__config__.type 标记 各个属性值
 * 存在多个相同组件时， 属性名会发生冲突，采用 field.__config__.renderKey 进行标识
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
  }
  const initOptions = function (field, list) {
    if (!field.options && !(field.__slot__ && field.__slot__.options)) return
    const [key] = field.__config__.renderKey
    const options = field.options || field.__slot__.options
    const template = `${(field.__config__.type || '') + key}Options: ${toString(options, null, ' ')}`
    list.push(template)
  }
  const initState = function (field, options) {
    // 构建数据
    initData(field, (options.datas || (options.datas = [])))
    // 构建 props 当代码须精简时，可以将数据从template中移入data
    initProps(field, (options.props || (options.props = [])))
    // 处理 特殊组件中的options选项， 当代码精简时， 将数据从template中移入data
    initOptions(field, (options.options || (options.options = [])))
  }

  const genScriptTemplate = function (options) {
  }

  return (function () {
    const options = {}
    ;(fields || []).forEach(field => { initState(field, options) })

    genScriptTemplate(options)
    console.log(options)
  }())
}

export default genScript
