/* eslint-disable no-unused-vars */
import { toString } from '@/utils'
import { endOfLine } from './template'
// 用 field.__config__.type 标记 各个属性值
const genScript = function (fields, formConf) {
  const initData = function (field, list) {
    if (!field.__vModel__ || !field.__vModel__.key) return
    const template = `${field.__vModel__.key}: ${toString(field.__vModel__.value) || ''},`
    list.push(template)
  }
  const initProps = function (field, list) {
    // if (!field.__attrs__ || !field.__attrs__.props) return
  }
  const initState = function (field, options) {
    // 构建数据
    initData(field, (options.datas || (options.datas = [])))
    // 构建 props 当代码须精简时，可以将数据从template中移入data
    initProps(field, (options.props || (options.props = [])))
  }

  const genScriptTemplate = function (options) {
  }

  return (function () {
    const options = {}
    ;(fields || []).forEach(field => { initState(field, options) })

    genScriptTemplate(options)
    console.log(options.datas.join(endOfLine))
  }())
}

export default genScript
