<script>
/* eslint-disable no-new-func */
import Vue from 'vue'
import { randomStr, exportDefault } from '@/utils'
let component = null
const cid = randomStr(32)
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
  template = splitCodeByType(code, 'template')
  style = splitCodeByType(code, 'style')
  script = splitCodeByType(code, 'script').replace(exportDefault, 'return ')
  return {
    template,
    style,
    script
  }
}

const renderCode = function (code) {
  const { template, style, script } = genCode(code)
  if (template && script) {
    const strParse2Fn = (new Function(script))()
    strParse2Fn.template = template
    const Ctor = Vue.extend(strParse2Fn)
    component = (new Ctor()).$mount()
    this.$refs.display.appendChild(component.$el)
  }

  if (style) {
    const css = document.createElement('style')
    css.id = cid
    css.type = 'text/css'
    css.innerHTML = style
    document.getElementsByTagName('head')[0].appendChild(css)
  }

  this.$once('hook: beforeDestroy', () => {
    destoryCode()
  })
}

const destoryCode = function () {
  // 销毁对应组件
  if (component) {
    component.$destroy()
    this.$refs.display.removeChild(component.$el)
    component = null
  }
  // 销毁 对应css
  const cssEl = document.getElementById(cid)
  if (cssEl) {
    cssEl.parentNode.removeChild(cssEl)
  }
}
export default {
  name: 'display',
  props: {
    code: String
  },
  watch: {
    code (code) {
      console.log('cdoe', code)
      destoryCode.call(this)
      renderCode.call(this, code)
    }
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
