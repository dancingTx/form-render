<script>
import { editor } from 'monaco-editor'
import resize from '@/mixins/resize'
let globalEditorInstance = editor
export let edit = null
const map = {
  html: '<div>111</div>',
  css: 'div {color: #ff0}',
  javascript: 'console.log(1)'
}
const setMonacoLanguage = function (language) {
  const [model] = globalEditorInstance.getModels()
  globalEditorInstance.setModelLanguage(model, language)
}
const createAndUpdateEditorValue = function (code, options = {}) {
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
      createAndUpdateEditorValue.call(this, map[type], {
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
    createAndUpdateEditorValue.call(this, map[this.activeName], {
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
