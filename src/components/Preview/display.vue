<script>
/* eslint-disable no-new-func */
import Vue from 'vue'
import { randomStr } from '@/utils'
const splitCodeByType = function (code, type) {
  code = code.trim()
  if (!code) return
  const openTagReg = new RegExp(`<${type}[^>]*>`)
  const closeTagReg = new RegExp(`</${type}>`)
  const [openTag] = code.match(openTagReg).length && code.match(openTagReg)
  const [closeTag] = code.match(closeTagReg).length && code.match(closeTagReg)

  return code
    .substring(code.indexOf(openTag) + openTag.length, code.indexOf(closeTag))
}

const genCode = function (code) {
  let template = ''
  let style = ''
  let script = ''
  template = `<div id='app'>${splitCodeByType(code, 'template')}</div>`
  style = splitCodeByType(code, 'style')
  script = splitCodeByType(code, 'script').replace(/export default/, 'return ')
  return {
    template,
    style,
    script
  }
}

const renderCode = function (code) {
  const { template, style, script } = genCode(code)
  let component = null
  if (template && script) {
    const strParse2fn = (new Function(script))()
    strParse2fn.template = template
    const Ctor = Vue.extend(strParse2fn)
    component = (new Ctor()).$mount()
    this.$refs.display.appendChild(component.$el)
  }

  if (style) {
    const css = document.createElement('style')
    css.id = randomStr(32)
    css.type = 'text/css'
    css.innerHTML = style
    document.getElementsByTagName('head')[0].appendChild(css)
  }
  // 销毁组件
  this.$once('hook:beforeDestroy', () => {
    component.$destroy()
    component = null
  })
}
export default {
  name: 'display',
  props: {
    code: String
  },
  mounted () {
    renderCode.call(this, this.code)
  },
  render (h) {
    return h('div', {
      ref: 'display'
    })
  }
}
</script>
