<script>
import { editor } from 'monaco-editor'
import beautify from 'js-beautify'
import resize from '@/mixins/resize'
import { beautifyRules } from '@/utils'
let globalEditorInstance = editor
export let edit = null
const marks = {
  html: 'html',
  css: 'css',
  javascript: 'js'
}
const beautifyCodeStr = function (code, type) {
  return beautify[marks[(type || 'html')]](code, beautifyRules)
}
const setMonacoLanguage = function (language) {
  const [model] = globalEditorInstance.getModels()
  globalEditorInstance.setModelLanguage(model, language)
}
const createAndUpdateEditorValue = function (code, options = {}) {
  code = beautifyCodeStr(code, options.type)
  if (edit) {
    edit.setValue(code)
    setMonacoLanguage(options.type)
  } else {
    const model = globalEditorInstance.createModel(code, options.type || 'template')
    edit = globalEditorInstance.create(this.$refs.editor, {
      theme: options.theme || 'vs-dark'
    })
    edit.setModel(model)
  }
  // 监听编辑内容变化
  edit.onDidChangeModelContent(() => {
    this.$emit('update:change', edit.getValue())
  })

  // 销毁组件
  destoryMonacoInstance.call(this)
}

const destoryMonacoInstance = function () {
  this.$once('hook: beforeDestroy', () => {
    if (edit) {
      edit.dispose()
      edit = null
      globalEditorInstance = null
    }
  })
}
export default {
  name: 'monaco',
  props: {
    code: String,
    activeName: String
  },
  mixins: [resize],
  watch: {
    activeName (type) {
      createAndUpdateEditorValue.call(this, this.code, {
        type
      })
    },
    resize (value) {
      edit && edit.layout()
    }
  },
  computed: {
    resize () {
      return this.$store.getters.resize
    }
  },
  mounted () {
    createAndUpdateEditorValue.call(this, this.code, {
      type: this.activeName
    })
  },
  render (h) {
    return h('div', {
      ref: 'editor'
    })
  }
}
</script>
